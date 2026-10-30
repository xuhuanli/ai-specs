# V5.3.8 sanshi APP 随访埋点清单

v2.2，2026-10-30，北京时间；关联产品需求v1.17的SAN-REQ-004、005、008、009。本清单分别维护自有后台GAPI与GrowingIO（GIO）两个通道：后台三项已开发，原交付及未验证范围保持；新增GIO原表四项、15项事件属性，SDK及四项点位接线已开发，尚未完成运行和平台收数验收。分享GIO已确认本期必须实施，实际调起已确认沿用既有成功唤起规则。

第1至7节描述自有后台协议，第8节保留历史记录，第9至11节为本轮GIO清单与核对结论。此前“APP取消分享直报”“时间／状态由后台生成”“不传accountType”等决定只约束SET_FOLLOW_UP_TAG，不能据此删除GIO同名事件或属性。查看周期、成功节点及复制防重属于已确认的业务口径，按两个通道各自条件应用。

后台完整解读与11类事件分工见[10号对照](10-随访埋点后台协议对照与确认.md)，GIO工程落点与数据缺口见[13号方案](13-鸿蒙GIO接入与随访埋点方案.md)。[本目录历史Excel](06-APP埋点清单.xlsx)保留10月22日整理基线，未修改；本轮重新核对的原始来源为[ai助手埋点上报清单.xlsx](/Users/hpt-sans/Desktop/ai助手埋点上报清单.xlsx)“2026.10-埋点”页。原表标题仍写V5.3.6，本次只引用其中随访要求，不改变本需求的V5.3.8归属。原15项用于GIO业务清单，不作为自有后台新接口的直接上传字段表。

2026-10-30当前交付：鸿蒙GIO完整接线已本地提交`67d5cb5d5`（feat: 完成鸿蒙GIO随访埋点接入），包含应用编排、四项业务事件、原生分享回调、集中事件枚举、最新关注分类规则及注释／冗余调用整理；未推送。文档在根仓库独立记录；只做逻辑与静态审查，不编译、不运行测试，设备及平台收数由用户后续验证。

## 1 自有后台：原业务目标与分工对照

| 事件 | 原APP目标 | 后台当前说明 | 本轮状态 |
| --- | --- | --- | --- |
| followup_plan_view | 随访计划成功展示后上报 | 医生前端调用 | 目标一致，字段按新接口整理 |
| followup_wechat_share_initiate | 微信调用成功且跳转后APP上报 | 后台在switch_invest_version记录分享发起 | 已确认采用后台分享发起，APP不再上报 |
| followup_feedback_view | 最终完整反馈成功展示，覆盖七类入口 | 医生前端调用，但只列六种来源值 | 消息中心与系统推送同传Push，七类入口归为后台六种来源值 |
| followup_summary_copy | 小结、舌象、问卷答案复制成功后上报 | 医生前端调用，后台写复制成功标识 | 保留三个区域和成功触发，字段简化 |

后台所谓“四个前端事件”包含患者端followup_form_open。按后台文档分工，医生APP直报三项；APP分享直报已由用户确认取消。患者端不纳入本人的鸿蒙任务。

## 2 自有后台：接口及实际请求字段

包名`igc_crm.recipel.client`，接口`SET_FOLLOW_UP_TAG`。已沿用鸿蒙GAPI网络封装，不使用旧AI诊疗的SET_AI_SUMMNARY_TAG，不自行增加REST地址。

| 事件 | 必传结构（按后台示例） | event_tag |
| --- | --- | --- |
| followup_plan_view | orderid、event、event_tag | 开方记录／开方详情 |
| followup_feedback_view | orderid、event、event_tag | 待办／咨询 IM 卡片／Push／开方页／开方记录列表页／开方详情；消息中心与系统推送均取Push |
| followup_summary_copy | orderid、event | 不要求 |

