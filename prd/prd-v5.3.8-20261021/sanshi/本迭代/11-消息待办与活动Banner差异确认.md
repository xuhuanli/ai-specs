# V5.3.8 消息待办与活动 Banner 差异确认

版本：v0.2；记录日期：2026-10-28。

本次补充需求将上个版本已开发、尚未完成测试的消息中心、待办及活动 Banner 纳入 V5.3.8 上线测试。用户要求先逐条确认三端业务差异，全部确认后再执行可覆盖的自动化测试。鸿蒙暂不支持 uniapp 的平台限制已明确，具体兜底表现仍按对应差异项确认。

本记录独立于此前已确认开发完成的8项需求，当前登记 D01 的待确认方案及 D03 的保持现状决定；其他差异在逐条确认时补充。

## D01 H5 活动原生分享摘要丢失

| 项目 | 当前记录 |
| --- | --- |
| 用户决定 | 等用户手动配置好数据后再确认；先记录广告解析处一行修改的方案，暂时不改代码 |
| 当前状态 | 方案已记录，等待数据配置后确认；暂缓实施 |
| 适用范围 | 接入统一广告服务的普通 H5 活动页原生分享；有赞独立容器不经过本链路 |
| 静态核对结论 | 鸿蒙广告摘要在映射为分享模型时丢失；不作为真机分享结果 |
| 实施与测试 | 本项未修改代码，未执行构建、自动化或真机分享验证；不因方案记录而视为已获实施授权 |

### 原因与链路

静态核对基线为鸿蒙 `8f06831ff`。后台字段 `share_memo` 在广告解析器中写入 `shareParams.description`；普通 Web 页面原样保存并传递该对象。点击原生分享按钮后，`WebSharePayloadMapper.pageShareData()` 只读取 `content` 来生成 `ShareData.description`，因此得到空字符串。后续分享工具沿用该空值，微信网页消息组装时不设置摘要，也没有从广告或网页补回摘要的逻辑。

完整调用链：

```text
Banner 点击
→ AdvertisementNavService.handleClick()
→ AdvertisementJumpParser.parseWeb()
→ AdvertisementNavService.dispatchWeb()
→ AppNavigator.toWebTarget() / WebNavigator.toCommonWeb()
→ BaseWebPage.handleShare()
→ AppWebRuntimeAdapter.shareWebPage()
→ WebSharePayloadMapper.pageShareItem() / pageShareData()
→ ShareUtil.shareAction() / shareWX()
→ WeChatShare.shareWebURL() / sendMessage()
→ 微信 SDK sendReq()
```

iOS 广告入口将 `share_memo` 放入 `content`；Android 将 `shareMemo` 放入分享内容。这里仅对照摘要数据传递，不把其他端所有 Web 容器的分享行为视为已验证一致。

### 已记录的最小修改方案

仅在鸿蒙 `AdvertisementJumpParser.ets` 的 `parseWeb()` 中替换一个参数键：

```diff
- 'description': AdvertisementJumpParser.stringValue(item.share_memo),
+ 'content': AdvertisementJumpParser.stringValue(item.share_memo),
```

该方案让广告参数符合现有公共映射约定。分享标题、图片、链接、开关、渠道选择及点击上报保持原处理；D02 分享渠道选择不纳入 D01。当前只记录此方案，不执行修改。

旧 H5 打开网页的 `WebLegacyPagePayloadMapper` 也存在写入 `description` 的同类情况，另列为相关发现，不并入本次 Banner 一行修改范围，也不将此方案表述为全 App 分享修复。

### 配置数据后的确认事项

待用户手动配置可辨识的活动摘要及有效分享链接，再确认 D01 的实际表现和是否实施上述方案。后续验证关注摘要是否传到微信请求，以及空摘要、标题、图片和链接是否保持预期；本节为待执行事项，不是测试结果。

### 源码依据

- [广告摘要写入位置](../../../../hos_doctor/biz_middle_extension/src/main/ets/utils/advertisement/AdvertisementJumpParser.ets)：`parseWeb()`。
- [原生分享按钮与参数传递](../../../../hos_doctor/biz_web/src/main/ets/pages/BaseWebPage.ets)：`handleShare()`。
- [分享模型摘要读取位置](../../../../hos_doctor/entry/src/main/ets/web/share/WebSharePayloadMapper.ets)：`pageShareData()`。
- [微信分享参数构造](../../../../hos_doctor/biz_share/src/main/ets/utils/Share.ets)：`shareWX()`。
- [微信网页消息组装与发送](../../../../hos_doctor/biz_share/src/main/ets/utils/ShareWechat.ets)：`shareWebURL()`、`sendMessage()`。

## D03 鸿蒙暂不支持 uniapp 的现有处理

| 项目 | 当前记录 |
| --- | --- |
| 用户决定 | 鸿蒙当前不支持，保持不动 |
| 当前状态 | 已确认保持现状，不安排修改 |
| 现有处理 | uniapp 广告类型3静默返回不支持，不跳转；论坛 package 消息沿用“该消息类型暂未支持跳转”提示 |
| 提示统一建议 | 不采用此前统一为“鸿蒙系统暂不支持该功能”的建议，保留各入口当前表现 |
| 实施与测试 | 本项不修改代码；本轮未执行构建、自动化或真机验证，保持现状决定不等同于测试通过 |

用户此前提出 D02 与“D0”合并、等待真实数据测试确认后再修改；“D0”的完整编号尚未明确，合并关系暂不调整。D03 本次决定单独记录，不据此推定为 D02 的合并对象。
