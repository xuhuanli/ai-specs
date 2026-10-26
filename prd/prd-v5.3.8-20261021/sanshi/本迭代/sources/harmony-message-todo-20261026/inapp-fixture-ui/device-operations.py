from pathlib import Path
import subprocess,json,re,sys,time
root=Path('/Users/hpt-sans/Desktop/allplatform/hos_doctor');out=Path('/private/tmp/v538-inapp-ui-20261026');out.mkdir(exist_ok=True)
hdc='/Applications/DevEco-Studio.app/Contents/sdk/default/openharmony/toolchains/hdc'
def run(*args):
 p=subprocess.run([hdc,*args],capture_output=True,text=True,errors='replace',timeout=40)
 if p.returncode:raise RuntimeError(p.stderr or p.stdout)
 return p.stdout

def want(mode):
 args=['shell','aa','start','-b','com.gancao.hm.doctor','-a','EntryAbility','--ps','v538FixtureMode',mode]
 if mode not in ['off','state','reset']:
  oid=json.load(open('/private/tmp/v538-fixture-ui-20261026/private-parameters.json'))['orderId']
  args+=['--ps','v538FixtureOrder',oid]
 run(*args)

op=sys.argv[1]
if op=='install':
 p=max([p for p in (root/'entry/build/AgcDebug_Test/outputs/default').glob('*.hap')if 'unsigned'not in p.name],key=lambda p:p.stat().st_mtime)
 print(run('install','-r',str(p)))
 print(run('shell','aa','start','-b','com.gancao.hm.doctor','-a','EntryAbility'))
elif op=='want':want(sys.argv[2]);print('派发测试命令：'+sys.argv[2])
elif op=='state':
 name=sys.argv[2];want('state');time.sleep(.35);log=run('shell','hilog','-x');(out/f'{name}.log').write_text(log)
 matches=[]
 for l in log.splitlines():
  if '[V538_UI_STATE] 'in l:
   try:matches.append(json.loads(l.split('[V538_UI_STATE] ',1)[1]))
   except:pass
 if not matches:raise RuntimeError('No state report')
 (out/f'{name}-state.json').write_text(json.dumps(matches[-1],ensure_ascii=False,indent=2))
 print(json.dumps(matches[-1],ensure_ascii=False))
elif op=='dump':
 name=sys.argv[2];remote=f'/data/local/tmp/v538-inapp-{name}.json';run('shell','uitest','dumpLayout','-p',remote);run('file','recv',remote,str(out/f'{name}.json'))
 d=json.loads((out/f'{name}.json').read_text());texts=[]
 def walk(n):
  a=n.get('attributes',{});t=a.get('text','')
  if t: texts.append(t)
  for c in n.get('children',[]):walk(c)
 walk(d)
 print('可见验证标记：', [t for t in texts if t.startswith('V538')or t in ['消息中心','待办助手','完整反馈','患者完整反馈','药方编号','诊室','待回访','待我处理','已完成']])
elif op=='tap':
 name,label=sys.argv[2:4];d=json.loads((out/f'{name}.json').read_text());hits=[]
 def walk(n):
  a=n.get('attributes',{});t=a.get('text','')
  if label in t and a.get('visible')!='false':
   z=list(map(int,re.findall(r'\d+',a.get('bounds',''))))
   if len(z)==4 and z[2]>z[0]and z[3]>z[1] and 0<(z[0]+z[2])//2<1260 and 0<(z[1]+z[3])//2<2720:hits.append((len(t),z))
  for c in n.get('children',[]):walk(c)
 walk(d)
 if not hits:raise RuntimeError('Label not found: '+label)
 _,z=min(hits,key=lambda x:x[0]);run('shell','uitest','uiInput','click',str((z[0]+z[2])//2),str((z[1]+z[3])//2));print('点击验证标记：'+label)
elif op=='tap-card':
 name,notificationId=sys.argv[2:4];d=json.loads((out/f'{name}.json').read_text());hits=[]
 def walk(n):
  a=n.get('attributes',{});i=a.get('id','')
  if 'NotificationCardVm_content' in i and ('__'+notificationId)in i and a.get('clickable')=='true':
   z=list(map(int,re.findall(r'\d+',a.get('bounds',''))));hits.append(z)
  for c in n.get('children',[]):walk(c)
 walk(d)
 if not hits:raise RuntimeError('Own notification card not found')
 z=hits[0];x=z[0]+(z[2]-z[0])//4;y=(z[1]+z[3])//2
 run('shell','uitest','uiInput','click',str(x),str(y));print('点击本轮通知卡片')
elif op in ['close-feedback','nav-back']:
 name=sys.argv[2];d=json.loads((out/f'{name}.json').read_text());hits=[]
 def walk(n):
  a=n.get('attributes',{});z=list(map(int,re.findall(r'\d+',a.get('bounds',''))))
  if a.get('type')=='Image' and a.get('clickable')=='true' and len(z)==4:
   if op=='close-feedback' and z[0]>1050 and 350<z[1]<600:hits.append(z)
   if op=='nav-back' and z[0]<200 and 124<=z[1]<300:hits.append(z)
  for c in n.get('children',[]):walk(c)
 walk(d)
 if len(hits)!=1:raise RuntimeError('Expected one current page control, got '+str(len(hits)))
 z=hits[0];run('shell','uitest','uiInput','click',str((z[0]+z[2])//2),str((z[1]+z[3])//2));print('点击页面自身关闭/返回按钮')
elif op=='back':run('shell','uitest','uiInput','keyEvent','Back')
elif op=='home':run('shell','uitest','uiInput','keyEvent','Home')
elif op=='shade':run('shell','uitest','uiInput','swipe','630','35','630','1700','2000')
elif op=='log':
 log=run('shell','hilog','-x');(out/'latest.log').write_text(log)
 for l in log.splitlines():
  if '[V538_FIXTURE]'in l:print(l.split('[V538_FIXTURE]',1)[1])