orderid使用药方支付单号，对应旧recipel_pay_orderid，不使用随访流水或患者ID。did不入参，由后台按订单反查；原网络公共鉴权保持。reply_status允许省略并由后台按订单回填，推荐省略；signed_time不在这三类请求示例中要求，不自行加默认值。

无出参；00000为成功，10001为event非法，10002为药方不存在或插入失败。判断业务状态码，不要求data非空，不只看HTTP状态；10002的两种原因不混为一谈。

## 3 原15项GIO属性与自有后台字段的对照

此表说明原15项在自有后台通道如何处理，不取代第9节GIO上传要求。“后台处理”不等于已验证后台实现；SAN-Q-019关闭的是后台派生字段口径，GIO仍需自己的发生时间、状态文案及关注状态。

| 原事件 | 原参数 | 原含义 | 新接口处理／差异 |
| --- | --- | --- | --- |
| plan_view | timeSpan | APP计划查看时间 | 不传；后台create_at默认值，变为服务端写入时刻 |
| plan_view | event_tag | 打开计划的页面来源 | 同名上传，值为开方记录／开方详情 |
| plan_view | count_type | 当前诊后状态 | 不传旧字段；后台reply_status按订单回填，可选显式上传但本轮推荐省略 |
| plan_view | recipel_pay_orderid | 关联订单号 | 改为orderid |
| wechat_share_initiate | event_tag | 默认版／简易版／详细版 | 后台在版本同步时记录；APP已取消直报，不再为此采集微信成功结果 |
| wechat_share_initiate | timeSpan | APP分享成功时间 | 后台记录使用create_at，不能代表微信已成功跳转 |
| wechat_share_initiate | recipel_pay_orderid | 分享关联订单 | 后台按现有分享业务接口关联；后台按文档记录，APP不直报 |
| feedback_view | event_tag | 查看反馈的七类来源 | 同名上传；七类入口按六种来源值映射，消息中心和系统推送均为Push |
| feedback_view | count_type | 当前诊后状态 | 改由后台reply_status回填，不提交旧count_type |
| feedback_view | timeSpan | APP反馈查看时间 | 不传；后台create_at默认值 |
| feedback_view | accountType | 当时反馈的关注状态 | 新文档feedback_view的account_type为空，无等价上传映射；不能当成纯改名或声称已被完整保留 |
| feedback_view | recipel_pay_orderid | 关联订单号 | 改为orderid |
| summary_copy | count_type | 当前诊后状态 | 改由后台reply_status回填，不提交旧count_type |
| summary_copy | accountType | 复制成功标识1 | 后台写account_type=1，APP不传 |
| summary_copy | recipel_pay_orderid | 关联订单号 | 改为orderid |

后台事件表里的count_type、universal、account_type在其他event下有不同含义，不统一套用到医生端三个请求。诊后状态数字为0未开始、1运输中、2已签收、3服药中、4待反馈、5已反馈、6已完结；0是合法值，不能因值为0自行认定缺失。

## 4 反馈查看来源映射

| 原业务来源 | 上传event_tag | 处理 |
| --- | --- | --- |
| 系统通知 | Push | 保留系统通知沿链路的来源，不在入口先上报 |
| 消息中心 | Push | 经产品与后台确认（用户转述），与系统推送统一归属Push |
| 待办 | 待办 | 从首页及待办列表经详情到完整反馈仍保持 |
| 咨询 | 咨询 IM 卡片 | 顶部固定反馈提示，以及120已填写、271、273经详情成功展示完整反馈时统一使用；120未填写的H5入口不冒充该事件，104不纳入 |
| 开方页（含独立AI读文识图） | 开方页 | 用户确认独立AI入口也统计；两者均传prescription，最终反馈成功展示时上报 |
| 开方记录 | 开方记录列表页 | 注意与计划查看的“开方记录”字符串不同 |
| 开方详情 | 开方详情 | 引导来源优先；独立手动打开再取此值 |

