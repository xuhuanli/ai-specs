const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const crypto = require('node:crypto');
const assert = require('node:assert/strict');
const ts = require('/Applications/DevEco-Studio.app/Contents/tools/ohpm/node_modules/typescript/lib/typescript.js');
const root = '/Users/hpt-sans/Desktop/allplatform/hos_doctor';
const out = __dirname;
const traces = { nav: [], toast: [], events: [], reads: [], marks: [], removed: [], clicks: [] };
const state = { accepted: true, token: 'fake-token', qualificationIncomplete: false,
  work: { status: '1', data: {} }, read: { status: '1' }, mark: { status: '00000' }, appointment: { status: '1', data: { user_id: 'USER-1' } } };
const user = { did: 'DOCTOR-1', token: 'fake-token', user: { id: 'DOCTOR-1' }, doctor: {}, isHelper: false };
const clone = value => value === undefined ? undefined : JSON.parse(JSON.stringify(value));
function reset() { for (const key of Object.keys(traces)) traces[key].length = 0;
  state.accepted = true; state.work = { status: '1', data: {} }; state.read = { status: '1' };
  state.mark = { status: '00000' }; state.token = 'fake-token'; state.qualificationIncomplete = false; }
class MessageApi {
  async sendSetMessageRead(id) { traces.reads.push(id); if (state.read instanceof Error) throw state.read; return state.read; }
  async queryWorkOrder() { if (state.work instanceof Error) throw state.work; return state.work; }
  async queryAppointment() { return state.appointment; }
}
class ToDoApi { async markToDoItem(id, did) { traces.marks.push({ id, did }); return state.mark; } }
class BaseRefresh {
  constructor(data = []) { this.dataArray = data; this.pageParams = { limit: 10 }; this.refreshController = { doRefresh() {} };
    this.dataSource = { changeData() {}, deleteData: index => { traces.removed.push(index); data.splice(index, 1); }, indexOf: item => data.indexOf(item) }; }
  updatePageLimit() {}
}
const nav = new Proxy({}, { get: (_, name) => (...args) => { traces.nav.push({ name, args: clone(args) });
  if (name === 'toChatSessionByOrder') return Promise.resolve(state.accepted ? 'navigated' : 'failed');
  return state.accepted; } });
const constants = { kBaseImageURL: 'https://images.invalid/', kStoreBaseURL: 'https://store.invalid', refreshAccountInfoEmitter: 11, switchMainTabEmitter: 12 };
const utils = { appPreferences: { get: async () => true, put() {} },
  EmitterConstants: { openMiniProgram: 101, home_refreshToDoList: 102 },
  HPTEmitter: { sendId: (id, data) => traces.events.push({ id, data: clone(data) }) } };
const scaffold = { hptRouter: { router: { popToName() {} }, navigation: { clear() {}, pop() {} } } };
const middle = { AppNavigator: nav, BasicRefreshPageViewModel: BaseRefresh,
  ChatSessionNavStatus: { preconditionFailed: 'preconditionFailed', failed: 'failed' } };
