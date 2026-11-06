# CRM 业务接手指南

核对日期：2026-11-06。适用端：iOS、Android。

本文从两端客户端的页面入口、业务模型和相关接口整理，帮助接手人员理解“谁使用、管理什么、每天做什么、功能如何关联”。项目环境、构建、签名和分发交接继续查阅[项目描述](项目描述.md)，协作规则见 [AGENTS.md](AGENTS.md)。

本文描述代码现状，并据此归纳业务关系；归纳内容不替代正式产品规则。此次未登录账号、请求业务接口或操作设备，不能据此认定功能已上线、账号一定可见或业务流程已验收。

初次阅读建议先看第 1–4 节建立业务认识，再按第 8 节逐步熟悉页面。需要定位实现时查第 6 节；讨论需求前先核对第 7 节的基线和第 9 节的待确认规则。

## 1. 先认识这个项目

### 1.1 它主要服务谁、解决什么问题

两端应用显示名称均为“甘草医生crm”。从登录用户角色、医生归属、拜访、订单和团队数据等实现看，可以将它理解为：**供医助及相关管理人员围绕医生客户开展开发、跟进、运营、订单服务和团队管理的工作工具。**正式部门归属、岗位职责和考核制度尚待业务负责人确认。

这里的主要管理对象是医生客户。患者、处方、商城订单、感谢事项等围绕医生关联进来，帮助工作人员了解客户表现、跟进服务问题。接手时应优先弄清“当前人员负责哪些医生，这些医生处于什么状态，接下来应做什么”。

客户端体现出的业务目标可以归纳为：发现并建立医生客户资料，推进注册与审核，持续拜访和运营，观察开方及交易表现，处理服务问题，并通过数据、预警和资源池决定下一步跟进。它是一组相互关联的工作，不是所有客户必须依次经过的固定流程。

### 1.2 先抓住四条主线

| 主线 | 业务上关心的问题 | 主要功能 |
| --- | --- | --- |
| 客户开发与归属 | 去哪里找医生？是否已有资料？由谁跟进？ | 查验医生、新增／邀请医生、注册验证、医生审核、我的／代理／团队／区域医生、公私池、慧眼寻医 |
| 日常跟进与运营 | 今天做什么？上次沟通了什么？如何继续促进使用？ | 待办、日程、生日提醒、拜访记录、医生标签和潜力、运营活动、优惠券 |
| 订单与服务协同 | 医生有没有开方／交易？订单有什么问题？谁来处理？ | 订单查询、紧急／关注订单、问诊／咨询、售后投诉、药库查询、协同工单 |
| 经营观察与资源分配 | 客户是否活跃？哪些客户需要挽回？团队表现如何？ | 首页行为统计、医生／团队数据、流失预警、收入统计、奖励池、华山论剑、皇城 PK |

## 2. 谁在使用、管理哪些业务对象

### 2.1 用户角色与数据范围

登录模型包含用户身份、角色、所属区域及管理标识。Android `UserData` 的代码注释将 `crm_role` 解释为：1 普通医助、2 团队负责人、3 区域经理、4 团队负责人兼区域经理；iOS 也保存该字段及角色名称。这个映射是客户端依据，正式岗位体系仍需业务确认。[依据：S02]

| 身份或范围 | 客户端体现 | 接手时需要理解的含义 |
| --- | --- | --- |
| 普通医助 | 我的医生、代理医生、个人业务数据等入口 | 以个人负责和代理服务范围开展工作；“代理”的授权方式和有效期待确认 |
| 团队负责人 | 团队医生、团队数据、成员筛选等 | 从个人视角扩展到团队与成员视角；具体可修改范围不能只根据可见列表推定 |
| 区域经理 | 区域医生、区域数据、地区筛选等 | 按所辖区域管理和观察业务；区域与团队是不同维度 |
| 大区／省区管理标识 | `is_big_region_manager`、`is_sq_leader` 等 | 是额外的管理条件；两端“特殊医生审批”入口均检查大区管理标识，不等同于所有经理都可审批 |
| 工单参与人 | 发起人、当前跟进人、负责人 | 这是某张工单上的关系，与登录岗位角色不同；影响回复、转派、退回、完成等操作 |

页面是否可见、能看到多少数据、能否修改，是三个问题。代码中既有岗位／管理标识判断，也有医生归属和接口返回条件。一次接手演示最好准备普通医助与管理人员账号，分别核对。

### 2.2 业务对象之间的关系

| 对象 | 可以怎样理解 | 关联内容 |
| --- | --- | --- |
| CRM 用户／医助 | 使用本应用开展工作的人员 | 负责医生、所属团队／区域、拜访、日程、工单、经营数据 |
| 医生客户资料 | 客户档案及其跟进信息 | 姓名、联系方式、医院、科室、职称、标签、潜力、归属和拜访 |
| 医生账号与资质 | 平台注册身份及审核资料 | 注册验证、审核、开方行为、账户信息；不能将“有 CRM 资料”直接理解为“已注册并审核通过” |
| 医院与地区 | 客户所在机构及地理位置 | 医生检索、资料录入、拜访医院、附近医生、专家墙识别 |
| 日程／生日提醒 | 对未来工作的安排与提醒 | 日期、对象、提醒时间等，与工作台和日历关联 |
| 拜访记录 | 对一次已开展跟进的留痕 | 医生、时间、方式、医院、目的、沟通信息、图片、下次关注方向等 |
| 订单与咨询 | 医生开展业务后产生的服务或交易记录 | 医生、患者、处方／商品、支付、履约、售后、协同处理 |
| 协同工单 | 需要多人协作处理的一件事项 | 发起人、跟进人、负责人、问题、关联信息、处理记录、附件和评价 |
| 活动、优惠券、兑换卡 | 不同用途的运营资源 | 活动与预算、赠券与使用情况、奖励池医生领取；三者不应混称为同一种“奖励” |