来源仅限本次进入链路；新独立打开不继承旧通知来源。患者form_open的六种渠道属于患者反馈单，与本表维度不同。

## 5 触发与频次保留项

计划查看与反馈查看仍在最终内容成功展示后计数，一次打开周期一次；仅点击入口、加载中或失败不计，同次刷新／重建不重复，关闭重开成功后重新计。

小结、舌象分析、问卷答案三个复制区域共用summary_copy事件。剪贴板成功写入后每次主动复制计一次；同一次重复回调不多计，失败或未复制不发。后台写1不代表前端可把失败当成功上传。

后台除配置事件外每次新增记录；前端不能永久按订单去重。用户已确认与旧AI埋点一致：业务层不主动重试、不建离线队列，网络层沿用默认重试／重定向行为，不单独定制。后台未提供幂等字段，不承诺SDK层零重发或后台严格恰好一次。上报失败不阻断查看、分享、复制或关闭原流程。

分享采用用户确认的后台发起口径，APP不再以成功跳转微信为条件上报；新后台记录发生在版本同步阶段，不作为微信发送或送达的证明。

## 6 后台及患者端范围

原已明确由后台处理的四项仍保持分工：followup_order_config、followup_order_create、followup_remind_time_change、followup_form_msg_send。本次文档另将分享发起、患者首次填写、有效反馈形成列为后台触发，患者form_open由患者前端触发；这些不自动变为医生APP开发任务。

订单配置的CRM新接口调用方、消息发送成功的边界及部署状态还需后台说明。文档描述不能代替后台实现／运行验证。医生端新增UI已由8fd3ad334完成，本轮不改顶部平铺和三处复制功能；三项上报已接入，工具8090805d7、原接入366a91b51、咨询修正42c9e530b均已本地提交、未推送；真实写库未联调。

## 7 已确认决定与协议待补

1. SAN-Q-017已关闭：按后台“发起”记录，医生APP取消分享直报。
2. SAN-Q-018已关闭：消息中心和系统推送同归属Push，event_tag均传Push；旧独立来源决定已替代。
3. SAN-Q-019已关闭：接受后台时间／状态／复制标识，不再上传反馈查看关注状态快照。

三项用户决定及后台协议待补内容见10号对照文档；后台消息来源已确认，工具及三项上报已完成，AI独立入口来源补充已提交8f06831ff、未推送。真机与后台写库仍由测试阶段核验。新增GIO依赖单列于第11节，不重开原后台任务；本轮没有新增测试执行归档。

## 8 历史确认记录

2026-10-27消息来源确认：用户转述产品与后台已确认：消息中心和系统推送在反馈查看埋点中同归属Push，event_tag均上传精确字符串`Push`。此前保留独立来源并等待消息枚举的决定由本次确认替代，SAN-Q-018关闭；七类业务入口归并为六类上报来源。不改变已有跳转、消息已读及内部来源标记，仅在埋点参数构造时统一映射。本轮只改文档，未改业务代码、未执行测试、未提交或推送。

2026-10-27接入范围补充：咨询随访反馈卡片先进入开方详情，详情当前reply_status=5时调用完整反馈，成功展示才按咨询 IM 卡片上传。未反馈等其他状态只停留详情，普通及特殊问诊单不改。此新增要求关联SAN-REQ-008／V538-REQ-013。AI独立读文识图页归类尚待确认，不将其默认映射开方页。

2026-10-27入口口径修正：顶部固定随访反馈提示打开详情后查看完整反馈；120仅已填写（is_full=1）进入详情查看反馈，未填写保持H5。只有最终原生完整反馈实际展示才记录咨询 IM 卡片，H5不冒充该事件；复制规则不变。271本轮保持现状，后续单独沟通。详见SAN-REQ-008及技术方案第5.20节。

2026-10-27 273入口确认：273患者用药反馈单改为先订单详情，详情成功后展示完整反馈，不限定reply_status=5；最终成功展示才上传既有“咨询 IM 卡片”来源。120未填写保持H5、已填写沿用详情判断，271及104不改；无新增事件或字段。对应SAN-AC-034、035。

