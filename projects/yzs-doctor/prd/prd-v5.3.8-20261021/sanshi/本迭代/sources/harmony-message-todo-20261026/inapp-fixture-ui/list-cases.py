from pathlib import Path
import subprocess,json,re,time,sys
base=Path('/private/tmp/v538-inapp-ui-20261026');helper='/private/tmp/v538_inapp_fixture.py'
ORDER='yzs_order/MakePrescribeDetailPage';FEEDBACK='yzs_order/CompleteFeedbackDialog';MSG='Message';TODO='doctor_notice/ToDoListPage'
result=[]
def call(*args):
 p=subprocess.run([sys.executable,helper,*args],capture_output=True,text=True,errors='replace',timeout=45)
 with(base/'case-commands.jsonl').open('a')as f:f.write(json.dumps({'op':list(args),'code':p.returncode},ensure_ascii=False)+'\n')
 if p.returncode:raise RuntimeError(p.stderr or p.stdout)
 return p.stdout

def values(name):
 x=json.loads((base/f'{name}.json').read_text());out=[]
 def walk(n):
  t=n.get('attributes',{}).get('text','')
  if t:out.append(t)
  for c in n.get('children',[]):walk(c)
 walk(x);return out

def wait(name,text):
 deadline=time.monotonic()+22
 while True:
  call('dump',name)
  if text in values(name):return
  if time.monotonic()>deadline:raise AssertionError(f'{name}: missing UI marker {text}')
  time.sleep(.2)

def state(name):
 call('state',name);return json.loads((base/f'{name}-state.json').read_text())

def save():
 (base/'flow-results.json').write_text(json.dumps(result,ensure_ascii=False,indent=2))

def check_auto(name,source,origin):
 wait(name+'-loaded','患者完整反馈');s=state(name+'-loaded');names=s['stack']
 assert names.index(ORDER)>=0 and names.index(FEEDBACK)>names.index(ORDER),names
 assert s['orderMatched'] and s['openCompleteFeedbackOnLoad'] and s['orderSource']==source and s['feedbackSource']==source,s
 events=[e['name']for e in s['events']];assert events.index('order-request')<events.index('feedback-request')
 assert events.count('feedback-request')==1,events
 call('back');wait(name+'-back-order','药方编号');d=state(name+'-back-order');assert d['orderMatched'] and FEEDBACK not in d['stack'],d
 assert sum(x['name']=='feedback-request'for x in d['events'])==1
 call('back');wait(name+'-back-origin','消息中心'if origin==MSG else'待办助手');back=state(name+'-back-origin')
 assert back['stack']==[origin],back
 result.append({'case':name,'passed':True,'autoFeedback':True,'source':source,'stackAtFeedback':names,'orderMatched':True,'feedbackRequests':1,'returnedToSameOrder':True,'returnedToOrigin':True});save();print('PASS',name,flush=True)

try:
 # 首条正向链路已手动执行并留有三段真实状态快照。
 s=json.loads((base/'message-one-loaded-state.json').read_text());d=json.loads((base/'message-one-back-order-state.json').read_text());back=json.loads((base/'message-one-back-list-state.json').read_text())
 assert s['stack']==[MSG,ORDER,FEEDBACK] and s['orderMatched'] and d['stack']==[MSG,ORDER] and d['orderMatched'] and back['stack']==[MSG]
 result.append({'case':'message-top-open_reply1','passed':True,'autoFeedback':True,'source':'message','stackAtFeedback':s['stack'],'orderMatched':True,'feedbackRequests':1,'returnedToSameOrder':True,'returnedToOrigin':True});save()
 call('want','reset');wait('message-extra-origin','V538消息-extras反馈1');call('tap','message-extra-origin','V538消息-extras反馈1');check_auto('message-extra-open_reply1','message',MSG)
 for name,label in [('message-zero','V538消息-仅详情0'),('message-missing','V538消息-缺省仅详情')]:
  call('want','reset');wait(name+'-origin',label);call('tap',name+'-origin',label);wait(name+'-order','药方编号');time.sleep(.8);s=state(name+'-order')
  assert s['stack']==[MSG,ORDER] and s['orderMatched'] and not s['openCompleteFeedbackOnLoad'],s
  assert not any(e['name']=='feedback-request'for e in s['events'])
  call('back');wait(name+'-returned',label);assert state(name+'-returned')['stack']==[MSG]
  result.append({'case':name,'passed':True,'autoFeedback':False,'orderMatched':True,'feedbackRequests':0,'returnedToOrigin':True});save();print('PASS',name,flush=True)
 call('want','todos');wait('todo-origin','V538待办-自动反馈');call('tap','todo-origin','已完成');wait('todo-done','清空');call('want','reset');call('tap','todo-done','V538待办-自动反馈');check_auto('todo-valid-order','todo',TODO)
 wait('todo-alias-origin','V538待办-回访列表兼容');call('tap','todo-alias-origin','V538待办-回访列表兼容');wait('todo-alias-loaded','随访管理');s=state('todo-alias-loaded');assert 'yzs_order/VisitManagerPage'in s['stack'],s
 call('back');wait('todo-alias-returned','待办助手');assert state('todo-alias-returned')['stack']==[TODO]
 result.append({'case':'todo-trailing-slash-list','passed':True,'stackAtTarget':s['stack'],'returnedToOrigin':True});save();print('PASS todo-trailing-slash-list',flush=True)
 print('LIST_CASES_COMPLETE',len(result),flush=True)
except Exception as e:
 result.append({'case':'runner','passed':False,'reason':str(e)});save();print('FAILED',str(e),flush=True);sys.exit(1)
