const fs = require('fs'), path = require('path'), vm = require('vm'), assert = require('assert/strict'), crypto = require('crypto');
const ts = require('/Applications/DevEco-Studio.app/Contents/tools/hvigor/hvigor/node_modules/typescript/lib/typescript.js');
const ROOT='/Users/hpt-sans/Desktop/allplatform/projects/yzs-doctor/repos/hos_doctor', OUT=__dirname;
const SDK='oh_modules/.ohpm/@ohos+httpclient@2.0.6/oh_modules/@ohos/httpclient/src/main/ets/';
const hashes={}, cache=new Map(), cases=[], results=[], wire=[];
const quiet={info(){},debug(){},warn(){},error(){}};
function read(rel){const s=fs.readFileSync(path.join(ROOT,rel),'utf8');hashes[rel]=crypto.createHash('sha256').update(s).digest('hex');return s;}
function evaluate(src,req,bindings={}){
 const js=ts.transpileModule(src,{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2020,experimentalDecorators:true}}).outputText;
 const mod={exports:{}};vm.runInNewContext(`(function(require,module,exports){${js}\n})`,{...bindings,console:quiet,Set,Map,Symbol,Date,JSON,Object,Promise,ArrayBuffer,Number,String,Error})(req,mod,mod.exports);return mod.exports;
}
class Placeholder {}
function sdkRequire(id){
 if(id==='./utils/Logger')return {Logger:quiet};
 if(id==='./HttpUrl')return {HttpUrl:{get:value=>({url:typeof value==='string'?value:value.url,getUrl(){return this.url;}})}};
 if(id==='./ConstantManager')return {__esModule:true,default:{CONTENT_TYPE:'Content-Type'}};
 if(id==='./utils/StringUtil')return {__esModule:true,default:{isEmpty:value=>!value}};
 if(id==='./utils/FormatUtils')return {__esModule:true,default:{checkTypedArrayType:()=>false,isArrayBuffer:value=>value instanceof ArrayBuffer}};
 return {__esModule:true,default:Placeholder,HttpDataType:{}};
}
const Request=evaluate(read(SDK+'Request.ts'),sdkRequire).default;
const RequestBody=evaluate(read(SDK+'RequestBody.ts'),sdkRequire).default;
assert(Request && RequestBody);
class NetworkRequestConfig { constructor(){this.baseUrl='https://example.invalid/gapi';this.contentType='application/json';this.headers={};} }
const network={HPTNetwork:{defaultGapiRequestConfig:new NetworkRequestConfig(),async request(req,disabled){wire.push({req,disabled});return {status:'00000'};}},NetworkApi:class{constructor(){this.requestTag='tool-test';}},NetworkRequestConfig,Request};
class MimeBuilder { contentType(){return this;}build(){return this;}getMime(){return {'Content-Type':'application/json; charset=utf8'};} }
const networkSource=read('hpt_network/src/main/ets/HPTNetwork.ts');
const sf=ts.createSourceFile('HPTNetwork.ts',networkSource,ts.ScriptTarget.Latest,true);
const factory=sf.statements.find(n=>ts.isFunctionDeclaration(n)&&n.name?.text==='PostGapi');assert(factory);
network.PostGapi=evaluate(factory.getText(sf),()=>({}),{HPTNetwork:network.HPTNetwork,Request,RequestBody,Mime:{Builder:MimeBuilder}}).PostGapi;
function expect(value){return {assertEqual:other=>assert.equal(value,other),assertTrue:()=>assert.equal(value,true),assertFalse:()=>assert.equal(value,false)};}
function load(rel){
 if(cache.has(rel))return cache.get(rel);
 const code=read(rel);const mod=evaluate(code,id=>{
  if(id==='hpt_network')return network;
  if(id==='@ohos/hypium')return {describe:(_n,fn)=>fn(),it:(name,_level,fn)=>cases.push({name,fn}),expect};
  if(id.startsWith('.')){
   const loc=path.posix.normalize(path.posix.join(path.posix.dirname(rel),id));
   const target=fs.existsSync(path.join(ROOT,loc+'.ets'))?loc+'.ets':loc+'.ts';return load(target);
  }
  throw Error('Unexpected dependency '+id);
 });cache.set(rel,mod);return mod;
}
(async()=>{
 const spec=load('yzs_order/src/ohosTest/ets/test/ets/utils/tracking/FollowUpTracking.test.ets');spec.default();
 for(const c of cases){try{await c.fn();results.push({name:c.name,status:'pass'});}catch(e){results.push({name:c.name,status:'fail',error:e.message});}}
 try{
  const {FollowUpTrackingApi}=load('yzs_order/src/main/ets/follow_up_tracking/FollowUpTrackingApi.ets');
  const {FollowUpTrackingParams,FollowUpTrackingEvent}=load('yzs_order/src/main/ets/follow_up_tracking/FollowUpTrackingTypes.ets');
  const followUpApi=new FollowUpTrackingApi();
  await followUpApi.send(new FollowUpTrackingParams('A',FollowUpTrackingEvent.PlanView,'开方详情'));
  assert.equal(wire.length,1);assert.equal(wire[0].disabled,true);
  const body=JSON.parse(wire[0].req.body.content);assert.equal(body.class,'SET_FOLLOW_UP_TAG');assert.equal(body.package,'igc_crm.recipel.client');assert.equal(body.orderid,'A');assert.equal(body.event_tag,'开方详情');assert.equal(Object.keys(body).length,5);
  const {AIBehaviorTrackingApi}=load('biz_ai/src/main/ets/tracking/AIBehaviorTrackingApi.ets');
  const {AIBehaviorTrackParams}=load('biz_ai/src/main/ets/tracking/AIBehaviorTrackingModel.ets');
  const aiParams=new AIBehaviorTrackParams();aiParams.did='TEST-DOCTOR';aiParams.orderid='TEST-TASK';aiParams.serial='TEST-TASK';aiParams.event='TEST-EVENT';
  await new AIBehaviorTrackingApi().track(aiParams);
  assert.equal(wire.length,2);assert.equal(wire[1].disabled,true);
  const options=req=>({retryOnConnectionFailure:req.retryOnConnectionFailure,retryConnectionCount:req.retryConnectionCount,retryMaxLimit:req.retryMaxLimit,followRedirects:req.followRedirects,followSslRedirects:req.followSslRedirects});
  assert.deepEqual(options(wire[0].req),options(wire[1].req));
  assert.equal(typeof FollowUpTrackingApi.prototype.createRequest,'undefined');
  results.push({name:'Api_send_matchesExistingAITrackingGapiDefaults_andKeepsBusinessWhitelist',status:'pass',networkOptions:options(wire[0].req)});
 }catch(e){results.push({name:'Api_send_matchesExistingAITrackingGapiDefaults_andKeepsBusinessWhitelist',status:'fail',error:e.message});}
 fs.writeFileSync(path.join(OUT,'host-results.json'),JSON.stringify({scope:'Actual Hypium case bodies and four production ETS files transpiled on host; installed SDK Request/RequestBody, production PostGapi and existing AI tracking API used to compare default network settings. Native runtime and network isolated; no device or backend calls.',pass:results.filter(r=>r.status==='pass').length,fail:results.filter(r=>r.status==='fail').length,hypiumCaseCount:cases.length,results},null,2)+'\n');
 fs.writeFileSync(path.join(OUT,'source-sha256.json'),JSON.stringify(hashes,null,2)+'\n');
 for(const r of results)console.log(r.status.toUpperCase()+' '+r.name+(r.error?': '+r.error:''));
 if(results.some(r=>r.status==='fail'))process.exitCode=1;
})().catch(e=>{console.error(e);process.exitCode=1;});