2026-10-27最终确认：271与273均先详情，详情成功后调用现有“查看反馈”动作；最终反馈成功展示才上报咨询 IM 卡片，不受入口额外状态5判断限制。120保留填写状态分流，104不改。

2026-10-27实施核对完成：三项事件、规定字段、来源映射及成功触发均与当前代码一致。120进入详情并成功展示完整反馈，与271／273及顶部提示同传咨询 IM 卡片；未成功展示不发查看。咨询修正已提交42c9e530b，文档独立本地提交，不推送。

2026-10-27当前决定：AI独立读文识图入口也记录反馈查看，来源为开方页，SAN-Q-020关闭；这覆盖历史记录中该入口待确认的阶段描述。开发完成，剩余真实环境验证转测试阶段，本轮补充未提交。

## 9 鸿蒙GIO四项事件与十五项属性

本节为2026-10-29用户确认的GIO业务清单。原始Excel中M列标记GIO的医生端条目为计划4项、分享3项、反馈5项、复制3项，共4事件／15属性；不包含did。表内“属性数”按各事件分别计，不是15个互不重复的字段名。

### 9.1 事件及触发边界

| 事件标识 | 鸿蒙接入位置与触发条件 | 频次及本期状态 |
| --- | --- | --- |
| followup_plan_view | [计划展示节点](/Users/hpt-sans/Desktop/allplatform/hos_doctor/yzs_order/src/main/ets/pages/FollowUpPlanDialog.ets:227)，内容加载成功、实际展示且页面可见；仅看到或点击入口不计 | 同一打开周期一次，刷新／重建不重发，关闭后重开成功可再计；待实施 |
| followup_wechat_share_initiate | [微信分享入口](/Users/hpt-sans/Desktop/allplatform/hos_doctor/yzs_order/src/main/ets/pages/FollowUpPlanDialog.ets:676)，沿用BridgeWechatShareTracker的真实dispatch后同次SDK成功＋退后台规则 | 本期必须实施，Q025已关闭；原生小程序需接入既有成功回调，单独sendReq、点击或版本同步不计 |
| followup_feedback_view | [完整反馈展示节点](/Users/hpt-sans/Desktop/allplatform/hos_doctor/yzs_order/src/main/ets/complete_feedback/CompleteFeedbackDialog.ets:205)，任意入口最终正文／小结成功展示且页面可见；中间页不代替最终展示 | 同一打开周期一次，重开重计；沿用第4节七入口／六上传来源；待实施 |
| followup_summary_copy | [剪贴板成功节点](/Users/hpt-sans/Desktop/allplatform/hos_doctor/yzs_order/src/main/ets/complete_feedback/CompleteFeedbackDialog.ets:594)，小结、舌象结论、问卷答案三个区域共用事件 | 每次主动写入成功记一次；同操作重复回调不多计，失败不报，不增加区域属性；待实施 |

查看周期与复制防重沿用原用户确认，不声称原Excel单独规定了频次。GIO不根据入口点击替代实际展示，也不将后台返回成功作为发出GIO的前提。分享统计发起，不证明患者发送或收到。

### 9.2 原表属性及鸿蒙业务语义

下表固定事件、属性名及业务含义；复制accountType字符串"1"、timeSpan字符串格式和诊后1至6文案已确认，不增加did。其余平台类型、必填性和缺失处理仍按SAN-Q-022补齐。

