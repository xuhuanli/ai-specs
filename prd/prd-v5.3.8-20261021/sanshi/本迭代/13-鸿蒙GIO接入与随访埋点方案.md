# 鸿蒙 GrowingIO 接入与随访埋点方案

v1.0，2026-10-29，北京时间；本版文档已获用户确认，仅本地提交。关联产品需求 v1.15 的 SAN-REQ-009、SAN-AC-037～044；与既有 SAN-REQ-004、005、008 的随访业务及后台上报衔接。

本文件记录已确认架构、当前源码事实和供讨论的实施建议。本轮仅深度分析与更新文档，不创建模块、不修改生产代码、不安装依赖、不构建、不执行设备或接口验证。

2026-10-29本轮评审与授权：先整理更新文档，交用户确认后仅在根文档仓库本地提交；文档提交完成后，再单独请求代码实施确认，取得该确认后才修改工程。用户现已确认本版文档，允许仅在根文档仓库本地提交；代码实施尚未授权，不安装SDK、不改代码。文档确认及提交只确认本版记录，不自动关闭SAN-Q-021至026；分享是否本期实施的业务确认也不等于代码实施授权。

## 1 本次目标与确认边界

本次变更取消“鸿蒙不接入 GIO”的原限制，增加 GrowingIO SDK，并接入用户最终确认的随访业务清单。GIO 与已完成的后台随访上报分别维护，不能用其中一路替代另一路。

四个事件及十五项属性的权威清单见 [06-APP埋点清单](06-APP埋点清单.md)。本方案不另复制一套属性表，后续字段调整先改该清单，再同步本文件中的数据来源、触发和验证说明。

| 事项 | 当前结论 |
| --- | --- |
| GIO 业务清单 | 计划查看、微信分享、反馈查看、内容复制四项；事件标识符和属性以 06 号文档为准 |
| 分享本期范围 | 保留在 GIO 清单；是否本期实施及可确认实际调起的节点仍待 SAN-Q-025，不因后台取消 APP 分享直报而删除 |
| 通用 SDK 模块 | 用户确认手动创建 `hpt_analytics` 共享HSP；收尾已见shared脚手架和工程注册，SDK及统一工具尚未接入，本轮未代建或修改工程 |
| SDK 与通用工具 | SDK 单一依赖、初始化实现及统一 `GioTracker` 工具位于 `hpt_analytics` |
| 应用编排 | `entry` 调用通用工具，负责应用生命周期、授权、身份及环境配置的编排 |
| 随访业务归属 | 随访 GIO 业务封装与现有 GAPI 同处 `yzs_order/follow_up_tracking`，不新增 `biz_analytics` |
| AI 领域边界 | AI 业务仍由本领域维护；将来涉及的共用埋点放 `biz_ai/tracking`，本次不迁移或补齐历史 AI 点位 |
| 后台上报 | 保留现有三项、字段、来源、防重、失败隔离和响应判断；分享仍由后台按原约定记录 |

SDK 2.9.0、三项自动采集全部开启、具体授权持久化方案、医生身份采用 `D+id`、按包用途固定正式／测试数据源均属于此前讨论建议，尚未逐项确认为本期需求。实施前按 SAN-Q-021～026 收口，不能把建议写成已确认约束。

## 2 核对基线与源码证据

本次方案复核仓库为 `/Users/hpt-sans/Desktop/allplatform/hos_doctor`，分支 `feature/sanshi/order-0518-Q42`，当前HEAD为 `3709acbf6dbf306466fe6f6f2b791df5e78cc604`，工作区干净，未拉取远端。此前随访业务核对基线为 `f4c358cb8f3063a1bcca3b9d1e8c3d5c32264355`，下方业务位置仍以实际文件核对。

