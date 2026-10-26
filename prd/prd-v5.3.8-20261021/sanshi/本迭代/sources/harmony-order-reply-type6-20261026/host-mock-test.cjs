const fs = require('fs');
const path = require('path');
const vm = require('vm');
const cp = require('child_process');
const assert = require('assert/strict');
const ts = require('/Applications/DevEco-Studio.app/Contents/tools/ohpm/node_modules/typescript/lib/typescript.js');
const root = '/Users/hpt-sans/Desktop/allplatform/hos_doctor';
const baselineRef = '2632b79be2fd';
const output = process.env.TEST_OUTPUT || '/private/tmp/order-reply-type6/results.json';
const files = {
  enums: 'yzs_order/src/main/ets/models/OrderStatusInfo.ets',
  list: 'yzs_order/src/main/ets/view_models/OrderCardStatusHint.ets',
  detail: 'yzs_order/src/main/ets/view_models/MakePrescribeDetail.ets',
  component: 'yzs_order/src/main/ets/components/OrderCardStatusHint.ets',
  model: 'yzs_order/src/main/ets/models/PrescriptionInfoModel.ets'
};
const read = (name, baseline) => baseline ? cp.execFileSync('git', ['show', baselineRef + ':' + files[name]], { cwd: root, encoding: 'utf8' }) : fs.readFileSync(path.join(root, files[name]), 'utf8');
function evaluate(source, dependencies = {}) {
  const module = { exports: {} };
  const compiled = ts.transpileModule(source.replace(/@ObservedV2\b|@Trace\b/g, ''), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 } });
  vm.runInNewContext(`(function(require,module,exports,$r){${compiled.outputText}\n})`, {})(id => {
    if (!(id in dependencies)) throw new Error('Unexpected import: ' + id);
    return dependencies[id];
  }, module, module.exports, id => id);
  return module.exports;
}
function members(source, names) {
  const parsed = ts.createSourceFile('source.ts', source.replace(/\bstruct\b/g, 'class'), ts.ScriptTarget.Latest, true);
  let result = [];
  function visit(node) {
    if (ts.isClassDeclaration(node)) {
      for (const member of node.members) if (member.name && names.includes(member.name.getText(parsed))) result.push(member.getText(parsed));
    }
    ts.forEachChild(node, visit);
  }
  visit(parsed);
  assert.equal(result.length, names.length, 'All production methods must be selected');
  return result.join('\n');
}
function load(baseline = false) {
  const enums = evaluate(read('enums', baseline));
  const list = evaluate(read('list', baseline), { '../models/OrderStatusInfo': enums });
  // Getter bodies refer to the original imported enum.
  const detailBound = evaluate(`const OrderReplyType = ${JSON.stringify(enums.OrderReplyType)}; export class Detail { prescriptionInfo; ${members(read('detail', baseline), ['replyTypeMark', 'replyTypeMarkColor'])} }`);
  const colorBound = evaluate(`const OrderCardHintTagColor = ${JSON.stringify(list.OrderCardHintTagColor)}; export class Colors { presentation; ${members(read('component', baseline), ['tagBackgroundColor'])} }`);
  return { ...enums, ...list, Detail: detailBound.Detail, Colors: colorBound.Colors };
}
const current = load(), baseline = load(true);
const results = [];
function test(name, fn) { try { fn(); results.push({ name, status: 'passed' }); } catch (e) { results.push({ name, status: 'failed', error: e.message }); } }
const plain = value => JSON.parse(JSON.stringify(value));
function detail(api, type, status) { const obj = new api.Detail(); obj.prescriptionInfo = { recipel: { reply_type: type, reply_status: status } }; return [obj.replyTypeMark, obj.replyTypeMarkColor]; }
function list(api, order) { const p = api.OrderCardStatusHintViewModel.resolve(order); const c = new api.Colors(); c.presentation = p; return { show: api.OrderCardStatusHintViewModel.shouldShow(order), presentation: plain(p), color: c.tagBackgroundColor() }; }
test('新增6：列表各诊后阶段与数字/字符串类型显示正确标签和secondary底色', () => {
  for (const type of [6, '6']) for (const status of [1,2,3,4,5,6]) {
    const result = list(current, { reply_type: type, reply_status: status, recipel_desc: '患者按计划服药，暂无明显变化' });
    assert.equal(result.show, true); assert.equal(result.presentation.tagText, '无明显变化'); assert.equal(result.color, 'app.color.secondary');
  }
});
test('新增6：详情不额外限制阶段或依赖列表描述', () => {
  for (const type of [6, '6']) for (const status of [undefined,0,1,2,3,4,5,6]) assert.deepEqual(detail(current,type,status), ['无明显变化','app.color.secondary']);
});
test('原有列表条件：阶段0/无效与空白描述仍隐藏整行', () => {
  for (const status of [0,undefined,null,'bad',NaN]) assert.equal(list(current,{reply_type:6,reply_status:status,recipel_desc:'描述'}).show,false);
  for (const desc of ['', '  ', undefined]) assert.equal(list(current,{reply_type:6,reply_status:5,recipel_desc:desc}).show,false);
});
test('原有超时规则：新标签不改变描述的待反馈超时标红', () => {
  for (const status of [3,4,5,6]) for (const timeout of [0,1,'1']) {
    const p = list(current,{reply_type:6,reply_status:status,recipel_desc:'待反馈描述',is_feedback_timeout:timeout}).presentation;
    assert.equal(p.highlightDescription,status===4 && Number(timeout)===1);
  }
});
test('原有1至5/空/未知值：列表全量状态、描述及超时组合与起点输出一致', () => {
  for (const type of [undefined,null,0,1,2,3,4,5,99,'2','3','4','5']) for (const status of [undefined,0,1,2,3,4,5,6]) for (const desc of ['', ' ', '原有描述']) for (const timeout of [0,1]) {
    const order={reply_type:type,reply_status:status,recipel_desc:desc,is_feedback_timeout:timeout};
    assert.deepEqual(list(current,order), list(baseline,order));
  }
});
test('原有详情标签：1至5/空/未知值映射与起点输出一致', () => {
  for (const type of [undefined,null,0,1,2,3,4,5,99,'2','3','4','5']) for (const status of [undefined,0,1,2,3,4,5,6]) assert.deepEqual(detail(current,type,status),detail(baseline,type,status));
});
test('数据复用：同一详情对象切换新旧标签与空值无旧标签残留', () => {
  const reused = new current.Detail();
  for (const type of [6,3,1,6,5,undefined,6]) {
    reused.prescriptionInfo = { recipel: { reply_type: type, reply_status: 5 } };
    const d=[reused.replyTypeMark,reused.replyTypeMarkColor]; const l=list(current,{reply_type:type,reply_status:5,recipel_desc:'描述'});
    assert.equal(d[0], l.presentation.tagText);
    if (type===6) { assert.equal(d[1],'app.color.secondary'); assert.equal(l.color,'app.color.secondary'); }
  }
});
test('secondary资源为#A56D5F且列表与详情仍使用现有白色字体', () => {
  const colors=JSON.parse(fs.readFileSync(path.join(root,'hpt_basic_lib/src/main/resources/base/element/color.json'),'utf8')).color;
  assert.equal(colors.find(x=>x.name==='secondary').value.toUpperCase(),'#A56D5F');
  assert.match(read('component',false), /Text\(this\.presentation\.tagText\)[\s\S]*?\.fontColor\(\$r\('app.color.white'\)\)/);
  const detailPage=fs.readFileSync(path.join(root,'yzs_order/src/main/ets/pages/MakePrescribeDetail.ets'),'utf8');
  assert.match(detailPage,/Text\(this\.viewModel\.replyTypeMark\)[\s\S]*?\.fontColor\(\$r\('app.color.white'\)\)/);
});
const report={baselineRef, oldListCombinations:624, oldDetailCombinations:104, sourceSha256:Object.fromEntries(Object.entries(files).map(([name,file])=>[file,require('crypto').createHash('sha256').update(read(name,false)).digest('hex')])), method:'真实生产列表解析及AST提取的详情getter/组件配色方法在Node中执行；未渲染ArkUI', results, passed:results.filter(x=>x.status==='passed').length, failed:results.filter(x=>x.status==='failed').length};
fs.mkdirSync(path.dirname(output), { recursive: true }); fs.writeFileSync(output,JSON.stringify(report,null,2)); console.log(JSON.stringify(report,null,2)); process.exitCode=report.failed ? 1 : 0;