| 事件 | 属性 | 含义与已确认取值 |
| --- | --- | --- |
| followup_plan_view | timeSpan | 计划查看发生时刻，字符串yyyy/MM/dd HH:mm:ss、精度到秒；统一Asia/Shanghai北京时间，Q024关闭，不是时长 |
| followup_plan_view | event_tag | 进入来源：开方记录／开方详情 |
| followup_plan_view | count_type | 当前诊后状态文案，按9.3节的reply_status 1至6映射，不传数字；同单补查后仍缺失或未知则跳过该条GIO |
| followup_plan_view | recipel_pay_orderid | 本次随访所属药方支付订单号 |
| followup_wechat_share_initiate | event_tag | 实际分享的表单版本：默认版／简易版／详细版；不使用已失效的选择或写死默认版 |
| followup_wechat_share_initiate | timeSpan | 实际分享发起时刻，字符串yyyy/MM/dd HH:mm:ss；不取单纯点击／版本同步时刻，统一Asia/Shanghai北京时间 |
| followup_wechat_share_initiate | recipel_pay_orderid | 本次分享关联的药方支付订单号 |
| followup_feedback_view | event_tag | 待办／咨询 IM 卡片／Push／开方页／开方记录列表页／开方详情；消息中心和系统推送同传Push |
| followup_feedback_view | count_type | 当前诊后状态文案，按9.3节1至6映射；不将关注分类当诊后阶段 |
| followup_feedback_view | timeSpan | 完整反馈查看发生时刻，字符串yyyy/MM/dd HH:mm:ss；统一Asia/Shanghai北京时间，Q024关闭 |
| followup_feedback_view | accountType | 反馈关注状态：reply_type的1正常／2整体好转／3需关注／4客服回访中／5客服回访完结／6无明显变化；未映射的已提供reply_type直接上传原数值字符串；仅缺失且同单补查后仍缺失才跳过反馈查看GIO，不与复制标识混用 |
| followup_feedback_view | recipel_pay_orderid | 当前实际展示反馈所属药方支付订单号 |
| followup_summary_copy | count_type | 当前诊后状态文案，按9.3节1至6映射，取本次成功复制关联上下文 |
| followup_summary_copy | accountType | 复制成功标识，固定字符串"1"，不是数字1；失败不发事件 |
| followup_summary_copy | recipel_pay_orderid | 当前复制内容所属药方支付订单号 |

`recipel_pay_orderid`与后台`orderid`当前是同一支付单业务标识的不同上传键名，不是两类订单。不能用invest_serial、患者ID、AI任务ID、当前新处方号或origin_orderid替代；路由与本次加载响应不一致时不得拼出混合订单事件。当前最终页模型只保留部分字段，状态／关注等数据补齐方案见13号文档，不假定全入口已经具备GIO属性。

本轮不新增复制内容非空门槛，不照搬iOS空内容过滤，也不改变此前已确认的空内容UI行为。以实际剪贴板写入成功判定，提示文案本身不能证明写入或上报成功。若后续要求改变空内容计数，须另行确认业务规则。

### 9.3 本轮已确认的字段规则

| reply_status | GIO count_type文案 |
| --- | --- |
| 1 | 运输中 |
| 2 | 已签收 |
| 3 | 服药中 |
| 4 | 待反馈 |
| 5 | 已反馈 |
| 6 | 已完结 |

此表只确定GIO诊后阶段文案，不修改App既有UI及后台状态处理。反馈查看accountType是另一组用户已确认的关注分类：

| reply_type | GIO反馈查看accountType |
| --- | --- |
| 1 | 正常 |
| 2 | 整体好转 |
| 3 | 需关注 |
| 4 | 客服回访中 |
| 5 | 客服回访完结 |
| 6 | 无明显变化 |

最终模型保留可选状态字段，不足时静默查询同一支付单的现有订单详情字段，详见13号方案。2026-10-30用户补充：未映射reply_type直接转原数值字符串，0也上传"0"；仅reply_type缺失才同单补查，仍缺失则跳过反馈查看。reply_status的0／空／未知仍按同单补查后无效则跳过处理，不虚填正常状态。计划查看和复制只要求诊后状态；反馈查看同时要求诊后状态及关注分类；分享不增加状态／关注门槛，后台GAPI独立处理。