本地已存在提交 `3709acbf6`（2026-10-29 15:25:02北京时间），包含`hpt_analytics`脚手架、工程注册及原AppScope版本配置，非本轮文档工作执行。[模块配置](/Users/hpt-sans/Desktop/allplatform/hos_doctor/hpt_analytics/src/main/module.json5:4)确为shared，oh-package依赖为空，Index仅导出脚手架add函数；未检出GIO依赖或工具实现。保留现有工程，本轮不提交或修改它；脚手架已存在不代表SDK接入、编译或运行验证完成。

| 核对内容 | 实际位置与结论 |
| --- | --- |
| 分层规则 | [AGENTS.md:56](/Users/hpt-sans/Desktop/allplatform/hos_doctor/AGENTS.md:56)：`yzs_*` 可依赖 biz/hpt，`biz_*` 依赖 hpt；hpt 不依赖上层自研模块 |
| HAR／HSP | [hpt_basic_lib/module.json5:4](/Users/hpt-sans/Desktop/allplatform/hos_doctor/hpt_basic_lib/src/main/module.json5:4) 为 HAR；[biz_common_reuse/module.json5:4](/Users/hpt-sans/Desktop/allplatform/hos_doctor/biz_common_reuse/src/main/module.json5:4) 为 shared/HSP。以实际配置为准，不套用“除 entry 均 HSP”的概括 |
| 友盟现状 | [entry/oh-package.json5:43](/Users/hpt-sans/Desktop/allplatform/hos_doctor/entry/oh-package.json5:43) 直接依赖友盟；[Index.ets:136](/Users/hpt-sans/Desktop/allplatform/hos_doctor/entry/src/main/ets/pages/Index.ets:136) 初始化并同步登录。本次不迁移友盟 |
| 后台协议 | [FollowUpTrackingApi.ets:4](/Users/hpt-sans/Desktop/allplatform/hos_doctor/yzs_order/src/main/ets/follow_up_tracking/FollowUpTrackingApi.ets:4)：`igc_crm.recipel.client / SET_FOLLOW_UP_TAG`，不是 GIO |
| 后台字段 | [FollowUpTrackingTypes.ets:70](/Users/hpt-sans/Desktop/allplatform/hos_doctor/yzs_order/src/main/ets/follow_up_tracking/FollowUpTrackingTypes.ets:70)：`orderid/event`，两种查看额外有 `event_tag` |
| 展示防重 | [FollowUpTrackingSession.ets:85](/Users/hpt-sans/Desktop/allplatform/hos_doctor/yzs_order/src/main/ets/follow_up_tracking/FollowUpTrackingSession.ets:85)：校验加载令牌与订单，页面可见且内容就绪后按打开周期尝试 |
| 复制节点 | [CompleteFeedbackDialog.ets:593](/Users/hpt-sans/Desktop/allplatform/hos_doctor/yzs_order/src/main/ets/complete_feedback/CompleteFeedbackDialog.ets:593)：剪贴板 `setData` 成功后记录；失败不记录 |
| 分享节点 | [FollowUpPlanDialog.ets:676](/Users/hpt-sans/Desktop/allplatform/hos_doctor/yzs_order/src/main/ets/pages/FollowUpPlanDialog.ets:676)：先同步版本，成功后关闭弹窗并调用小程序分享 |
| 分享结果缺口 | [Share.ets:617](/Users/hpt-sans/Desktop/allplatform/hos_doctor/biz_share/src/main/ets/utils/Share.ets:617)：公开小程序分享方法不返回结果，异常被捕获并提示 |

目前未接入 GIO，不能把已有 GAPI、友盟或测试通过记录描述成 GIO 已初始化、事件已收到或验收通过。

## 3 模块职责与调用边界

### 3.1 `hpt_analytics`：通用 SDK 能力

共享 HSP 统一持有 SDK 依赖与运行状态，业务调用方只 import 该模块导出的工具和类型，不分别依赖 GrowingIO。SDK 版本升级与厂商 API 适配集中在这里。

