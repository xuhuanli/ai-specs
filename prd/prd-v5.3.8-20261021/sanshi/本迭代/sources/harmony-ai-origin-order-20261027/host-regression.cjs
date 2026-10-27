const fs = require('fs'), path = require('path'), vm = require('vm'), assert = require('assert/strict'), crypto = require('crypto');
const cp = require('child_process');
const ts = require('/Applications/DevEco-Studio.app/Contents/tools/hvigor/hvigor/node_modules/typescript/lib/typescript.js');
const ROOT = '/Users/hpt-sans/Desktop/allplatform/hos_doctor', OUT = __dirname;
const sourceHashes = {}, results = [], requestLog = [];
const str = { isEmpty: v => v == null || v.length === 0, isNotEmpty: v => v != null && v.length > 0 };
const user = { doctor: { id: 'DOCTOR' } };
const middle = { PageType: { prescription: 'prescription' } };
function source(rel) { const s = fs.readFileSync(path.join(ROOT, rel), 'utf8'); sourceHashes[rel] = crypto.createHash('sha256').update(s).digest('hex'); return s; }
function evaluate(s, bindings = {}) { const js = ts.transpileModule(s.replace(/@ObservedV2\b|@Observed\b|@Trace\b/g, ''), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020, experimentalDecorators: true } }).outputText; const mod = { exports: {} }; vm.runInNewContext(`(function(require,module,exports){${js}\n})`, { ...bindings, console, setTimeout, clearTimeout, Date, Map, Set, Object, JSON })(id => {
  if (id === 'biz_user') return { __esModule: true, default: user };
  if (id === 'hpt_basic_lib') return { StrUtil: str, ParserUtil: { parseBoolean: v => v === true || v === 1 || v === '1' } };
  if (id === 'class-transformer') return { Transform: () => () => undefined };
  if (id === 'biz_middle_extension') return middle;
  if (id === 'biz_ai') return { AIFastInputSourceType: { ChiefComplaint: 'chief' } };
  if (id.endsWith('UsedAIDiagnosisAdoption')) return { UsedAIDiagnosisAdoption: class {} };
  return {};
}, mod, mod.exports); return mod.exports; }
function methods(rel, names, bindings, override) { const sf = ts.createSourceFile(rel, (override ?? source(rel)).replace(/\bstruct\b/g, 'class'), ts.ScriptTarget.Latest, true, ts.ScriptKind.TS); const members = []; function visit(n) { if (ts.isMethodDeclaration(n) && names.includes(n.name.getText(sf))) members.push(n.getText(sf)); ts.forEachChild(n, visit); } visit(sf); for (const name of names) assert(members.some(m => new RegExp('\\b'+name+'\\s*\\(').test(m)), `未找到生产方法${name}`); return evaluate(`export class Subject { ${members.join('\n')} }`, bindings).Subject; }
const patientRel = 'yzs_recipel/src/main/ets/make_prescribe/';
const { PatientModel } = evaluate(source('yzs_recipel/src/main/ets/model/Patient.ets'));
const { AIPrescriptionRuleService: Rule } = evaluate(source(patientRel + 'services/AIPrescriptionRuleService.ets'));
const transformer = { plainToInstance: (C, x) => Object.assign(new C(), x), plainToClassFromExist: (x, y) => Object.assign(x, y) };
const Patient = methods(patientRel + 'view_model/Patient.ets', ['requestGetOne', 'requestGetOneInfo', 'handleGetOneInfoResponse', 'updatePatientInfo', 'updatePatientModel', 'setInitialSnapshotAfterDataLoaded'], { PatientModel, ...transformer, StrUtil: str, HPTLoadingUtil: { show() {}, hide() {} }, BasicConstant: { GCWeiXinKaiFangPhone: 'WX' } });
function patient(response, supported = true) { const p = new Patient(); p.patientModel = new PatientModel(); p.patientModel.patient_id = 'PATIENT'; p.patientsApi = { async getOneRecipe(params) { requestLog.push(params); return response; } }; p.checkExistDecoction = () => supported; p.syncGetOneDataCallback = () => {}; p.fallbackToNewPrescribe = () => {}; return p; }
const manager = () => ({ applyGetOneData() {}, aiRecommendationCoordinator: { handleMedicalRecordLoaded() {} } });
const Restore = methods('yzs_recipel/src/main/ets/draft/helper/DraftRestoreHelper.ets', ['applyPatientData'], { StrUtil: str, MedicalImagePairs: { fromCommaText: (ids, urls) => ({ ids: ids ? ids.split(',') : [], urls }) }, AIRecipelTaskPurpose: { Recommendation: 'recommendation', MedicalRecord: 'medicalRecord' }, restoreAIDiagnosisDedupDraftParams() {}, restoreAIRecordAppliedDraftParams() {} });
const Info = methods(patientRel + 'components/MakePrescribePatientInfo.ets', ['buildAiRecordInputParams'], { AIAssistantRecordModeResult: { ImageText: 'imageText', Voice: 'voice' }, PageType: middle.PageType });
const { AIAssistantImageTextState: ImageState, AIAssistantGender } = evaluate(source('yzs_ai/src/main/ets/models/AIAssistantImageTextModels.ets'));
const route = { params: {} };
const Image = methods('yzs_ai/src/main/ets/view_models/AIAssistantImageTextViewModel.ets', ['parseRouteParams', 'buildSubmitParams', 'submit'], { hptRouter: route, AIAssistantImageTextViewModel: { normalizeGender: x => x, isBusinessSuccess: x => x === 1 }, AIAssistantGender, AIAssistantCompleteTextResult: class {}, HPTLoadingUtil: { show() {}, hide() {} }, HPTToastUtil: { show() {} } });
const Save = methods(patientRel + 'pages/MakePrescribe.ets', ['saveDraftIfNeeded'], { appendAIDiagnosisDedupDraftParams() {}, appendAIRecordAppliedDraftParams() {}, StrUtil: str, BasicConstant: { GCWeiXinKaiFangPhone: 'WX' } });
async function test(name, fn) { try { await fn(); results.push({ name, status: 'pass' }); } catch (e) { results.push({ name, status: 'fail', error: e.message }); } }
async function main() {
 await test('新患者模型不继承其他开方来源', () => { const a = new PatientModel(); assert.equal(a.originOrderId, ''); a.originOrderId = 'ORDER-A'; assert.equal(new PatientModel().originOrderId, ''); });
 await test('自动和手动推荐传同一来源，原参数保持', () => { const p = new PatientModel(); p.originOrderId = '900719925474099312345'; p.patient_id = 'P'; p.describe = '主诉'; p.photo_ids = 'img1'; for (const manual of [false,true]) { const q = Rule.buildCreateTextTaskParams(p,manual); assert.equal(q.origin_orderid,p.originOrderId); assert.equal(q.is_manual,manual?'1':'0'); assert.equal(q.is_show,'0'); assert.equal(q.imgs,'img1'); assert.equal(JSON.parse(q.std_summary).illness_desc,'主诉'); } });
 await test('无来源不发origin_orderid，不借用pay_orderid', () => { const p = new PatientModel(); p.pay_orderid = 'UNAPPLIED'; for (const value of ['',undefined,'   ']) { p.originOrderId=value; assert.equal(Object.hasOwn(Rule.buildCreateTextTaskParams(p,false),'origin_orderid'),false); } });
 await test('成功回填优先响应订单号，通知时已可读取来源', async () => { const p = patient({ status:1,data:{recipel:{pay_orderid:'ORDER-A',describe:'订单主诉',result:'诊断',photo:['image'],photo_ids:'id'}} }); const observed=[]; const m=manager(); p.syncGetOneDataCallback=()=>observed.push(p.patientModel.originOrderId); m.aiRecommendationCoordinator.handleMedicalRecordLoaded=()=>observed.push(p.patientModel.originOrderId); assert.equal(await p.requestGetOne(m,'LOOKUP-A'),true); assert.equal(p.patientModel.originOrderId,'ORDER-A'); assert.equal(p.patientModel.describe,'订单主诉'); assert.equal(p.patientModel.result,'诊断'); assert.equal(p.patientModel.photo[0],'image'); assert.deepEqual(observed,['ORDER-A','ORDER-A']); });
 await test('成功回填缺少响应订单号时使用本次查询号', async () => { for (const value of [undefined,'','   ']) { const p=patient({data:{recipel:{pay_orderid:value,describe:'data'}}}); await p.requestGetOne(manager(),'LOOKUP-ID'); assert.equal(p.patientModel.originOrderId,'LOOKUP-ID'); } });
 await test('没有订单数据或不支持剂型不建立来源', async () => { for (const [res,supported] of [[undefined,true],[{status:0},true],[{data:{recipel:{pay_orderid:'UNSUPPORTED'}}},false]]) { const p=patient(res,supported); assert.equal(await p.requestGetOne(manager(),'ROUTE-ONLY'),false); assert.equal(p.patientModel.originOrderId,''); } });
 await test('失败查询保留仍在使用的既有数据和来源', async () => { const p=patient(undefined); p.patientModel.originOrderId='ORIGINAL'; p.patientModel.describe='原有主诉'; await p.requestGetOne(manager(),'FAILED'); assert.equal(p.patientModel.originOrderId,'ORIGINAL'); assert.equal(p.patientModel.describe,'原有主诉'); });
 await test('入口及复诊标记不限制来源登记', async () => { for (const type of [0,1,2,3,4,6,8,12,50,999]) for(const visit of [false,true]) { const p=patient({data:{recipel:{pay_orderid:'ORDER-'+type}}}); const m=manager(); m.recipeSourceType=type; m.followUpVisit=visit; await p.requestGetOne(m,'QUERY'); assert.equal(p.patientModel.originOrderId,'ORDER-'+type); } });
 await test('接受后续订单回填时来源随数据更新', async () => { const p=patient({data:{recipel:{pay_orderid:'B',describe:'B数据'}}}); p.patientModel.originOrderId='A'; await p.requestGetOne(manager(),'B'); assert.equal(p.patientModel.originOrderId,'B'); assert.equal(p.patientModel.describe,'B数据'); });
 await test('草稿优先新字段、兼容旧字段、缺字段清空', () => { for (const [q,expected] of [[{origin_orderid:'NEW',orderid_origin:'OLD'},'NEW'],[{orderid_origin:'OLD'},'OLD'],[{},''],[{origin_orderid:'',orderid_origin:'UNRELATED'},'']]) { const p=new PatientModel(); p.originOrderId='STALE'; new Restore().applyPatientData({patientViewModel:{patientModel:p}},q); assert.equal(p.originOrderId,expected); } });
 await test('草稿恢复通知前来源已就绪', () => { const p=new PatientModel(); let read; new Restore().applyPatientData({patientViewModel:{patientModel:p,syncGetOneDataCallback:()=>read=p.originOrderId}},{origin_orderid:'DRAFT'}); assert.equal(read,'DRAFT'); });
 await test('开方AI写病历图文路由透传同一来源', () => { const p=new PatientModel(); p.originOrderId='A'; p.photo=['url']; p.photo_ids='id'; const info=new Info(); info.patientModel=p; info.aiPrescriptionService={buildCarryCaseContent:()=> '病历'}; const q=info.buildAiRecordInputParams('imageText'); assert.equal(q.originOrderId,'A'); assert.equal(q.imgs,'url'); assert.equal(q.bizMode,'aiMedicalRecordEdit'); });
 await test('图文页从路由解析来源并带入实际请求参数', () => { route.params={patientId:'P',patientName:'N',patientAge:'30',patientGender:'1',analysis_content:'病情',originOrderId:'A',oldTaskId:'OLD',title:'标题'}; const v=new Image(); v.state=new ImageState(); v.restorePhotos=()=>{}; v.syncAgeGenderFromPatient=()=>{}; v.imageIds=()=> 'img'; v.parseRouteParams(); const q=v.buildSubmitParams(); assert.equal(q.origin_orderid,'A'); assert.equal(q.old_task_id,'OLD'); assert.equal(q.contact_id,'P'); assert.equal(q.is_show,'1'); assert.equal(q.is_manual,'1'); });
 await test('独立图文入口无来源时不误发订单号', () => { const v=new Image(); v.state=new ImageState(); v.state.title='T'; v.state.patientId='P'; v.imageIds=()=> ''; assert.equal(Object.hasOwn(v.buildSubmitParams(),'origin_orderid'),false); });
 await test('草稿保存来源不污染真实开方参数', () => { const p=new PatientModel(); p.originOrderId='A'; p.phone='phone'; const transfer=()=>({patient_id:'P',orderid_origin:'LEGACY'}); let saved; const save=new Save(); save.treatmentServicesManager={patientViewModel:{patientModel:p},deliverAddressViewModel:{getTransferRequestParams:transfer},recipelInfoViewModelArray:[{recipelInfoModel:{storage:{}}}],draftHelper:{saveDraft:(...args)=>saved=JSON.parse(args.at(-1))}}; save.saveDraftIfNeeded(); assert.equal(saved.origin_orderid,'A'); assert.equal(Object.hasOwn(transfer(),'origin_orderid'),false); });
 await test('初始快照包含同一来源字段', async () => { const p=patient(undefined); p.patientModel.originOrderId='A'; let q; p.setInitialSnapshotAfterDataLoaded({deliverAddressViewModel:{getTransferRequestParams:()=>({})},draftHelper:{setInitialSnapshot: s=>q=JSON.parse(s)}}); await new Promise(r=>setTimeout(r,5)); assert.equal(q.origin_orderid,'A'); });


 await test('推荐创建经Service和API提交完整来源参数', async () => {
  let sent;
  const network={HPTNetwork:{request:async q=>{sent=q;return {status:1,data:{task_id:'TASK'}};}},PostForm:(url,params)=>({build:()=>({url,params})})};
  const Api=methods(patientRel+'api/AIRecommendationApi.ets',['completeTextTask'],network);
  const Service=methods(patientRel+'services/AIPrescriptionService.ets',['createTextTask','completeTextTask','buildCreateTextTaskParams'],{AIPrescriptionRuleService:Rule});
  const svc=new Service();svc.api=new Api();const p=new PatientModel();p.originOrderId='ORIGIN-SERVICE';
  for(const manual of [false,true]){await svc.createTextTask(p,manual);assert.equal(sent.url,'ai_summary/complete_text_task');assert.equal(sent.params.origin_orderid,'ORIGIN-SERVICE');}
 });
 await test('图文提交经submit和API发出来源及原任务参数', async () => {
  let sent;
  const network={HPTNetwork:{request:async q=>{sent=q;return {status:1,data:{task_id:'TASK'}};}},PostForm:(url,params)=>({build:()=>({url,params})})};
  const Api=methods('yzs_ai/src/main/ets/api/AIAssistantApi.ets',['completeTextTask'],network);
  const v=new Image();v.state=new ImageState();v.state.title='标题';v.state.text='有效病情';v.state.patientId='P';v.state.originOrderId='ORIGIN-IMAGE';v.state.taskId='OLD';v.api=new Api();v.uploadingAIImageIds=[];v.validateAge=()=>true;v.trackSubmitTask=()=>{};v.imageIds=()=>'';
  assert.equal((await v.submit()).taskId,'TASK');assert.equal(sent.url,'ai_summary/complete_text_task');assert.equal(sent.params.origin_orderid,'ORIGIN-IMAGE');assert.equal(sent.params.old_task_id,'OLD');assert.equal(v.state.isSubmitting,false);
 });

 // 影响范围复核：用HEAD基线生产方法比较原有输出，仅允许新增来源字段。
 const base = rel => cp.execFileSync('git',['show','68ec8696af038455e0b5f0395004becfdf21e621:'+rel],{cwd:ROOT,encoding:'utf8'});
 const plain = x => JSON.parse(JSON.stringify(x));
 const without = (x,key) => { const q=plain(x); delete q[key]; return q; };
 const OldRule=evaluate(base(patientRel+'services/AIPrescriptionRuleService.ets')).AIPrescriptionRuleService;
 await test('范围复核：自动手动AI请求除来源及动态时间外与基线一致',()=>{
  for(const manual of [false,true]) for(const origin of ['', 'SOURCE-A']) for(const text of ['', '主诉']) for(const ids of ['', 'i1,i2']) {
   const p=new PatientModel();p.originOrderId=origin;p.patient_id='P';p.patient_name='N';p.describe=text;p.current_symptoms='现病史';p.present_illness_history='刻下症';p.photo_ids=ids;p.patient_age='0.06';p.patient_gender='0';
   const before=plain(OldRule.buildCreateTextTaskParams(p,manual)),after=plain(Rule.buildCreateTextTaskParams(p,manual));
   delete after.origin_orderid;delete before.current_date;delete after.current_date;delete before.title;delete after.title;
   assert.deepEqual(after,before);
  }
 });
 await test('范围复核：图文请求的原字段和旧任务参数与基线一致',()=>{
  const OldImage=methods('yzs_ai/src/main/ets/view_models/AIAssistantImageTextViewModel.ets',['buildSubmitParams'],{AIAssistantGender},base('yzs_ai/src/main/ets/view_models/AIAssistantImageTextViewModel.ets'));
  for(const id of ['', 'P'])for(const origin of ['', 'A']){
   const state=new ImageState();state.patientId=id;state.originOrderId=origin;state.title='标题';state.text='病情';state.patientAge='31';state.patientGender='1';state.patientName='患者';state.taskId='TASK-OLD';state.source='prescription';
   const before=new OldImage(),after=new Image();for(const v of [before,after]){v.state=state;v.imageIds=()=> 'id1';v.acquireAgeValue=()=> '30';}
   assert.deepEqual(without(after.buildSubmitParams(),'origin_orderid'),plain(before.buildSubmitParams()));
  }
 });
 await test('范围复核：历史病历诊断图片回填除来源外与基线一致',()=>{
  const bindings={PatientModel,...transformer,StrUtil:str,BasicConstant:{GCWeiXinKaiFangPhone:'WX'}};
  const OldPatient=methods(patientRel+'view_model/Patient.ets',['updatePatientInfo'],bindings,base(patientRel+'view_model/Patient.ets'));
  for(const photos of [[],['server-photo']]){
   const before=new OldPatient(),after=new Patient();for(const v of [before,after]){v.patientModel=new PatientModel();v.patientModel.photo=['local-photo'];v.patientModel.photo_ids='local-id';v.patientModel.user_nickname='nickname';}
   const data={pay_orderid:'A',describe:'主诉',result:'诊断',disease_course:'现病史',clinical_manifestations:'刻下症',photo:photos,photo_ids:'server-id',phone:''};
   before.updatePatientInfo(data);after.updatePatientInfo(data);assert.deepEqual(without(after.patientModel,'originOrderId'),without(before.patientModel,'originOrderId'));
  }
 });
 await test('范围复核：草稿原病历图片及AI标记恢复与基线一致',()=>{
  const bindings={StrUtil:str,MedicalImagePairs:{fromCommaText:(ids,urls)=>({ids:ids?ids.split(','):[],urls})},AIRecipelTaskPurpose:{Recommendation:'recommendation',MedicalRecord:'medicalRecord'},restoreAIDiagnosisDedupDraftParams(){},restoreAIRecordAppliedDraftParams(){}};
  const OldRestore=methods('yzs_recipel/src/main/ets/draft/helper/DraftRestoreHelper.ets',['applyPatientData'],bindings,base('yzs_recipel/src/main/ets/draft/helper/DraftRestoreHelper.ets'));
  for(const q of [{},{patient_name:'N',describe:'病历',result:'诊断',photo_ids:'i1',photo_urls:'["url1"]',orderid_origin:'OLD',origin_orderid:'A',recipelWriteAITaskId:'TASK',recipelWriteAITaskPurpose:'recommendation'}]){
   const a=new PatientModel(),z=new PatientModel();new OldRestore().applyPatientData({patientViewModel:{patientModel:a}},q);new Restore().applyPatientData({patientViewModel:{patientModel:z}},q);assert.deepEqual(without(z,'originOrderId'),without(a,'originOrderId'));
  }
 });
 await test('范围复核：AI写病历路由除可选来源外与基线一致',()=>{
  const bindings={AIAssistantRecordModeResult:{ImageText:'imageText',Voice:'voice'},PageType:middle.PageType};
  const OldInfo=methods(patientRel+'components/MakePrescribePatientInfo.ets',['buildAiRecordInputParams'],bindings,base(patientRel+'components/MakePrescribePatientInfo.ets'));
  for(const mode of [undefined,'imageText','voice']){
   const p=new PatientModel();p.originOrderId='A';p.describe='主诉';p.photo=['url'];p.photo_ids='id';const a=new OldInfo(),z=new Info();for(const v of [a,z]){v.patientModel=p;v.aiVoiceResultToken='';v.aiPrescriptionService={buildCarryCaseContent:()=> '病历'};}
   assert.deepEqual(without(z.buildAiRecordInputParams(mode),'originOrderId'),plain(a.buildAiRecordInputParams(mode)));
  }
 });
 await test('范围复核：正式开方患者参数不泄露新来源，关键旧链路无改动',()=>{
  const rel=patientRel+'view_model/DeliverAddress.ets';const Delivery=methods(rel,['getPatientInfoRequestParams'],{StrUtil:str,BasicConstant:{GCWeiXinKaiFangPhone:'WX'},RecipeSourceType:{ChatPrescribe:8}});
  const p=new PatientModel();p.originOrderId='A';p.photo_ids='img';p.describe='主诉';p.result='诊断';p.uid='U';p.phone='WX';p.chatOrderId='CONSULT';const d=new Delivery();d.treatmentServicesManager={patientViewModel:{patientModel:p},recipeSourceType:8};const q={};d.getPatientInfoRequestParams(q);assert.equal(q.photo,'img');assert.equal(q.consultation_orderid,'CONSULT');assert.equal(q.phone,'');assert.equal(Object.hasOwn(q,'origin_orderid'),false);assert.equal(Object.hasOwn(q,'originOrderId'),false);
  for(const file of [rel,patientRel+'services/AIRecommendationCoordinator.ets',patientRel+'api/AIRecommendationApi.ets','yzs_ai/src/main/ets/api/AIAssistantApi.ets','yzs_ai/src/main/ets/view_models/AIAssistantVoiceInputViewModel.ets',patientRel+'preview/manager/PrescriptionPreviewFlow.ets'])assert.equal(source(file),base(file),file+'不应修改');
 });
 await test('范围复核：编辑患者及病历后来源保留，独立实例不继承',()=>{
  const p=patient(undefined);p.patientModel.originOrderId='A';p.patientModel.describe='原病历';const edit=plain(p.patientModel);edit.patient_age='40';edit.describe='编辑后';p.updatePatientModel(JSON.stringify(edit));assert.equal(p.patientModel.originOrderId,'A');assert.equal(p.patientModel.patient_age,'40');assert.equal(p.patientModel.describe,'编辑后');assert.equal(new PatientModel().originOrderId,'');
 });
 await test('项目新增Hypium用例在主机隔离环境执行', () => {
  const spec=source('yzs_recipel/src/ohosTest/ets/test/ets/utils/MakePrescribeDraft.test.ets');
  const begin=spec.indexOf("  describe('prescription_origin_order_for_ai_task'");
  assert(begin>=0);
  let count=0;
  evaluate(spec.slice(begin,spec.lastIndexOf('}')),{
   PatientModel,AIPrescriptionRuleService:Rule,
   describe:(_name,fn)=>fn(),it:(_name,_level,fn)=>{fn();count++;},
   expect:value=>({assertEqual:expected=>assert.equal(value,expected),assertTrue:()=>assert.equal(value,true)})
  });
  assert.equal(count,3);
 });
 fs.writeFileSync(path.join(OUT,'host-results.json'),JSON.stringify({scope:'Production methods transpiled/extracted; HarmonyOS, network and class-transformer dependencies isolated. Not device or backend validation.',pass:results.filter(r=>r.status==='pass').length,fail:results.filter(r=>r.status==='fail').length,results},null,2)); fs.writeFileSync(path.join(OUT,'source-sha256.json'),JSON.stringify(sourceHashes,null,2)); for (const r of results) console.log(r.status.toUpperCase()+' '+r.name+(r.error?': '+r.error:'')); if(results.some(r=>r.status==='fail'))process.exitCode=1;
}
main().catch(e=>{console.error(e);process.exitCode=1;});
