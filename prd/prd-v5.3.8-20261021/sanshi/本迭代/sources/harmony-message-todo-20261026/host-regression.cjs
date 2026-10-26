const fs = require('fs');
const path = require('path');
const vm = require('vm');
const assert = require('assert/strict');
const ts = require('/Applications/DevEco-Studio.app/Contents/tools/ohpm/node_modules/typescript/lib/typescript.js');
const root = '/Users/hpt-sans/Desktop/allplatform/hos_doctor';
const records = { routes: [], toasts: [], reads: [], feedback: [] };
const router = { params: {}, navigation: { popWithResult() {} }, router: { popWithResult() {} } };
const scaffold = { hptRouter: router, dynamicPageRegistry: { push(route, params) { records.routes.push({ route, params }); return true; } } };
const basic = { StrUtil: { isEmpty: s => s == null || s.length === 0, isEqual: (a,b) => a === b } };
const dialog = { HPTToastUtil: { show: p => records.toasts.push(p.message) }, HPTLoadingUtil: { show() {}, hide() {} } };
const user = { isHelper: false, doctor: {}, default: { isHelper: false, doctor: {} } };
class Empty {}
class MessageApi { async sendSetMessageRead(id) { records.reads.push(id); } }
const cache = new Map();
const middle = {};
let bridge;
function load(rel, overrides = {}) {
  const file = path.resolve(root, rel);
  if (cache.has(file)) return cache.get(file);
  const mod = { exports: {} }; cache.set(file, mod.exports);
  let source = fs.readFileSync(file, 'utf8').replace(/@ObservedV2\b|@Trace\b/g, '');
  const result = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 } });
  function req(id) {
    if (Object.hasOwn(overrides, id)) return overrides[id];
    if (id === 'hpt_scaffold') return scaffold;
    if (id === 'hpt_basic_lib') return basic;
    if (id === 'hpt_dialog') return dialog;
    if (id === 'biz_user') return { __esModule: true, default: user };
    if (id === 'biz_middle_extension') return middle;
    if (id === 'biz_common_reuse') return { Constant: {}, ImageUrlResolver: {} };
    if (id.startsWith('@kit.')) return { emitter: {} };
    if (id.endsWith('/MessageApi')) return { MessageApi };
    if (id.endsWith('/NavigationService/BridgeNavService')) return { BridgeNavDispatchStatus: { invalidParams: 'invalidParams' }, BridgeNavService: { routeToWithResult(route, params, cb, source) { return { handled: bridge.openOrderDetail(params, source), route }; } } };
    if (id.endsWith('/AppNavigator')) return { AppNavigator: middle.AppNavigator };
    if (id.endsWith('/QualificationNavService')) return { QualificationNavService: {} };
    if (id.endsWith('/LoginInfo')) return { LoginInfo: { token: () => 'test-token' } };
    if (id === './PushPayload' || id === './MessageNavigator' || id === './MessageNavigationContract' || id.endsWith('/models/Message') || id.endsWith('/PageType') || id.endsWith('/BridgeNavRoutes') || id.endsWith('/NavigatorParamUtil')) {
      return load(path.relative(root, path.resolve(path.dirname(file), id + '.ets')));
    }
    return new Proxy({}, { get: (_, prop) => prop === '__esModule' ? true : Empty });
  }
  vm.runInNewContext(`(function(require,module,exports){${result.outputText}\n})`, { console: { ...console, error() {} } })(req, mod, mod.exports);
  cache.set(file, mod.exports); return mod.exports;
}
const base = 'biz_middle_extension/src/main/ets/';
const { PageType } = load(base + 'enum/PageType.ets');
const { OrderNavigator } = load(base + 'utils/NavigationService/navigators/OrderNavigator.ets', { '../../../router/RouterName': { ModuleRouterName: { orderDetailPage: 'detail', completeFeedbackDialog: 'feedback' } } });
middle.PageType = PageType;
middle.ModuleRouterName = { orderDetailPage: 'detail', completeFeedbackDialog: 'feedback' };
middle.AppNavigator = { toOrderDetail: p => OrderNavigator.toOrderDetail(p), toOrderLogistics: () => true };
bridge = load(base + 'utils/NavigationService/BridgeNavService.ets').BridgeNavService;
const parser = load('entry/src/main/ets/push/PushPayloadParser.ets').PushPayloadParser;
const { BusinessHandler } = load('entry/src/main/ets/push/BusinessHandler.ets');
const { MessageNavigator, MessageNavSource } = load('entry/src/main/ets/push/MessageNavigator.ets');
const { MessageModel } = load('entry/src/main/ets/package_home/message/models/Message.ets');
const todo = load(base + 'utils/ToDoJumpProtocol.ets').todoJumpProtocol;
const { MakePrescribeDetailViewModel: Detail } = load('yzs_order/src/main/ets/view_models/MakePrescribeDetail.ets', {
  '../models/OrderStatusInfo': { OrderStatusModel: Empty, allStatus: [{}], OrderStatus: {}, OrderActionType: {}, PreType: {} },
  '../models/PrescriptionInfoModel': { PrescriptionModel: Empty }
});
const results = [];
async function test(name, fn) { await fn(); results.push({ name, status: 'passed' }); }
function clear() { for (const k of Object.keys(records)) records[k].length = 0; }
async function tick() { await Promise.resolve(); await Promise.resolve(); }
function detail(params, options = {}) {
  router.params = params;
  const instance = new Detail('', undefined, undefined, { open: p => records.feedback.push(p) });
  const request = options.request ?? (() => Promise.resolve(options.success ?? true));
  instance.requestDrugInfo = async () => {
    const success = await request();
    instance.isOk = success;
    instance.prescriptionInfo = { recipel: { invest_serial: options.serial === undefined ? 'INVEST-1' : options.serial,
      pay_orderid: params.orderId, patient_id: 'PATIENT-1', uid: 'UID-1' } };
    return success;
  };
  return instance;
}
(async () => {
  await test('Push解析：仅数字1或字符串1启用，缺失/0/空/布尔/数组/对象均关闭', () => {
    for (const value of [1, '1', undefined, 0, '0', '', null, true, false, [1], {}, '01', ' 1 ']) {
      const raw = { jpush_code: 'RECIPEL', orderid: 'ORDER-1' };
      if (value !== undefined) raw.open_reply = value;
      assert.equal(parser.parseFromRecord(raw).extras.openReply, value === 1 || value === '1');
    }
  });
  await test('Huawei嵌套字段可读，顶层0优先于嵌套1', () => {
    const raw = { push_wantAgentInfo: { wants: [{ parameters: { message: { body: { open_reply: 1 } } } }] } };
    assert.equal(parser.parseFromRecord(raw).extras.openReply, true);
    raw.open_reply = 0; assert.equal(parser.parseFromRecord(raw).extras.openReply, false);
  });
  await test('RECIPEL全链路：先进入订单详情，详情成功后复用反馈方法并携带实际来源', async () => {
    clear(); await BusinessHandler.handle(parser.parseFromRecord({ jpush_code: 'RECIPEL', orderid: 'ORDER-1', open_reply: 1, msg_id: 'MSG-1' }));
    assert.equal(records.routes.length, 1); assert.equal(records.routes[0].route, 'detail');
    assert.equal(records.routes[0].params.openCompleteFeedbackOnLoad, true);
    assert.equal(records.routes[0].params.feedbackSource, 'systemNotification');
    assert.deepEqual(records.reads, ['MSG-1']);
    const instance = detail(records.routes[0].params); instance.aboutToAppear();
    assert.equal(records.feedback.length, 0); await tick();
    assert.equal(records.feedback.length, 1); assert.equal(records.feedback[0].investSerial, 'INVEST-1');
    assert.equal(records.feedback[0].orderId, 'ORDER-1'); assert.equal(records.feedback[0].feedbackSource, 'systemNotification');
  });
  await test('RECIPEL开关关闭/缺失只进详情，消息中心不自动扩围', async () => {
    for (const value of [0, undefined]) {
      clear(); await BusinessHandler.handle(parser.parseFromRecord({ jpush_code: 'RECIPEL', orderid: 'ORDER-1', open_reply: value }));
      assert.equal(records.routes[0].params.openCompleteFeedbackOnLoad, false);
    }
    clear(); const msg = new MessageModel({ jpush_code: 'RECIPEL', orderid: 'ORDER-1' }); msg.extras = { openReply: true };
    await MessageNavigator.navigate(msg, MessageNavSource.list); assert.equal(records.routes[0].params.openCompleteFeedbackOnLoad, false);
  });
  await test('RECIPEL缺订单号保留参数异常，不导航', async () => {
    clear(); await BusinessHandler.handle(parser.parseFromRecord({ jpush_code: 'RECIPEL', open_reply: 1 }));
    assert.equal(records.routes.length, 0); assert.equal(records.toasts.length, 1);
  });
  await test('待办原协议兼容：?in=和#、编码JSON及末尾斜杠，不新增开关也打开', () => {
    for (const slash of ['', '/']) for (const separator of ['?in=', '#']) {
      clear(); todo.todoItemJump('igancao://prescribe/feedback' + slash + separator + encodeURIComponent(JSON.stringify({ orderid: 'ORDER-1' })));
      assert.equal(records.routes[0].params.openCompleteFeedbackOnLoad, true);
      assert.equal(records.routes[0].params.feedbackSource, 'todo');
    }
  });
  await test('待办忽略open_reply=0，订单别名保留，其他协议不能伪造自动查看动作', () => {
    clear(); todo.todoItemJump('igancao://prescribe/feedback?in=' + encodeURIComponent(JSON.stringify({ orderId: 'ORDER-1', open_reply: 0 })));
    assert.equal(records.routes[0].params.orderId, 'ORDER-1'); assert.equal(records.routes[0].params.openCompleteFeedbackOnLoad, true);
    clear(); todo.todoItemJump('igancao://prescribe/photo?in=' + encodeURIComponent(JSON.stringify({ orderid: 'ORDER-1', openCompleteFeedbackOnLoad: true })));
    assert.equal(records.routes[0].params.openCompleteFeedbackOnLoad, false);
  });
  await test('待办协议异常或订单号缺失不导航', () => {
    clear(); todo.todoItemJump('igancao://prescribe/feedback?in=oops'); assert.equal(records.routes.length, 0);
    todo.todoItemJump('igancao://prescribe/feedback?in=%7B%7D'); assert.equal(records.routes.length, 0);
  });
  await test('同次自动打开只执行一次，返回详情和刷新不重复；手动查看不继承旧来源', async () => {
    clear(); const instance = detail({ orderId: 'ORDER-1', openCompleteFeedbackOnLoad: true, feedbackSource: 'todo' });
    instance.aboutToAppear(); await tick(); assert.equal(records.feedback.length, 1);
    instance.aboutToAppear(); await tick(); await instance.requestDrugInfo(); assert.equal(records.feedback.length, 1);
    instance.openCompleteFeedback(); assert.equal(records.feedback.length, 2); assert.equal(records.feedback[1].feedbackSource, '');
  });
  await test('详情加载失败不打开；缺反馈流水号沿用原提示并保留详情', async () => {
    clear(); const failed = detail({ orderId: 'ORDER-1', openCompleteFeedbackOnLoad: true }, { success: false });
    failed.aboutToAppear(); await tick(); assert.equal(records.feedback.length, 0);
    const missing = detail({ orderId: 'ORDER-1', openCompleteFeedbackOnLoad: true }, { serial: '' });
    missing.aboutToAppear(); await tick(); assert.equal(records.feedback.length, 0); assert.ok(records.toasts.includes('随访流水号缺失'));
  });
  await test('异步等待期间离开页面，不误打开反馈', async () => {
    clear(); let resolve; const promise = new Promise(r => { resolve = r; });
    const instance = detail({ orderId: 'ORDER-1', openCompleteFeedbackOnLoad: true }, { request: () => promise });
    instance.aboutToAppear(); instance.aboutToDisappear(); resolve(true); await tick(); assert.equal(records.feedback.length, 0);
  });
  await test('异步等待期间切换订单，旧订单回调不打开反馈', async () => {
    clear(); let resolve; const promise = new Promise(r => { resolve = r; });
    const instance = detail({ orderId: 'ORDER-1', openCompleteFeedbackOnLoad: true }, { request: () => promise });
    instance.aboutToAppear(); instance.orderId = 'ORDER-2'; resolve(true); await tick(); assert.equal(records.feedback.length, 0);
  });
  await test('普通详情不自动打开，原tip弹层仍保留', async () => {
    clear(); let tips = 0; const ordinary = detail({ orderId: 'ORDER-1' }); ordinary.aboutToAppear(); await tick();
    assert.equal(records.feedback.length, 0);
    const tip = detail({ orderId: 'ORDER-2', openTipDialog: true }); tip.openTipDialog = () => { tips++; }; tip.aboutToAppear(); await tick(); assert.equal(tips, 1);
  });
  fs.writeFileSync('/private/tmp/v538-navigation-regression-results.json', JSON.stringify({ environment: 'Node主机隔离：执行生产ETS转译代码，平台与网络依赖替身；不是设备或真实Push测试', passed: results.length, results }, null, 2));
  console.log(JSON.stringify({ passed: results.length, failed: 0, results }, null, 2));
})().catch(e => { console.error(e); process.exitCode = 1; });