建议首版工具只覆盖本次需要的配置、启动、窗口监听衔接、采集开关、登录身份设置／清除、自定义事件及必要用户属性；公开接口不直接要求业务方构造厂商配置对象。

模块不导入 `biz_user`、`biz_ai`、`yzs_order`，不认识医生、支付订单、随访流水、反馈分类和页面来源。配置值、身份与授权结果由应用层传入；SDK 内部网络和缓存不混入业务 GAPI。

不要在 HAR 基础库再维护一份初始化单例，也不把业务事件名称、订单字段或后台接口放进 hpt。无需为首版建立供应商注册、渠道插件、自动分发等通用框架。

### 3.2 `entry`：应用接线

建议新增集中接线类调用 `GioTracker`，由现有 AbilityStage／EntryAbility／登录状态入口触发，避免把厂商调用分散到多个页面。

接线层传入 SDK 配置和 Context，处理授权允许／拒绝、冷启动用户恢复、登录、登出、账号切换以及正式／测试配置选择。业务事件参数仍由所在业务模块构造。

SDK 初始化实现放 hpt，初始化时机由 entry 决定；这两个职责不矛盾。`entry` 不复制 SDK 状态机，也不代替随访模块判断何时算业务成功。

### 3.3 `yzs_order/follow_up_tracking`：随访业务

保留现有 Service、Session、API 及字段类型的职责边界，在该目录增加随访 GIO 业务映射。计划、反馈、复制、分享使用清单规定的业务方法，不让页面拼接任意 GIO 字典。

同一次业务行为先形成订单和属性快照，再分别交给 GIO 与后台通道；两路不互等成功、不互相决定是否发送。分享是否增加本地触发仍以 SAN-Q-025 为准。

现有跨业务入口通过既有路由进入最终随访页面，不能据此声称其他模块已直接调用随访上报；本次不为埋点重构消息、咨询、待办或开方路由。

AI 已有 [AIBehaviorTrackingService.ets:5](/Users/hpt-sans/Desktop/allplatform/hos_doctor/biz_ai/src/main/ets/tracking/AIBehaviorTrackingService.ets:5) 与独立 GAPI。保持其领域归属，不为统一名称把 AI 与随访搬进新业务总模块。

## 4 SDK 生命周期与运行基础建议

本节是实施建议，关联 SAN-AC-037、044 和 SAN-Q-026；自动采集、版本、身份及环境选项确认前，不直接作为完成标准。

### 4.1 配置、启动与窗口监听

建议核验并锁定 GrowingIO HarmonyOS SDK 2.9.0 的实际包接口；按新版 `configure` 与启动采集分离的能力设计，不混用不同版本示例。通用工具对配置和启动做进程级防重，页面刷新不重新初始化。

若确认开启无埋点，窗口监听放在 [EntryAbility.ets:197](/Users/hpt-sans/Desktop/allplatform/hos_doctor/entry/src/main/ets/entryability/EntryAbility.ets:197) 的 `loadContent` 成功回调，通过工具调用厂商窗口方法；加载失败不安装。按窗口对象防重复，窗口重建不能被一个永久布尔标志挡住。

此前建议开启“无埋点监听、无埋点采集、页面浏览自动采集”三项。它们是不同配置，不以 `track` 自定义事件调用代替，也不以日志开关判断是否采集。是否全开需明确记录，不能仅依赖 SDK 默认值。

未核实的 SDK 销毁、重配或重复初始化语义不作保证；方案不依赖进程内换数据源重启 SDK。首次页面、弹窗导航、自定义组件和窗口重建的覆盖范围须通过实际新包验证。

### 4.2 授权与身份

当前登录页有协议勾选及华为登录协议确认，但定向核对未发现可直接复用的全局 GIO 授权持久态。`UserInfo.is_agree` 模型声明、已登录或极光追踪权限申请不能直接证明已同意新增 GIO。

