from pathlib import Path
import subprocess,json,time,sys
b=Path('/private/tmp/v538-inapp-ui-20261026');helper='/private/tmp/v538_inapp_fixture.py'
ORDER='yzs_order/MakePrescribeDetailPage';FB='yzs_order/CompleteFeedbackDialog'
def call(*args):
 p=subprocess.run([sys.executable,helper,*args],capture_output=True,text=True,errors='replace',timeout=45)
 with(b/'case-commands.jsonl').open('a')as f:f.write(json.dumps({'op':list(args),'code':p.returncode},ensure_ascii=False)+'\n')
 if p.returncode:raise RuntimeError(p.stderr or p.stdout)
 return p.stdout

def texts(n):
 out=[n.get('attributes',{}).get('text','')]
 for c in n.get('children',[]):out+=texts(c)
 return out

def wait(name,text):
 deadline=time.monotonic()+22
 while True:
  call('dump',name)
  if text in texts(json.loads((b/(name+'.json')).read_text())):return
  if time.monotonic()>deadline:raise AssertionError(name+': UI marker missing')
  time.sleep(.2)

def state(name):call('state',name);return json.loads((b/(name+'-state.json')).read_text())
rows=json.loads((b/'flow-results.json').read_text())
try:
 zero=json.loads((b/'notification-zero-loaded-state.json').read_text());back=json.loads((b/'notification-zero-back-home-state.json').read_text())
 assert zero['stack']==[ORDER] and zero['orderMatched'] and not zero['openCompleteFeedbackOnLoad'] and back['stack']==[]
 assert not any(e['name']=='feedback-request'for e in zero['events'])
 rows.append({'case':'system-notification-zero','passed':True,'autoFeedback':False,'orderMatched':True,'feedbackRequests':0,'returnedToOrigin':True,'returnMethod':'页面返回按钮','dataSource':'本地系统通知→生产EntryAbility Want点击入口'})
 call('want','notify1');call('home');call('shade');wait('system-one-card','V538通知验证1');call('tap-card','system-one-card','538261')
 wait('system-one-loaded','患者完整反馈');s=state('system-one-loaded');assert s['stack']==[ORDER,FB] and s['orderMatched'] and s['orderSource']=='systemNotification' and s['feedbackSource']=='systemNotification'
 events=[e['name']for e in s['events']];assert events.index('order-request')<events.index('feedback-request') and events.count('feedback-request')==1
 call('close-feedback','system-one-loaded');wait('system-one-back-order','药方编号');d=state('system-one-back-order');assert d['stack']==[ORDER] and d['orderMatched'];assert sum(e['name']=='feedback-request'for e in d['events'])==1
 call('nav-back','system-one-back-order');wait('system-one-back-home','诊室');home=state('system-one-back-home');assert home['stack']==[]
 rows.append({'case':'system-notification-one','passed':True,'autoFeedback':True,'orderMatched':True,'source':'systemNotification','stackAtFeedback':s['stack'],'feedbackRequests':1,'returnedToSameOrder':True,'returnedToOrigin':True,'returnMethod':'完整反馈关闭按钮→订单详情返回按钮','dataSource':'本地系统通知→生产EntryAbility Want点击入口'})
 (b/'flow-results.json').write_text(json.dumps(rows,ensure_ascii=False,indent=2))
 print('PASS system-notification-zero',flush=True);print('PASS system-notification-one',flush=True);print('ALL_FLOW_RESULTS',len(rows),flush=True)
except Exception as e:
 rows.append({'case':'notification-runner','passed':False,'reason':str(e)});(b/'flow-results.json').write_text(json.dumps(rows,ensure_ascii=False,indent=2));print('FAILED',str(e));sys.exit(1)
