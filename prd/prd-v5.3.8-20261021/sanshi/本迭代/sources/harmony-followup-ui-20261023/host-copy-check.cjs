const fs = require('node:fs');
const assert = require('node:assert/strict');
const crypto = require('node:crypto');
const path = '/Users/hpt-sans/Desktop/allplatform/hos_doctor/yzs_order/src/main/ets/complete_feedback/CompleteFeedbackDialog.ets';
const source = fs.readFileSync(path,'utf8');
const signature = '  private async copy(content: string): Promise<void> {';
const start=source.indexOf(signature)+signature.length;
const end=source.indexOf('\n  private previewTongue(',start);
assert(start>=signature.length && end>start);
const body=source.slice(start,end).trim().replace(/\}\s*$/,'');
const AsyncFunction=Object.getPrototypeOf(async function(){}).constructor;
const actualCopy=new AsyncFunction('content','pasteboard','HPTToastUtil',body);
const results=[];
async function check(id,name,fn){await fn();results.push({id,name,result:'pass'});}
(async()=>{
  const text='虚拟随访小结第一段\n第二段：标点与换行保留。';
  let messages=[];
  const toast={show:value=>messages.push(value.message)};
  let written;
  let finish;
  const pending=new Promise(resolve=>{finish=resolve;});
  const pasteboard={MIMETYPE_TEXT_PLAIN:'text/plain',createData:(type,content)=>({type,content}),getSystemPasteboard:()=>({setData:data=>{written=data;return pending;}})};
  await check('FU-M01','写入完成前不提示成功，完成后提示成功并保留正文换行',async()=>{
    const task=actualCopy(text,pasteboard,toast);
    assert.deepEqual(messages,[]);
    assert.deepEqual(written,{type:'text/plain',content:text});
    finish();await task;assert.deepEqual(messages,['复制成功']);
  });
  await check('FU-M02','异步写入失败仅提示失败',async()=>{
    messages=[];pasteboard.getSystemPasteboard=()=>({setData:()=>Promise.reject(new Error('fake failure'))});
    await actualCopy(text,pasteboard,toast);assert.deepEqual(messages,['复制失败，请重试']);
  });
  await check('FU-M03','数据创建同步异常仅提示失败',async()=>{
    messages=[];const create=pasteboard.createData;pasteboard.createData=()=>{throw new Error('fake creation failure');};
    await actualCopy(text,pasteboard,toast);assert.deepEqual(messages,['复制失败，请重试']);pasteboard.createData=create;
  });
  await check('FU-M04','用户主动重复复制逐次执行并提示成功',async()=>{
    messages=[];let writes=0;pasteboard.getSystemPasteboard=()=>({setData:async()=>{writes++;}});
    await actualCopy(text,pasteboard,toast);await actualCopy(text,pasteboard,toast);
    assert.equal(writes,2);assert.deepEqual(messages,['复制成功','复制成功']);
  });
  const report={commit:'8fd3ad334',source:path,method:'copy',methodSha256:crypto.createHash('sha256').update(body).digest('hex'),scope:'执行实际方法体；剪贴板与Toast使用替身；不等同系统剪贴板或真机UI通过',results};
  fs.writeFileSync('/private/tmp/v538-followup-final-20261023/host-copy-results.json',JSON.stringify(report,null,2));
  console.log('复制方法主机隔离检查：'+results.length+'项通过，0项失败。');
})().catch(error=>{console.error(error);process.exitCode=1;});