复制accountType固定字符串"1"；timeSpan使用字符串yyyy/MM/dd HH:mm:ss，示例2026/10/12 10:12:12，仅用于原表含该属性的计划／分享／反馈事件，复制不额外增加timeSpan。统一按Asia/Shanghai北京时间生成，Q024关闭；不把示例日期作为固定数据。不增加事件属性did，也不通过公共或动态业务属性间接添加；SDK登录身份另归Q026。

微信分享GIO已确认本期必须做，并按用户要求沿用现有BridgeWechatShareTracker成功唤起判定：图片准备结束、真正dispatch后，同次SDK成功与应用退后台共同成立才计一次。两信号顺序不限，不等待回前台；单独sendReq、仅退后台、版本同步或void方法结束不作为计数证据。原生直达小程序已补接这套可选成功回调，不重写成功规则；真实唤起和平台收数仍待用户运行验证。

## 10 指定iOS提交的静态对照

核对对象为本地保存的`origin/feature/kqc-随访埋点-Q41`，精确提交`6be8af95806635add150b9543c8a9c692dfd4fc8`，作者与提交时间均为2026-10-29 10:10:18北京时间。只读使用该Git对象，未切分支或拉取；不是此前本地develop的实现结论，不证明已合入发布版本或后台已收到。

| GIO事件 | 指定提交事实 | 与鸿蒙要求的关系 |
| --- | --- | --- |
| followup_plan_view | [计划代码1015行](https://git.igancao.com/root/gancao-ios4doctor/-/blob/6be8af95806635add150b9543c8a9c692dfd4fc8/LiqForDoctors/Classes/FollowUpManager/View/AutoFollowup/GCAutoFollowupPlanView.swift#L1015)：成功加载、展示完成且可见后同次一次，两种来源已接入 | 触发方向一致，不能据此确定全部属性类型 |
| followup_wechat_share_initiate | [分享流程895行](https://git.igancao.com/root/gancao-ios4doctor/-/blob/6be8af95806635add150b9543c8a9c692dfd4fc8/LiqForDoctors/Classes/FollowUpManager/View/AutoFollowup/GCAutoFollowupPlanView.swift#L895)：有版本同步及微信调用，但指定提交LiqForDoctors源码（排除UniMPSDK）未命中该事件标识 | 与原表清单有差异；不据此从鸿蒙清单删除，本期已确认必须实施；调起已确认沿用既有规则，原生接线已本地提交67d5cb5d5，真实唤起仍待验证 |
| followup_feedback_view | [反馈代码752行](https://git.igancao.com/root/gancao-ios4doctor/-/blob/6be8af95806635add150b9543c8a9c692dfd4fc8/LiqForDoctors/Classes/FollowUpManager/View/AutoFollowup/GCAutoFollowupPlanFeedbackView.swift#L752)：成功展示且存在有效反馈内容，同次一次，六来源接入 | 展示条件方向一致，具体额外内容判断只作实现对照 |
| followup_summary_copy | [复制代码788行](https://git.igancao.com/root/gancao-ios4doctor/-/blob/6be8af95806635add150b9543c8a9c692dfd4fc8/LiqForDoctors/Classes/FollowUpManager/View/AutoFollowup/GCAutoFollowupPlanFeedbackView.swift#L788)：三处非空内容写入后共用事件，accountType传字符串1 | 三处共用方向一致；字符串"1"现已由用户另行确认；空内容过滤仍不自动成为鸿蒙规则 |

三项iOS事件都额外传`did`，取UserInfoModel.id（NSString），没有SDK登录身份使用的D前缀。它不在原表15项内，用户已确认鸿蒙不额外增加该事件／公共业务属性，Q021关闭；SDK登录身份另行维护，不能据此删掉SDK内置身份。

两项查看的`timeSpan`由DateFormatter按`yyyy/MM/dd HH:mm:ss`生成，显式设置locale及Gregorian calendar，未显式指定时区。原表K12／K21／K44则为Excel数值日期，显示格式`yyyy/m/d h:mm:ss`，示例2026-10-12 10:12:12；两者本身不单独规定目标；本轮用户已另行确认鸿蒙格式为yyyy/MM/dd HH:mm:ss，时区已由用户进一步确认为Asia/Shanghai北京时间。

iOS反馈`accountType`按reply_type映射2→整体好转、3→需关注、4→客服回访中、5→客服回访完结，其他值包括6为空。鸿蒙后续已由用户明确确认1至6的GIO关注状态文案，见9.3节，其中6上传“无明显变化”，不采用该iOS版本对6上传空串的实现。

## 11 双通道边界与实施依赖

| 项目 | GIO（SAN-REQ-009） | 自有后台（SAN-REQ-004） |
| --- | --- | --- |
| 字段模型 | 本文第9节原表4项／15属性；已确认不增加did | 保持orderid／event，两类查看额外event_tag |
| 分享 | 本期必须实施；沿用既有SDK成功＋dispatch后退后台判定，Q025关闭 | 仍由版本同步后台记录，APP不调用GAPI重复直报 |
| 时间、状态、关注及复制标识 | 客户端按确认清单获取发生时快照并独立组装 | 沿用后台派生口径，不增加旧属性 |
| 执行与结果 | 通用GioTracker交给SDK；调用完成不等于平台入库 | 仍按GAPI业务码判断，00000成功不要求data非空 |
| 失败与防重 | 自己的字段资格及本次行为状态；缺属性、未启动或异常不影响后台 | 原校验、结果及不主动重试规则保持，不因GIO失败而重发 |

SAN-Q-021不加did、Q024北京时间和Q025沿用既有成功唤起规则已关闭。Q026的SDK2.9.0、旧版SaaS、鸿蒙Scheme、三项自动采集、测试包同应用、entry立即启动及登录后身份同步已收口；平台登记按Q022核对，两组1至6文案已定，异常字段策略已按DEC059确认跳过整条GIO，Q023关闭。

SDK、公共工具及四项接线已开发；公共工具已提交65ac59804，其余尚未提交。当前仅完成允许的逻辑及静态检查，未到代码编译、未运行测试或设备、未验证GIO／后台收数。任务与后续人工核对计划仍见03、04、05，历史通过结果不复用为本轮通过。

2026-10-29清单v2.1：同步SAN-DEC-051，不增加did，固定复制字符串"1"、六种诊后文案和斜杠时间格式，分享GIO纳入本期；保留时区、关注分类、实际调起判定及其他元数据待定。仅文档修订，未提交、未改代码。

本轮后续补充：用户已确认北京时间，并要求分享复用既有成功唤起状态机，否决单独sendReq候选。Q024／025关闭；原生结果接线、SDK及GIO数据尚未实施或验证。

2026-10-29清单v2.2：同步本轮确认的关注分类、配置和真实开发进度；异常字段策略已按DEC059收口，平台登记及实际运行继续验证，用户自行运行。未提交本次修订。

2026-10-30关注分类补充（SAN-DEC-060）：reply_type的1至6沿用既有文案；其他已提供数值直接转为字符串（如0→"0"、7→"7"），不因未映射而跳过或额外补查。仅关注类型缺失时补查同一订单，补查后仍缺失则跳过反馈查看GIO；reply_status未知仍按原补查／跳过规则处理。本次同步代码、注释及文档，仅静态检查，未编译、未运行测试、未提交。

2026-10-30整体review与本地归档（SAN-DEC-061）：复核未发现需修复的明确逻辑遗漏或新增冗余；完整接线已提交67d5cb5d5，文档在根仓库独立记录，均不推送。本轮仅静态及逻辑审查，未编译、未运行测试，平台登记和实际收数仍待验证。此前各阶段“未提交”等记录保留当时事实，当前交付以本记录及文档首部为准。