建议复用现有协议展示入口与确认动作，补齐应用层可读取的授权状态，并明确已有安装用户的协议更新方式。未确认前不启动采集；拒绝、撤回及重新允许的行为按 SAN-Q-026 收口，不擅自新增阻断诊疗或强制退出规则。

建议在冷启动恢复和每次真实登录后同步当前身份，登出清除、切账号先清旧身份；相同身份的资料刷新不反复设置。医生 `D+id` 只是此前建议，不能与额外事件属性 `did` 混为同一约定。

[Mine.ets:101](/Users/hpt-sans/Desktop/allplatform/hos_doctor/entry/src/main/ets/pages/Mine.ets:101) 已说明账号切换时 doctor 详情可能暂为旧账号。身份来源、医生／助手口径及是否增加 `did` 分别按 SAN-Q-021、026 确认，不读取旧详情补新账号信息。

### 4.3 环境、依赖与配置

建议按包用途固定 GIO 数据源：市场正式包使用正式源，测试、预发和可切换开发包使用测试源；开发包切到正式业务接口仍写测试 GIO，不热切 SDK。具体产品白名单及构建模式判断待确认。

不能仅用 `appEnv` 或 `DEVKIT_ENABLED` 判断数据源。[ProjectConfig.ets:10](/Users/hpt-sans/Desktop/allplatform/hos_doctor/entry/src/main/ets/common/init_config/ProjectConfig.ets:10) 可取产品名；`AgcDebug_Official` 为正式接口开发包但 DevKit 关闭，`AgcDebug_Test` 才开启工具箱。

[DevKitWiring.ets:75](/Users/hpt-sans/Desktop/allplatform/hos_doctor/entry/src/main/ets/devkit/DevKitWiring.ets:75) 支持运行中切接口并清账号。采用上述建议时，切接口只影响业务环境和身份同步，不把 SDK 缓存切到另一数据源；缺测试配置时不回退正式源。

账号／平台类型、数据源、收集地址、URL Scheme、事件及属性登记、权限和混淆要求须以实际 SDK 包与平台资料核对。SDK ID、签名和其他敏感配置不写进需求正文或测试日志。

## 5 业务快照与属性数据来源

### 5.1 支付订单号

GIO 上传键为 `recipel_pay_orderid`，取模型或入口中已确认的支付单号（如 `pay_orderid`）；后台上传键为 `orderid`。两通道关联同一药方支付订单，不能写成两个业务ID，也不能将模型字段名直接当作GIO上传键。禁止使用患者ID、随访流水或临时占位订单代替。

[DoctorOrderListCard.ets:719](/Users/hpt-sans/Desktop/allplatform/hos_doctor/yzs_order/src/main/ets/components/DoctorOrderListCard.ets:719) 打开计划直接取 `pay_orderid`；完整反馈同样处理。详情入口通过 [MakePrescribeDetail.ets:1514](/Users/hpt-sans/Desktop/allplatform/hos_doctor/yzs_order/src/main/ets/view_models/MakePrescribeDetail.ets:1514) 优先取 `recipel.pay_orderid`，再兼容原路由订单号。

现有计划与反馈内容模型均映射 `invest/show_reply_detail` 返回的 `orderid`。应核对它与入口支付订单一致，保留 Session 的订单冲突保护，不因为新属性名变化而删除既有校验。

### 5.2 诊后状态与反馈分类

列表和订单详情已声明 `reply_status`、`reply_status_text`、`reply_type`，见 [PrescriptionInfoModel.ets:156](/Users/hpt-sans/Desktop/allplatform/hos_doctor/yzs_order/src/main/ets/models/PrescriptionInfoModel.ets:156)。计划／完整反馈模型当前没有保留这些字段，不能把后台能回填状态误写成 GIO 已有可靠状态。