开发时常遇到 `mid`、`did`、`cdid`、`hid`。按当前调用用途，分别关联 CRM 用户、医生、CRM 医生资料及医院。医生详情和拜访等接口同时传递 `did`、`cdid`，新增资料后也有按 `cdid` 查询详情的路径，不能互换或假定它们始终同时有效。完整主数据关系仍需服务端确认。[依据：S03、S04]

## 3. 按业务整理项目结构

下面按业务职责归纳；实际页面存在多个入口，同一个功能可能同时出现在工作台、应用和我的。

```text
CRM
├── 客户开发与准入
│   ├── 查验医生：搜索医生／医院、专家墙拍照智能识别
│   ├── 新增医生、邀请医生、注册验证
│   └── 医生审核、特殊医生审批
├── 客户资料与归属
│   ├── 我的医生、代理医生、团队医生、区域医生
│   ├── 基础资料、标签／标记、潜力、跟进归属
│   └── 私有池、公有池、死海、保护／领取、慧眼寻医
├── 日常工作与跟进
│   ├── 待办助手、今日待办
│   ├── 日程、生日提醒、甘草日历
│   ├── 拜访记录、团队拜访统计
│   └── 雾影寻踪／附近医生
├── 医生运营与账户服务
│   ├── 运营活动、基金／预算数据、提报规则与记录
│   ├── 医生活动情况、患者感谢管理
│   └── 优惠券、医生收入／账户、服务费及相关配置
├── 订单与协同服务
│   ├── 处方／照片方／商城订单、紧急订单、关注订单
│   ├── 问诊／咨询、售后投诉、药库查询
│   └── 协同工单：发起、回复、退回、转派、完成、评价
├── 数据与激励
│   ├── 首页行为统计、医生数据、团队数据
│   ├── 流失预警、奖励池／兑换卡
│   └── 华山论剑、皇城 PK
└── 工作入口与支撑
    ├── 登录、身份与权限、通知、消息设置
    ├── 运营有道小程序、Web 页面
    └── 业务资料（本次在 iOS develop 确认入口）
```

“慧眼寻医”在本次 iOS `develop` 中存在，Android 在所核对的功能分支中存在，未合入当前 `develop`，详见第 7 节。上述结构表示本次代码阅读覆盖的业务组成，不表示两端当前安装包功能完全相同。

### 3.1 五个一级入口怎么用

| 一级入口 | 主要回答的问题 | 核对到的内容 |
| --- | --- | --- |
| 首页 | 医生最近做了什么、有哪些信息需要关注？ | 医生行为统计、通知；统计可切换开方、启动、咨询、邀请、扫码等维度。工单另有快捷入口，两端承载方式不同 |
| 医生 | 我负责哪些医生、某个医生现在怎么样？ | 按我的／代理／团队／区域查看和筛选医生，进入客户详情及相关记录 |
| 工作台 | 今天要做什么、现在要办理什么？ | 待办、日程、协同事项、生日提醒，以及查验、邀请、新增、审核、注册验证、拜访、运营活动、附近医生等快捷操作 |
| 应用 | 要处理哪类业务、查看哪类数据？ | 订单、数据、客户池、拜访、奖励池、PK、运营有道等集中入口；同时有经营指标及明细下钻 |
| 我的 | 我的身份、个人工作和设置在哪里？ | 用户角色及区域、协同工单、医生活动情况、患者感谢管理、甘草日历、特殊医生审批、消息设置等 |

特别注意命名：iOS 的 `ViewController/Workbench/`、Android 的 `ui/worktable/` 主要承载首页及通知相关内容；底部“工作台”主要对应 iOS `Map/` 和 Android `ui/work/`。定位功能时应从实际导航开始，不能只按目录英文名判断。[依据：S01、S05、S06]

### 3.2 客户开发与准入

开发客户时，先通过“查验医生”了解是否已有医生记录，再根据情况新增资料、邀请注册或推进审核。两端都能从查验入口进入“专家墙拍照智能识别”：关联医院、上传照片、提交识别任务并获取结果。识别结果可以辅助查找客户，不能直接作为已经注册或审核通过的证明。[依据：S07]

“新增医生”“邀请医生”“注册验证”“医生审核”分别处理档案建立、邀请、注册辅助和资质审核。特殊医生审批另有独立入口和权限条件，不应与普通医生审核混写成一个流程。审核材料、失败原因和通过条件，应在具体需求中继续沿表单与接口核对。[依据：S04、S06、S08]

### 3.3 客户资料、分层与归属

医生列表既按责任范围划分，也有状态、职称、地区、科室、标签等筛选。iOS 当前列表还明确区分待激活、已激活、已流失、未注册等分类；Android 请求中也传递生命周期、活跃类别、回流标签等条件。**注册／审核、活跃／流失、客户归属属于不同维度**，不能画成一条简单的医生状态线。[依据：S03]

医生详情是认识项目最重要的入口之一。本人医生的相关视图包含拜访记录、收入统计、行为统计、账户信息，顶部还有客户资料、标签／标记、潜力及归属相关操作；详情完整可见性由后台 `can_show` 控制，不能仅凭“本人／经理”身份推定；无完整权限时，公有池可见拜访记录和行为跟踪，其他池仅拜访记录。查看客户现状、了解历史跟进、查看交易表现和处理账户事项，都可能从这里展开。[依据：S09]