const loaded = new Map();
const hashes = {};
const suites = [];
let suite = '';
const hypium = {
  describe(name, run) { const before = suite; suite = name; run(); suite = before; },
  it(name, _, run) { suites.push({ name: `existing/${suite}/${name}`, run }); },
  expect(value) { return { assertTrue: () => assert.equal(value, true), assertFalse: () => assert.equal(value, false), assertEqual: expected => assert.equal(value, expected) }; }
};
function load(relative) {
  const file = path.resolve(root, relative);
  if (loaded.has(file)) return loaded.get(file).exports;
  const module = { exports: {} }; loaded.set(file, module);
  const original = fs.readFileSync(file, 'utf8');
  hashes[path.relative(root, file)] = crypto.createHash('sha256').update(original).digest('hex');
  const source = original.replace(/@ObservedV2\b|@Trace\b/g, '');
  const js = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 } }).outputText;
  function requireStub(id) {
    if (id === '@ohos/hypium') return hypium;
    if (id === '@kit.ArkTS') return { JSON };
    if (id.startsWith('@kit.')) return { emitter: { emit: (...args) => traces.events.push(clone(args)) } };
    if (id === 'hpt_basic_lib') return { StrUtil: { isEmpty: v => v == null || v.length === 0 }, Logger: { error() {} }, ErrorUtil: { code: () => 'FAKE' } };
    if (id === 'hpt_dialog') return { HPTToastUtil: { show: p => traces.toast.push(p.message) }, HPTLoadingUtil: { show() {}, hide() {} } };
    if (id === 'hpt_utils') return utils;
    if (id === 'hpt_scaffold') return scaffold;
    if (id === 'biz_common_reuse') return { Constant: constants, AppBadgeManager: { clearJPushUnreadAndSync: async () => {} } };
    if (id === 'biz_user') return { __esModule: true, default: user };
    if (id === 'biz_middle_extension') return middle;
    if (id === 'yzs_chat') return { ChatConstant: {} };
    if (id.endsWith('/MessageApi')) return { MessageApi };
    if (id.endsWith('/ToDoApi')) return { ToDoApi };
    if (id.endsWith('/AdvertisementApi')) return { AdvertisementApi: class { async adsCallBack() { throw Error('Real advertisement API must not be used'); } } };
    if (id.endsWith('/AppNavigator')) return { AppNavigator: nav };
    if (id.endsWith('/LoginInfo')) return { LoginInfo: { token: () => state.token } };
    if (id.endsWith('/QualificationNavService')) return { QualificationNavService: { checkAndNavigate: () => state.qualificationIncomplete } };
    if (id.endsWith('/ReturnVisitAppointmentApi')) return { ReturnVisitAppointmentApi: class {} };
    if (id.endsWith('/ChatSessionNavService')) return { ChatSessionNavService: class { openFromBridge() { return state.accepted; } } };
    if (id.endsWith('/MakePrescribeNavService')) return { MakePrescribeNavService: class { openGaoFangFromBridge() { return state.accepted; } } };
    if (id.startsWith('.')) return load(path.relative(root, path.resolve(path.dirname(file), id + '.ets')));
    throw Error(`Unstubbed dependency ${id} in ${relative}`);
  }
  const quiet = { info() {}, warn() {}, error() {}, log() {} };
  vm.runInNewContext(`(function(require,module,exports){${js}\n})`, { console: quiet, $r: name => name, AppStorage: { get: () => 0 }, setTimeout, clearTimeout }, { filename: file })(requireStub, module, module.exports);
  return module.exports;
}
const base = 'biz_middle_extension/src/main/ets/';
const { BridgeNavService: bridge, BridgeNavDispatchStatus } = load(base + 'utils/NavigationService/BridgeNavService.ets');
const { todoJumpProtocol: todo } = load(base + 'utils/ToDoJumpProtocol.ets');
const { PageType } = load(base + 'enum/PageType.ets');
Object.assign(middle, { BridgeNavDispatchStatus, todoJumpProtocol: todo, PageType });
const { MessageNavigator, MessageNavSource } = load('entry/src/main/ets/push/MessageNavigator.ets');
const { MessageModel } = load('entry/src/main/ets/package_home/message/models/Message.ets');
const { MessageViewModel } = load('entry/src/main/ets/package_home/message/view_models/Message.ets');
const { PushPayloadParser: push } = load('entry/src/main/ets/push/PushPayloadParser.ets');
const { BusinessHandler } = load('entry/src/main/ets/push/BusinessHandler.ets');
const { AdvertisementJumpParser: adParser } = load(base + 'utils/advertisement/AdvertisementJumpParser.ets');
const { AdvertisementNavService: ads, AdvertisementPlacement } = load(base + 'utils/advertisement/AdvertisementNavService.ets');
const { AdvertisementImageResolver: images } = load(base + 'utils/advertisement/AdvertisementImageResolver.ets');
const { ToDoStateViewModel: TodoVM } = load('yzs_notice/src/main/ets/view_models/ToDoStateViewModel.ets');
load('entry/src/ohosTest/ets/test/ets/utils/Message.test.ets').default();
load('biz_middle_extension/src/ohosTest/ets/test/ets/utils/UnifiedNavigation.test.ets').default();
const add = (name, run) => suites.push({ name, run });
const reporter = { report: (did, id) => traces.clicks.push({ did, id }) };
const context = { did: 'DOCTOR-1', sourcePage: PageType.home, placement: AdvertisementPlacement.homeTopBanner };
for (const value of [1, '1', 0, '0', undefined, null, '', true, false, '01', ' 1 ', [1], {}]) {
  for (const position of ['top', 'extras']) add(`message/open_reply/${position}/${JSON.stringify(value)}`, async () => {
    const raw = { jpush_code: 'RECIPEL', orderid: 'ORDER-1' };
    if (position === 'top') raw.open_reply = value; else raw.extras = { open_reply: value };
    await MessageNavigator.navigate(new MessageModel(raw));
    assert.equal(traces.nav[0].args[0].openCompleteFeedbackOnLoad, value === 1 || value === '1');
    assert.equal(traces.nav[0].args[0].orderId, 'ORDER-1');
  });
  add(`push/open_reply/${JSON.stringify(value)}`, () => assert.equal(push.parseFromRecord({ open_reply: value }).extras.openReply, value === 1 || value === '1'));
}
for (const code of ['WEB', 'FLAG_WEB', 'ACTIVITY', 'ENVELOPE', 'THANK_WEB', 'GAOFANG_FESTIVAL_MAIN']) add(`message/web/${code}`, async () => {
  await MessageNavigator.navigate(new MessageModel({ jpush_code: code, extras: { url: 'https://h5.invalid/page', title: '活动' } }));
  assert.equal(traces.nav[0].name, 'toWebTarget'); assert.equal(traces.nav[0].args[0].webUrl, 'https://h5.invalid/page');
});
add('message/order_field_priority_and_fallback', () => {
  assert.equal(new MessageModel({ orderid: 'TOP', extras: { orderid: 'EXTRA' } }).orderid, 'TOP');
  assert.equal(new MessageModel({ extras: { orderid: 'EXTRA' } }).orderid, 'EXTRA');
});
for (const result of [{ status: '1' }, { status: '0' }, new Error('fake-read-error')]) add(`message/read_failure_does_not_block/${result instanceof Error ? 'throw' : result.status}`, async () => {
  state.read = result; const m = new MessageModel({ id: 'MSG-1', status: '0', jpush_code: 'RECIPEL', orderid: 'ORDER-1' });
  await new MessageViewModel([m]).readMessage(m, 0);
  assert.equal(traces.nav[0].name, 'toOrderDetail'); assert.equal(m.status, result.status === '1' ? '1' : '0');
});
for (const [label, work, expected] of [['open', { status: '1', data: {} }, true], ['closed', { status: '1', data: null }, false], ['failure', new Error('fake-work-error'), false]]) add(`message/work_order/${label}`, async () => {
  state.work = work; await MessageNavigator.navigate(new MessageModel({ jpush_code: 'WORK_ORDER' }));
  assert.equal(traces.nav.length > 0, expected);
});
for (const status of ['TRANSIT', 'UNPAID', 'UNKNOWN']) add(`push/order_list_status/${status}`, () => {
  const data = push.parseFromRecord({ jpush_code: 'RECIPEL_LIST', order_status: status, order_sub_status: 'FEEDBACK_RECEIVED' });
  assert.equal(data.extras.orderStatus, status === 'UNKNOWN' ? 'ALL' : status);
  assert.equal(data.extras.replyStatus, status === 'TRANSIT' ? 'FEEDBACK_RECEIVED' : '');
});
add('push/read_error_still_navigates_with_source', async () => {
  state.read = new Error('fake-read-error'); await BusinessHandler.handle(push.parseFromRecord({ jpush_code: 'RECIPEL', orderid: 'ORDER-1', msg_id: 'MSG-1', open_reply: 1 }));
  assert.equal(traces.nav[0].args[0].feedbackSource, 'systemNotification');
});
for (const slash of ['', '/']) for (const separator of ['?in=', '#']) add(`todo/feedback_protocol/${slash || 'no-slash'}/${separator}`, () => {
  const result = todo.todoItemJump('igancao://prescribe/feedback' + slash + separator + encodeURIComponent(JSON.stringify({ orderid: 'ORDER-1' })));
  assert.equal(result.status, 'dispatched'); assert.equal(traces.nav[0].args[0].openCompleteFeedbackOnLoad, true);
  assert.equal(traces.nav[0].args[0].feedbackSource, 'todo');
});
add('bridge/plain_order_has_no_automatic_feedback', () => {
  assert.equal(bridge.routeToWithResult('igancao://prescribe/feedback/', { orderid: 'ORDER-1' }).status, 'dispatched');
  assert.equal(traces.nav[0].args[0].openCompleteFeedbackOnLoad, false);
});
for (const route of ['igancao://prescribe/small_daily', 'igancao://systemArticleList', 'igancao://turnToGaofangArticleList', 'igancao://forum/index', 'igancao://forum/tab', 'igancao://forum/create', 'igancao://forum/edit', 'igancao://forum/comment', 'igancao://forum/reply']) add(`bridge/accepted_unsupported/${route}`, () => {
  assert.equal(bridge.routeToWithResult(route, { date: '2026-10-28', id: 'POST-1', type: 1 }).status, 'unsupported');
  assert.equal(traces.nav.length, 0); assert.equal(traces.toast.length, 1);
});
for (const [route, shouldMark] of [['igancao://UNKNOWN', false], ['igancao://prescribe/feedback', false], ['igancao://doctorHomepage', true]]) add(`todo/mark_only_after_dispatch/${route}`, async () => {
  const item = { todoc_entity_id: 'TASK-1', btn_jmp: route, btn_jmp_close: '1' }; const vm = new TodoVM([item]); vm.total = 1;
  await vm.toDoItemJump(item, 0); assert.equal(traces.marks.length, shouldMark ? 1 : 0); assert.equal(traces.removed.length, shouldMark ? 1 : 0);
});
for (const [flag, success, removed] of [['0', true, false], ['1', true, true], ['-1', true, true], ['1', false, false]]) add(`todo/removal/${flag}/${success}`, async () => {
  state.mark = { status: success ? '00000' : 'ERROR' }; const item = { todoc_entity_id: 'TASK-1', btn_jmp: 'igancao://doctorHomepage', btn_jmp_close: flag };
  const vm = new TodoVM([item]); vm.total = 1; await vm.toDoItemJump(item, 0);
  assert.equal(traces.marks.length, 1); assert.equal(traces.removed.length > 0, removed); assert.equal(vm.total, removed ? 0 : 1);
});
for (const placement of Object.values(AdvertisementPlacement).filter(p => p !== 'unknown')) {
  for (const [kind, item, target] of [['web', { landing_page_type: 1, url: 'https://h5.invalid/page', app_bar: 0, app_share: 0 }, 'toWebTarget'], ['native', { landing_page_type: 2, uri: 'igancao://prescribe/feedback/?in=' + encodeURIComponent(JSON.stringify({ orderid: 'ORDER-1' })) }, 'toOrderDetail']]) add(`advertisement/placement/${placement}/${kind}`, () => {
    const result = ads.handleClick({ ...item, ads_entity_id: 'AD-' + placement }, { ...context, placement }, reporter);
    assert.equal(result.status, 'dispatched'); assert.equal(traces.nav[0].name, target); assert.equal(traces.clicks.length, 1); assert.equal(traces.clicks[0].id, 'AD-' + placement);
  });
}
for (const [label, item, expected] of [
  ['none', { landing_page_type: 0 }, 'consumed'], ['uniapp', { landing_page_type: 3, app_id: 'APP-1', path: '/fake' }, 'unsupported'],
  ['wechat', { landing_page_type: 4, app_id: 'gh_fake', path: '/fake' }, 'dispatched'],
  ['missing_h5_url', { landing_page_type: 1 }, 'invalidParams'], ['bad_native_json', { landing_page_type: 2, uri: 'igancao://visitReturn?in=[1]' }, 'invalidParams'],
  ['missing_mini_path', { landing_page_type: 4, app_id: 'gh_fake' }, 'invalidParams'], ['unknown_type', { landing_page_type: 9 }, 'invalidParams'],
  ['missing_order', { landing_page_type: 2, uri: 'igancao://prescribe/feedback/' }, 'invalidParams']
]) add(`advertisement/type_or_invalid/${label}`, () => {
  assert.equal(ads.handleClick({ ...item, ads_entity_id: 'AD-1' }, context, reporter).status, expected);
  assert.equal(traces.clicks.length, 1);
  if (label === 'uniapp') { assert.equal(traces.nav.length, 0); assert.equal(traces.toast.length, 0); }
  if (label === 'wechat') { assert.equal(traces.events.length, 1); assert.equal(traces.events[0].data.app_id, 'gh_fake'); }
});
add('advertisement/missing_id_skips_report', () => { ads.handleClick({ landing_page_type: 0 }, context, reporter); assert.equal(traces.clicks.length, 0); });
add('advertisement/failed_dispatch_still_reports_once', () => { state.accepted = false;
  assert.equal(ads.handleClick({ ads_entity_id: 'AD-1', landing_page_type: 1, url: 'https://h5.invalid' }, context, reporter).status, 'failed'); assert.equal(traces.clicks.length, 1); });