| 字段／含义 | 已核对的客户端规则 | 方案边界 |
| --- | --- | --- |
| `reply_status` | [OrderStatusInfo.ets:9](/Users/hpt-sans/Desktop/allplatform/hos_doctor/yzs_order/src/main/ets/models/OrderStatusInfo.ets:9)：1运输中、2已签收、3服药中、4待反馈、5已反馈、6已完结；0在模型中覆盖非标准状态，枚举另作“全部”筛选值 | 不能自行给 GIO 的0编造业务文案；完整统计枚举待 SAN-Q-023 |
| 状态展示文案 | [DoctorOrderListModel.ets:301](/Users/hpt-sans/Desktop/allplatform/hos_doctor/yzs_order/src/main/ets/models/DoctorOrderListModel.ets:301)：状态大于0且后台文案非空时优先用后台文案，再用已有兼容映射 | 页面显示规则不自动成为全部 GIO 统计枚举 |
| `reply_type` | [OrderStatusInfo.ets:19](/Users/hpt-sans/Desktop/allplatform/hos_doctor/yzs_order/src/main/ets/models/OrderStatusInfo.ets:19)：1正常、2整体好转、3需关注、4客服回访中、5客服回访完结、6无明显变化 | 不能只抄旧端2～5映射，忽略当前鸿蒙已有6 |
| 反馈标签 | [MakePrescribeDetail.ets:332](/Users/hpt-sans/Desktop/allplatform/hos_doctor/yzs_order/src/main/ets/view_models/MakePrescribeDetail.ets:332) 对2～6给标签，其他返回空 | UI空标签不等于 GIO 应上传空分类，未知／缺失处理待确认 |

建议先核实 `show_reply_detail` 真实响应是否提供所需元数据；已提供则补入领域模型。入口已有可靠字段时可传业务上下文，但消息直接打开反馈可能只有订单号和流水号，不能仅加列表／详情路由参数就宣布覆盖全部入口。

若现有响应确实缺字段，再评估复用订单详情查询补齐或明确后台补充契约；不先编写虚构返回字段、不为埋点改变导航。补齐必须绑定相同支付订单和加载令牌，失败不阻断内容展示，通道缺失策略按 SAN-Q-022、023 明确。

### 5.3 表单版本与时间

计划模型已解析 `invest_detail_new.version_list/selected_version`，见 [FollowUpPlan.ets:79](/Users/hpt-sans/Desktop/allplatform/hos_doctor/yzs_order/src/main/ets/models/FollowUpPlan.ets:79)。分享同步使用有版本列表时的当前选择，无版本列表传空版本，见 [FollowUpPlanViewModel.ets:77](/Users/hpt-sans/Desktop/allplatform/hos_doctor/yzs_order/src/main/ets/view_models/FollowUpPlan.ets:77)；默认版／简易版／详细版按清单约定映射，不凭空把旧版都记为简易版。

完整反馈的 `versionName` 来自实际选中并可展示的问题集合，当前版本无可用题目会回退另一版本，见 [CompleteFeedbackContent.ets:92](/Users/hpt-sans/Desktop/allplatform/hos_doctor/yzs_order/src/main/ets/complete_feedback/CompleteFeedbackContent.ets:92)。此处仅说明现有版本回退事实，不为反馈查看或复制新增版本属性；GIO表单版本只按分享事件的 `event_tag` 清单处理。

分享如纳入本期，应在版本同步前保存该次选择快照，保证上报对应同步成功并用于本次分享的版本，不能在异步返回后读取可能已切换的页签。

`timeSpan` 的格式、单位与时区仍待 SAN-Q-024。此前 iOS 对照值不作为鸿蒙已确认约定；业务发生时刻与后台写入时刻分别表达，GIO 不以后台 `create_at` 冒充客户端发生时间。

## 6 四类事件的接入节点