私有池、公有池、死海反映另一组客户资源管理场景。两端页面都有“首单超时、久未开单、审核超时”等释因，并有保护、领取相关处理。可据此理解为客户资源的维护和再分配，但各池的正式定义、流转时机、保护时长、领取额度及限制，以服务端和业务确认规则为准。[依据：S10]

慧眼寻医围绕潜力医生开展筛选、排序、查看潜力信息和领取；奖励池、公有池等还可能引导到潜力医生推荐。它与按地理位置寻找医生的“雾影寻踪”服务于不同场景，不应混为一个功能。[依据：S11]

### 3.4 日常工作、日程与拜访

工作台聚合待办和当天安排，并可进入各业务办理页面。待办会关联医生、订单、审核、工单等不同对象，点击后进入相应页面。标记一条待办完成，与完成其关联订单或工单是不同动作，不能默认互相替代。[依据：S06]

日程记录未来安排；拜访记录保存实际跟进内容。拜访表单包含医生、拜访时间、方式、医院、目的、沟通信息、图片和下次关注方向等；日程和生日提醒通过日历及工作台呈现。字段是否必填、不同拜访方式是否要求医院等细节，应按两端当前表单分别确认，本文不将单端校验扩展为统一业务规则。[依据：S04]

“雾影寻踪”提供地图／位置相关的医生查找，并区分全部、我的或公海等范围。它可辅助安排走访；地图权限、定位效果和可见数据还需要账号及设备验证。

### 3.5 医生运营与账户服务

这里至少有三类经常被统称为“活动”的功能，需要分开理解：

| 功能 | 当前代码所处理的内容 | 业务边界 |
| --- | --- | --- |
| 工作台 → 运营活动 | 按月查看基金／预算概览、提报记录、提报规则及相关医生选项 | 涉及运营资金与提报；客户端展示不能证明预算审批和财务结算完整流程 |
| 我的 → 医生活动情况 | 按活动相关条件查看医生数据及详情 | 用于观察活动情况，不能仅因名字相近就与预算提报视为同一页面 |
| 医生详情 → 账户信息 | 医生的活动、优惠券、收入、纳税方式、服务费等资料或配置 | 围绕单个医生；可修改项及生效规则受接口和权限影响 |

优惠券有查看不同使用状态和赠券的路径。接手时要区分“工作人员可赠送的券”“医生已持有的券”与“券是否已使用／过期”。新版优惠券两端所在基线不同，不能把旧页面和新页面的规则混用。[依据：S12、S13]

患者感谢管理是独立事项管理，有类型、状态、时间筛选和详情／编辑相关实现。具体制作、交付、确认流程需要业务补充；它不等同于协同工单的满意度评价。[依据：S14]

### 3.6 订单查询、问诊／咨询与协同服务

订单查询可以围绕责任范围、时间、支付、物流、药库等条件查找记录，也有照片方、商城等业务入口。紧急订单和关注订单提供重点跟进视角；售后投诉记录服务问题；药库查询为药品相关查询提供支撑。不能将“开方”“支付”“发货”“售后处理”合并成同一个完成状态。[依据：S15]

本次 iOS 应用菜单同时列有“问诊订单”和“咨询订单”；Android 当前菜单核对到“咨询管理”。iOS 咨询订单请求 `consultation/consultation_list`，Android 咨询管理请求 `consultation/consultation_order_list`。名称和接口均有区别，本文分别保留，不推定它们是一一对应或某端缺少功能。[依据：S16]

协同工单是跨人处理事项的载体。两端都有“我发起的、待我处理、全部”分类，以及回复、退回、转派、完成和处理记录等能力。需要同时理解工单当前状态及人员关系，不能只看登录岗位决定谁能处理。[依据：S17]

Android 从工单列表进入的详情有“处理记录／工单明细”两个页签：发起人回复的调用在“处理记录”页，不能因为“工单明细”页隐藏回复按钮而判断发起人无法回复。iOS 当前列表进入聊天式详情，顶部也有“处理记录／工单明细”页签；部分通知／工作台保留其他详情入口。两端在具体状态下的入口可用性仍需业务验证，此处不提出代码调整。[依据：S17]

### 3.7 数据、预警与激励

首页偏向观察医生近期行为，应用页和数据模块还呈现个人／团队／区域范围的经营数据及下钻明细。已核对的指标包括累计／新增医生、新审核医生、首次开单／次单医生、已开方／已支付订单、普通方／膏方／中成药相关业绩、商城订单和金额等。[依据：S05、S18]

指标名称相近也可能存在统计差异。业务沟通时应一并说清统计对象、时间范围、责任范围和计算口径，尤其区分订单金额、业绩与医生收入。退款、继承关系、跨期、归属变更等如何计入，需要服务端或产品确认。

流失预警帮助识别需要继续跟进的医生；华山论剑和皇城 PK 提供榜单／对战等激励场景；奖励池包含医生领取、兑换卡数量、领取记录、规则说明及相关卡券／积分明细。奖励池领取会涉及消耗兑换卡，不能解释为现金余额或医生优惠券；发卡与规则维护权限需结合账号确认。[依据：S19]

### 3.8 通知与外部业务页面

通知与待办会将用户带回具体医生或业务事项，因此它们是业务入口的一部分。收到通知、通知已读、待办已完成、关联业务已办结是不同状态。消息设置提供提醒配置，是否实际推送成功仍需服务端和设备验证。[依据：S05、S06]

两端“运营有道”均打开 UniApp 小程序并传入登录信息。部分业务还由 Web 页面承载。原生客户端代码只能说明入口和传参，不能据此补写小程序／网页内部的完整功能与规则。本次 iOS 还确认“业务资料”列表、分类筛选和搜索入口；Android 当前应用菜单未找到同名入口，暂不认定两端能力一致。[依据：S20]

