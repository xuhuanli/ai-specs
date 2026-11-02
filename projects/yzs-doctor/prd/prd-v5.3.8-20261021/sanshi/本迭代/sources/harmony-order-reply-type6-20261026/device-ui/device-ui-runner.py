from pathlib import Path
import subprocess,json,re,sys,time
base=Path('/private/tmp/order-reply-type6/device');base.mkdir(exist_ok=True)
hdc='/Applications/DevEco-Studio.app/Contents/sdk/default/openharmony/toolchains/hdc'
def run(*args):
 p=subprocess.run([hdc,*args],capture_output=True,text=True,errors='replace',timeout=35)
 with (base/'commands.jsonl').open('a') as f:f.write(json.dumps({'op':args[0:3],'exit':p.returncode})+'\n')
 if p.returncode or 'Connect server failed' in p.stdout:raise RuntimeError(p.stderr or p.stdout)
 return p.stdout

def nodes(tree):
 out=[]
 def walk(n):
  out.append(n.get('attributes',{}))
  for c in n.get('children',[]):walk(c)
 walk(tree);return out

def dump(name):
 remote='/data/local/tmp/tag6-'+name+'.json';run('shell','uitest','dumpLayout','-p',remote);run('file','recv',remote,str(base/(name+'.json')))
 tree=json.loads((base/(name+'.json')).read_text());return tree

def hits(tree,text):
 return [a for a in nodes(tree) if text in a.get('text','') and a.get('visible')!='false']

def bounds(a):return list(map(int,re.findall(r'\d+',a['bounds'])))
op=sys.argv[1]
if op=='install':
 root=Path('/Users/hpt-sans/Desktop/allplatform/projects/yzs-doctor/repos/hos_doctor/entry/build/AgcDebug_Test/outputs/default')
 hap=max([p for p in root.glob('*.hap') if 'unsigned' not in p.name],key=lambda p:p.stat().st_mtime)
 print(run('install','-r',str(hap)));print(run('shell','aa','start','-b','com.gancao.hm.doctor','-a','EntryAbility'))
elif op=='case':
 print(run('shell','aa','start','-b','com.gancao.hm.doctor','-a','EntryAbility','--ps','v538TagCase',sys.argv[2]))
elif op=='dump':
 name=sys.argv[2];tree=dump(name)
 tags=hits(tree,'无明显变化')
 print(json.dumps({'tagNodes':[{'text':a.get('text'), 'bounds':a.get('bounds')}for a in tags], 'mockPatientCount':len(hits(tree,'V538标签6测试')),'phase':[a.get('text')for a in nodes(tree) if a.get('text')in ['已反馈','已完结','药方编号','随访小结']]},ensure_ascii=False))
elif op=='wait':
 name,label=sys.argv[2:4];end=time.monotonic()+20
 while True:
  tree=dump(name)
  if hits(tree,label):break
  if time.monotonic()>end:raise RuntimeError('Timed out waiting for '+label)
  time.sleep(.4)
 print('Page ready: '+label)
elif op=='tap':
 name,label=sys.argv[2:4];tree=json.loads((base/(name+'.json')).read_text());matches=hits(tree,label)
 if not matches:raise RuntimeError('Missing target: '+label)
 a=min(matches,key=lambda a:len(a.get('text','')));z=bounds(a);print(run('shell','uitest','uiInput','click',str((z[0]+z[2])//2),str((z[1]+z[3])//2)))
elif op=='snapshot':
 name=sys.argv[2];remote='/data/local/tmp/tag6-'+name+'.jpeg';print(run('shell','snapshot_display','-f',remote));print(run('file','recv',remote,str(base/(name+'.jpeg'))))
elif op=='back':
 print(run('shell','uitest','uiInput','keyEvent','Back'))
else:raise RuntimeError('unknown operation')