| 行为 | 当前可靠业务节点 | GIO 接入说明 |
| --- | --- | --- |
| 计划查看 | [FollowUpPlanDialog.ets:220](/Users/hpt-sans/Desktop/allplatform/hos_doctor/yzs_order/src/main/ets/pages/FollowUpPlanDialog.ets:220)：成功内容实际出现，并经 Session 校验可见、订单及加载令牌 | 在同一真实展示节点构造 GIO 快照；入口点击、加载失败和仅有 HTTP 成功不计 |
| 反馈查看 | [CompleteFeedbackDialog.ets:198](/Users/hpt-sans/Desktop/allplatform/hos_doctor/yzs_order/src/main/ets/complete_feedback/CompleteFeedbackDialog.ets:198)：小结、答案、舌象或助手建议实际展示 | 复用最终反馈与来源透传，不在消息、咨询、中间详情各发一次 |
| 内容复制 | [CompleteFeedbackDialog.ets:593](/Users/hpt-sans/Desktop/allplatform/hos_doctor/yzs_order/src/main/ets/complete_feedback/CompleteFeedbackDialog.ets:593)：系统剪贴板写入成功 | 三处复制沿用现有 UI 和成功节点；失败不发，同次回调不重复，每次主动成功复制可分别记录 |
| 微信分享 | 版本同步后尝试调用分享；现有公开方法没有可供业务判断的返回结果 | 清单保留；是否本期实施和确切实际调起信号待 SAN-Q-025，不能暂用同步成功或方法返回充数 |

不新增空内容过滤。问卷答案入口当前已有“暂无可复制内容”判断，其他复制继续按实际写入是否成功处理；如需改变空复制统计口径，须另行确认，不能照搬 iOS 非空限制。

查看频次保留一次逻辑打开周期一次，同周期刷新、遮挡返回不重复，关闭后重开可计；不永久按订单去重。GIO 使用独立通道尝试状态，不能因后台已尝试、失败或未成功而决定是否统计 GIO。

### 6.1 分享结果的具体缺口

`syncSelectedVersion()` 成功只证明版本同步接口成功，不证明微信调起；后台在该阶段记录的分享发起也不能证明客户端跳转。

直接小程序链路为 `ShareUtil.shareMiniProgram → sendMiniProgramRequest → WeChatShare.share → sendMessage → WeChatShareService.sendReq`。前两层丢弃结果；底层 [ShareWechat.ets:198](/Users/hpt-sans/Desktop/allplatform/hos_doctor/biz_share/src/main/ets/utils/ShareWechat.ets:198) 能取得 SDK 是否接受请求的布尔值。

最小改造候选是在原生分享路径增加可选结果／调起回调，保持既有调用方和提示，再由随访业务消费单次结果。SDK接受与真实调起是否等价须核对厂商契约并实机验证，不能仅把布尔值改名为“已跳转”。

项目另有 [BridgeWechatShareTracker.ets:14](/Users/hpt-sans/Desktop/allplatform/hos_doctor/biz_share/src/main/ets/utils/BridgeWechatShareTracker.ets:14)，在 V2 Web 分享中关联真正开始发送、SDK接受与应用退后台。可评估复用该关联思路，但“两条件”及其超时值不是本需求已确认策略，也不是患者收到／发送成功的证明。

若最终采用异步调起回调，应按独立分享尝试关联，防止旧结果匹配新分享；准备图片期间切后台不能当成调起，SDK拒绝或异常不能误记。现有流程先关闭弹窗再分享，不能仅因页面已关闭就丢弃真实调起结果；保留所需快照，不依赖弹窗对象完成上报，也不把患者发送或收到作为本事件门槛。

## 7 两通道的兼容、校验与失败隔离

共用的是业务发生节点、相同支付订单及该次行为快照；GIO 和后台分别构造参数、校验必填项、记录尝试和处理结果，不共用一个可变上传字典。

当前Session在调用Service前已有后台订单号／来源校验，不能只在Service末尾追加GIO。须分离真实行为成立与各通道字段资格，保留共同可见性、加载令牌和订单冲突保护；GIO缺字段只影响GIO，后台无效来源也不前置拦截有效GIO事件。各通道分别登记处理状态，不借页面重绘补报旧行为。