## 4. 用五个场景把功能串起来

以下是建议的熟悉路线，按已核对功能组织，不是已确认的业务操作规程。正式演示时使用可授权操作的测试数据。

### 场景一：接触一位尚不熟悉的医生

1. 从工作台“查验医生”开始，按医生／医院线索查找；有专家墙照片时可了解智能识别入口。
2. 根据查询结果区分已有客户资料、已有平台账号和需要新建／邀请的情况，避免重复建档。
3. 查看医生资料及当前跟进归属，再了解新增资料、邀请、注册验证和资质审核分别怎样办理。
4. 进入医生详情，确认资料、标签／潜力及责任范围；后续按实际业务安排日程和跟进。

这条路线先解决“是谁、有没有记录、谁负责”，再理解准入和后续经营。建档、注册、审核、归属的正式先后条件仍需业务确认。

### 场景二：开始一天的客户跟进

1. 在首页查看开方、启动、咨询等行为及通知，识别需要关注的医生。
2. 在工作台查看今日待办、日程、协同事项和生日提醒。
3. 进入医生详情，回看历史拜访、行为及账户信息，了解本次沟通背景。
4. 开展跟进后新增拜访记录，记录目的、沟通信息和下次关注方向；需要时安排后续日程。
5. 分别处理待办状态与具体业务事项，确认各自是否已完成。

### 场景三：跟进一笔订单或服务问题

1. 从通知、医生相关数据或应用“订单查询”找到记录，先确认订单类别。
2. 查看支付、履约及相关服务信息，按实际需要使用关注、紧急或售后入口。
3. 需要多人协作时进入协同工单，明确关联对象、问题和接收／跟进人员。
4. 通过处理记录跟进回复、附件、退回或转派；具备相应条件时完成事项并记录评价。
5. 回到原订单和待办确认各自状态，不根据工单完成自动认定订单履约或退款完成。

### 场景四：维护客户资源、挽回低活跃医生

1. 从医生列表的状态／标签、流失预警或客户池观察客户现状。
2. 回看拜访和行为信息，了解未审核、首单超时或久未开单等提示对应的实际情况。
3. 在权限和名额允许时进行保护、领取等客户资源操作，再开展后续跟进。
4. 若使用奖励池领取，先了解兑换卡消耗和领取规则；慧眼寻医则结合潜力条件查找医生。

这条路线需要重点补充池流转和配额规则，客户端提示只是可见依据，不能代替完整规则。

### 场景五：负责人查看团队经营情况

1. 在个人／团队／区域范围中选择实际权限覆盖的数据，核对时间和成员筛选。
2. 先看医生增长、审核、开单与支付等指标，再进入关联医生／订单明细。
3. 结合团队拜访、流失预警、运营活动和激励模块，了解数据背后的工作情况。
4. 对异常先核对指标口径、归属和权限，再判断是业务问题还是客户端展示问题。

## 5. 接手时最容易混淆的概念

| 概念 | 应当怎样区分 |
| --- | --- |
| 新增医生与邀请医生 | 建立 CRM 客户资料与邀请医生使用平台是两类操作；不能默认一个动作完成全部准入 |
| 注册、审核与激活 | 分别涉及账号、资质和使用／经营状态；激活条件不能从页面名称推断 |
| 我的／代理／团队／区域医生 | 是责任或数据范围；不等于医生注册状态、职称或标签 |
| 私有池、公有池、死海、奖励池、潜力医生 | 是相关但不同的资源组织方式；不能全部解释为“没有负责人”的医生 |
| 保护、锁定与领取 | 页面和接口各有处理，不应只凭“不能领取”推定处于哪种状态 |
| 日程与拜访记录 | 一个安排未来工作，一个记录实际跟进；日程完成是否要求拜访记录需单独确认 |
| 医生行为与医助拜访 | 开方、启动、咨询等多为医生侧行为观察；拜访记录是工作人员的跟进留痕 |
| 订单金额、业绩与医生收入 | 统计对象及核算方式不同，不能直接相加或互相替代 |
| 活动预算、医生参与活动与活动情况 | 分别涉及资金／提报、单医生配置及活动数据观察 |
| 优惠券与兑换卡 | 优惠券围绕医生持券、赠送与使用；兑换卡用于奖励池等资源领取 |
| 通知已读、待办完成与工单完成 | 三种独立业务状态；完成其中一个不代表其他两个自动完成 |
| 工单发起人、跟进人、负责人 | 是事项内角色；权限应结合工单状态及接口核对 |
| 查验医生、雾影寻踪与慧眼寻医 | 分别侧重查验已有记录、地理位置查找和潜力客户筛选 |

## 6. 从业务问题定位两端代码

本节提供入口导航，不要求先理解完整技术架构。iOS 页面目录相对于 `repos/ios4crm/GCCRM/`，Android 业务目录相对于 `repos/android4crm/app/src/main/java/com/igancao/crm/`。

