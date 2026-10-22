import json,pathlib,re
P=pathlib.Path(__file__).parent

def attrs(tag):
 j=json.loads((P/(tag+'.json')).read_text())
 def walk(n):
  a=n.get('attributes',{})
  if a.get('visible')!='false':yield a
  for c in n.get('children',[]):yield from walk(c)
 return list(walk(j))
def texts(tag):return [a.get('text','') for a in attrs(tag)]
def has(tag,t):return t in texts(tag)
def float_visible(tag):return any(a.get('pagePath')=='subwindow/GlobalFloatSubWindow' for a in attrs(tag))
def gen(tag):return [a for a in attrs(tag) if a.get('type')=='Button' and '生成处方' in a.get('text','')]
R=[]
def test(i,title,evidence,fn,observed):
 try:
  assert fn()
  R.append({'id':i,'title':title,'level':'device-ui-automatic','status':'pass','evidence':evidence,'actual':observed})
 except Exception as e:R.append({'id':i,'title':title,'level':'device-ui-automatic','status':'fail','evidence':evidence,'actual':observed,'error':str(e)})
test('AIT-HOS-U01','开方页预览与生成双入口且AI隐藏',['initial.json'],lambda:has('initial','预览处方') and len(gen('initial'))==1 and not float_visible('initial'),'现有测试开方显示两个入口；无GlobalFloatSubWindow')
test('AIT-HOS-U02','动态进入预览固定标题及单一普通医生生成按钮',['attachment-return.json'],lambda:has('attachment-return','预览处方') and has('attachment-return','患者信息') and len(gen('attachment-return'))==1,'预览处方、患者信息及唯一“生成处方并发送给患者”按钮')
test('AIT-HOS-U03','预览不显示药方编号和订单专属入口',['attachment-return.json'],lambda:all(not has('attachment-return',x) for x in ['药方编号','患者档案','付款时间','支付/分享','取消订单']),'患者卡没有编号行及其复制入口；保留手机号复制图标')
test('AIT-HOS-U04','预览AI悬浮球隐藏',['attachment-return.json','preview-bottom-confirmed.json'],lambda:not float_visible('attachment-return') and not float_visible('preview-bottom-confirmed'),'预览顶部/底部均无GlobalFloatSubWindow')
test('AIT-HOS-U05','附件打开及滑动两张图片',['attachment-open.json','attachment-second.json'],lambda:has('attachment-open','1/2') and has('attachment-second','2/2') and not has('attachment-open','删除'),'只读附件预览从1/2滑到2/2')
test('AIT-HOS-U06','附件页及返回预览均隐藏AI',['attachment-open.json','attachment-return.json'],lambda:not float_visible('attachment-open') and not float_visible('attachment-return') and has('attachment-return','预览处方'),'系统Back从附件返回原预览；没有生成或丢失数据')
test('AIT-HOS-U07','药库介绍跳转与原AI规则',['storage-open.json'],lambda:any(a.get('text','').startswith('https://dev.igancao.com/index.php/medicine_storage/info/') for a in attrs('storage-open')) and float_visible('storage-open'),'进入dev.igancao.com药库介绍，按普通Web原规则显示AI')
test('AIT-HOS-U08','药库介绍顶部返回原预览并隐藏AI',['storage-return-header.json'],lambda:has('storage-return-header','外用测试B') and has('storage-return-header','7剂') and not float_visible('storage-return-header'),'顶部返回保留滚动位置/7剂/备注；AI隐藏')
test('AIT-HOS-U09','新标药材换算前剂量显示和隐藏',['dose-original-confirmed.json','preview-bottom-confirmed.json'],lambda:has('dose-original-confirmed','隐藏换算前剂量') and has('dose-original-confirmed','原20克') and not has('preview-bottom-confirmed','原20克'),'展开看到原20克等，收回后不显示原剂量')
test('AIT-HOS-U10','固定保险与条款页可访问',['preview-bottom-confirmed.json','insurance-open.json'],lambda:has('preview-bottom-confirmed','医师责任险') and has('insurance-open','平安医师责任保险条款'),'固定投保文案与现有保险条款页')
test('AIT-HOS-U11','保险条款返回预览隐藏AI',['insurance-return.json'],lambda:has('insurance-return','医师责任险') and has('insurance-return','¥355.18') and not float_visible('insurance-return'),'顶部返回原保险/金额区；AI隐藏')
test('AIT-HOS-U12','费用展开与新预览默认收起',['bill-expanded-visible.json','preview-dose8-real-bottom.json'],lambda:all(has('bill-expanded-visible',t) for t in ['收起','药费','¥244.18','治疗服务费','¥110.00','诊金','¥1.00']) and has('preview-dose8-real-bottom','明细'),'展开显示244.18+110+1=355.18，重新进入默认“明细”；未单独点击收起验证')
test('AIT-HOS-U13','返回编辑保留剂数备注和金额',['editor-return.json'],lambda:has('editor-return','7') and has('editor-return','外用测试B') and has('editor-return','¥355.18') and not float_visible('editor-return'),'返回原开方保持7剂/原备注/355.18，AI仍隐藏')
test('AIT-HOS-U14','修改为8剂后重新预览最新内容和费用',['preview-dose8-real-bottom.json'],lambda:all(has('preview-dose8-real-bottom',t) for t in ['8剂','¥390.07','用药8天后提醒患者反馈，并适时提醒复诊']),'8剂/390.07/8天随访，未复用上次7剂数据')
test('AIT-HOS-U15','生成前恢复原7剂和原金额',['editor-restored7-before-submit.json','actual-current-before-generation.json'],lambda:all(has('editor-restored7-before-submit',t) for t in ['7','外用测试B','¥355.18']) and has('actual-current-before-generation','预览处方'),'恢复7剂/外用测试B/355.18，重新进入预览后仅提交一次')
def pending_gray():
 return gen('generate-first-result')[0].get('backgroundColor')=='#0D000000' and gen('insurance-return')[0].get('backgroundColor')!='#0D000000'