add('advertisement/web_navigation_and_share_configuration_unchanged', () => {
  ads.handleClick({ ads_entity_id: 'AD-1', landing_page_type: '1', url: 'https://h5.invalid', app_bar: '0', app_share: '1', title: 'PAGE', share_title: 'SHARE', share_url: 'https://share.invalid', share_memo: 'MEMO' }, context, reporter);
  const config = traces.nav[0].args[0]; assert.equal(config.showNavgation, false); assert.equal(config.title, 'PAGE');
  assert.equal(config.shareParams.title, 'SHARE'); assert.equal(config.shareParams.shareUrl, 'https://share.invalid');
});
add('advertisement/image_absolute_and_relative', () => {
  assert.equal(images.resolve('https://cdn.invalid/x.png'), 'https://cdn.invalid/x.png');
  assert.equal(images.resolve('x.png'), 'https://images.invalid/x.png'); assert.equal(images.resolve(''), '');
});
(async () => {
  const results = [];
  for (const test of suites) { reset(); try { await test.run(); results.push({ name: test.name, status: 'passed' }); }
    catch (e) { results.push({ name: test.name, status: 'failed', error: e.stack }); } }
  const report = { environment: 'Node host isolation: actual saved ETS transpiled; navigation targets, APIs and HarmonyOS runtime are fakes. Not a UI/backend/remote-push test.',
    total: results.length, passed: results.filter(r => r.status === 'passed').length, failed: results.filter(r => r.status === 'failed').length, results };
  fs.writeFileSync(path.join(out, 'host-results.json'), JSON.stringify(report, null, 2));
  fs.writeFileSync(path.join(out, 'source-sha256.json'), JSON.stringify(hashes, null, 2));
  console.log(JSON.stringify({ total: report.total, passed: report.passed, failed: report.failed, failures: results.filter(r => r.status === 'failed') }, null, 2));
  process.exitCode = report.failed ? 1 : 0;
})().catch(e => { console.error(e.stack); process.exitCode = 1; });