| 业务问题 | iOS 主要入口 | Android 主要入口 |
| --- | --- | --- |
| 登录用户是谁、可看什么范围 | `ViewController/Login/`、`Model/UserInfoModel.h`、`ViewController/Doctor/DoctorVC.m` | `ui/account/login/`、`bean/User.kt`、`SPUser.kt`、`ui/doctor/DoctorFragment.kt` |
| 一级导航、首页与通知 | `Tools/GCTabbarManager/`、`ViewController/Workbench/` | `ui/main/`、`ui/home/`、`ui/worktable/` |
| 今天要办什么 | `ViewController/Map/`、`ViewModel/Map/WorkTabView.m` | `ui/work/` |
| 新增、邀请、审核、日程／拜访录入 | `ViewController/AddBtn/` | `ui/doctor/editdoctor/`、`invitedoctor/`、`audit/`、`visitrecord/`，以及 `ui/account/register/`、`ui/mine/editvisit/` |
| 医生列表与详情 | `ViewController/Doctor/` | `ui/doctor/` |
| 查验医生／专家墙识别 | `ViewController/Apply/CheckDoctor/`、`ViewController/AI/` | `ui/application/checkdoc/`（含 `expert/`、识别结果目录） |
| 客户池与领取保护 | `ViewController/Apply/DoctorPond/` | `ui/application/pubsea/` |
| 慧眼寻医 | `ViewController/Apply/FndDoctor/` | 功能分支内 `ui/application/find_doctor/`，当前 `develop` 无该目录 |
| 运营活动与预算 | `ViewController/Activity/` | `ui/work/operate/` |
| 医生账户与优惠券 | `ViewController/Doctor/AccountInfoNewVC.m`、`Doctor/Coupon/`、`SendCouponVC.m` | `ui/doctor/accountinfo/`；新版券目录需在功能分支查看 |
| 订单、售后、问诊／咨询 | `ViewController/Apply/OrderInquire/`、`StoreOrder/`、`AfterSale/`、`Chat/`、`AskOrder/` | `ui/application/order/`、`mall/`、`complaint/`、`consult/` 等 |
| 协同工单 | `ViewController/Synergy/` | `ui/mine/workorder/`；列表进入 `workinfo/WorkOrderDetailsActivity.kt`，并有工作台／订单相关入口 |
| 经营数据、预警、激励 | `Apply/TeamData/`、`Apply/DataBoardVC.m`、`Apply/Warning/`、`Apply/Reward/`、`Huashan/`、`Apply/PK/` | `ui/application/groupdata/`、`board/`、`runoff/`、`award/`、`sword/`、`emperor/` |
| 个人工作、活动情况、感谢管理 | `ViewController/Mine/` | `ui/mine/` |

iOS 相关请求位于 `RequestAPI/` 或业务模块的 `API/`，部分页面直接调用请求管理器。Android 通常继续沿 Fragment → ViewModel → Repository → `api/ApiService.kt` 查找，工单等还存在单独的 GAPI 请求路径。一个模块存在多份历史页面时，应从当前入口追踪实际实例化的页面，避免将保留文件误判为生效流程。

## 7. 本次核对基线与两端覆盖边界

### 7.1 代码快照

本次只读检查本地仓库，没有拉取远端、切换分支或修改代码；`origin/...` 均指本地已有的远端跟踪引用，不能称为实时远端最新状态。

| 端 | 当前分支与提交 | 本次阅读范围 | 原有未提交改动 |
| --- | --- | --- | --- |
| iOS | `develop`，`221c98985ff3a0ab69b35a7f7f82770e548cc142` | 当前业务入口、相关页面／模型／接口；补查 `origin/cili_Q4_10` 相对主线的提交与文件范围 | 工程／Scheme、Pods 工程和 `.DS_Store` 等；未改动 |
| Android | `develop`，`b98e308e569969424a0e795eec82311608bff658` | 当前业务入口、相关页面／模型／接口；另只读查看下列功能分支内容 | Gradle／本地配置、映射文件、构建产物等；未改动 |

### 7.2 需要带着基线理解的功能

| 场景 | iOS 所见 | Android 所见 | 文档处理与影响 |
| --- | --- | --- | --- |
| 慧眼寻医 | 当前 `develop` 有应用入口、筛选列表及领取相关调用 | `origin/feature/xtw-慧眼寻医模块-2026Q33`（`7ac11e5`）有实现，尚未合入当前 `develop` | 两端均有代码依据，但不能在 Android 当前主线或现用安装包中承诺可见 |
| 新版优惠券 | 当前账户入口使用 `CRMCouponPagerViewController`，请求 `doctor_history/get_coupon_list` | `develop` 仍走原优惠券页面；`origin/feature/xtw-优惠券模块重构-2026Q32`（`f3c0fac`）含重构，后续慧眼寻医分支也包含新券文件 | 讨论需求前先确认实际集成分支及目标券体系 |
| 专家墙拍照智能识别 | 查验医生 → `CRMAIExpertWallRecognitionVC` → 识别结果 | 查验医生 → `ExpertRecognizeFragment` → `ExpertRecognizeInfoNewActivity` | 两端均已找到入口和任务／结果请求，识别效果及现场使用待验证 |
| 问诊／咨询分类 | 应用菜单分别列“问诊订单”“咨询订单”，后者有新增列表实现 | 当前菜单为“咨询管理”，已核对列表接口 | 保留各自名称，业务对应关系待产品确认 |
| 工单回复入口 | 在详情中组织回复及其他操作 | 列表详情拆为处理记录与工单明细，处理记录页包含发起人回复调用 | 已找到两端回复依据；只将具体状态／权限口径保留为待验证，不记为 Android 缺失能力 |
| 业务资料 | 当前应用菜单和资料列表／搜索有实现 | 本次在当前应用菜单及相关业务目录的检索中未定位同名入口 | 不认定功能不存在或要求补齐；跨端范围待确认 |

iOS `origin/cili_Q4_10`（`bf7e69a6`）相对 `develop` 还有咨询订单相关独有改动。本指南以当前 `develop` 入口为主，不将这些改动认定为已合并或已发布。上述记录用于理解接手范围，不构成对齐或优化任务。