test('AIT-HOS-U16','真实生成中保留预览并显示禁用样式',['generate-first-result.json','generate-first-result.png'],lambda:has('generate-first-result','预览处方') and pending_gray(),'真实请求期间预览仍在，加载提示与灰色按钮呈禁用样式；未在真机注入第二次生成或返回，实际阻拦由M08/M24等隔离测试补充')
test('AIT-HOS-U17','真实生成成功进入原成功页且隐藏AI',['generate-settled.json','generate-settled.png'],lambda:has('generate-settled','开方成功') and has('generate-settled','返回首页') and not has('generate-settled','预览处方') and not float_visible('generate-settled'),'本轮单次生成成功；未付款、未微信分享')
test('AIT-HOS-U18','成功返回首页且首页AI恢复',['success-home-return.json'],lambda:has('success-home-return','开方记录') and has('success-home-return','诊室') and float_visible('success-home-return') and not has('success-home-return','预览处方'),'返回首页恢复GlobalFloatSubWindow，当前未见预览；全栈移除仅由M18等隔离测试补充')
test('AIT-HOS-U19','真实订单记录与生成前预览对应',['records-loaded.json','generated-order-detail.json','generated-order-detail-bottom.json'],lambda:has('records-loaded','¥355.18') and has('generated-order-detail','药方编号') and all(has('generated-order-detail-bottom',t) for t in ['7剂','外用测试B','¥355.18','2026-10-22 15:51']),'新订单尾号564093，15:51、待付款、7剂、外用测试B、355.18；订单详情保留编号/原操作')
def safearea():
 a=gen('insurance-return')[0];v=list(map(int,re.findall(r'\d+',a['bounds'])));return v==[39,2441,1221,2584] and 2720-v[3]==136
test('AIT-HOS-U20','底部安全区与按钮实际可点',['insurance-return.json','generate-first-result.json','generate-settled.json'],lambda:safearea() and has('generate-settled','开方成功'),'1260×2720屏幕CTA bounds[39,2441][1221,2584]，距屏底136px；实际点击成功进入提交')
extra=[{'id':'AIT-HOS-U21','title':'费用明细单独点击收起','level':'device-ui-automatic','status':'not-run','reason':'已验证展开和新会话默认收起，本轮未单独点击“收起”后抓取状态'}, {'id':'AIT-HOS-U22','title':'首次冷加载/转场未完成即点击生成','level':'device-ui-automatic','status':'not-run','reason':'一次UI树仍在开方转场，安全断言阻止了提交；页面就绪后真实首个动作生成成功，不能视为该极端时序覆盖'}]
res={'commit':'d02c171e5','baseGenerationCommit':'b1f3b08b3','device':{'model':'ALN-AL00','os':'6.1.0.135','api':24,'resolution':'1260x2720'},'package':{'bundle':'com.gancao.hm.doctor','versionName':'2.3.2.100','versionCode':1000117,'updateTime':'2026-10-22T15:37:28+08:00','compatibleAPI':16,'targetAPI':19,'buildSDK':'26.0.0.105'},'environmentEvidence':'药库介绍实际Web URL为dev.igancao.com；用户明确确认当前运行测试环境','newOrderCount':1,'newOrderMarker':{'tail':'564093','created':'2026-10-22 15:51','amount':'355.18','status':'待付款','doses':7},'pass':sum(r['status']=='pass' for r in R),'fail':sum(r['status']=='fail' for r in R),'notRun':len(extra),'results':R+extra,'retryNotes':[{'stage':'hdc探测','actual':'沙箱内shell无响应，设备授权提升后正常；未据此判设备异常'},{'stage':'药库Web返回','actual':'自动注入Back未退出Web，改用顶部返回成功；不将首次无响应计通过'},{'stage':'8剂重预览定位','actual':'编辑后布局变化导致旧坐标未命中预览，重新读UI定位后通过；原流水保留'},{'stage':'生成前同步','actual':'UI树仍在转场时断言失败，未执行生成；等页面稳定后才单次真实提交'},{'stage':'记录入口','actual':'一次文字区域操作后实际出现空白新开方页，未编辑；退出至首页后按图标定位成功进入记录，不将前次计通过'}],'limitations':['没有重建或覆盖安装，安装更新时间晚于本地提交且版本/本地AgcDebug_Test产物时序吻合，但未读取安装包哈希，不能严格证明二进制与Git提交一一对应','真实医助/咨询入口、风险弹窗/签名全分支、网络失败/重复确认取消/提交中返回主要由主机隔离测试补充，未在设备完整执行','历史偶发返回开方且未落单本轮未复现，原因尚未证实，不能归因于误触或安全区修复','界面自动化覆盖当前账号、颗粒剂外用及该手机竖屏，其他剂型/权限/设备形态未做全面验收'],'nonScopeObservations':[{'scope':'保险Web页','actual':'日志出现一次 appBack is not defined，顶部返回仍成功；未见本次预览流程JS崩溃/进程致命错误，不据此扩展修改'},{'scope':'真实订单详情','actual':'待付款订单仍显示付款时间1970-01-01 08:00；预览不显示该行。本轮未改详情，作为范围外观察保留'}]}
(P/'device-test-results.json').write_text(json.dumps(res,ensure_ascii=False,indent=2));print(json.dumps({'pass':res['pass'],'fail':res['fail'],'notRun':res['notRun']},ensure_ascii=False));
for r in R:
 print(r['status'],r['id'],r['title'])