后台继续只传原协议字段，缺少某个 GIO 属性不应阻止已有合法后台请求；GIO 不可用或失败不改变查看、复制、分享和关闭结果。相反，后台失败也不抑制符合条件的 GIO 调用。

[FollowUpTrackingService.ets:37](/Users/hpt-sans/Desktop/allplatform/hos_doctor/yzs_order/src/main/ets/follow_up_tracking/FollowUpTrackingService.ets:37) 的返回语义保留：后台业务码 `00000` 才是该通道成功，空 `data` 不自动判失败，异常转为本地结果；不能改成“两路都成功”或只看 HTTP 成功。

GIO 的工具调用成功只能说明提交给 SDK，不能作为平台已入库的确认。未授权、未启动、属性不足及 SDK 错误的处理应可诊断，但不能抛到页面、显示业务失败或输出患者内容及完整订单信息。

既有后台业务层不主动重试、不建离线补报队列，网络默认行为保留。GIO SDK 自有缓存与发送重试是另一层能力，需按实际版本说明核对；不能承诺零重发、两通道数量严格相等或服务端恰好一次。

## 8 实施顺序与验证边界

以下仅为取得单独代码实施确认后的执行计划。当前先完成文档审阅；用户确认后只提交根文档仓库，再请求代码实施确认。不得把文档确认、文档提交或分享业务确认替代代码授权。

| 阶段 | 当前状态 | 进入下一阶段的条件 |
| --- | --- | --- |
| 文档整理与审阅 | 需求、方案及关联计划已更新，用户已确认本版内容 | 用户确认按本版内容本地提交；未定项可明确保留，不要求全部关闭 |
| 根文档仓库本地提交 | 用户已授权；仅涉及本轮12份Markdown，执行结果以Git历史为准，不含原Excel或三个代码仓库 | 用户确认提交后执行本地commit，不配置远端、不推送 |
| 代码实施 | 未授权、未执行 | 文档提交完成后，再单独请求并取得实施确认；按对应任务依赖开展，不默认授权代码commit或push |

业务依赖按任务分开，不能把所有待确认项串成每一步的共同阻塞条件：

| 工作 | 必要条件 | 不作为共同前置的事项 |
| --- | --- | --- |
| 018 SDK公共能力与entry接线 | 代码实施授权；Q026中与本阶段相关的SDK版本／产品线、采集与授权／身份方案确认。真实配置值齐备后再做运行联调 | 是否增加事件属性did（Q021）、随访属性完整规则（Q022至024）、分享本期范围（Q025）不阻塞与其无关的通用能力实现 |
| 019 计划／反馈／复制GIO | 基础能力就绪；各事件对应类型／必填缺失、状态／关注及时间规则确认后逐项接入；若最终增加did，再补该字段契约 | Q025仅影响分享，不阻塞其余三项；Q021决定不增加did时仍可完成SDK登录身份功能 |
| 020 分享条件任务 | 独立代码实施授权已取得；Q025确认纳入本期及实际调起判定，并具备该事件属性契约 | 不以iOS缺失或后台任务取消代替本次业务决定；未确认时只保留清单 |
| 021 检查与联调 | 对已实施范围完成相应检查；真实GIO和后台环境具备后分别核对 | 未实施的分享保持条件项，不把它记为已通过，也不据此否定已完成独立范围 |

取得授权后的建议顺序：

1. 确认本阶段适用的SDK接入选项及任务依赖；业务属性和分享按上表分别收口，不等待全部Q项关闭才开展独立工作。
2. 核对已出现的共享HSP脚手架、模块注册及用户原有改动，再补通用工具、唯一SDK依赖及必要构建配置；不重建或覆盖现有模块。
3. 在 entry 衔接配置、授权、身份和窗口生命周期，先验证正式／测试隔离与 SDK 基础事件。
4. 在 `yzs_order/follow_up_tracking` 补领域快照和 GIO 映射，按确认结果补齐模型数据；保留现有 GAPI 与路由。
5. 仅在 SAN-Q-025 确认本期实施后，补分享结果的最小能力并接入业务事件。
6. 执行与变更相关的静态检查、模块／主包构建和必要逻辑检查，再用真实设备及 GIO 平台核对实际数据。