## 8. 建议怎样带着这份文档熟悉项目

1. **先看首页、医生、工作台。**掌握“客户近期表现、我负责谁、今天做什么”三件事，建立整体认知。
2. **选一位测试医生贯穿查看。**从列表进入详情，依次看资料／归属、拜访、行为、收入、账户，理解同一个客户在不同页面的呈现。
3. **走一次客户开发与跟进演示。**查看查验、新增／邀请、注册审核、创建日程和填写拜访各自需要什么信息；是否实际提交由测试演示授权决定。
4. **选一笔测试订单及相关工单。**理解订单类型、支付／履约状态与工单处理的关系，分别用发起人和跟进人视角查看。
5. **最后看客户池、运营与数据。**掌握客户如何被分层和分配，活动、优惠券、兑换卡分别作用在哪里，再理解团队数据、预警和 PK。
6. **遇到具体需求再沿第 6 节定位代码。**记录入口、人员范围、业务对象、状态和接口，分别核对两端，不依靠单端页面或历史文件推定统一规则。

这些是后续学习建议，本次没有执行账号演示、数据提交或设备验证。

## 9. 需要业务交接补齐的问题

| 优先级 | 待确认内容 | 为什么影响理解或后续开发 |
| --- | --- | --- |
| 优先 | 实际使用部门、普通医助／团队／区域管理人员的职责和演示账号 | 客户端角色字段不能完整说明组织制度和实际权限 |
| 优先 | 两端现用安装版本、实际集成分支和未合并功能的采用情况 | 避免把开发分支内容误当成现用产品能力 |
| 优先 | 新增资料、注册、资质审核、归属分配的正式流程；特殊医生审批适用条件 | 决定客户准入和后续办理条件 |
| 优先 | 待激活／已激活／已流失、生命周期及回流标签的定义和计算周期 | 决定筛选、预警和运营动作的含义 |
| 优先 | 私有池／公有池／死海／奖励池的流转、保护／锁定、领取限制及慧眼寻医关系 | 涉及客户资源、配额和归属变化，不能从提示文案补全 |
| 优先 | 订单、业绩、医生收入的统计口径及退款／继承／跨期处理 | 决定经营数据能否正确比较和解释 |
| 后续 | 工单类型、人员关系、各状态可执行动作和完结／评价规则 | 当前已找到两端发起人回复调用，仍需账号核验具体状态下的权限和结果 |
| 后续 | 问诊订单、咨询订单、咨询管理的正式业务对应关系 | 两端名称和请求路径不同，尚无统一分类依据 |
| 后续 | 运营预算的来源、提报／审批／结算规则；优惠券、兑换卡的发放使用规则 | 当前能证明客户端入口和部分操作，不能证明完整资金或激励制度 |
| 后续 | 运营有道／Web 内部功能、患者感谢管理的线下流程与负责人 | 原生代码无法覆盖这些功能的完整业务链路 |

## 10. 主要代码依据

以下链接指向当前工作区，后续切换分支时内容会变化；复查历史结论时结合第 7 节提交快照。功能分支中的文件未检出到工作区，按表中引用使用 `git show 分支:路径` 只读查看。

