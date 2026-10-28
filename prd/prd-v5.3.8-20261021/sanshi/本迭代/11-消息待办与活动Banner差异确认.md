# V5.3.8 消息待办与活动 Banner 差异确认

版本：v0.3；记录日期：2026-10-28。

本次补充需求将上个版本已开发、尚未完成测试的消息中心、待办及活动 Banner 纳入 V5.3.8 上线测试。用户要求先逐条确认三端业务差异，全部确认后再执行可覆盖的自动化测试。鸿蒙暂不支持 uniapp，D03 已确认保留现有处理。

本记录独立于此前已确认开发完成的8项需求。D01、D02、D03 均已由用户确认关闭，不安排代码修改；其他差异在逐条确认时补充。关闭依据为用户确认的业务边界和保持现状决定，不表示修复或运行测试通过。

| 编号 | 事项 | 最终决定 | 状态 |
| --- | --- | --- | --- |
| D01 | H5 活动原生分享摘要 | 后续分享入口由 Web 自定义导航承接，不实施广告解析处一行修改方案 | 已关闭，不改代码 |
| D02 | H5 活动原生分享渠道 | 沿用导航由 Web 承担的方案，需要分享时由 Web 增加对应自定义导航 | 已关闭，不改代码 |
| D03 | uniapp 暂不支持时的处理 | 鸿蒙当前不支持，保持各入口现有处理，不统一提示 | 已关闭，不改代码 |

## D01 H5 活动原生分享摘要丢失

| 项目 | 当前记录 |
| --- | --- |
| 用户决定 | 最初鸿蒙未提供朋友圈分享，后续协议导航部分已交给 Web；之后需要分享时由 Web 增加对应自定义导航。D01、D02 不修改，关闭问题 |
| 当前状态 | 已确认关闭，不安排代码修改；此前等待手动配置数据后再确认的状态已由本次决定替代 |
| 适用范围 | 接入统一广告服务的普通 H5 活动页原生分享；有赞独立容器不经过本链路 |
| 静态核对结论 | 鸿蒙广告摘要在映射为分享模型时丢失；不作为真机分享结果 |
| 实施与测试 | 本项不修改代码；未执行构建、自动化或真机分享验证，关闭不等同于原生链路已修复或测试通过 |

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

### 历史备选方案 已决定不实施

此前曾提出仅在鸿蒙 `AdvertisementJumpParser.ets` 的 `parseWeb()` 中替换一个参数键，现仅保留分析依据，不作为待执行任务：

```diff
- 'description': AdvertisementJumpParser.stringValue(item.share_memo),
+ 'content': AdvertisementJumpParser.stringValue(item.share_memo),
```

该备选方案原用于让广告参数符合公共映射约定。用户最终确认与 D02 一并按 Web 自定义导航承接分享入口处理，本期不实施该方案，也不修改公共分享映射或现有导航栏配置。

旧 H5 打开网页的 `WebLegacyPagePayloadMapper` 也存在写入 `description` 的同类情况，另列为相关发现，不并入本次 Banner 一行修改范围，也不将此方案表述为全 App 分享修复。

### 最终关闭备注

D01、D02 按同一业务说明关闭：导航部分沿用交给 Web 的方案，之后需要分享时由 Web 增加对应自定义导航并调用分享协议。本次不新增 Web 导航或分享入口，不将原生分享摘要、朋友圈选择列为本期必须修改项；不再将手动配置数据作为这两项关闭的前置条件。

### 源码依据

- [广告摘要写入位置](../../../../hos_doctor/biz_middle_extension/src/main/ets/utils/advertisement/AdvertisementJumpParser.ets)：`parseWeb()`。
- [原生分享按钮与参数传递](../../../../hos_doctor/biz_web/src/main/ets/pages/BaseWebPage.ets)：`handleShare()`。
- [分享模型摘要读取位置](../../../../hos_doctor/entry/src/main/ets/web/share/WebSharePayloadMapper.ets)：`pageShareData()`。
- [微信分享参数构造](../../../../hos_doctor/biz_share/src/main/ets/utils/Share.ets)：`shareWX()`。
- [微信网页消息组装与发送](../../../../hos_doctor/biz_share/src/main/ets/utils/ShareWechat.ets)：`shareWebURL()`、`sendMessage()`。

## D02 H5 活动原生分享渠道

| 项目 | 当前记录 |
| --- | --- |
| 用户决定 | 与 D01 一并确认：最初鸿蒙没有朋友圈分享，后续协议导航部分交给 Web，之后需要分享时由 Web 增加对应自定义导航 |
| 当前状态 | 已确认关闭，不安排原生分享面板或朋友圈选择修改 |
| 关联说明 | 采用 D01 最终关闭备注中的同一业务口径；保留 D01、D02 编号便于追溯 |
| 实施与测试 | 本项不修改代码；本轮未新增 Web 入口或执行运行测试 |

## D03 鸿蒙暂不支持 uniapp 的现有处理

| 项目 | 当前记录 |
| --- | --- |
| 用户决定 | 鸿蒙当前不支持，保持不动 |
| 当前状态 | 已确认关闭，保持现状，不安排修改 |
| 现有处理 | uniapp 广告类型3静默返回不支持，不跳转；论坛 package 消息沿用“该消息类型暂未支持跳转”提示 |
| 提示统一建议 | 不采用此前统一为“鸿蒙系统暂不支持该功能”的建议，保留各入口当前表现 |
| 实施与测试 | 本项不修改代码；本轮未执行构建、自动化或真机验证，保持现状决定不等同于测试通过 |

D01、D02 的旧合并编号疑问及等待真实数据确认的安排，已由用户本次明确关闭三项的决定替代，不再作为待确认事项。