| 验证内容 | 对应验收 | 应验证的行为 |
| --- | --- | --- |
| 模块与依赖 | SAN-AC-037 | 共享 HSP、单一 SDK 依赖、工具可用，业务模块没有重复初始化或上层反向依赖 |
| 计划查看 | SAN-AC-038 | 列表／详情来源，成功显示才计；失败、刷新、重开及迟到加载回调符合频次 |
| 反馈查看 | SAN-AC-039 | 七类实际入口保留透传，最终原生反馈才计；不把中间详情和 H5 当作完整反馈 |
| 复制 | SAN-AC-040 | 小结、舌象、问卷写入成功计；失败不计、重复回调不多计，不额外改变空内容 UI |
| 分享条件验收 | SAN-AC-041 | 仅按 SAN-Q-025 收口后的范围和信号执行；同步成功但未调起不得误记，版本与本次尝试一致 |
| 双通道 | SAN-AC-042 | 任一路失败或不可用不阻断另一路及业务；后台码判断、字段和无业务主动重试保持 |
| 元数据 | SAN-AC-043 | 支付订单、状态、分类、实际表单版本及时间符合确认契约，消息等缺上下文入口不猜值 |
| SDK 基础条件 | SAN-AC-044 | 按确认配置验证授权、身份、环境、窗口监听及自动采集，不以 SDK 日志代替事件验收 |

源码核对、构建成功、SDK 本地日志、GIO 平台收到事件和后台真实写库是不同证据。需要分别记录；既有主机检查与构建记录不能转用为本次 GIO 验证结果。

## 9 待确认项与来源

| 编号 | 实施前最少需要明确的内容 |
| --- | --- |
| SAN-Q-021 | 是否在十五项属性之外增加 `did`；其含义、医生／助手归属、类型及与登录身份的关系 |
| SAN-Q-022 | 十五项属性的精确类型、必填性和缺失处理；不借此新增空复制限制 |
| SAN-Q-023 | 状态和反馈关注分类的完整枚举、未知值处理，以及所有入口可用的可靠数据来源 |
| SAN-Q-024 | `timeSpan` 格式、精度／单位及时区口径 |
| SAN-Q-025 | 微信分享是否本期实施，以及怎样确认本次分享已实际调起；异步结果与失败边界 |
| SAN-Q-026 | SDK 平台与数据源、版本和自动采集选项、身份、授权及正式／测试运行基础条件 |

产品与属性依据：[产品需求](01-产品需求.md)、[APP埋点清单](06-APP埋点清单.md)；后台既有分工：[后台协议对照与确认](10-随访埋点后台协议对照与确认.md)。

SDK 来源：[用户提供的鸿蒙集成文档](https://help-center.growingio.com/@sdk-v4/docs/framework/harmonyos/index.html)、[GrowingIO 官方鸿蒙仓库](https://github.com/growingio/growingio-sdk-harmonyos)、[官方集成说明](https://growingio.github.io/growingio-sdk-docs/docs/framework/harmonyos/Introduce)、[无埋点配置](https://growingio.github.io/growingio-sdk-docs/docs/framework/harmonyos/Autotrack)、[数据采集 API](https://growingio.github.io/growingio-sdk-docs/docs/framework/harmonyos/api)。实施时以确认版本实际接口和平台条件为准。

本版状态：本轮需求及方案文档已整理并获用户确认，仅本地提交；代码执行须提交后另行确认。SDK、通用工具和四项 GIO 点位未开发，分享本期实施仍待确认。原后台三项已完成的历史开发结论保持，不能与新增 GIO 合并声明为全部完成。
