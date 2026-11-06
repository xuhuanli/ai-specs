window.CRM_META={"date": "2026-11-06", "ios": "develop / 221c9898", "android": "develop / b98e308", "figmaAccess": "连接器不可读；经用户已打开 Chrome 查看画布，仅对实际查看模块标注。", "pages": 153, "modules": ["认证", "首页通知", "医生客户", "账户优惠券", "客户准入", "日程拜访", "客户资源", "运营激励", "个人管理", "订单服务", "问诊咨询", "协同工单", "经营数据", "业务资料"], "criticalNotes": ["当前CRMSynergyListVC.m:84–91实际push CRMSynergyChatDetailVC；旧CRMSynergyDetailVC push已注释，但其他通知/工作台仍引用旧详情。", "CRMAskOrderListController.swift:didSelectRow只取消选中，无独立详情；头像才跳医生。新版咨询订单不能假造独立详情，也不能与ChatListVC旧问诊混同。", "CRMSynergyCreateVC从GET_WOBC_TEMPLATE动态构造额外字段；原生源码无法给出全部工单类型字段，只可呈现通用字段和明确标注的示例模板。", "订单详情价格可展开：实付含医药费/药价/服务费/协定方差价/诊金/运费/制作费/包材费/活动优惠/用户券/医生券；总优惠另含减免制作费/辅料费等。", "源码提供主蓝#3B99FC、页面底#F4F4F4，多为白底导航/灰底分组列表。", "QRCodeVC仅展示接口返回二维码并关闭返回；未发现保存/分享按钮，本清单已收紧到实际行为。"]};
window.CRM_PAGES=[
  {
    "id": "login",
    "name": "登录",
    "module": "认证",
    "source": "repos/ios4crm/GCCRM/ViewController/Login/LoginVC.m",
    "kind": "form",
    "fields": [
      "手机号",
      "验证码"
    ],
    "actions": [
      "获取验证码",
      "登录",
      "钉钉授权登录"
    ],
    "entry": "启动或未登录访问",
    "basis": "iOS 源码",
    "fidelity": "结构重建",
    "note": "按 iOS 页面入口、字段和控件关系重建；当前样例数据不代表业务规则。"
  },
  {
    "id": "home",
    "name": "首页行为统计",
    "module": "首页通知",
    "source": "repos/ios4crm/GCCRM/ViewController/Workbench/WorkNotificationVC.m",
    "kind": "dashboard",
    "fields": [
      "医生行为表格"
    ],
    "actions": [
      "开方",
      "启动",
      "咨询",
      "邀请",
      "扫码;今日",
      "昨日",
      "前日",
      "最近7天",
      "7天环比",
      "最近30天",
      "30天环比",
      "月均",
      "距上次天"
    ],
    "entry": "首页-首页",
    "basis": "iOS 源码",
    "fidelity": "结构重建",
    "note": "按 iOS 页面入口、字段和控件关系重建；当前样例数据不代表业务规则。"
  },
  {
    "id": "notification",
    "name": "医生通知列表",
    "module": "首页通知",
    "source": "repos/ios4crm/GCCRM/ViewController/Workbench/WorkbenchVC.m",
    "kind": "list",
    "fields": [
      "医生",
      "未读数量",
      "最后消息"
    ],
    "actions": [
      "通知小助手",
      "查看医生消息"
    ],
    "entry": "首页-通知",
    "basis": "iOS 源码",
    "fidelity": "结构重建",
    "note": "按 iOS 页面入口、字段和控件关系重建；当前样例数据不代表业务规则。"
  },
  {
    "id": "notification-helper",
    "name": "通知小助手",
    "module": "首页通知",
    "source": "repos/ios4crm/GCCRM/ViewController/Workbench/WorkbenchCategoryVC.m",
    "kind": "tabs",
    "fields": [
      "通知分类",
      "消息"
    ],
    "actions": [
      "全部已读",
      "搜索"
    ],
    "entry": "通知页",
    "basis": "iOS 源码",
    "fidelity": "结构重建",
    "note": "按 iOS 页面入口、字段和控件关系重建；当前样例数据不代表业务规则。"
  },
  {
    "id": "notification-list",
    "name": "通知分类明细",
    "module": "首页通知",
    "source": "repos/ios4crm/GCCRM/ViewController/Workbench/NotificationHelperVC.m",
    "kind": "list",
    "fields": [
      "状态",
      "类型",
      "时间"
    ],
    "actions": [
      "筛选",
      "清空筛选",
      "全部已读",
      "查看关联业务"
    ],
    "entry": "通知小助手分类",
    "basis": "iOS 源码",
    "fidelity": "结构重建",
    "note": "按 iOS 页面入口、字段和控件关系重建；当前样例数据不代表业务规则。"
  },
  {
    "id": "notification-search",
    "name": "通知搜索",
    "module": "首页通知",
    "source": "repos/ios4crm/GCCRM/ViewController/Workbench/NotificationSearchVC.m",
    "kind": "search",
    "fields": [
      "医生姓名"
    ],
    "actions": [
      "历史或结果",
      "进入医生消息"
    ],
    "entry": "通知小助手搜索",
    "basis": "iOS 源码",
    "fidelity": "结构重建",
    "note": "按 iOS 页面入口、字段和控件关系重建；当前样例数据不代表业务规则。"
  },
  {
    "id": "doctor-messages",
    "name": "医生消息详情",
    "module": "首页通知",
    "source": "repos/ios4crm/GCCRM/ViewController/Workbench/DoctorDetailMessageVC.m",
    "kind": "detail",
    "fields": [
      "医生",
      "消息时间线",
      "通知内容"
    ],
    "actions": [
      "进入主页",
      "资质审核",
      "完善资质",
      "推荐医生"
    ],
    "entry": "医生通知列表或搜索结果",
    "basis": "iOS 源码",
    "fidelity": "结构重建",
    "note": "按 iOS 页面入口、字段和控件关系重建；当前样例数据不代表业务规则。"
  },
  {
    "id": "doctors",
    "name": "医生列表",
    "module": "医生客户",
    "source": "repos/ios4crm/GCCRM/ViewController/Doctor/DoctorVC.m",
    "kind": "list",
    "fields": [
      "我的医生",
      "代理医生",
      "区域医生",
      "团队医生;全部",
      "待激活",
      "已激活",
      "已流失",
      "未注册;状态",
      "职称",
      "地点",
      "科室",
      "医助",
      "生命周期",
      "活跃状态",
      "回流标签",
      "来源",
      "个人&认领",
      "标签",
      "未开剂型"
    ],
    "actions": [
      "搜索",
      "排序",
      "筛选",
      "医生详情"
    ],
    "entry": "医生Tab",
    "basis": "iOS 源码",
    "fidelity": "结构重建",
    "note": "按 iOS 页面入口、字段和控件关系重建；当前样例数据不代表业务规则。"
  },
  {
    "id": "doctor-search",
    "name": "搜索医生",
    "module": "医生客户",
    "source": "repos/ios4crm/GCCRM/ViewController/Doctor/DoctorSearchVC.m",
    "kind": "search",
    "fields": [
      "医生姓名",
      "手机号",
      "医院名称",
      "医生ID"
    ],
    "actions": [
      "搜索结果",
      "找不到医生新增医生"
    ],
    "entry": "医生列表或选择医生",
    "basis": "iOS 源码",
    "fidelity": "结构重建",
    "note": "按 iOS 页面入口、字段和控件关系重建；当前样例数据不代表业务规则。"
  },
  {
    "id": "doctor-search-results",
    "name": "医生搜索结果",
    "module": "医生客户",
    "source": "repos/ios4crm/GCCRM/ViewController/Doctor/DoctorSearchResultVC.m",
    "kind": "list",
    "fields": [
      "医生",
      "手机号",
      "医院"
    ],
    "actions": [
      "选择",
      "进入主页",
      "新增医生"
    ],
    "entry": "搜索医生",
    "basis": "iOS 源码",
    "fidelity": "结构重建",
    "note": "按 iOS 页面入口、字段和控件关系重建；当前样例数据不代表业务规则。"
  },
  {
    "id": "doctor-home",
    "name": "医生主页（本人）",
    "module": "医生客户",
    "source": "repos/ios4crm/GCCRM/ViewController/Doctor/DoctorHomeVC.m",
    "kind": "detail",
    "fields": [
      "姓名",
      "医院",
      "科室职称",
      "等级标签",
      "潜力",
      "跟进归属;拜访记录",
      "收入统计",
      "行为统计",
      "账户信息"
    ],
    "actions": [
      "拨打电话",
      "资料",
      "标记",
      "潜力",
      "添加拜访",
      "创建日程",
      "领取"
    ],
    "entry": "医生列表或业务关联",
    "basis": "iOS 源码",
    "fidelity": "结构重建",
    "note": "按 iOS 页面入口、字段和控件关系重建；当前样例数据不代表业务规则。"
  },
  {
    "id": "other-doctor-home",
    "name": "医生主页（其他范围）",
    "module": "医生客户",
    "source": "repos/ios4crm/GCCRM/ViewController/Doctor/OtherDoctorHomeVC.m",
    "kind": "detail",
    "fields": [
      "基础资料;拜访记录",
      "行为跟踪"
    ],
    "actions": [
      "查看资料",
      "标记",
      "领取",
      "拜访日程"
    ],
    "entry": "其他范围医生",
    "basis": "iOS 源码",
    "fidelity": "结构重建",
    "note": "按 iOS 页面入口、字段和控件关系重建；当前样例数据不代表业务规则。"
  },
  {
    "id": "doctor-info",
    "name": "医生资料",
    "module": "医生客户",
    "source": "repos/ios4crm/GCCRM/ViewController/Doctor/DoctorDetailVC.m",
    "kind": "detail",
    "fields": [
      "资质是否完整",
      "所属医助",
      "公私海",
      "姓名",
      "手机号",
      "科室",
      "执业地点"
    ],
    "actions": [
      "编辑",
      "变更医助",
      "公私海转移确认",
      "修正地址",
      "完善资质"
    ],
    "entry": "医生主页资料",
    "basis": "iOS 源码",
    "fidelity": "结构重建",
    "note": "按 iOS 页面入口、字段和控件关系重建；当前样例数据不代表业务规则。"
  },
  {
    "id": "doctor-add",
    "name": "新增/编辑医生",
    "module": "医生客户",
    "source": "repos/ios4crm/GCCRM/ViewController/AddBtn/AddDoctorVC.m",
    "kind": "form",
    "fields": [
      "姓名",
      "手机号",
      "性别",
      "省市区",
      "医院/医馆",
      "科室",
      "职称",
      "跟进等级",
      "跟进医助"
    ],
    "actions": [
      "保存",
      "选医院",
      "选科室",
      "提交后进入医生主页"
    ],
    "entry": "工作台新增医生或医生资料编辑",
    "basis": "iOS 源码",
    "fidelity": "结构重建",
    "note": "按 iOS 页面入口、字段和控件关系重建；当前样例数据不代表业务规则。"
  },
  {
    "id": "doctor-tags",
    "name": "标记信息",
    "module": "医生客户",
    "source": "repos/ios4crm/GCCRM/ViewController/Doctor/DoctorSignListNewVC.m",
    "kind": "detail",
    "fields": [
      "画像标签",
      "医生标签",
      "医生画像",
      "未审核原因",
      "联系标签记录"
    ],
    "actions": [
      "编辑标记",
      "管理医生标签"
    ],
    "entry": "医生主页标签",
    "basis": "iOS 源码",
    "fidelity": "结构重建",
    "note": "按 iOS 页面入口、字段和控件关系重建；当前样例数据不代表业务规则。"
  },
  {
    "id": "doctor-tags-edit",
    "name": "编辑标记信息",
    "module": "医生客户",
    "source": "repos/ios4crm/GCCRM/ViewController/Doctor/DoctorEditeSignListVC.m",
    "kind": "form",
    "fields": [
      "医生标签",
      "画像标签",
      "未审核原因",
      "联系标签"
    ],
    "actions": [
      "多选",
      "确认"
    ],
    "entry": "标记信息编辑",
    "basis": "iOS 源码",
    "fidelity": "结构重建",
    "note": "按 iOS 页面入口、字段和控件关系重建；当前样例数据不代表业务规则。"
  },
  {
    "id": "tag-manager",
    "name": "管理标签",
    "module": "医生客户",
    "source": "repos/ios4crm/GCCRM/ViewController/Doctor/CRMDoctorTagsEditVC.m",
    "kind": "list",
    "fields": [
      "自定义标签",
      "使用医生数量"
    ],
    "actions": [
      "新增",
      "重命名",
      "删除并确认"
    ],
    "entry": "医生标签编辑",
    "basis": "iOS 源码",
    "fidelity": "结构重建",
    "note": "按 iOS 页面入口、字段和控件关系重建；当前样例数据不代表业务规则。"
  },
  {
    "id": "doctor-potential",
    "name": "医生潜力信息",
    "module": "医生客户",
    "source": "repos/ios4crm/GCCRM/ViewController/Doctor/DoctorPotentialVC.m",
    "kind": "form",
    "fields": [
      "每月出诊天数",
      "每天门诊量",
      "每天自费患者数"
    ],
    "actions": [
      "选择选项后保存"
    ],
    "entry": "医生主页潜力",
    "basis": "iOS 源码",
    "fidelity": "结构重建",
    "note": "按 iOS 页面入口、字段和控件关系重建；当前样例数据不代表业务规则。"
  },
  {
    "id": "change-manager",
    "name": "变更医助",
    "module": "医生客户",
    "source": "repos/ios4crm/GCCRM/ViewController/Doctor/CRMChangeManagerVC.m",
    "kind": "form",
    "fields": [
      "所属医助",
      "变更说明",
      "上传佐证",
      "是否离职交接"
    ],
    "actions": [
      "选择医助",
      "上传",
      "确认"
    ],
    "entry": "医生资料",
    "basis": "iOS 源码",
    "fidelity": "结构重建",
    "note": "按 iOS 页面入口、字段和控件关系重建；当前样例数据不代表业务规则。"
  },
  {
    "id": "select-manager",
    "name": "选择跟进医助",
    "module": "医生客户",
    "source": "repos/ios4crm/GCCRM/ViewController/Doctor/EditDoctorFollowManagerVC.m",
    "kind": "search",
    "fields": [
      "花名或姓名"
    ],
    "actions": [
      "选择",
      "保护提示",
      "确认变更"
    ],
    "entry": "变更医助",
    "basis": "iOS 源码",
    "fidelity": "结构重建",
    "note": "按 iOS 页面入口、字段和控件关系重建；当前样例数据不代表业务规则。"
  },
  {
    "id": "audit-record-detail",
    "name": "认证审核详情",
    "module": "医生客户",
    "source": "repos/ios4crm/GCCRM/ViewController/Doctor/ExamineFieldDetailVC.m",
    "kind": "detail",
    "fields": [
      "时间",
      "类型",
      "执业地",
      "基本信息",
      "头像",
      "执业证书",
      "职称证书",
      "工牌照",
      "卫计委信息照",
      "现场拜访照",
      "身份证正反面",
      "资格证"
    ],
    "actions": [
      "图片预览",
      "驳回确认"
    ],
    "entry": "医生审核消息",
    "basis": "iOS 源码",
    "fidelity": "结构重建",
    "note": "按 iOS 页面入口、字段和控件关系重建；当前样例数据不代表业务规则。"
  },
  {
    "id": "doctor-behavior",
    "name": "行为统计",
    "module": "医生客户",
    "source": "repos/ios4crm/GCCRM/ViewController/Doctor/BehaviorLogVC.m",
    "kind": "dashboard",
    "fields": [
      "整体开方",
      "拉新能力",
      "转化能力",
      "患者粘性",
      "六维图",
      "药费",
      "订单数",
      "支付用户数"
    ],
    "actions": [
      "日期/图表切换",
      "扫码患者明细",
      "邀请医生记录",
      "订单明细",
      "患者感谢"
    ],
    "entry": "医生主页-行为统计",
    "basis": "iOS 源码",
    "fidelity": "结构重建",
    "note": "按 iOS 页面入口、字段和控件关系重建；当前样例数据不代表业务规则。"
  },
  {
    "id": "scan-patients",
    "name": "扫码患者明细",
    "module": "医生客户",
    "source": "repos/ios4crm/GCCRM/ViewController/Doctor/ScanCodeRecordDetailVC.m",
    "kind": "list",
    "fields": [
      "昨日扫码",
      "累计扫码",
      "患者"
    ],
    "actions": [
      "切换或查看"
    ],
    "entry": "行为统计",
    "basis": "iOS 源码",
    "fidelity": "结构重建",
    "note": "按 iOS 页面入口、字段和控件关系重建；当前样例数据不代表业务规则。"
  },
  {
    "id": "invited-records",
    "name": "邀请医生记录",
    "module": "医生客户",
    "source": "repos/ios4crm/GCCRM/ViewController/Doctor/InvitationDoctorRecordVC.m",
    "kind": "list",
    "fields": [
      "审核状态",
      "三单状态",
      "邀请时间"
    ],
    "actions": [
      "筛选",
      "进入医生"
    ],
    "entry": "行为统计",
    "basis": "iOS 源码",
    "fidelity": "结构重建",
    "note": "按 iOS 页面入口、字段和控件关系重建；当前样例数据不代表业务规则。"
  },
  {
    "id": "doctor-income",
    "name": "收入统计",
    "module": "医生客户",
    "source": "repos/ios4crm/GCCRM/ViewController/Doctor/EarningLogNewVC.m",
    "kind": "dashboard",
    "fields": [
      "诊金收入",
      "杏叶",
      "精诚值",
      "开方金额",
      "剂型收入",
      "首单/复诊",
      "商城订单"
    ],
    "actions": [
      "切换时间",
      "订单明细",
      "商城订单"
    ],
    "entry": "医生主页-收入统计",
    "basis": "iOS 源码",
    "fidelity": "结构重建",
    "note": "按 iOS 页面入口、字段和控件关系重建；当前样例数据不代表业务规则。"
  },
  {
    "id": "doctor-income-orders",
    "name": "医生收入订单明细",
    "module": "医生客户",
    "source": "repos/ios4crm/GCCRM/ViewController/Doctor/CRMDoctorEarnOrderListVC.m",
    "kind": "list",
    "fields": [
      "订单",
      "金额",
      "结果数量"
    ],
    "actions": [
      "进入订单"
    ],
    "entry": "收入统计金额下钻",
    "basis": "iOS 源码",
    "fidelity": "结构重建",
    "note": "按 iOS 页面入口、字段和控件关系重建；当前样例数据不代表业务规则。"
  },
  {
    "id": "doctor-income-flow",
    "name": "医生收支明细",
    "module": "医生客户",
    "source": "repos/ios4crm/GCCRM/ViewController/Doctor/DoctorIncomeInfoViewController.m",
    "kind": "list",
    "fields": [
      "时间",
      "收支类型",
      "订单号"
    ],
    "actions": [
      "筛选",
      "搜索订单"
    ],
    "entry": "医生收入看板/数据",
    "basis": "iOS 源码",
    "fidelity": "结构重建",
    "note": "按 iOS 页面入口、字段和控件关系重建；当前样例数据不代表业务规则。"
  },
  {
    "id": "doctor-account",
    "name": "账户信息",
    "module": "账户优惠券",
    "source": "repos/ios4crm/GCCRM/ViewController/Doctor/AccountInfoNewVC.m",
    "kind": "detail",
    "fields": [
      "活动",
      "医生类型",
      "余额",
      "历史税前收入",
      "交税方式",
      "身份证/银行卡",
      "优惠券",
      "医生关注",
      "台签物料",
      "纳税方式",
      "服务费配置",
      "隐藏收入",
      "患者删除/恢复",
      "专家咨询",
      "照片方",
      "协定方",
      "经方验方",
      "隐身",
      "医生版本"
    ],
    "actions": [
      "月对账",
      "赠券",
      "看券",
      "各开关/选项",
      "服务费配置",
      "登录医生助理账号"
    ],
    "entry": "医生主页-账户信息",
    "basis": "iOS 源码",
    "fidelity": "结构重建",
    "note": "按 iOS 页面入口、字段和控件关系重建；当前样例数据不代表业务规则。"
  },
  {
    "id": "coupon-list",
    "name": "医生优惠券",
    "module": "账户优惠券",
    "source": "repos/ios4crm/GCCRM/ViewController/Doctor/Coupon/CRMCouponPagerViewController.swift",
    "kind": "tabs",
    "fields": [
      "待使用",
      "已使用",
      "已过期"
    ],
    "actions": [
      "状态切换",
      "券卡信息展示"
    ],
    "entry": "账户信息三个状态入口",
    "basis": "iOS 源码 + Figma 可见画布",
    "fidelity": "结构重建",
    "figma": "https://www.figma.com/design/p9Hr9qCb4DbbKgFqgjZrPO/?node-id=1625-1353",
    "figmaNote": "待使用、已使用、已过期券卡片",
    "note": "按 iOS 页面入口、字段和控件关系重建；当前样例数据不代表业务规则。"
  },
  {
    "id": "coupon-gift",
    "name": "赠送优惠券",
    "module": "账户优惠券",
    "source": "repos/ios4crm/GCCRM/ViewController/Doctor/SendCouponVC.m",
    "kind": "form",
    "fields": [
      "可赠送额度",
      "优惠券选项",
      "过期首单券重发",
      "合计金额"
    ],
    "actions": [
      "选择券",
      "立即赠送",
      "额度校验",
      "成功反馈"
    ],
    "entry": "账户信息优惠券行",
    "basis": "iOS 源码",
    "fidelity": "结构重建",
    "note": "按 iOS 页面入口、字段和控件关系重建；当前样例数据不代表业务规则。"
  },
  {
    "id": "month-bills",
    "name": "月对账",
    "module": "账户优惠券",
    "source": "repos/ios4crm/GCCRM/ViewController/Doctor/CRMAccountCheckVC.m",
    "kind": "list",
    "fields": [
      "月份",
      "收支汇总"
    ],
    "actions": [
      "进入月对账明细"
    ],
    "entry": "账户余额行",
    "basis": "iOS 源码",
    "fidelity": "结构重建",
    "note": "按 iOS 页面入口、字段和控件关系重建；当前样例数据不代表业务规则。"
  },
  {
    "id": "month-bill-detail",
    "name": "月对账明细",
    "module": "账户优惠券",
    "source": "repos/ios4crm/GCCRM/ViewController/Doctor/CRMAccountCheckDeatilVC.m",
    "kind": "detail",
    "fields": [
      "月份",
      "收入/支出明细"
    ],
    "actions": [
      "进入订单"
    ],
    "entry": "月对账月份",
    "basis": "iOS 源码",
    "fidelity": "结构重建",
    "note": "按 iOS 页面入口、字段和控件关系重建；当前样例数据不代表业务规则。"
  },
  {
    "id": "doctor-attention",
    "name": "关注医生行为",
    "module": "账户优惠券",
    "source": "repos/ios4crm/GCCRM/ViewController/Doctor/CRMDoctorAttentionSetVC.m",
    "kind": "form",
    "fields": [
      "登录APP",
      "开方",
      "咨询等关注行为（接口配置）"
    ],
    "actions": [
      "选择",
      "确认"
    ],
    "entry": "账户信息医生关注",
    "basis": "iOS 源码",
    "fidelity": "结构重建",
    "note": "按 iOS 页面入口、字段和控件关系重建；当前样例数据不代表业务规则。"
  },
  {
    "id": "doctor-materials",
    "name": "生成台签等物料",
    "module": "账户优惠券",
    "source": "repos/ios4crm/GCCRM/ViewController/Doctor/DownloadPDFVC.m",
    "kind": "detail",
    "fields": [
      "个人名片5×9CM",
      "台签10.5×14.8CM",
      "小纸条19×5.5CM"
    ],
    "actions": [
      "选择物料",
      "预览",
      "生成链接",
      "分享"
    ],
    "entry": "账户信息生成台签物料",
    "basis": "iOS 源码",
    "fidelity": "结构重建",
    "note": "按 iOS 页面入口、字段和控件关系重建；当前样例数据不代表业务规则。"
  },
  {
    "id": "tax-history",
    "name": "缴税方式历史记录",
    "module": "账户优惠券",
    "source": "repos/ios4crm/GCCRM/ViewController/Doctor/TaxPaymentRecordVC.m",
    "kind": "list",
    "fields": [
      "操作时间",
      "操作说明",
      "生效时间",
      "操作人"
    ],
    "actions": [
      "查看"
    ],
    "entry": "账户纳税方式历史",
    "basis": "iOS 源码",
    "fidelity": "结构重建",
    "note": "按 iOS 页面入口、字段和控件关系重建；当前样例数据不代表业务规则。"
  },
  {
    "id": "doctor-service-fee",
    "name": "医生服务费配置",
    "module": "账户优惠券",
    "source": "repos/ios4crm/GCCRM/ViewController/Doctor/CRMDoctorServeVC.m",
    "kind": "form",
    "fields": [
      "各剂型上下调系数",
      "锁定服务费",
      "固定数值",
      "调整原因"
    ],
    "actions": [
      "批量修改",
      "默认浮动/固定最高/固定不收",
      "保存确认"
    ],
    "entry": "账户信息服务费",
    "basis": "iOS 源码",
    "fidelity": "结构重建",
    "note": "按 iOS 页面入口、字段和控件关系重建；当前样例数据不代表业务规则。"
  },
  {
    "id": "service-level-history",
    "name": "服务费等级变更记录",
    "module": "账户优惠券",
    "source": "repos/ios4crm/GCCRM/ViewController/Doctor/DoctorServeLevelVC.m",
    "kind": "list",
    "fields": [
      "等级",
      "变更时间"
    ],
    "actions": [
      "查看"
    ],
    "entry": "账户信息服务费等级",
    "basis": "iOS 源码",
    "fidelity": "结构重建",
    "note": "按 iOS 页面入口、字段和控件关系重建；当前样例数据不代表业务规则。"
  },
  {
    "id": "doctor-invite",
    "name": "邀请医生",
    "module": "客户准入",
    "source": "repos/ios4crm/GCCRM/ViewController/AddBtn/QRCodeVC.m",
    "kind": "detail",
    "fields": [
      "邀请二维码",
      "欢迎加入甘草医生",
      "扫描二维码下载、注册APP"
    ],
    "actions": [
      "展示二维码",
      "关闭返回"
    ],
    "entry": "工作台邀请医生、我的二维码",
    "basis": "iOS 源码",
    "fidelity": "结构重建",
    "note": "按 iOS 页面入口、字段和控件关系重建；当前样例数据不代表业务规则。"
  },
  {
    "id": "doctor-register-code",
    "name": "注册验证",
    "module": "客户准入",
    "source": "repos/ios4crm/GCCRM/ViewController/AddBtn/DoctorAuthCodeNewVC.m",
    "kind": "form",
    "fields": [
      "医生手机号",
      "验证码"
    ],
    "actions": [
      "获取验证码",
      "复制"
    ],
    "entry": "工作台注册验证",
    "basis": "iOS 源码",
    "fidelity": "结构重建",
    "note": "按 iOS 页面入口、字段和控件关系重建；当前样例数据不代表业务规则。"
  },
  {
    "id": "doctor-audit",
    "name": "录入审核信息",
    "module": "客户准入",
    "source": "repos/ios4crm/GCCRM/ViewController/AddBtn/InputAuditInfomationVC.m",
    "kind": "form",
    "fields": [
      "选择未认证医生",
      "医生头像",
      "工牌",
      "现场拜访照片"
    ],
    "actions": [
      "选择医生",
      "上传图片",
      "提交"
    ],
    "entry": "工作台医生审核",
    "basis": "iOS 源码",
    "fidelity": "结构重建",
    "note": "按 iOS 页面入口、字段和控件关系重建；当前样例数据不代表业务规则。"
  },
  {
    "id": "select-unverified",
    "name": "选择未认证医生",
    "module": "客户准入",
    "source": "repos/ios4crm/GCCRM/ViewController/AddBtn/SearchUnverifiedDoctorVC.m",
    "kind": "search",
    "fields": [
      "医生姓名/手机号"
    ],
    "actions": [
      "搜索",
      "选择医生"
    ],
    "entry": "录入审核信息",
    "basis": "iOS 源码",
    "fidelity": "结构重建",
    "note": "按 iOS 页面入口、字段和控件关系重建；当前样例数据不代表业务规则。"
  },
  {
    "id": "hospital-search",
    "name": "医院搜索/选择",
    "module": "客户准入",
    "source": "repos/ios4crm/GCCRM/ViewController/AddBtn/HospitalSearchVC.m",
    "kind": "search",
    "fields": [
      "关键词",
      "当前选中医院",
      "历史坐诊医院",
      "全部医院"
    ],
    "actions": [
      "选择",
      "找不到医院新增医院"
    ],
    "entry": "医生/拜访/日程/识别选医院",
    "basis": "iOS 源码",
    "fidelity": "结构重建",
    "note": "按 iOS 页面入口、字段和控件关系重建；当前样例数据不代表业务规则。"
  },
  {
    "id": "hospital-add",
    "name": "新增医院",
    "module": "客户准入",
    "source": "repos/ios4crm/GCCRM/ViewController/AddBtn/AddHospitalVC.m",
    "kind": "form",
    "fields": [
      "医院全称",
      "医院别名",
      "省市区",
      "医院详细地址"
    ],
    "actions": [
      "地区选择",
      "保存"
    ],
    "entry": "医院搜索",
    "basis": "iOS 源码",
    "fidelity": "结构重建",
    "note": "按 iOS 页面入口、字段和控件关系重建；当前样例数据不代表业务规则。"
  },
  {
    "id": "department-select",
    "name": "选择科室",
    "module": "客户准入",
    "source": "repos/ios4crm/GCCRM/ViewController/AddBtn/SelectTypesVC.m",
    "kind": "form",
    "fields": [
      "科室层级/选项"
    ],
    "actions": [
      "最多选择3个",
      "确定"
    ],
    "entry": "新增/编辑医生",
    "basis": "iOS 源码",
    "fidelity": "结构重建",
    "note": "按 iOS 页面入口、字段和控件关系重建；当前样例数据不代表业务规则。"
  },
  {
    "id": "doctor-check",
    "name": "查验医生",
    "module": "客户准入",
    "source": "repos/ios4crm/GCCRM/ViewController/Apply/CheckDoctor/CRMCheckDoctorSearchVC.swift",
    "kind": "search",
    "fields": [
      "医生姓名",
      "搜索历史"
    ],
    "actions": [
      "搜索",
      "按医院搜索",
      "专家墙拍照智能识别",
      "清空历史"
    ],
    "entry": "工作台查验医生",
    "basis": "iOS 源码",
    "fidelity": "结构重建",
    "note": "按 iOS 页面入口、字段和控件关系重建；当前样例数据不代表业务规则。"
  },
  {
    "id": "check-hospital",
    "name": "查验医院搜索",
    "module": "客户准入",
    "source": "repos/ios4crm/GCCRM/ViewController/Apply/CheckDoctor/CheckHospitalSearchVC.m",
    "kind": "search",
    "fields": [
      "医院名称"
    ],
    "actions": [
      "搜索",
      "进入查验结果"
    ],
    "entry": "查验医生其他方式",
    "basis": "iOS 源码",
    "fidelity": "结构重建",
    "note": "按 iOS 页面入口、字段和控件关系重建；当前样例数据不代表业务规则。"
  },
  {
    "id": "check-results",
    "name": "查验医生结果",
    "module": "客户准入",
    "source": "repos/ios4crm/GCCRM/ViewController/Apply/CheckDoctor/CheckDoctorSearchResultVC.m",
    "kind": "list",
    "fields": [
      "医生",
      "区域检索结果"
    ],
    "actions": [
      "查验详情"
    ],
    "entry": "查验医生/医院搜索",
    "basis": "iOS 源码",
    "fidelity": "结构重建",
    "note": "按 iOS 页面入口、字段和控件关系重建；当前样例数据不代表业务规则。"
  },
  {
    "id": "check-detail",
    "name": "查验医生信息",
    "module": "客户准入",
    "source": "repos/ios4crm/GCCRM/ViewController/Apply/CheckDoctor/CheckDoctorDetailVC.m",
    "kind": "detail",
    "fields": [
      "医生资料及资源状态"
    ],
    "actions": [
      "捞取该医生",
      "加入私有池",
      "添加拜访"
    ],
    "entry": "查验结果",
    "basis": "iOS 源码",
    "fidelity": "结构重建",
    "note": "按 iOS 页面入口、字段和控件关系重建；当前样例数据不代表业务规则。"
  },
  {
    "id": "ocr-upload",
    "name": "专家墙拍照智能识别",
    "module": "客户准入",
    "source": "repos/ios4crm/GCCRM/ViewController/AI/CRMAIExpertWallRecognitionVC.swift",
    "kind": "form",
    "fields": [
      "所属医院",
      "专家墙照片（最多6张）"
    ],
    "actions": [
      "拍照/相册",
      "删除/预览",
      "开始识别"
    ],
    "entry": "查验医生",
    "basis": "iOS 源码",
    "fidelity": "结构重建",
    "note": "按 iOS 页面入口、字段和控件关系重建；当前样例数据不代表业务规则。"
  },
  {
    "id": "ocr-results",
    "name": "识别结果页",
    "module": "客户准入",
    "source": "repos/ios4crm/GCCRM/ViewController/AI/CRMAIExpertWallRecognitionResultVC.swift",
    "kind": "list",
    "fields": [
      "当前医院匹配/扩大到全市匹配医生",
      "识别医生信息"
    ],
    "actions": [
      "进入主页",
      "确认创建医生并加入拜访日程"
    ],
    "entry": "专家墙识别完成",
    "basis": "iOS 源码",
    "fidelity": "结构重建",
    "note": "图片识别使用演示结果；识别、匹配和领取限制不调用真实接口。"
  },
  {
    "id": "workbench",
    "name": "工作台",
    "module": "日程拜访",
    "source": "repos/ios4crm/GCCRM/ViewController/Map/WorkCenterVC.m",
    "kind": "dashboard",
    "fields": [
      "今日待办",
      "全部",
      "协同",
      "日程",
      "生日"
    ],
    "actions": [
      "查验/邀请/审核/新增医生",
      "雾影寻踪",
      "添加拜访",
      "创建日程",
      "注册验证",
      "运营活动",
      "我的日程"
    ],
    "entry": "工作台Tab",
    "basis": "iOS 源码",
    "fidelity": "结构重建",
    "note": "按 iOS 页面入口、字段和控件关系重建；当前样例数据不代表业务规则。"
  },
  {
    "id": "todo",
    "name": "待办助手",
    "module": "日程拜访",
    "source": "repos/ios4crm/GCCRM/ViewController/Map/CRMWorkCenterToDoViewController.m",
    "kind": "tabs",
    "fields": [
      "待我处理",
      "已完成"
    ],
    "actions": [
      "标记完成",
      "跳转关联业务",
      "清空已完成确认"
    ],
    "entry": "工作台我的待办",
    "basis": "iOS 源码",
    "fidelity": "结构重建",
    "note": "按 iOS 页面入口、字段和控件关系重建；当前样例数据不代表业务规则。"
  },
  {
    "id": "calendar",
    "name": "我的甘草日历",
    "module": "日程拜访",
    "source": "repos/ios4crm/GCCRM/ViewController/AddBtn/CRMScheduleVC.m",
    "kind": "calendar",
    "fields": [
      "月份",
      "日期",
      "全部/拜访/生日"
    ],
    "actions": [
      "切换月份日期",
      "进入安排",
      "创建日程"
    ],
    "entry": "我的-甘草日历或工作台日期",
    "basis": "iOS 源码",
    "fidelity": "结构重建",
    "note": "按 iOS 页面入口、字段和控件关系重建；当前样例数据不代表业务规则。"
  },
  {
    "id": "schedule-edit",
    "name": "创建/编辑日程",
    "module": "日程拜访",
    "source": "repos/ios4crm/GCCRM/ViewController/AddBtn/CRMEditScheduleVC.m",
    "kind": "form",
    "fields": [
      "拜访医生",
      "拜访时间",
      "提醒时间",
      "方式",
      "医院",
      "上次拜访关注方向",
      "备注",
      "同医院推荐医生"
    ],
    "actions": [
      "选医生医院",
      "选择日期时段提醒",
      "保存"
    ],
    "entry": "工作台创建日程/医生主页",
    "basis": "iOS 源码",
    "fidelity": "结构重建",
    "note": "按 iOS 页面入口、字段和控件关系重建；当前样例数据不代表业务规则。"
  },
  {
    "id": "schedule-detail",
    "name": "日程详情",
    "module": "日程拜访",
    "source": "repos/ios4crm/GCCRM/ViewController/AddBtn/CRMEditScheduleVC.m",
    "kind": "detail",
    "fields": [
      "日程基本信息",
      "关注方向",
      "备注"
    ],
    "actions": [
      "编辑",
      "删除确认",
      "添加拜访记录"
    ],
    "entry": "工作台日程/日历",
    "basis": "iOS 源码",
    "fidelity": "结构重建",
    "note": "按 iOS 页面入口、字段和控件关系重建；当前样例数据不代表业务规则。"
  },
  {
    "id": "birthday",
    "name": "医生生日提醒",
    "module": "日程拜访",
    "source": "repos/ios4crm/GCCRM/ViewController/AddBtn/CRMBirthdayScheduleVC.m",
    "kind": "form",
    "fields": [
      "医生信息",
      "生日",
      "生日提醒时间",
      "备注"
    ],
    "actions": [
      "选择提醒",
      "保存"
    ],
    "entry": "工作台生日/日历",
    "basis": "iOS 源码",
    "fidelity": "结构重建",
    "note": "按 iOS 页面入口、字段和控件关系重建；当前样例数据不代表业务规则。"
  },
  {
    "id": "visit-edit",
    "name": "新增/修改拜访记录",
    "module": "日程拜访",
    "source": "repos/ios4crm/GCCRM/ViewController/AddBtn/CRMEditRecordVC.m",
    "kind": "form",
    "fields": [
      "医生",
      "时间",
      "方式",
      "医院",
      "此次目的",
      "沟通信息（至少5字）",
      "下次时间",
      "下次关注方向",
      "图片",
      "医生标签"
    ],
    "actions": [
      "选医生/医院",
      "拍照/上传",
      "保存",
      "新增标签"
    ],
    "entry": "工作台/医生主页/日程详情",
    "basis": "iOS 源码",
    "fidelity": "结构重建",
    "note": "按 iOS 页面入口、字段和控件关系重建；当前样例数据不代表业务规则。"
  },
  {
    "id": "doctor-visits",
    "name": "医生拜访记录",
    "module": "日程拜访",
    "source": "repos/ios4crm/GCCRM/ViewController/Doctor/VisitLogVC.m",
    "kind": "list",
    "fields": [
      "拜访日期",
      "方式",
      "沟通信息"
    ],
    "actions": [
      "新增",
      "查看/编辑拜访"
    ],
    "entry": "医生主页-拜访记录",
    "basis": "iOS 源码",
    "fidelity": "结构重建",
    "note": "按 iOS 页面入口、字段和控件关系重建；当前样例数据不代表业务规则。"
  },
  {
    "id": "visit-actions",
    "name": "拜访/日程快捷操作",
    "module": "日程拜访",
    "source": "repos/ios4crm/GCCRM/ViewController/Doctor/CRMRecordTabVC.m",
    "kind": "tabs",
    "fields": [
      "拜访记录",
      "创建日程"
    ],
    "actions": [
      "切换录入"
    ],
    "entry": "医生主页添加操作",
    "basis": "iOS 源码",
    "fidelity": "结构重建",
    "note": "按 iOS 页面入口、字段和控件关系重建；当前样例数据不代表业务规则。"
  },
  {
    "id": "visit-all",
    "name": "拜访记录",
    "module": "日程拜访",
    "source": "repos/ios4crm/GCCRM/ViewController/Apply/Record/RecordListVC.m",
    "kind": "list",
    "fields": [
      "团队/个人",
      "时间",
      "拜访记录",
      "汇总"
    ],
    "actions": [
      "搜索",
      "新增",
      "查看/修改"
    ],
    "entry": "应用-拜访记录",
    "basis": "iOS 源码",
    "fidelity": "结构重建",
    "note": "按 iOS 页面入口、字段和控件关系重建；当前样例数据不代表业务规则。"
  },
  {
    "id": "visit-search",
    "name": "搜索拜访",
    "module": "日程拜访",
    "source": "repos/ios4crm/GCCRM/ViewController/Apply/Record/RecordListSearchVC.m",
    "kind": "search",
    "fields": [
      "医生姓名",
      "沟通信息"
    ],
    "actions": [
      "搜索结果"
    ],
    "entry": "拜访记录搜索",
    "basis": "iOS 源码",
    "fidelity": "结构重建",
    "note": "按 iOS 页面入口、字段和控件关系重建；当前样例数据不代表业务规则。"
  },
  {
    "id": "visit-search-results",
    "name": "拜访搜索结果",
    "module": "日程拜访",
    "source": "repos/ios4crm/GCCRM/ViewController/Apply/Record/RecordListSearchResultVC.m",
    "kind": "list",
    "fields": [
      "仅看我的",
      "拜访方式"
    ],
    "actions": [
      "线下/电话/微信/短信筛选",
      "进入记录"
    ],
    "entry": "拜访搜索",
    "basis": "iOS 源码",
    "fidelity": "结构重建",
    "note": "按 iOS 页面入口、字段和控件关系重建；当前样例数据不代表业务规则。"
  },
  {
    "id": "nearby-map",
    "name": "雾影寻踪",
    "module": "日程拜访",
    "source": "repos/ios4crm/GCCRM/ViewController/Map/FogShadowPursuitVC.m",
    "kind": "map",
    "fields": [
      "地图",
      "医生/医院",
      "全部/我的医生/公海医生"
    ],
    "actions": [
      "定位",
      "搜索",
      "切换范围",
      "查看附近列表",
      "医生主页"
    ],
    "entry": "工作台",
    "basis": "iOS 源码",
    "fidelity": "结构重建",
    "note": "按 iOS 页面入口、字段和控件关系重建；当前样例数据不代表业务规则。"
  },
  {
    "id": "nearby-search",
    "name": "附近医生/医院搜索",
    "module": "日程拜访",
    "source": "repos/ios4crm/GCCRM/ViewController/Map/CRMFogShaowSearchVC.m",
    "kind": "search",
    "fields": [
      "医生姓名",
      "医院名称"
    ],
    "actions": [
      "搜索",
      "选择地图对象"
    ],
    "entry": "雾影寻踪",
    "basis": "iOS 源码",
    "fidelity": "结构重建",
    "note": "按 iOS 页面入口、字段和控件关系重建；当前样例数据不代表业务规则。"
  },
  {
    "id": "nearby-list",
    "name": "附近医生列表",
    "module": "日程拜访",
    "source": "repos/ios4crm/GCCRM/ViewController/Map/NearDataListVC.m",
    "kind": "list",
    "fields": [
      "附近医生"
    ],
    "actions": [
      "医生主页"
    ],
    "entry": "雾影寻踪列表",
    "basis": "iOS 源码",
    "fidelity": "结构重建",
    "note": "按 iOS 页面入口、字段和控件关系重建；当前样例数据不代表业务规则。"
  },
  {
    "id": "visit-address",
    "name": "编辑拜访地址",
    "module": "日程拜访",
    "source": "repos/ios4crm/GCCRM/ViewController/Map/CRMAddAddressVC.m",
    "kind": "map",
    "fields": [
      "搜索地点",
      "地图选点",
      "地址"
    ],
    "actions": [
      "定位/选点",
      "保存"
    ],
    "entry": "医生资料地址",
    "basis": "iOS 源码",
    "fidelity": "结构重建",
    "note": "按 iOS 页面入口、字段和控件关系重建；当前样例数据不代表业务规则。"
  },
  {
    "id": "doctor-pools",
    "name": "私有池/公有池/死海",
    "module": "客户资源",
    "source": "repos/ios4crm/GCCRM/ViewController/Apply/DoctorPond/DoctorPondVC.m",
    "kind": "list",
    "fields": [
      "范围",
      "释因",
      "职称",
      "地点",
      "医生状态",
      "资质完整",
      "开单",
      "等级",
      "关注",
      "继承",
      "特殊分类",
      "推荐值"
    ],
    "actions": [
      "切池",
      "筛选搜索",
      "领取/保护",
      "潜力医生"
    ],
    "entry": "应用公私池",
    "basis": "iOS 源码",
    "fidelity": "结构重建",
    "note": "按 iOS 页面入口、字段和控件关系重建；当前样例数据不代表业务规则。"
  },
  {
    "id": "pool-search",
    "name": "客户池搜索",
    "module": "客户资源",
    "source": "repos/ios4crm/GCCRM/ViewController/Apply/DoctorPond/DoctorPondSearchVC.m",
    "kind": "search",
    "fields": [
      "医生姓名/手机号"
    ],
    "actions": [
      "搜索结果"
    ],
    "entry": "客户池",
    "basis": "iOS 源码",
    "fidelity": "结构重建",
    "note": "按 iOS 页面入口、字段和控件关系重建；当前样例数据不代表业务规则。"
  },
  {
    "id": "pool-results",
    "name": "客户池搜索结果",
    "module": "客户资源",
    "source": "repos/ios4crm/GCCRM/ViewController/Apply/DoctorPond/DoctorPondSearchResultVC.m",
    "kind": "list",
    "fields": [
      "医生"
    ],
    "actions": [
      "医生主页/领取保护"
    ],
    "entry": "客户池搜索",
    "basis": "iOS 源码",
    "fidelity": "结构重建",
    "note": "按 iOS 页面入口、字段和控件关系重建；当前样例数据不代表业务规则。"
  },
  {
    "id": "protected-doctors",
    "name": "保护医生",
    "module": "客户资源",
    "source": "repos/ios4crm/GCCRM/ViewController/Apply/DoctorPond/DoctorProtectedVC.m",
    "kind": "list",
    "fields": [
      "保护医生及数量"
    ],
    "actions": [
      "取消保护确认",
      "查看主页"
    ],
    "entry": "客户池相关入口/通知",
    "basis": "iOS 源码",
    "fidelity": "结构重建",
    "note": "按 iOS 页面入口、字段和控件关系重建；当前样例数据不代表业务规则。"
  },
  {
    "id": "potential-doctors",
    "name": "慧眼寻医",
    "module": "客户资源",
    "source": "repos/ios4crm/GCCRM/ViewController/Apply/FndDoctor/CRMFindDoctorViewController.swift",
    "kind": "list",
    "fields": [
      "地区",
      "职称",
      "医生类型",
      "患者数量",
      "沟通态度",
      "开方潜力",
      "平台态度",
      "排序"
    ],
    "actions": [
      "筛选重置/完成",
      "查看原因",
      "领取医生",
      "查看主页"
    ],
    "entry": "应用/潜力推荐查看更多",
    "basis": "iOS 源码",
    "fidelity": "结构重建",
    "note": "按 iOS 页面入口、字段和控件关系重建；当前样例数据不代表业务规则。"
  },
  {
    "id": "activities",
    "name": "运营活动",
    "module": "运营激励",
    "source": "repos/ios4crm/GCCRM/ViewController/Activity/CRMActivityVC.swift",
    "kind": "dashboard",
    "fields": [
      "月份",
      "基金/预算数据",
      "提报记录"
    ],
    "actions": [
      "提报规则",
      "月份切换",
      "查看提报明细"
    ],
    "entry": "工作台",
    "basis": "iOS 源码",
    "fidelity": "结构重建",
    "note": "展示月度基金/预算概览、提报记录及规则，没有新增未经确认的预算申报提交流程。"
  },
  {
    "id": "activity-funds",
    "name": "活动资金明细",
    "module": "运营激励",
    "source": "repos/ios4crm/GCCRM/ViewController/Activity/CRMFundsOCVC.m",
    "kind": "detail",
    "fields": [
      "提报总额",
      "普通方活动",
      "个性化活动",
      "医生姓名",
      "提报金额"
    ],
    "actions": [
      "筛选/搜索医生"
    ],
    "entry": "运营活动记录",
    "basis": "iOS 源码",
    "fidelity": "结构重建",
    "note": "按 iOS 页面入口、字段和控件关系重建；当前样例数据不代表业务规则。"
  },
  {
    "id": "reward-pool",
    "name": "奖励池",
    "module": "运营激励",
    "source": "repos/ios4crm/GCCRM/ViewController/Apply/Reward/CRMRewardListVC.swift",
    "kind": "list",
    "fields": [
      "区域",
      "状态",
      "兑换卡数量",
      "推荐医生"
    ],
    "actions": [
      "规则说明",
      "兑换卡详情",
      "领取记录",
      "消耗兑换卡领取确认",
      "更多潜力医生"
    ],
    "entry": "应用",
    "basis": "iOS 源码",
    "fidelity": "结构重建",
    "note": "按 iOS 页面入口、字段和控件关系重建；当前样例数据不代表业务规则。"
  },
  {
    "id": "reward-records",
    "name": "领取记录",
    "module": "运营激励",
    "source": "repos/ios4crm/GCCRM/ViewController/Apply/Reward/CRMRecordListVC.swift",
    "kind": "list",
    "fields": [
      "我的/团队",
      "日期",
      "医助",
      "医生"
    ],
    "actions": [
      "范围/日期筛选",
      "医生主页"
    ],
    "entry": "奖励池",
    "basis": "iOS 源码",
    "fidelity": "结构重建",
    "note": "按 iOS 页面入口、字段和控件关系重建；当前样例数据不代表业务规则。"
  },
  {
    "id": "reward-cards",
    "name": "兑换卡详情",
    "module": "运营激励",
    "source": "repos/ios4crm/GCCRM/ViewController/Apply/Reward/CRMRewardDetailVC.swift",
    "kind": "detail",
    "fields": [
      "兑换卡汇总与明细"
    ],
    "actions": [
      "我的团队",
      "积分明细"
    ],
    "entry": "奖励池",
    "basis": "iOS 源码",
    "fidelity": "结构重建",
    "note": "按 iOS 页面入口、字段和控件关系重建；当前样例数据不代表业务规则。"
  },
  {
    "id": "reward-team",
    "name": "我的团队兑换卡发放",
    "module": "运营激励",
    "source": "repos/ios4crm/GCCRM/ViewController/Apply/Reward/CRMRewardTeamVC.swift",
    "kind": "form",
    "fields": [
      "医助",
      "发放数量",
      "可用兑换卡"
    ],
    "actions": [
      "选医助",
      "数量校验",
      "发放"
    ],
    "entry": "兑换卡详情",
    "basis": "iOS 源码",
    "fidelity": "结构重建",
    "note": "按 iOS 页面入口、字段和控件关系重建；当前样例数据不代表业务规则。"
  },
  {
    "id": "reward-points",
    "name": "积分明细",
    "module": "运营激励",
    "source": "repos/ios4crm/GCCRM/ViewController/Apply/Reward/CRMPointsListVC.swift",
    "kind": "list",
    "fields": [
      "类型",
      "日期",
      "医助",
      "我的/团队"
    ],
    "actions": [
      "筛选"
    ],
    "entry": "兑换卡详情",
    "basis": "iOS 源码",
    "fidelity": "结构重建",
    "note": "按 iOS 页面入口、字段和控件关系重建；当前样例数据不代表业务规则。"
  },
  {
    "id": "reward-rules",
    "name": "奖励池规则管理",
    "module": "运营激励",
    "source": "repos/ios4crm/GCCRM/ViewController/Apply/Reward/CRMRewardRuleManageVC.swift",
    "kind": "form",
    "fields": [
      "新人扶持比例",
      "审核/首单/次单权重",
      "启用省区规则"
    ],
    "actions": [
      "总和100%校验",
      "保存"
    ],
    "entry": "奖励池规则（权限相关）",
    "basis": "iOS 源码",
    "fidelity": "结构重建",
    "note": "iOS 代码要求审核、首单、次单三项权重合计100%；新人扶持比例另计。按 iOS 还原；Android 校验不同，不据此改动两端业务。"
  },
  {
    "id": "mine",
    "name": "我的",
    "module": "个人管理",
    "source": "repos/ios4crm/GCCRM/ViewController/Mine/MineViewController.m",
    "kind": "menu",
    "fields": [
      "姓名角色",
      "区域"
    ],
    "actions": [
      "协同工单",
      "医生活动情况",
      "患者感谢",
      "特殊审批",
      "甘草日历",
      "消息设置",
      "邀请二维码",
      "退出登录"
    ],
    "entry": "我的Tab",
    "basis": "iOS 源码",
    "fidelity": "结构重建",
    "note": "按 iOS 页面入口、字段和控件关系重建；当前样例数据不代表业务规则。"
  },
  {
    "id": "doctor-activity",
    "name": "医生活动情况",
    "module": "个人管理",
    "source": "repos/ios4crm/GCCRM/ViewController/Mine/ActivityDataVC.m",
    "kind": "list",
    "fields": [
      "活动分类",
      "我的/全部",
      "成员",
      "医生"
    ],
    "actions": [
      "筛选",
      "搜索",
      "查看详情"
    ],
    "entry": "我的",
    "basis": "iOS 源码",
    "fidelity": "结构重建",
    "note": "按 iOS 页面入口、字段和控件关系重建；当前样例数据不代表业务规则。"
  },
  {
    "id": "doctor-activity-search",
    "name": "活动医生搜索",
    "module": "个人管理",
    "source": "repos/ios4crm/GCCRM/ViewController/Mine/ActivityDataSearchVC.m",
    "kind": "search",
    "fields": [
      "医生姓名"
    ],
    "actions": [
      "查看详情"
    ],
    "entry": "医生活动情况",
    "basis": "iOS 源码",
    "fidelity": "结构重建",
    "note": "按 iOS 页面入口、字段和控件关系重建；当前样例数据不代表业务规则。"
  },
  {
    "id": "doctor-activity-detail",
    "name": "医生活动详情",
    "module": "个人管理",
    "source": "repos/ios4crm/GCCRM/ViewController/Mine/ActivityDetailVC.m",
    "kind": "detail",
    "fields": [
      "医生",
      "活动数据"
    ],
    "actions": [
      "进入主页"
    ],
    "entry": "活动医生列表",
    "basis": "iOS 源码",
    "fidelity": "结构重建",
    "note": "按 iOS 页面入口、字段和控件关系重建；当前样例数据不代表业务规则。"
  },
  {
    "id": "special-approvals",
    "name": "特殊医生审批",
    "module": "个人管理",
    "source": "repos/ios4crm/GCCRM/ViewController/Mine/CRMSpecialApproveTabVC.m",
    "kind": "tabs",
    "fields": [
      "待审批",
      "已审批"
    ],
    "actions": [
      "查看申请"
    ],
    "entry": "我的（大区经理标识）",
    "basis": "iOS 源码",
    "fidelity": "结构重建",
    "note": "按 iOS 页面入口、字段和控件关系重建；当前样例数据不代表业务规则。"
  },
  {
    "id": "special-approval-detail",
    "name": "审批详情",
    "module": "个人管理",
    "source": "repos/ios4crm/GCCRM/ViewController/Mine/CRMSpecialApproveDetailVC.m",
    "kind": "detail",
    "fields": [
      "基本资料",
      "类型",
      "科室医院",
      "申请人原因时间",
      "头像与资质"
    ],
    "actions": [
      "照片预览",
      "审批通过/不通过确认"
    ],
    "entry": "特殊医生审批列表",
    "basis": "iOS 源码",
    "fidelity": "结构重建",
    "note": "按 iOS 页面入口、字段和控件关系重建；当前样例数据不代表业务规则。"
  },
  {
    "id": "special-qualifications",
    "name": "完善医生资质",
    "module": "个人管理",
    "source": "repos/ios4crm/GCCRM/ViewController/Mine/CRMSpecialUploadVC.m",
    "kind": "form",
    "fields": [
      "头像",
      "身份证正反面",
      "医生类型",
      "无执业证类型",
      "执业证书",
      "资格证",
      "卫计委照",
      "处方笺",
      "西学中证明",
      "申请原因"
    ],
    "actions": [
      "按医生类型变化表单",
      "上传图片",
      "提交审核"
    ],
    "entry": "医生资料/通知",
    "basis": "iOS 源码",
    "fidelity": "结构重建",
    "note": "按 iOS 页面入口、字段和控件关系重建；当前样例数据不代表业务规则。"
  },
  {
    "id": "thanks",
    "name": "患者感谢管理",
    "module": "个人管理",
    "source": "repos/ios4crm/GCCRM/ViewController/Mine/ThankLetterVC.m",
    "kind": "list",
    "fields": [
      "类型",
      "状态",
      "时间"
    ],
    "actions": [
      "筛选",
      "详情",
      "制作确认"
    ],
    "entry": "我的/医生行为",
    "basis": "iOS 源码",
    "fidelity": "结构重建",
    "note": "按 iOS 页面入口、字段和控件关系重建；当前样例数据不代表业务规则。"
  },
  {
    "id": "thanks-detail",
    "name": "患者感谢详情",
    "module": "个人管理",
    "source": "repos/ios4crm/GCCRM/ViewController/Mine/ThankLetterDetailVC.m",
    "kind": "detail",
    "fields": [
      "订单",
      "医生",
      "赠送人",
      "金额",
      "类型内容",
      "状态",
      "收件物流",
      "备注"
    ],
    "actions": [
      "审核感谢信通过/不通过",
      "物流",
      "图片预览"
    ],
    "entry": "患者感谢",
    "basis": "iOS 源码",
    "fidelity": "结构重建",
    "note": "按 iOS 页面入口、字段和控件关系重建；当前样例数据不代表业务规则。"
  },
  {
    "id": "thanks-production",
    "name": "锦旗/感谢信制作确认",
    "module": "个人管理",
    "source": "repos/ios4crm/GCCRM/ViewController/Mine/ThankLetterEditVC.m",
    "kind": "form",
    "fields": [
      "是否制作",
      "赠送人",
      "备注",
      "收货人",
      "手机号",
      "省市区",
      "详细地址"
    ],
    "actions": [
      "确认制作/不制作",
      "收件必填及手机号校验"
    ],
    "entry": "患者感谢待制作",
    "basis": "iOS 源码",
    "fidelity": "结构重建",
    "note": "按 iOS 页面入口、字段和控件关系重建；当前样例数据不代表业务规则。"
  },
  {
    "id": "notification-settings",
    "name": "通知小助手消息配置",
    "module": "个人管理",
    "source": "repos/ios4crm/GCCRM/ViewController/Mine/NoticeMsgSetVC.m",
    "kind": "form",
    "fields": [
      "通知项目及级别",
      "全部/紧急/一般/关闭筛选"
    ],
    "actions": [
      "逐项紧急/一般/关闭",
      "确认保存"
    ],
    "entry": "我的-消息设置",
    "basis": "iOS 源码",
    "fidelity": "结构重建",
    "note": "按 iOS 页面入口、字段和控件关系重建；当前样例数据不代表业务规则。"
  },
  {
    "id": "application",
    "name": "应用中心",
    "module": "订单服务",
    "source": "repos/ios4crm/GCCRM/ViewController/Apply/ApplyNewVC.m",
    "kind": "menu",
    "fields": [
      "经营指标",
      "订单/数据/医生/其他分组"
    ],
    "actions": [
      "订单查询",
      "紧急订单",
      "关注订单",
      "售后投诉",
      "协同工单",
      "问诊订单",
      "咨询订单",
      "药库查询",
      "团队数据",
      "医生数据",
      "华山论剑",
      "皇城PK",
      "流失预警",
      "运营有道",
      "私有池",
      "公有池",
      "拜访记录",
      "奖励池",
      "慧眼寻医",
      "业务资料"
    ],
    "entry": "应用Tab",
    "basis": "iOS 源码 + Figma 可见画布",
    "fidelity": "结构重建",
    "figma": "https://www.figma.com/design/p9Hr9qCb4DbbKgFqgjZrPO/?node-id=2009-228",
    "figmaNote": "应用分组与咨询订单",
    "note": "按 iOS 页面入口、字段和控件关系重建；当前样例数据不代表业务规则。"
  },
  {
    "id": "orders",
    "name": "订单查询",
    "module": "订单服务",
    "source": "repos/ios4crm/GCCRM/ViewController/Apply/OrderInquire/OrderVC.m",
    "kind": "list",
    "fields": [
      "我的/代理/区域/团队/照片方/商城",
      "日期",
      "付款",
      "物流",
      "剂型",
      "药库",
      "包装样式",
      "开票状态",
      "继承关系",
      "绩效年限",
      "医助"
    ],
    "actions": [
      "切范围",
      "筛选重置/完成",
      "搜索",
      "进入订单"
    ],
    "entry": "应用或经营指标",
    "basis": "iOS 源码",
    "fidelity": "结构重建",
    "note": "按 iOS 页面入口、字段和控件关系重建；当前样例数据不代表业务规则。"
  },
  {
    "id": "order-search",
    "name": "搜索订单",
    "module": "订单服务",
    "source": "repos/ios4crm/GCCRM/ViewController/Apply/OrderInquire/OrderSearchVC.m",
    "kind": "search",
    "fields": [
      "订单号",
      "医生姓名",
      "患者姓名",
      "收货地址",
      "医助花名",
      "近10天/30天/3月/1年/全部"
    ],
    "actions": [
      "搜索",
      "历史",
      "搜索结果"
    ],
    "entry": "订单查询/关注订单",
    "basis": "iOS 源码",
    "fidelity": "结构重建",
    "note": "按 iOS 页面入口、字段和控件关系重建；当前样例数据不代表业务规则。"
  },
  {
    "id": "order-search-results",
    "name": "订单搜索结果",
    "module": "订单服务",
    "source": "repos/ios4crm/GCCRM/ViewController/Apply/OrderInquire/OrderSearchResultVC.m",
    "kind": "list",
    "fields": [
      "订单卡片"
    ],
    "actions": [
      "订单详情"
    ],
    "entry": "订单搜索",
    "basis": "iOS 源码",
    "fidelity": "结构重建",
    "note": "按 iOS 页面入口、字段和控件关系重建；当前样例数据不代表业务规则。"
  },
  {
    "id": "order-detail",
    "name": "订单详情",
    "module": "订单服务",
    "source": "repos/ios4crm/GCCRM/ViewController/Apply/OrderInquire/OrderDetailVC.m",
    "kind": "detail",
    "fields": [
      "订单编号",
      "物流状态",
      "医生信息",
      "患者信息",
      "下单/支付时间",
      "医嘱备注",
      "医生/客服药房联备注",
      "剂型剂数",
      "药方服法",
      "临床诊断",
      "收件地址",
      "退款信息",
      "协同工单",
      "实付及价格明细",
      "医生/患者/客服备注",
      "投诉"
    ],
    "actions": [
      "关注/取消",
      "催付确认",
      "修改地址",
      "开发票",
      "紧急退款",
      "订单追踪",
      "药方溯源",
      "用药单/面单预览",
      "投诉",
      "关联工单/发起协同",
      "医生主页"
    ],
    "entry": "订单列表/搜索/通知",
    "basis": "iOS 源码",
    "fidelity": "结构重建",
    "note": "按 iOS 页面入口、字段和控件关系重建；当前样例数据不代表业务规则。"
  },
  {
    "id": "order-logistics",
    "name": "订单追踪",
    "module": "订单服务",
    "source": "repos/ios4crm/GCCRM/ViewController/Apply/OrderInquire/LogisticsVC.m",
    "kind": "timeline",
    "fields": [
      "承运公司",
      "单号",
      "物流轨迹"
    ],
    "actions": [
      "复制单号/官网",
      "查看面单"
    ],
    "entry": "订单或商城订单详情",
    "basis": "iOS 源码",
    "fidelity": "结构重建",
    "note": "按 iOS 页面入口、字段和控件关系重建；当前样例数据不代表业务规则。"
  },
  {
    "id": "order-prescription-trace",
    "name": "药方溯源",
    "module": "订单服务",
    "source": "repos/ios4crm/GCCRM/ViewController/Apply/OrderInquire/OrderPrescriptionListVC.m",
    "kind": "timeline",
    "fields": [
      "订单信息",
      "药方剂型",
      "支付时间",
      "供应商",
      "PDA流程",
      "高拍仪取样照片"
    ],
    "actions": [
      "预览照片"
    ],
    "entry": "订单详情",
    "basis": "iOS 源码",
    "fidelity": "结构重建",
    "note": "按 iOS 页面入口、字段和控件关系重建；当前样例数据不代表业务规则。"
  },
  {
    "id": "order-image",
    "name": "用药单/面单详情",
    "module": "订单服务",
    "source": "repos/ios4crm/GCCRM/ViewController/Apply/OrderInquire/OrderMedicinePictureVC.m",
    "kind": "image",
    "fields": [
      "药房联",
      "用户联",
      "面单图片"
    ],
    "actions": [
      "切换/放大",
      "保存图片"
    ],
    "entry": "订单详情/物流",
    "basis": "iOS 源码",
    "fidelity": "结构重建",
    "note": "按 iOS 页面入口、字段和控件关系重建；当前样例数据不代表业务规则。"
  },
  {
    "id": "order-address",
    "name": "收货地址修改",
    "module": "订单服务",
    "source": "repos/ios4crm/GCCRM/ViewController/Apply/OrderInquire/OrderEditeAddressVC.m",
    "kind": "form",
    "fields": [
      "姓名",
      "手机号",
      "所在地区",
      "详细地址"
    ],
    "actions": [
      "选择地区",
      "必填校验",
      "确认修改"
    ],
    "entry": "订单详情操作",
    "basis": "iOS 源码",
    "fidelity": "结构重建",
    "note": "按 iOS 页面入口、字段和控件关系重建；当前样例数据不代表业务规则。"
  },
  {
    "id": "order-invoice",
    "name": "开发票",
    "module": "订单服务",
    "source": "repos/ios4crm/GCCRM/ViewController/Apply/OrderInquire/OpenInvoiceVC.m",
    "kind": "form",
    "fields": [
      "发票类型（当前默认电子普通发票）",
      "发票抬头",
      "手机号",
      "电子邮箱",
      "备注"
    ],
    "actions": [
      "必填校验",
      "提交"
    ],
    "entry": "订单详情操作",
    "basis": "iOS 源码",
    "fidelity": "结构重建",
    "note": "按 iOS 页面入口、字段和控件关系重建；当前样例数据不代表业务规则。"
  },
  {
    "id": "order-refund",
    "name": "紧急退款",
    "module": "订单服务",
    "source": "repos/ios4crm/GCCRM/ViewController/Apply/OrderInquire/EmergencyRefundVC.m",
    "kind": "form",
    "fields": [
      "退款类型（全单退款）",
      "退款原因（接口可选项）"
    ],
    "actions": [
      "选原因",
      "提交"
    ],
    "entry": "订单详情操作",
    "basis": "iOS 源码",
    "fidelity": "结构重建",
    "note": "按 iOS 页面入口、字段和控件关系重建；当前样例数据不代表业务规则。"
  },
  {
    "id": "order-complaint",
    "name": "售后投诉提交",
    "module": "订单服务",
    "source": "repos/ios4crm/GCCRM/ViewController/Apply/OrderInquire/OrderComplaintVC.m",
    "kind": "form",
    "fields": [
      "投诉对象（供应商/医生/患者/物流商/甘草平台/其他）",
      "供应商",
      "投诉选项",
      "说明/图片（由视图和接口提供）"
    ],
    "actions": [
      "选择对象/分类",
      "上传",
      "提交"
    ],
    "entry": "订单详情投诉",
    "basis": "iOS 源码",
    "fidelity": "结构重建",
    "note": "按 iOS 页面入口、字段和控件关系重建；当前样例数据不代表业务规则。"
  },
  {
    "id": "urgent-orders",
    "name": "紧急订单",
    "module": "订单服务",
    "source": "repos/ios4crm/GCCRM/ViewController/Apply/OrderInquire/EmergencyOrderTabVC.m",
    "kind": "tabs",
    "fields": [
      "我的/团队/区域",
      "全部/应发未发/发货超时/收货异常"
    ],
    "actions": [
      "范围状态切换",
      "订单详情"
    ],
    "entry": "应用",
    "basis": "iOS 源码",
    "fidelity": "结构重建",
    "note": "按 iOS 页面入口、字段和控件关系重建；当前样例数据不代表业务规则。"
  },
  {
    "id": "focused-orders",
    "name": "关注订单",
    "module": "订单服务",
    "source": "repos/ios4crm/GCCRM/ViewController/Apply/OrderInquire/FocusOrderVC.m",
    "kind": "list",
    "fields": [
      "关注订单卡片"
    ],
    "actions": [
      "搜索",
      "订单详情",
      "取消关注"
    ],
    "entry": "应用",
    "basis": "iOS 源码",
    "fidelity": "结构重建",
    "note": "按 iOS 页面入口、字段和控件关系重建；当前样例数据不代表业务规则。"
  },
  {
    "id": "photo-orders",
    "name": "照片方订单",
    "module": "订单服务",
    "source": "repos/ios4crm/GCCRM/ViewController/Apply/OrderInquire/GraphicOrderVC.m",
    "kind": "tabs",
    "fields": [
      "全部",
      "待录方",
      "待复核",
      "待医生确认",
      "已处理",
      "已取消;近10天/30天/3月/1年/全部"
    ],
    "actions": [
      "状态时间切换",
      "搜索",
      "订单详情"
    ],
    "entry": "订单范围切换",
    "basis": "iOS 源码",
    "fidelity": "结构重建",
    "note": "按 iOS 页面入口、字段和控件关系重建；当前样例数据不代表业务规则。"
  },
  {
    "id": "photo-order-detail",
    "name": "照片方订单详情",
    "module": "订单服务",
    "source": "repos/ios4crm/GCCRM/ViewController/Apply/OrderInquire/GraphicOrderDetailVC.m",
    "kind": "detail",
    "fields": [
      "订单编号",
      "照片方状态",
      "医生",
      "患者",
      "下单时间",
      "医嘱备注",
      "收件地址",
      "剂型",
      "药库",
      "开方图片"
    ],
    "actions": [
      "预览图片",
      "医生主页"
    ],
    "entry": "照片方列表",
    "basis": "iOS 源码",
    "fidelity": "结构重建",
    "note": "按 iOS 页面入口、字段和控件关系重建；当前样例数据不代表业务规则。"
  },
  {
    "id": "photo-search-results",
    "name": "照片方搜索结果",
    "module": "订单服务",
    "source": "repos/ios4crm/GCCRM/ViewController/Apply/OrderInquire/GraphicOrderSearchResultVC.m",
    "kind": "list",
    "fields": [
      "照片方卡片"
    ],
    "actions": [
      "照片方详情"
    ],
    "entry": "照片方搜索",
    "basis": "iOS 源码",
    "fidelity": "结构重建",
    "note": "按 iOS 页面入口、字段和控件关系重建；当前样例数据不代表业务规则。"
  },
  {
    "id": "mall-orders",
    "name": "商城订单",
    "module": "订单服务",
    "source": "repos/ios4crm/GCCRM/ViewController/Apply/StoreOrder/StoreOrderListVC.m",
    "kind": "list",
    "fields": [
      "日期",
      "订单卡片"
    ],
    "actions": [
      "时间切换",
      "搜索",
      "商城订单详情"
    ],
    "entry": "订单范围商城或经营商城指标",
    "basis": "iOS 源码",
    "fidelity": "结构重建",
    "note": "按 iOS 页面入口、字段和控件关系重建；当前样例数据不代表业务规则。"
  },
  {
    "id": "mall-search",
    "name": "搜索商城订单",
    "module": "订单服务",
    "source": "repos/ios4crm/GCCRM/ViewController/Apply/StoreOrder/StoreOrderSearchVC.m",
    "kind": "search",
    "fields": [
      "订单号/医生姓名/收件人姓名"
    ],
    "actions": [
      "搜索结果"
    ],
    "entry": "商城订单",
    "basis": "iOS 源码",
    "fidelity": "结构重建",
    "note": "按 iOS 页面入口、字段和控件关系重建；当前样例数据不代表业务规则。"
  },
  {
    "id": "mall-search-results",
    "name": "商城订单搜索结果",
    "module": "订单服务",
    "source": "repos/ios4crm/GCCRM/ViewController/Apply/StoreOrder/StoreOrderSearchResultVC.m",
    "kind": "list",
    "fields": [
      "商城订单卡片"
    ],
    "actions": [
      "商城订单详情"
    ],
    "entry": "商城搜索",
    "basis": "iOS 源码",
    "fidelity": "结构重建",
    "note": "按 iOS 页面入口、字段和控件关系重建；当前样例数据不代表业务规则。"
  },
  {
    "id": "mall-detail",
    "name": "商城订单详情",
    "module": "订单服务",
    "source": "repos/ios4crm/GCCRM/ViewController/Apply/StoreOrder/StoreOrderDetailVC.m",
    "kind": "detail",
    "fields": [
      "订单编号",
      "物流",
      "推荐医生",
      "用户",
      "下单/支付时间",
      "收件地址",
      "退款信息",
      "商品",
      "总价",
      "运费",
      "优惠",
      "实付"
    ],
    "actions": [
      "复制",
      "医生主页",
      "订单追踪"
    ],
    "entry": "商城列表",
    "basis": "iOS 源码",
    "fidelity": "结构重建",
    "note": "按 iOS 页面入口、字段和控件关系重建；当前样例数据不代表业务规则。"
  },
  {
    "id": "after-sales",
    "name": "售后投诉",
    "module": "订单服务",
    "source": "repos/ios4crm/GCCRM/ViewController/Apply/AfterSale/AfterSaleVC.m",
    "kind": "tabs",
    "fields": [
      "售后类型/退款等分组",
      "全部/全单退款/部分退款",
      "未完成/已完成",
      "时间"
    ],
    "actions": [
      "状态筛选",
      "搜索",
      "售后详情"
    ],
    "entry": "应用",
    "basis": "iOS 源码",
    "fidelity": "结构重建",
    "note": "按 iOS 页面入口、字段和控件关系重建；当前样例数据不代表业务规则。"
  },
  {
    "id": "after-sale-detail",
    "name": "售后详情",
    "module": "订单服务",
    "source": "repos/ios4crm/GCCRM/ViewController/Apply/AfterSale/AfterSaleDetailVC.m",
    "kind": "detail",
    "fields": [
      "关联订单",
      "物流",
      "医生患者",
      "下单/支付时间",
      "剂型",
      "售后类型",
      "状态",
      "退款金额",
      "提交时间",
      "跟进时间/人/内容",
      "图片"
    ],
    "actions": [
      "关联订单详情",
      "图片预览",
      "医生主页"
    ],
    "entry": "售后列表",
    "basis": "iOS 源码",
    "fidelity": "结构重建",
    "note": "按 iOS 页面入口、字段和控件关系重建；当前样例数据不代表业务规则。"
  },
  {
    "id": "after-sale-search",
    "name": "售后搜索",
    "module": "订单服务",
    "source": "repos/ios4crm/GCCRM/ViewController/Apply/AfterSale/AfterSaleSearchVC.m",
    "kind": "search",
    "fields": [
      "订单号",
      "医生姓名",
      "患者姓名"
    ],
    "actions": [
      "输入关键词",
      "搜索历史",
      "查看售后结果"
    ],
    "entry": "订单搜索售后模式",
    "basis": "iOS 源码",
    "fidelity": "结构重建",
    "note": "按 iOS 页面入口、字段和控件关系重建；当前样例数据不代表业务规则。"
  },
  {
    "id": "drug-storage",
    "name": "药库查询",
    "module": "订单服务",
    "source": "repos/ios4crm/GCCRM/ViewController/Apply/Drug /DrugStorageSearchVC.m",
    "kind": "list",
    "fields": [
      "药库名称",
      "药品",
      "充足/紧张/暂停"
    ],
    "actions": [
      "输入药库关键词",
      "筛选",
      "查看药品供应状态"
    ],
    "entry": "应用",
    "basis": "iOS 源码",
    "fidelity": "结构重建",
    "note": "查询药库与供应状态，未凭空增加药库详情或库存修改操作。"
  },
  {
    "id": "inquiry-orders",
    "name": "问诊订单（旧列表页内标题为咨询订单）",
    "module": "问诊咨询",
    "source": "repos/ios4crm/GCCRM/ViewController/Apply/Chat/ChatListVC.m",
    "kind": "tabs",
    "fields": [
      "我的/代理/团队/区域",
      "日期",
      "待完善/待回复/待开方/已退款",
      "排序"
    ],
    "actions": [
      "范围/状态/时间/排序筛选",
      "搜索",
      "订单详情"
    ],
    "entry": "应用-问诊订单",
    "basis": "iOS 源码",
    "fidelity": "结构重建",
    "note": "按 iOS 页面入口、字段和控件关系重建；当前样例数据不代表业务规则。"
  },
  {
    "id": "inquiry-search",
    "name": "搜索问诊订单",
    "module": "问诊咨询",
    "source": "repos/ios4crm/GCCRM/ViewController/Apply/Chat/ChatSearchVC.m",
    "kind": "search",
    "fields": [
      "订单号",
      "医生姓名",
      "患者姓名",
      "日期"
    ],
    "actions": [
      "历史",
      "搜索结果"
    ],
    "entry": "问诊订单搜索",
    "basis": "iOS 源码",
    "fidelity": "结构重建",
    "note": "按 iOS 页面入口、字段和控件关系重建；当前样例数据不代表业务规则。"
  },
  {
    "id": "inquiry-search-results",
    "name": "问诊搜索结果",
    "module": "问诊咨询",
    "source": "repos/ios4crm/GCCRM/ViewController/Apply/Chat/ChatSearchResultVC.m",
    "kind": "list",
    "fields": [
      "问诊订单卡片"
    ],
    "actions": [
      "问诊订单详情"
    ],
    "entry": "问诊搜索",
    "basis": "iOS 源码",
    "fidelity": "结构重建",
    "note": "按 iOS 页面入口、字段和控件关系重建；当前样例数据不代表业务规则。"
  },
  {
    "id": "inquiry-detail",
    "name": "问诊订单详情",
    "module": "问诊咨询",
    "source": "repos/ios4crm/GCCRM/ViewController/Apply/Chat/ChatDetailVC.m",
    "kind": "detail",
    "fields": [
      "订单编号",
      "问诊状态",
      "医生患者",
      "开始/结束时间",
      "咨询费",
      "是否开方",
      "来源",
      "退款"
    ],
    "actions": [
      "问诊详情聊天",
      "医生主页"
    ],
    "entry": "问诊订单/通知",
    "basis": "iOS 源码",
    "fidelity": "结构重建",
    "note": "按 iOS 页面入口、字段和控件关系重建；当前样例数据不代表业务规则。"
  },
  {
    "id": "inquiry-chat",
    "name": "问诊详情",
    "module": "问诊咨询",
    "source": "repos/ios4crm/GCCRM/ViewController/Apply/Chat/ChatMessageListVC.m",
    "kind": "chat",
    "fields": [
      "医患会话记录"
    ],
    "actions": [
      "查看聊天/图片",
      "涉及商业机密提示"
    ],
    "entry": "问诊订单详情",
    "basis": "iOS 源码",
    "fidelity": "结构重建",
    "note": "按 iOS 页面入口、字段和控件关系重建；当前样例数据不代表业务规则。"
  },
  {
    "id": "consultations",
    "name": "咨询订单（新）",
    "module": "问诊咨询",
    "source": "repos/ios4crm/GCCRM/ViewController/Apply/AskOrder/CRMAskOrderVC.swift",
    "kind": "list",
    "fields": [
      "近10天/30天/3月/1年/全部",
      "医生",
      "医助",
      "患者",
      "咨询类型",
      "创建时间",
      "订单号"
    ],
    "actions": [
      "时间筛选",
      "搜索",
      "头像进入医生主页（整行无详情跳转）"
    ],
    "entry": "应用-咨询订单",
    "basis": "iOS 源码 + Figma 可见画布",
    "fidelity": "结构重建",
    "figma": "https://www.figma.com/design/p9Hr9qCb4DbbKgFqgjZrPO/?node-id=2009-228",
    "figmaNote": "咨询订单列表与空状态",
    "note": "新版咨询列表整行没有订单详情跳转，仅头像进入医生主页。时间及搜索可操作。"
  },
  {
    "id": "consultation-search",
    "name": "咨询订单搜索",
    "module": "问诊咨询",
    "source": "repos/ios4crm/GCCRM/ViewController/Apply/AskOrder/CRMAskOrderSearchVC.swift",
    "kind": "search",
    "fields": [
      "医生姓名/订单号",
      "历史"
    ],
    "actions": [
      "搜索结果"
    ],
    "entry": "新版咨询订单",
    "basis": "iOS 源码 + Figma 可见画布",
    "fidelity": "结构重建",
    "figma": "https://www.figma.com/design/p9Hr9qCb4DbbKgFqgjZrPO/?node-id=2009-228",
    "figmaNote": "咨询搜索相关样式",
    "note": "按 iOS 页面入口、字段和控件关系重建；当前样例数据不代表业务规则。"
  },
  {
    "id": "consultation-results",
    "name": "咨询订单搜索结果",
    "module": "问诊咨询",
    "source": "repos/ios4crm/GCCRM/ViewController/Apply/AskOrder/CRMAskOrderSearchResultVC.swift",
    "kind": "list",
    "fields": [
      "咨询卡片",
      "时间"
    ],
    "actions": [
      "头像进入医生主页（不假造独立详情）"
    ],
    "entry": "新版咨询搜索",
    "basis": "iOS 源码 + Figma 可见画布",
    "fidelity": "结构重建",
    "figma": "https://www.figma.com/design/p9Hr9qCb4DbbKgFqgjZrPO/?node-id=2009-228",
    "figmaNote": "咨询订单列表",
    "note": "保留新版咨询列表的交互边界，不套用旧问诊详情。"
  },
  {
    "id": "workorders",
    "name": "协同工单",
    "module": "协同工单",
    "source": "repos/ios4crm/GCCRM/ViewController/Synergy/CRMSynergyTabVC.m",
    "kind": "tabs",
    "fields": [
      "我发起的",
      "待我处理",
      "全部"
    ],
    "actions": [
      "切换",
      "工单详情",
      "选择类型创建工单"
    ],
    "entry": "首页工单/应用/我的",
    "basis": "iOS 源码",
    "fidelity": "结构重建",
    "note": "按 iOS 页面入口、字段和控件关系重建；当前样例数据不代表业务规则。"
  },
  {
    "id": "workorder-list",
    "name": "协同工单列表",
    "module": "协同工单",
    "source": "repos/ios4crm/GCCRM/ViewController/Synergy/CRMSynergyListVC.m",
    "kind": "list",
    "fields": [
      "类型/状态",
      "工单摘要"
    ],
    "actions": [
      "当前行进入聊天式详情",
      "创建工单/选择工单类型"
    ],
    "entry": "协同页签或订单关联工单",
    "basis": "iOS 源码",
    "fidelity": "结构重建",
    "note": "按 iOS 页面入口、字段和控件关系重建；当前样例数据不代表业务规则。"
  },
  {
    "id": "workorder-chat",
    "name": "工单聊天详情（当前列表默认）",
    "module": "协同工单",
    "source": "repos/ios4crm/GCCRM/ViewController/Synergy/CRMSynergyChatDetailVC.m",
    "kind": "chat",
    "fields": [
      "工单名称",
      "状态",
      "编号",
      "发起人",
      "时间",
      "跟进人",
      "工单信息",
      "评价/是否解决",
      "消息及附件"
    ],
    "actions": [
      "文本/图片回复",
      "图片/文件预览",
      "资料明细",
      "关联订单",
      "退回",
      "转派",
      "完成",
      "发起人删除确认"
    ],
    "entry": "CRMSynergyListVC当前生效push",
    "basis": "iOS 源码 + Figma 可见画布",
    "fidelity": "结构重建",
    "figma": "https://www.figma.com/design/p9Hr9qCb4DbbKgFqgjZrPO/?node-id=648-18",
    "figmaNote": "处理记录、输入、图片及附件",
    "note": "当前 iOS 工单列表默认进入聊天式详情。原型支持消息、附件及角色相关操作演示，权限以真实服务端为准。"
  },
  {
    "id": "workorder-info",
    "name": "工单资料详情（保留入口）",
    "module": "协同工单",
    "source": "repos/ios4crm/GCCRM/ViewController/Synergy/CRMSynergyDetailVC.m",
    "kind": "detail",
    "fields": [
      "工单信息",
      "评价",
      "处理记录"
    ],
    "actions": [
      "关联订单",
      "回复",
      "退回",
      "转派",
      "完成",
      "删除确认"
    ],
    "entry": "通知/工作台仍存在该详情跳转",
    "basis": "iOS 源码 + Figma 可见画布",
    "fidelity": "结构重建",
    "figma": "https://www.figma.com/design/p9Hr9qCb4DbbKgFqgjZrPO/?node-id=648-18",
    "figmaNote": "工单详情的处理记录关系",
    "note": "按 iOS 页面入口、字段和控件关系重建；当前样例数据不代表业务规则。"
  },
  {
    "id": "workorder-create",
    "name": "发起协同",
    "module": "协同工单",
    "source": "repos/ios4crm/GCCRM/ViewController/Synergy/CRMSynergyCreateVC.m",
    "kind": "form",
    "fields": [
      "问题分类",
      "工单名称",
      "说明内容",
      "动态工单模板字段",
      "协同信息",
      "图片附件"
    ],
    "actions": [
      "类型选择",
      "单选/多选/文本/数字校验",
      "上传/删除附件",
      "确定"
    ],
    "entry": "创建工单或订单关联发起",
    "basis": "iOS 源码",
    "fidelity": "结构重建",
    "note": "固定表单来自 iOS；额外的协同字段由服务端模板下发。原型只演示示例字段组合，未覆盖所有工单模板。"
  },
  {
    "id": "workorder-reply",
    "name": "协同工单回复",
    "module": "协同工单",
    "source": "repos/ios4crm/GCCRM/ViewController/Synergy/CRMSynergyReplyVC.m",
    "kind": "form",
    "fields": [
      "说明",
      "下一步（待反馈/待确认结单）",
      "图片附件"
    ],
    "actions": [
      "上传/删除",
      "确定"
    ],
    "entry": "工单详情",
    "basis": "iOS 源码",
    "fidelity": "结构重建",
    "note": "按 iOS 页面入口、字段和控件关系重建；当前样例数据不代表业务规则。"
  },
  {
    "id": "workorder-return",
    "name": "协同工单退回",
    "module": "协同工单",
    "source": "repos/ios4crm/GCCRM/ViewController/Synergy/CRMSynergySendBackVC.m",
    "kind": "form",
    "fields": [
      "退回说明"
    ],
    "actions": [
      "必填校验",
      "确定退回上一个人"
    ],
    "entry": "工单详情",
    "basis": "iOS 源码",
    "fidelity": "结构重建",
    "note": "按 iOS 页面入口、字段和控件关系重建；当前样例数据不代表业务规则。"
  },
  {
    "id": "workorder-transfer",
    "name": "协同工单转派",
    "module": "协同工单",
    "source": "repos/ios4crm/GCCRM/ViewController/Synergy/CRMSynergyRedeployVC.m",
    "kind": "form",
    "fields": [
      "说明",
      "跟进方式",
      "跟进组",
      "跟进人"
    ],
    "actions": [
      "选组/人",
      "必填校验",
      "确定"
    ],
    "entry": "工单详情",
    "basis": "iOS 源码",
    "fidelity": "结构重建",
    "note": "按 iOS 页面入口、字段和控件关系重建；当前样例数据不代表业务规则。"
  },
  {
    "id": "workorder-select-person",
    "name": "选择协同人员",
    "module": "协同工单",
    "source": "repos/ios4crm/GCCRM/ViewController/Synergy/CRMSynergySearchVC.m",
    "kind": "search",
    "fields": [
      "花名或手机号"
    ],
    "actions": [
      "选择跟进人"
    ],
    "entry": "工单转派",
    "basis": "iOS 源码",
    "fidelity": "结构重建",
    "note": "按 iOS 页面入口、字段和控件关系重建；当前样例数据不代表业务规则。"
  },
  {
    "id": "workorder-finish",
    "name": "协同工单完成",
    "module": "协同工单",
    "source": "repos/ios4crm/GCCRM/ViewController/Synergy/CRMSynergyFinishedVC.m",
    "kind": "form",
    "fields": [
      "评价（满意/一般/不满意）",
      "是否解决（已解决/未解决）"
    ],
    "actions": [
      "选择",
      "确定"
    ],
    "entry": "工单详情",
    "basis": "iOS 源码",
    "fidelity": "结构重建",
    "note": "按 iOS 页面入口、字段和控件关系重建；当前样例数据不代表业务规则。"
  },
  {
    "id": "attachment-preview",
    "name": "附件/资料预览",
    "module": "协同工单",
    "source": "repos/ios4crm/GCCRM/ViewController/Synergy/CRMSynergyDoucumentVC.m",
    "kind": "document",
    "fields": [
      "文件内容"
    ],
    "actions": [
      "下载/存储到文件",
      "失败重试"
    ],
    "entry": "工单附件或业务资料",
    "basis": "iOS 源码",
    "fidelity": "结构重建",
    "note": "资料预览使用本地演示文档；不复制内部业务文件内容。"
  },
  {
    "id": "doctor-board",
    "name": "医生数据",
    "module": "经营数据",
    "source": "repos/ios4crm/GCCRM/ViewController/Apply/DataBoardVC.m",
    "kind": "dashboard",
    "fields": [
      "时间",
      "个人/团队/区域",
      "地区/医助",
      "普通方/膏方/丸剂",
      "医生数据"
    ],
    "actions": [
      "切范围/日期",
      "医生收入看板",
      "收支明细"
    ],
    "entry": "应用",
    "basis": "iOS 源码",
    "fidelity": "结构重建",
    "note": "按 iOS 页面入口、字段和控件关系重建；当前样例数据不代表业务规则。"
  },
  {
    "id": "doctor-income-board",
    "name": "医生收入看板",
    "module": "经营数据",
    "source": "repos/ios4crm/GCCRM/ViewController/Apply/DoctorIncome/DoctorIncomeVC.m",
    "kind": "list",
    "fields": [
      "医生姓名",
      "本月收入",
      "税后金额",
      "纳税方式",
      "签约情况"
    ],
    "actions": [
      "医生收支明细",
      "切月份"
    ],
    "entry": "医生数据",
    "basis": "iOS 源码",
    "fidelity": "结构重建",
    "note": "按 iOS 页面入口、字段和控件关系重建；当前样例数据不代表业务规则。"
  },
  {
    "id": "doctor-metric-list",
    "name": "指标医生明细",
    "module": "经营数据",
    "source": "repos/ios4crm/GCCRM/ViewController/Apply/DoctorInquire/DoctorFilterVC.m",
    "kind": "list",
    "fields": [
      "等级",
      "状态",
      "职称",
      "地点",
      "科室",
      "医生卡片"
    ],
    "actions": [
      "筛选",
      "搜索",
      "医生主页"
    ],
    "entry": "应用指标下钻",
    "basis": "iOS 源码",
    "fidelity": "结构重建",
    "note": "按 iOS 页面入口、字段和控件关系重建；当前样例数据不代表业务规则。"
  },
  {
    "id": "doctor-metric-search",
    "name": "指标医生搜索",
    "module": "经营数据",
    "source": "repos/ios4crm/GCCRM/ViewController/Apply/DoctorInquire/DoctorFilterSearchVC.m",
    "kind": "search",
    "fields": [
      "医生姓名"
    ],
    "actions": [
      "结果/新增医生"
    ],
    "entry": "指标医生列表",
    "basis": "iOS 源码",
    "fidelity": "结构重建",
    "note": "按 iOS 页面入口、字段和控件关系重建；当前样例数据不代表业务规则。"
  },
  {
    "id": "team-data",
    "name": "团队数据",
    "module": "经营数据",
    "source": "repos/ios4crm/GCCRM/ViewController/Apply/TeamData/TeamDataVC.m",
    "kind": "list",
    "fields": [
      "我的团队/我的代理",
      "时间",
      "医助",
      "总药费",
      "总排名",
      "普通方",
      "审核",
      "首单",
      "次单",
      "开单"
    ],
    "actions": [
      "切时间/范围",
      "医助业绩明细"
    ],
    "entry": "应用",
    "basis": "iOS 源码",
    "fidelity": "结构重建",
    "note": "按 iOS 页面入口、字段和控件关系重建；当前样例数据不代表业务规则。"
  },
  {
    "id": "member-data",
    "name": "医助业绩数据",
    "module": "经营数据",
    "source": "repos/ios4crm/GCCRM/ViewController/Apply/TeamData/ManagerDataVC.m",
    "kind": "detail",
    "fields": [
      "医助",
      "业绩",
      "继承/非继承",
      "普通方",
      "棒棒糖",
      "中成药",
      "膏方",
      "商城",
      "审核医生/开单医生"
    ],
    "actions": [
      "时间切换"
    ],
    "entry": "团队成员",
    "basis": "iOS 源码",
    "fidelity": "结构重建",
    "note": "按 iOS 页面入口、字段和控件关系重建；当前样例数据不代表业务规则。"
  },
  {
    "id": "mall-data",
    "name": "商城数据",
    "module": "经营数据",
    "source": "repos/ios4crm/GCCRM/ViewController/Apply/StoreOrder/StoreOrderDataVC.m",
    "kind": "dashboard",
    "fields": [
      "推荐订单",
      "累计支付",
      "订单均价",
      "业绩",
      "医生"
    ],
    "actions": [
      "订单明细"
    ],
    "entry": "应用商城指标",
    "basis": "iOS 源码",
    "fidelity": "结构重建",
    "note": "按 iOS 页面入口、字段和控件关系重建；当前样例数据不代表业务规则。"
  },
  {
    "id": "runoff-warning",
    "name": "医生流失预警",
    "module": "经营数据",
    "source": "repos/ios4crm/GCCRM/ViewController/Apply/Warning/CRMWarningDataVC.m",
    "kind": "list",
    "fields": [
      "预警情况",
      "连续天数",
      "医生姓名",
      "最近7天/30天",
      "前3月周/月平均"
    ],
    "actions": [
      "切换暂不预警名单",
      "筛选",
      "预警详情"
    ],
    "entry": "应用",
    "basis": "iOS 源码",
    "fidelity": "结构重建",
    "note": "按 iOS 页面入口、字段和控件关系重建；当前样例数据不代表业务规则。"
  },
  {
    "id": "runoff-warning-detail",
    "name": "医生流失预警详情",
    "module": "经营数据",
    "source": "repos/ios4crm/GCCRM/ViewController/Apply/Warning/CRMDoctorWarnDetailVC.m",
    "kind": "detail",
    "fields": [
      "医生",
      "预警及行为数据"
    ],
    "actions": [
      "医生主页"
    ],
    "entry": "流失预警列表",
    "basis": "iOS 源码",
    "fidelity": "结构重建",
    "note": "按 iOS 页面入口、字段和控件关系重建；当前样例数据不代表业务规则。"
  },
  {
    "id": "huashan",
    "name": "华山论剑",
    "module": "运营激励",
    "source": "repos/ios4crm/GCCRM/ViewController/Huashan/HuashanVC.m",
    "kind": "ranking",
    "fields": [
      "月份",
      "服务端榜单分类",
      "本期/上期",
      "新审核/新开单/膏方/丸剂/次单"
    ],
    "actions": [
      "月份切换",
      "榜单/成就/数据切换"
    ],
    "entry": "应用",
    "basis": "iOS 源码",
    "fidelity": "结构重建",
    "note": "按 iOS 页面入口、字段和控件关系重建；当前样例数据不代表业务规则。"
  },
  {
    "id": "pk-center",
    "name": "皇城PK",
    "module": "运营激励",
    "source": "repos/ios4crm/GCCRM/ViewController/Apply/PK/PKCenterVC.m",
    "kind": "tabs",
    "fields": [
      "我的对战",
      "我发起的",
      "全部对战"
    ],
    "actions": [
      "发起对战",
      "进入对战"
    ],
    "entry": "应用",
    "basis": "iOS 源码",
    "fidelity": "结构重建",
    "note": "按 iOS 页面入口、字段和控件关系重建；当前样例数据不代表业务规则。"
  },
  {
    "id": "pk-detail",
    "name": "对战详情",
    "module": "运营激励",
    "source": "repos/ios4crm/GCCRM/ViewController/Apply/PK/PKDetailVC.m",
    "kind": "detail",
    "fields": [
      "对战信息",
      "排名统计",
      "队伍数据"
    ],
    "actions": [
      "排行榜",
      "队伍详情",
      "删除确认"
    ],
    "entry": "PK列表",
    "basis": "iOS 源码",
    "fidelity": "结构重建",
    "note": "按 iOS 页面入口、字段和控件关系重建；当前样例数据不代表业务规则。"
  },
  {
    "id": "pk-create",
    "name": "发起对战",
    "module": "运营激励",
    "source": "repos/ios4crm/GCCRM/ViewController/Apply/PK/PKAddNewTeamVC.m",
    "kind": "form",
    "fields": [
      "权限管理",
      "队伍信息",
      "队名",
      "队员",
      "范围",
      "对战标题",
      "开始/结束时间",
      "对战指标等"
    ],
    "actions": [
      "添加/删除队伍",
      "选择队员",
      "权限",
      "日期",
      "提交确认"
    ],
    "entry": "PK发起对战",
    "basis": "iOS 源码",
    "fidelity": "结构重建",
    "note": "队伍、指标和权限选项以原生结构组织。原型演示队员选择与顺序调整，真实规则待接口核对。"
  },
  {
    "id": "pk-team-select",
    "name": "选择PK成员/团队",
    "module": "运营激励",
    "source": "repos/ios4crm/GCCRM/ViewController/Apply/PK/PKTeamListVC.m",
    "kind": "list",
    "fields": [
      "团队/成员"
    ],
    "actions": [
      "多选",
      "完成"
    ],
    "entry": "发起对战队员",
    "basis": "iOS 源码",
    "fidelity": "结构重建",
    "note": "按 iOS 页面入口、字段和控件关系重建；当前样例数据不代表业务规则。"
  },
  {
    "id": "pk-ranking",
    "name": "PK排名统计",
    "module": "运营激励",
    "source": "repos/ios4crm/GCCRM/ViewController/Apply/PK/PKDetailRankListVC.m",
    "kind": "ranking",
    "fields": [
      "队伍/成员排名"
    ],
    "actions": [
      "查看"
    ],
    "entry": "对战详情",
    "basis": "iOS 源码",
    "fidelity": "结构重建",
    "note": "按 iOS 页面入口、字段和控件关系重建；当前样例数据不代表业务规则。"
  },
  {
    "id": "pk-team-detail",
    "name": "PK队伍明细",
    "module": "运营激励",
    "source": "repos/ios4crm/GCCRM/ViewController/Apply/PK/PKDetailInfoListVC.m",
    "kind": "list",
    "fields": [
      "队伍/成员数据",
      "未开始状态"
    ],
    "actions": [
      "查看"
    ],
    "entry": "对战详情",
    "basis": "iOS 源码",
    "fidelity": "结构重建",
    "note": "按 iOS 页面入口、字段和控件关系重建；当前样例数据不代表业务规则。"
  },
  {
    "id": "materials",
    "name": "业务资料",
    "module": "业务资料",
    "source": "repos/ios4crm/GCCRM/ViewController/Apply/Material/CRMMaterialListVC.swift",
    "kind": "list",
    "fields": [
      "资料类型",
      "资料卡片"
    ],
    "actions": [
      "分类筛选",
      "搜索",
      "打开文件"
    ],
    "entry": "应用",
    "basis": "iOS 源码 + Figma 可见画布",
    "fidelity": "结构重建",
    "figma": "https://www.figma.com/design/p9Hr9qCb4DbbKgFqgjZrPO/?node-id=2010-417",
    "figmaNote": "业务资料列表、分类及空状态",
    "note": "按 iOS 页面入口、字段和控件关系重建；当前样例数据不代表业务规则。"
  },
  {
    "id": "material-search",
    "name": "业务资料搜索",
    "module": "业务资料",
    "source": "repos/ios4crm/GCCRM/ViewController/Apply/Material/CRMMaterialSearchVC.swift",
    "kind": "search",
    "fields": [
      "资料名称"
    ],
    "actions": [
      "搜索",
      "打开资料"
    ],
    "entry": "业务资料",
    "basis": "iOS 源码 + Figma 可见画布",
    "fidelity": "结构重建",
    "figma": "https://www.figma.com/design/p9Hr9qCb4DbbKgFqgjZrPO/?node-id=2010-417",
    "figmaNote": "搜索初始、有内容与无内容",
    "note": "按 iOS 页面入口、字段和控件关系重建；当前样例数据不代表业务规则。"
  },
  {
    "id": "operation-miniapp",
    "name": "运营有道（外部小程序入口）",
    "module": "业务资料",
    "source": "repos/ios4crm/GCCRM/ViewController/Apply/Uniapp/UniappManager.m",
    "kind": "external",
    "fields": [
      "原生入口及token传递"
    ],
    "actions": [
      "原型仅表现容器/返回，不臆造内部页面"
    ],
    "entry": "应用",
    "basis": "iOS 源码",
    "fidelity": "结构重建",
    "note": "原生端仅能确认小程序入口、加载和返回关系；小程序内部页面不在现有原生源码中，不虚构完整小程序。"
  }
];