| 编号 | 支持的内容 | 主要依据 |
| --- | --- | --- |
| S01 | 五个一级入口 | iOS [GCTabbarManager.m](repos/ios4crm/GCCRM/Tools/GCTabbarManager/GCTabbarManager.m) 的控制器与 Tab 配置；Android [MainPagerAdapter.kt](repos/android4crm/app/src/main/java/com/igancao/crm/ui/main/MainPagerAdapter.kt)、[activity_main.xml](repos/android4crm/app/src/main/res/layout/activity_main.xml) |
| S02 | 登录角色、管理标识 | iOS [UserInfoModel.h](repos/ios4crm/GCCRM/Model/UserInfoModel.h)、[LoginVC.m](repos/ios4crm/GCCRM/ViewController/Login/LoginVC.m)；Android [User.kt](repos/android4crm/app/src/main/java/com/igancao/crm/bean/User.kt)、[LoginFragment.kt](repos/android4crm/app/src/main/java/com/igancao/crm/ui/account/login/LoginFragment.kt) |
| S03 | 医生范围、状态和 ID | iOS [DoctorVC.m](repos/ios4crm/GCCRM/ViewController/Doctor/DoctorVC.m)、[DoctorHomeModel.h](repos/ios4crm/GCCRM/Model/Doctor_relation/DoctorHomeModel.h)、[DoctorInfoAPI.m](repos/ios4crm/GCCRM/RequestAPI/Doctor_API/DoctorInfoAPI.m)；Android [DoctorFragment.kt](repos/android4crm/app/src/main/java/com/igancao/crm/ui/doctor/DoctorFragment.kt)、[ApiService.kt](repos/android4crm/app/src/main/java/com/igancao/crm/api/ApiService.kt) 的医生列表与详情定义 |
| S04 | 建档、拜访和日程 | iOS [AddDoctorVC.m](repos/ios4crm/GCCRM/ViewController/AddBtn/AddDoctorVC.m)、[CRMEditRecordVC.m](repos/ios4crm/GCCRM/ViewController/AddBtn/CRMEditRecordVC.m)、[CRMEditScheduleVC.m](repos/ios4crm/GCCRM/ViewController/AddBtn/CRMEditScheduleVC.m)；Android [EditDoctorRepository.kt](repos/android4crm/app/src/main/java/com/igancao/crm/ui/doctor/editdoctor/EditDoctorRepository.kt)、[EditVisitRecordRepository.kt](repos/android4crm/app/src/main/java/com/igancao/crm/ui/doctor/visitrecord/editvisitrecord/EditVisitRecordRepository.kt)、[ApiService.kt](repos/android4crm/app/src/main/java/com/igancao/crm/api/ApiService.kt) 的日程接口 |
| S05 | 首页、行为统计、通知 | iOS [WorkbenchPageVC.m](repos/ios4crm/GCCRM/ViewController/Workbench/WorkbenchPageVC.m)、[WorkNotificationVC.m](repos/ios4crm/GCCRM/ViewController/Workbench/WorkNotificationVC.m)、[WorkbenchVC.m](repos/ios4crm/GCCRM/ViewController/Workbench/WorkbenchVC.m)；Android [HomeViewPageAdapter.kt](repos/android4crm/app/src/main/java/com/igancao/crm/ui/home/HomeViewPageAdapter.kt)、[DocStatistDataFragment.kt](repos/android4crm/app/src/main/java/com/igancao/crm/ui/home/docstatistdata/DocStatistDataFragment.kt)、[HomeFragment.kt](repos/android4crm/app/src/main/java/com/igancao/crm/ui/home/HomeFragment.kt) |
| S06 | 工作台、待办及快捷入口 | iOS [WorkCenterVC.m](repos/ios4crm/GCCRM/ViewController/Map/WorkCenterVC.m)、[WorkTabView.m](repos/ios4crm/GCCRM/ViewModel/Map/WorkTabView.m)、[WorkListVC.m](repos/ios4crm/GCCRM/ViewController/Map/WorkListVC.m)；Android [WorkFragment.kt](repos/android4crm/app/src/main/java/com/igancao/crm/ui/work/WorkFragment.kt) |
| S07 | 查验医生和专家墙识别 | iOS [CRMCheckDoctorSearchVC.swift](repos/ios4crm/GCCRM/ViewController/Apply/CheckDoctor/CRMCheckDoctorSearchVC.swift)、[aiApi.swift](repos/ios4crm/GCCRM/ViewController/AI/API/aiApi.swift)；Android [CheckHistoryFragment.kt](repos/android4crm/app/src/main/java/com/igancao/crm/ui/application/checkdoc/checkhistory/CheckHistoryFragment.kt)、[ExpertRecognizeFragment.kt](repos/android4crm/app/src/main/java/com/igancao/crm/ui/application/checkdoc/expert/ExpertRecognizeFragment.kt)、[ExpertRecognizeRepository.kt](repos/android4crm/app/src/main/java/com/igancao/crm/ui/application/checkdoc/expert/ExpertRecognizeRepository.kt) |
| S08 | 我的及特殊医生审批入口 | iOS [MineViewController.m](repos/ios4crm/GCCRM/ViewController/Mine/MineViewController.m) 的 `getData`；Android [MineFragment.kt](repos/android4crm/app/src/main/java/com/igancao/crm/ui/mine/MineFragment.kt) 的管理标识检查及跳转 |
| S09 | 医生详情及账户 | iOS [DoctorHomeVC.m](repos/ios4crm/GCCRM/ViewController/Doctor/DoctorHomeVC.m)、[AccountInfoNewVC.m](repos/ios4crm/GCCRM/ViewController/Doctor/AccountInfoNewVC.m)；Android [DoctorInfoPagerAdapter.kt](repos/android4crm/app/src/main/java/com/igancao/crm/ui/doctor/doctorinfo/DoctorInfoPagerAdapter.kt)、[DoctorInfoFragment.kt](repos/android4crm/app/src/main/java/com/igancao/crm/ui/doctor/doctorinfo/DoctorInfoFragment.kt)、[AccountInfoFragment.kt](repos/android4crm/app/src/main/java/com/igancao/crm/ui/doctor/accountinfo/AccountInfoFragment.kt) |
| S10 | 客户池、保护和领取 | iOS [DoctorPondVC.m](repos/ios4crm/GCCRM/ViewController/Apply/DoctorPond/DoctorPondVC.m)、[DoctorPoodManager.m](repos/ios4crm/GCCRM/ViewController/Apply/DoctorPond/DoctorPoodManager.m)；Android [PubSeaFragment.kt](repos/android4crm/app/src/main/java/com/igancao/crm/ui/application/pubsea/PubSeaFragment.kt) |
| S11 | 潜力医生／慧眼寻医 | iOS [CRMFindDoctorViewController.swift](repos/ios4crm/GCCRM/ViewController/Apply/FndDoctor/CRMFindDoctorViewController.swift)、[CRMFindDoctorAPI.swift](repos/ios4crm/GCCRM/ViewController/Apply/FndDoctor/API/CRMFindDoctorAPI.swift)；Android `origin/feature/xtw-慧眼寻医模块-2026Q33:app/src/main/java/com/igancao/crm/ui/application/find_doctor/FindDoctorRepository.kt` 及该目录相关筛选、列表、领取文件 |
| S12 | 运营活动、预算和活动情况 | iOS [CRMActivityVC.swift](repos/ios4crm/GCCRM/ViewController/Activity/CRMActivityVC.swift)、[CRMActivityAPI.swift](repos/ios4crm/GCCRM/ViewController/Activity/API/CRMActivityAPI.swift)、[ActivityDataVC.m](repos/ios4crm/GCCRM/ViewController/Mine/ActivityDataVC.m)；Android [OperatingInfoFragment.kt](repos/android4crm/app/src/main/java/com/igancao/crm/ui/work/operate/OperatingInfoFragment.kt)、[ApiService.kt](repos/android4crm/app/src/main/java/com/igancao/crm/api/ApiService.kt) 的 `activity/` 接口及 `ui/mine/docactivity/` |
| S13 | 优惠券及基线区别 | iOS [AccountInfoNewVC.m](repos/ios4crm/GCCRM/ViewController/Doctor/AccountInfoNewVC.m) 的 `showCouponList` 相关调用、[CRMCouponListAPI.swift](repos/ios4crm/GCCRM/ViewController/Doctor/Coupon/CRMCouponListAPI.swift)；Android [AccountInfoFragment.kt](repos/android4crm/app/src/main/java/com/igancao/crm/ui/doctor/accountinfo/AccountInfoFragment.kt)，以及功能分支内 `ui/doctor/accountinfo/new_coupon/`、`new_send_coupon/` |
| S14 | 患者感谢管理 | iOS [ThankLetterVC.m](repos/ios4crm/GCCRM/ViewController/Mine/ThankLetterVC.m)、`Mine/ThankLetterDetailVC.m`、`Mine/ThankLetterEditVC.m`；Android [MineFragment.kt](repos/android4crm/app/src/main/java/com/igancao/crm/ui/mine/MineFragment.kt) 对 `thansdoc/`、`docthanksinfo/` 等页面的入口 |
| S15 | 订单范围和查询 | iOS [OrderVC.m](repos/ios4crm/GCCRM/ViewController/Apply/OrderInquire/OrderVC.m)、[ApplyNewVC.m](repos/ios4crm/GCCRM/ViewController/Apply/ApplyNewVC.m) 的订单菜单；Android [OrderFragment.kt](repos/android4crm/app/src/main/java/com/igancao/crm/ui/application/order/OrderFragment.kt)、[OrderRepository.kt](repos/android4crm/app/src/main/java/com/igancao/crm/ui/application/order/OrderRepository.kt)、[ApplicationFragment.kt](repos/android4crm/app/src/main/java/com/igancao/crm/ui/application/ApplicationFragment.kt) |
| S16 | 问诊／咨询入口与接口区别 | iOS [ApplyNewVC.m](repos/ios4crm/GCCRM/ViewController/Apply/ApplyNewVC.m)、[CRMAskOrderListController.swift](repos/ios4crm/GCCRM/ViewController/Apply/AskOrder/CRMAskOrderListController.swift)；Android [ConsultRepository.kt](repos/android4crm/app/src/main/java/com/igancao/crm/ui/application/consult/ConsultRepository.kt)、[ApiService.kt](repos/android4crm/app/src/main/java/com/igancao/crm/api/ApiService.kt) 的 `getConsultList` |
| S17 | 工单分类、角色与回复入口 | iOS [CRMSynergyTabVC.m](repos/ios4crm/GCCRM/ViewController/Synergy/CRMSynergyTabVC.m)、[CRMSynergyChatDetailVC.m](repos/ios4crm/GCCRM/ViewController/Synergy/CRMSynergyChatDetailVC.m)、[CRMSynergyDetailVC.m](repos/ios4crm/GCCRM/ViewController/Synergy/CRMSynergyDetailVC.m)；Android [MyWorkOrderFragment.kt](repos/android4crm/app/src/main/java/com/igancao/crm/ui/mine/workorder/MyWorkOrderFragment.kt)、[WorkOrderDetailsActivity.kt](repos/android4crm/app/src/main/java/com/igancao/crm/ui/mine/workorder/workinfo/WorkOrderDetailsActivity.kt)、[WorkInfoFragment.kt](repos/android4crm/app/src/main/java/com/igancao/crm/ui/mine/workorder/workinfo/WorkInfoFragment.kt)、[ProcessingRecordFragment.kt](repos/android4crm/app/src/main/java/com/igancao/crm/ui/mine/workorder/workinfo/ProcessingRecordFragment.kt) 的 `doSend` |
| S18 | 经营指标及下钻 | iOS [ApplyNewVC.m](repos/ios4crm/GCCRM/ViewController/Apply/ApplyNewVC.m) 的 `didSeleteBlcok:`；Android [ApplicationFragment.kt](repos/android4crm/app/src/main/java/com/igancao/crm/ui/application/ApplicationFragment.kt) 的统计赋值、范围筛选及明细跳转 |
| S19 | 奖励池及 PK | iOS [CRMRewardListVC.swift](repos/ios4crm/GCCRM/ViewController/Apply/Reward/CRMRewardListVC.swift)、[HuashanVC.m](repos/ios4crm/GCCRM/ViewController/Huashan/HuashanVC.m)、[PKCenterVC.m](repos/ios4crm/GCCRM/ViewController/Apply/PK/PKCenterVC.m)；Android [AwardPoolFragment.kt](repos/android4crm/app/src/main/java/com/igancao/crm/ui/application/award/AwardPoolFragment.kt)、[ApiService.kt](repos/android4crm/app/src/main/java/com/igancao/crm/api/ApiService.kt) 的 `reward_pool/` 接口及 `ui/application/sword/`、`emperor/` |
| S20 | 小程序、业务资料及菜单覆盖 | iOS [UniappManager.m](repos/ios4crm/GCCRM/ViewController/Apply/Uniapp/UniappManager.m)、[CRMMaterialListVC.swift](repos/ios4crm/GCCRM/ViewController/Apply/Material/CRMMaterialListVC.swift)、[ApplyNewVC.m](repos/ios4crm/GCCRM/ViewController/Apply/ApplyNewVC.m) 的 `getData`；Android [ApplicationFragment.kt](repos/android4crm/app/src/main/java/com/igancao/crm/ui/application/ApplicationFragment.kt) 的 UniApp 调用及当前应用菜单 |

本次产出为业务认识与结构文档；没有修改两端源码、执行构建、调用业务接口、提交测试数据或发布应用。
