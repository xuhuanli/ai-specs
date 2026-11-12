window.CRM_CONDITIONS=[
  {
    "id": "doc-cond-001",
    "pageId": "doctor-home",
    "source": "repos/ios4crm/GCCRM/Model/Doctor_relation/DoctorHomeModel.m",
    "line": 14,
    "condition": "can_show.boolValue",
    "effect": "isLookMoreInfo 完全由后台can_show决定；后面的按经理/地区权限判断是注释代码。",
    "origin": "backend",
    "variants": [
      {
        "label": "可看完整资料",
        "values": {
          "can_show": "1"
        },
        "effect": "完整医生主页"
      },
      {
        "label": "不可看完整资料",
        "values": {
          "can_show": "0"
        },
        "effect": "受限医生主页"
      }
    ],
    "uiAnnotation": "条件展示：can_show.boolValue"
  },
  {
    "id": "doc-cond-002",
    "pageId": "doctor-home",
    "source": "repos/ios4crm/GCCRM/Tools/GCToolsManager.m",
    "line": 294,
    "condition": "can_show=1/0; doctor_sea_type=2",
    "effect": "完整权限→DoctorHomeVC四页签；无完整权限→OtherDoctorHomeVC，公有池多行为跟踪页签。",
    "origin": "derived",
    "variants": [
      {
        "label": "完整",
        "values": {
          "can_show": "1"
        },
        "effect": "拜访记录/收入统计/行为统计/账户信息"
      },
      {
        "label": "受限公有池",
        "values": {
          "can_show": "0",
          "doctor_sea_type": "2"
        },
        "effect": "拜访记录/行为跟踪"
      },
      {
        "label": "受限非公有池",
        "values": {
          "can_show": "0",
          "doctor_sea_type": "1"
        },
        "effect": "仅拜访记录"
      }
    ],
    "uiAnnotation": "条件展示：can_show=1/0; doctor_sea_type=2"
  },
  {
    "id": "doc-cond-003",
    "pageId": "doctors",
    "source": "repos/ios4crm/GCCRM/ViewController/Doctor/DoctorVC.m",
    "line": 399,
    "condition": "userInfo.is_leader / team_role",
    "effect": "顶部范围菜单由两个真实管理标识控制，不直接用crm_role替代。",
    "origin": "role",
    "variants": [
      {
        "label": "普通医助",
        "values": {
          "is_leader": "0",
          "team_role": "0"
        },
        "effect": "我的医生/代理医生"
      },
      {
        "label": "团队负责人",
        "values": {
          "is_leader": "0",
          "team_role": "1"
        },
        "effect": "我的/代理/团队"
      },
      {
        "label": "区域经理",
        "values": {
          "is_leader": "1",
          "team_role": "0"
        },
        "effect": "我的/代理/区域/团队"
      }
    ],
    "uiAnnotation": "条件展示：userInfo.is_leader / team_role"
  },
  {
    "id": "doc-cond-004",
    "pageId": "doctors",
    "source": "repos/ios4crm/GCCRM/ViewController/Doctor/DoctorVC.m",
    "line": 455,
    "condition": "range=2 或3",
    "effect": "医生搜索额外增加“医助花名”。",
    "origin": "local",
    "variants": [
      {
        "label": "我的/代理",
        "values": {
          "range": "1"
        },
        "effect": "医生姓名/手机号/医院名称/医生ID"
      },
      {
        "label": "团队/区域",
        "values": {
          "range": "3"
        },
        "effect": "前四项+医助花名"
      }
    ],
    "uiAnnotation": "条件展示：range=2 或3"
  },
  {
    "id": "doc-cond-005",
    "pageId": "doctors",
    "source": "repos/ios4crm/GCCRM/ViewController/Doctor/DoctorVC.m",
    "line": 488,
    "condition": "areaDoctorType=3",
    "effect": "区域范围增加第二行“全部医助”下拉；切出区域后移除。",
    "origin": "local",
    "variants": [
      {
        "label": "区域",
        "values": {
          "areaDoctorType": 3
        },
        "effect": "显示医助下拉"
      },
      {
        "label": "非区域",
        "values": {
          "areaDoctorType": 1
        },
        "effect": "不显示第二行医助下拉"
      }
    ],
    "uiAnnotation": "条件展示：areaDoctorType=3"
  },
  {
    "id": "doc-cond-006",
    "pageId": "doctors",
    "source": "repos/ios4crm/GCCRM/ViewController/Doctor/DoctorVC.m",
    "line": 965,
    "condition": "doctor_metatype/tabId=4",
    "effect": "未注册医生更多筛选仅等级/来源/个人&认领/标签；其他状态还含生命周期/活跃/回流/未审核原因/未开剂型。",
    "origin": "local",
    "variants": [
      {
        "label": "未注册",
        "values": {
          "doctor_metatype": 4
        },
        "effect": "4类筛选"
      },
      {
        "label": "其他",
        "values": {
          "doctor_metatype": 0
        },
        "effect": "9类筛选"
      }
    ],
    "uiAnnotation": "条件展示：doctor_metatype/tabId=4"
  },
  {
    "id": "doc-cond-007",
    "pageId": "doctors",
    "source": "repos/ios4crm/GCCRM/ViewModel/DoctorVM/DoctorListCell.m",
    "line": 864,
    "condition": "doctor_metatype=0/1/2/3/4",
    "effect": "新医生列表卡片信息行按状态变化。",
    "origin": "backend",
    "variants": [
      {
        "label": "全部/已激活",
        "values": {
          "doctor_metatype": 0
        },
        "effect": "本月药费环比+累计最高药费+最近订单启动+拜访"
      },
      {
        "label": "待激活",
        "values": {
          "doctor_metatype": 1
        },
        "effect": "最近启动+拜访"
      },
      {
        "label": "已流失",
        "values": {
          "doctor_metatype": 3
        },
        "effect": "累计最高药费+最近订单启动+拜访"
      },
      {
        "label": "未注册",
        "values": {
          "doctor_metatype": 4
        },
        "effect": "仅拜访"
      }
    ],
    "uiAnnotation": "条件展示：doctor_metatype=0/1/2/3/4"
  },
  {
    "id": "doc-cond-008",
    "pageId": "doctors",
    "source": "repos/ios4crm/GCCRM/ViewModel/DoctorVM/DoctorListCell.m",
    "line": 805,
    "condition": "doctor_metatype=4",
    "effect": "未注册卡片隐藏回流标签与meta_tag/tag_time_str行。",
    "origin": "backend",
    "variants": [
      {
        "label": "未注册",
        "values": {
          "doctor_metatype": 4,
          "return_tag": "回流"
        },
        "effect": "不显示回流/生命周期徽标"
      },
      {
        "label": "注册状态",
        "values": {
          "doctor_metatype": 2,
          "return_tag": "回流"
        },
        "effect": "可显示徽标"
      }
    ],
    "uiAnnotation": "条件展示：doctor_metatype=4"
  },
  {
    "id": "doc-cond-009",
    "pageId": "doctors",
    "source": "repos/ios4crm/GCCRM/ViewModel/DoctorVM/DoctorListCell.m",
    "line": 887,
    "condition": "crm_doctor_tags 非空",
    "effect": "卡片展示系统医生标签行，高25；无标签折叠。",
    "origin": "backend",
    "variants": [
      {
        "label": "有标签",
        "values": {
          "crm_doctor_tags": "重点,复诊"
        },
        "effect": "显示25pt标签行"
      },
      {
        "label": "无标签",
        "values": {
          "crm_doctor_tags": ""
        },
        "effect": "隐藏且高0"
      }
    ],
    "uiAnnotation": "条件展示：crm_doctor_tags 非空"
  },
  {
    "id": "doc-cond-010",
    "pageId": "doctors",
    "source": "repos/ios4crm/GCCRM/ViewModel/DoctorVM/DoctorListCell.m",
    "line": 750,
    "condition": "gp_tags 空/含结束/其他",
    "effect": "规培徽标为空隐藏；结束规培为绿色，其他灰色。",
    "origin": "backend",
    "variants": [
      {
        "label": "无规培",
        "values": {
          "gp_tags": ""
        },
        "effect": "隐藏"
      },
      {
        "label": "规培中",
        "values": {
          "gp_tags": "规培中"
        },
        "effect": "灰色边框"
      },
      {
        "label": "规培结束",
        "values": {
          "gp_tags": "已结束规培"
        },
        "effect": "绿色边框"
      }
    ],
    "uiAnnotation": "条件展示：gp_tags 空/含结束/其他"
  },
  {
    "id": "doc-cond-011",
    "pageId": "doctors",
    "source": "repos/ios4crm/GCCRM/ViewModel/DoctorVM/DoctorListCell.m",
    "line": 105,
    "condition": "process=已开单/其他",
    "effect": "开单状态文字已开单灰色，否则红色。",
    "origin": "backend",
    "variants": [
      {
        "label": "已开单",
        "values": {
          "process": "已开单"
        },
        "effect": "#cccccc"
      },
      {
        "label": "未开单",
        "values": {
          "process": "未开单"
        },
        "effect": "#fe0307"
      }
    ],
    "uiAnnotation": "条件展示：process=已开单/其他"
  },
  {
    "id": "doc-cond-012",
    "pageId": "doctors",
    "source": "repos/ios4crm/GCCRM/ViewModel/DoctorVM/DoctorListCell.m",
    "line": 87,
    "condition": "level=未设置/U/A/B/C/D",
    "effect": "未设置/U不显示等级文字，A-D各自颜色；头像为空显示姓名末两字占位。",
    "origin": "backend",
    "variants": [
      {
        "label": "未设置",
        "values": {
          "level": "U",
          "photo": ""
        },
        "effect": "无等级+文字头像"
      },
      {
        "label": "已设置",
        "values": {
          "level": "A",
          "photo": "demo"
        },
        "effect": "等级A+图片头像"
      }
    ],
    "uiAnnotation": "条件展示：level=未设置/U/A/B/C/D"
  },
  {
    "id": "doc-cond-013",
    "pageId": "doctors",
    "source": "repos/ios4crm/GCCRM/ViewModel/DoctorVM/DoctorListCell.m",
    "line": 846,
    "condition": "next_visit_date 非空",
    "effect": "最近拜访行后增加下一次拜访行。",
    "origin": "backend",
    "variants": [
      {
        "label": "有日程",
        "values": {
          "next_visit_date": "2026-11-08"
        },
        "effect": "展示下次拜访"
      },
      {
        "label": "无日程",
        "values": {
          "next_visit_date": ""
        },
        "effect": "仅最近拜访"
      }
    ],
    "uiAnnotation": "条件展示：next_visit_date 非空"
  },
  {
    "id": "doc-cond-014",
    "pageId": "doctor-home",
    "source": "repos/ios4crm/GCCRM/ViewController/Doctor/DoctorHomeVC.m",
    "line": 121,
    "condition": "doctor_sea_type=2",
    "effect": "公有池医生主页底部有“领取该医生”，非公有池无领取固定栏。",
    "origin": "backend",
    "variants": [
      {
        "label": "公有池",
        "values": {
          "doctor_sea_type": "2"
        },
        "effect": "显示领取栏"
      },
      {
        "label": "私有池",
        "values": {
          "doctor_sea_type": "1"
        },
        "effect": "隐藏领取栏"
      }
    ],
    "uiAnnotation": "条件展示：doctor_sea_type=2"
  },
  {
    "id": "doc-cond-015",
    "pageId": "doctor-home",
    "source": "repos/ios4crm/GCCRM/ViewController/Doctor/DoctorHomeVC.m",
    "line": 60,
    "condition": "no_receive_flag=true/false",
    "effect": "连续领取限制控制领取栏文字及点击提前返回。",
    "origin": "backend",
    "variants": [
      {
        "label": "可领取",
        "values": {
          "no_receive_flag": false
        },
        "effect": "领取该医生"
      },
      {
        "label": "达连续领取上限",
        "values": {
          "no_receive_flag": true
        },
        "effect": "已达连续领取上限，无法领取；点击无动作"
      }
    ],
    "uiAnnotation": "条件展示：no_receive_flag=true/false"
  },
  {
    "id": "doc-cond-016",
    "pageId": "doctor-home",
    "source": "repos/ios4crm/GCCRM/ViewController/Doctor/DoctorHomeVC.m",
    "line": 316,
    "condition": "manager_id=当前mid 且doctor_sea_type=1",
    "effect": "拜访记录子页show操作权限仅本人私有池医生为真。",
    "origin": "derived",
    "variants": [
      {
        "label": "本人私有池",
        "values": {
          "manager_id": "current",
          "doctor_sea_type": "1"
        },
        "effect": "拜访相关操作可显示"
      },
      {
        "label": "他人或非私有池",
        "values": {
          "manager_id": "other",
          "doctor_sea_type": "1"
        },
        "effect": "只读拜访"
      }
    ],
    "uiAnnotation": "条件展示：manager_id=当前mid 且doctor_sea_type=1"
  },
  {
    "id": "doc-cond-017",
    "pageId": "doctor-home",
    "source": "repos/ios4crm/GCCRM/ViewModel/DoctorVM/DoctorHeaderView.m",
    "line": 333,
    "condition": "doctor_sea_type=1 & is_protection/super_protect_end_time",
    "effect": "仅私有池显示保护图标；未保护/普通保护/超级保护三态。",
    "origin": "backend",
    "variants": [
      {
        "label": "未保护",
        "values": {
          "doctor_sea_type": "1",
          "is_protection": "0"
        },
        "effect": "解锁图标"
      },
      {
        "label": "普通保护",
        "values": {
          "doctor_sea_type": "1",
          "is_protection": "1",
          "super_protect_end_time": 0
        },
        "effect": "普通锁"
      },
      {
        "label": "超级保护",
        "values": {
          "doctor_sea_type": "1",
          "is_protection": "1",
          "super_protect_end_time": 1
        },
        "effect": "超级锁"
      },
      {
        "label": "非私有池",
        "values": {
          "doctor_sea_type": "2"
        },
        "effect": "隐藏保护按钮"
      }
    ],
    "uiAnnotation": "条件展示：doctor_sea_type=1 & is_protection/super_protect_end_time"
  },
  {
    "id": "doc-cond-018",
    "pageId": "doctor-home",
    "source": "repos/ios4crm/GCCRM/ViewModel/DoctorVM/DoctorHeaderView.m",
    "line": 367,
    "condition": "audit_str 非空且含“已”",
    "effect": "审核徽标空则隐藏，含已为绿色，否则红色。",
    "origin": "backend",
    "variants": [
      {
        "label": "已审核",
        "values": {
          "audit_str": "已审核"
        },
        "effect": "#53BF85徽标"
      },
      {
        "label": "未审核",
        "values": {
          "audit_str": "未审核"
        },
        "effect": "#FE0307徽标"
      },
      {
        "label": "空",
        "values": {
          "audit_str": ""
        },
        "effect": "不展示徽标"
      }
    ],
    "uiAnnotation": "条件展示：audit_str 非空且含“已”"
  },
  {
    "id": "doc-cond-019",
    "pageId": "doctor-home",
    "source": "repos/ios4crm/GCCRM/ViewModel/DoctorVM/DoctorHeaderView.m",
    "line": 379,
    "condition": "can_show=1",
    "effect": "头部进入资料的箭头由can_show控制。",
    "origin": "backend",
    "variants": [
      {
        "label": "可看",
        "values": {
          "can_show": "1"
        },
        "effect": "显示箭头"
      },
      {
        "label": "不可看",
        "values": {
          "can_show": "0"
        },
        "effect": "隐藏箭头"
      }
    ],
    "uiAnnotation": "条件展示：can_show=1"
  },
  {
    "id": "doc-cond-020",
    "pageId": "doctor-home",
    "source": "repos/ios4crm/GCCRM/ViewModel/DoctorVM/DoctorHeaderView.m",
    "line": 407,
    "condition": "私有池 & can_show & !isFromWaring & doctor_type=0",
    "effect": "普通私有池医生头部可能显示释放日期、释因、释放后限制提示。",
    "origin": "backend",
    "variants": [
      {
        "label": "普通有释放信息",
        "values": {
          "doctor_sea_type": "1",
          "can_show": "1",
          "doctor_type": "0",
          "freed_time_cn": "未来日期",
          "cause_str": "首单超时"
        },
        "effect": "显示释放说明"
      },
      {
        "label": "其他类型/无权限",
        "values": {
          "doctor_sea_type": "2",
          "can_show": "0"
        },
        "effect": "不显示该释放说明"
      }
    ],
    "uiAnnotation": "条件展示：私有池 & can_show & !isFromWaring & doctor_type=0"
  },
  {
    "id": "doc-cond-021",
    "pageId": "doctor-home",
    "source": "repos/ios4crm/GCCRM/ViewModel/DoctorVM/DoctorHeaderView.m",
    "line": 448,
    "condition": "doctor_sea_type=1 且doctor_type非0非5",
    "effect": "私有池特殊医生显示“特殊医生不掉出”。doctor_type=3又由规培结束日期覆盖。",
    "origin": "backend",
    "variants": [
      {
        "label": "特殊医生",
        "values": {
          "doctor_sea_type": "1",
          "doctor_type": "1"
        },
        "effect": "蓝色特殊医生不掉出"
      },
      {
        "label": "规培医生有日期",
        "values": {
          "doctor_type": "3",
          "gp_end_time_cn": "未来日期"
        },
        "effect": "日期结束规培期"
      },
      {
        "label": "规培无日期",
        "values": {
          "doctor_type": "3",
          "gp_end_time_cn": ""
        },
        "effect": "该说明清空"
      }
    ],
    "uiAnnotation": "条件展示：doctor_sea_type=1 且doctor_type非0非5"
  },
  {
    "id": "doc-cond-022",
    "pageId": "doctor-home",
    "source": "repos/ios4crm/GCCRM/ViewModel/DoctorVM/DoctorHeaderView.m",
    "line": 475,
    "condition": "isFromWaring / crm_doctor_tags",
    "effect": "流失预警进入头部强制隐藏系统标签行；普通入口有标签才显示21pt行。",
    "origin": "derived",
    "variants": [
      {
        "label": "预警来源",
        "values": {
          "isFromWaring": true,
          "crm_doctor_tags": "重点"
        },
        "effect": "隐藏标签"
      },
      {
        "label": "普通有标签",
        "values": {
          "isFromWaring": false,
          "crm_doctor_tags": "重点"
        },
        "effect": "显示标签"
      },
      {
        "label": "无标签",
        "values": {
          "isFromWaring": false,
          "crm_doctor_tags": ""
        },
        "effect": "隐藏标签"
      }
    ],
    "uiAnnotation": "条件展示：isFromWaring / crm_doctor_tags"
  },
  {
    "id": "doc-cond-023",
    "pageId": "doctor-info",
    "source": "repos/ios4crm/GCCRM/ViewController/Doctor/DoctorDetailVC.m",
    "line": 360,
    "condition": "doctor_sea_type=1 且audit_str不含未注册",
    "effect": "医生资料增加“资质是否完整”行。",
    "origin": "backend",
    "variants": [
      {
        "label": "私有池已注册",
        "values": {
          "doctor_sea_type": "1",
          "audit_str": "已审核"
        },
        "effect": "显示资质行"
      },
      {
        "label": "未注册",
        "values": {
          "doctor_sea_type": "1",
          "audit_str": "未注册"
        },
        "effect": "隐藏资质行"
      },
      {
        "label": "非私有池",
        "values": {
          "doctor_sea_type": "2",
          "audit_str": "已审核"
        },
        "effect": "隐藏资质行"
      }
    ],
    "uiAnnotation": "条件展示：doctor_sea_type=1 且audit_str不含未注册"
  },
  {
    "id": "doc-cond-024",
    "pageId": "doctor-info",
    "source": "repos/ios4crm/GCCRM/ViewController/Doctor/DoctorDetailVC.m",
    "line": 97,
    "condition": "qualification_is_complete_str含不完整;deadline!=9999-01-01",
    "effect": "不完整资质行显示箭头，可进完善资质；非哨兵截止日期展示补齐截止时间。",
    "origin": "backend",
    "variants": [
      {
        "label": "不完整有截止",
        "values": {
          "qualification_is_complete_str": "不完整",
          "qualification_complement_deadline": "2026-12-01"
        },
        "effect": "箭头+截止时间"
      },
      {
        "label": "不完整无截止",
        "values": {
          "qualification_is_complete_str": "不完整",
          "qualification_complement_deadline": "9999-01-01"
        },
        "effect": "箭头，无截止"
      },
      {
        "label": "完整",
        "values": {
          "qualification_is_complete_str": "完整"
        },
        "effect": "只读无箭头"
      }
    ],
    "uiAnnotation": "条件展示：qualification_is_complete_str含不完整;deadline!=9999-01-01"
  },
  {
    "id": "doc-cond-025",
    "pageId": "doctor-info",
    "source": "repos/ios4crm/GCCRM/ViewController/Doctor/DoctorDetailVC.m",
    "line": 386,
    "condition": "did=0 且manager_id=当前mid",
    "effect": "未注册本人医生显示右上编辑和底部红色删除。已注册本人不显示编辑（代码已注释）。",
    "origin": "derived",
    "variants": [
      {
        "label": "未注册本人",
        "values": {
          "did": "0",
          "manager_id": "current"
        },
        "effect": "编辑+删除"
      },
      {
        "label": "已注册本人",
        "values": {
          "did": "100",
          "manager_id": "current"
        },
        "effect": "无编辑/删除，医生类型可编辑"
      },
      {
        "label": "他人",
        "values": {
          "did": "0",
          "manager_id": "other"
        },
        "effect": "无编辑/删除"
      }
    ],
    "uiAnnotation": "条件展示：did=0 且manager_id=当前mid"
  },
  {
    "id": "doc-cond-026",
    "pageId": "doctor-info",
    "source": "repos/ios4crm/GCCRM/ViewController/Doctor/DoctorDetailVC.m",
    "line": 137,
    "condition": "phone_format_error",
    "effect": "手机号错误增加红色11pt“错误手机号，请更新”，行高加大。",
    "origin": "backend",
    "variants": [
      {
        "label": "错误",
        "values": {
          "phone_format_error": true
        },
        "effect": "显示红色提示"
      },
      {
        "label": "正常",
        "values": {
          "phone_format_error": false
        },
        "effect": "普通手机号"
      }
    ],
    "uiAnnotation": "条件展示：phone_format_error"
  },
  {
    "id": "doc-cond-027",
    "pageId": "doctor-info",
    "source": "repos/ios4crm/GCCRM/ViewController/Doctor/DoctorDetailVC.m",
    "line": 176,
    "condition": "transfer_cert_is_required",
    "effect": "变更医助按后台佐证要求跳不同表单。",
    "origin": "backend",
    "variants": [
      {
        "label": "需要佐证",
        "values": {
          "transfer_cert_is_required": true
        },
        "effect": "CRMChangeManagerVC说明+上传佐证"
      },
      {
        "label": "无需佐证",
        "values": {
          "transfer_cert_is_required": false
        },
        "effect": "EditDoctorFollowManagerVC人员搜索选择"
      }
    ],
    "uiAnnotation": "条件展示：transfer_cert_is_required"
  },
  {
    "id": "doc-cond-028",
    "pageId": "doctor-info",
    "source": "repos/ios4crm/GCCRM/ViewController/Doctor/DoctorDetailVC.m",
    "line": 277,
    "condition": "doctor_sea_type!=1",
    "effect": "公私海行点击仅私有池可继续释放确认；其他池直接return。",
    "origin": "backend",
    "variants": [
      {
        "label": "私有池",
        "values": {
          "doctor_sea_type": "1"
        },
        "effect": "确认释放到公海池"
      },
      {
        "label": "其他池",
        "values": {
          "doctor_sea_type": "2"
        },
        "effect": "不执行转移"
      }
    ],
    "uiAnnotation": "条件展示：doctor_sea_type!=1"
  },
  {
    "id": "doc-cond-029",
    "pageId": "doctor-account",
    "source": "repos/ios4crm/GCCRM/ViewController/Doctor/AccountInfoNewVC.m",
    "line": 732,
    "condition": "service_fee_rank != 无",
    "effect": "服务费等级非无时插入独立行，链接等级历史；无则不插入。",
    "origin": "backend",
    "variants": [
      {
        "label": "有等级",
        "values": {
          "service_fee_rank": "A"
        },
        "effect": "显示服务费等级行"
      },
      {
        "label": "无等级",
        "values": {
          "service_fee_rank": "无"
        },
        "effect": "不显示该行"
      }
    ],
    "uiAnnotation": "条件展示：service_fee_rank != 无"
  },
  {
    "id": "doc-cond-030",
    "pageId": "doctor-account",
    "source": "repos/ios4crm/GCCRM/ViewController/Doctor/AccountInfoNewVC.m",
    "line": 739,
    "condition": "other.price_text_on含已; other.price_text",
    "effect": "专家咨询开关根据文字含已设置，行标题追加后台价格文案。",
    "origin": "backend",
    "variants": [
      {
        "label": "开启",
        "values": {
          "price_text_on": "已开通",
          "price_text": "示例价格"
        },
        "effect": "开关ON+价格"
      },
      {
        "label": "关闭",
        "values": {
          "price_text_on": "未开通",
          "price_text": ""
        },
        "effect": "开关OFF"
      }
    ],
    "uiAnnotation": "条件展示：other.price_text_on含已; other.price_text"
  },
  {
    "id": "doc-cond-031",
    "pageId": "doctor-account",
    "source": "repos/ios4crm/GCCRM/ViewController/Doctor/AccountInfoNewVC.m",
    "line": 771,
    "condition": "other.photo_recipe_privilege_num / contract_privilege / recipel_goods_support / granule_auto_convert / is_hide",
    "effect": "账户开关绑定实际后台字段，不能全部默认开启。",
    "origin": "backend",
    "variants": [
      {
        "label": "全部关闭",
        "values": {
          "photo_recipe_privilege_num": "0",
          "contract_privilege": "0",
          "recipel_goods_support": "0",
          "granule_auto_convert": "0",
          "is_hide": "0"
        },
        "effect": "开关OFF"
      },
      {
        "label": "全部开启",
        "values": {
          "photo_recipe_privilege_num": "1",
          "contract_privilege": "1",
          "recipel_goods_support": "1",
          "granule_auto_convert": "1",
          "is_hide": "1"
        },
        "effect": "开关ON"
      }
    ],
    "uiAnnotation": "条件展示：other.photo_recipe_privilege_num / contract_privilege / recipel_goods_support / granule_auto_convert / is_hide"
  },
  {
    "id": "doc-cond-032",
    "pageId": "doctor-account",
    "source": "repos/ios4crm/GCCRM/ViewController/Doctor/AccountInfoNewVC.m",
    "line": 350,
    "condition": "now_avaliable_nums=-1 / 当前及删除患者数",
    "effect": "患者删除恢复行：同步中阻止操作；总数均零提示无患者；有数据给条件菜单。",
    "origin": "backend",
    "variants": [
      {
        "label": "同步中",
        "values": {
          "now_avaliable_nums": -1,
          "deleted_nums": -1
        },
        "effect": "数据正在同步中，请稍后再试"
      },
      {
        "label": "无患者",
        "values": {
          "now_avaliable_nums": 0,
          "deleted_nums": 0
        },
        "effect": "该医生无患者"
      },
      {
        "label": "仅现有",
        "values": {
          "now_avaliable_nums": 3,
          "deleted_nums": 0
        },
        "effect": "仅全部删除"
      },
      {
        "label": "仅已删除",
        "values": {
          "now_avaliable_nums": 0,
          "deleted_nums": 3
        },
        "effect": "全部恢复+单个恢复"
      },
      {
        "label": "两类都有",
        "values": {
          "now_avaliable_nums": 3,
          "deleted_nums": 2
        },
        "effect": "全部删除/全部恢复/单个恢复"
      }
    ],
    "uiAnnotation": "条件展示：now_avaliable_nums=-1 / 当前及删除患者数"
  },
  {
    "id": "doc-cond-033",
    "pageId": "doctor-account",
    "source": "repos/ios4crm/GCCRM/ViewController/Doctor/AccountInfoNewVC.m",
    "line": 1089,
    "condition": "当前mid!=manager_id",
    "effect": "修改隐藏收入选项时拒绝非本人医助，提示无权限。",
    "origin": "derived",
    "variants": [
      {
        "label": "本人",
        "values": {
          "manager_id": "current"
        },
        "effect": "可提交隐藏收入选项"
      },
      {
        "label": "非本人",
        "values": {
          "manager_id": "other"
        },
        "effect": "非此医生医助，无权限修改"
      }
    ],
    "uiAnnotation": "条件展示：当前mid!=manager_id"
  },
  {
    "id": "doc-cond-034",
    "pageId": "doctor-account",
    "source": "repos/ios4crm/GCCRM/ViewController/Doctor/AccountInfoNewVC.m",
    "line": 851,
    "condition": "is_leader=false（纳税方式修改）",
    "effect": "非经理修改纳税方式先提示每月只能修改一次；经理直接打开。",
    "origin": "role",
    "variants": [
      {
        "label": "普通医助",
        "values": {
          "is_leader": "0"
        },
        "effect": "先确认每月限制"
      },
      {
        "label": "经理",
        "values": {
          "is_leader": "1"
        },
        "effect": "直接选择纳税方式"
      }
    ],
    "uiAnnotation": "条件展示：is_leader=false（纳税方式修改）"
  },
  {
    "id": "doc-cond-035",
    "pageId": "doctor-account",
    "source": "repos/ios4crm/GCCRM/ViewController/Doctor/AccountInfoNewVC.m",
    "line": 297,
    "condition": "gxh_activity_list / activityArray / otherActivityDic",
    "effect": "活动区前两行为活动/医生类型，其后按后台活动数组动态增行，末尾非平台活动入口。",
    "origin": "backend",
    "variants": [
      {
        "label": "无活动",
        "values": {
          "gxh_activity_list": []
        },
        "effect": "没有动态活动行"
      },
      {
        "label": "多活动",
        "values": {
          "gxh_activity_list": [
            {
              "activity_title": "演示活动A"
            },
            {
              "activity_title": "演示活动B"
            }
          ]
        },
        "effect": "显示两条活动配置入口"
      }
    ],
    "uiAnnotation": "条件展示：gxh_activity_list / activityArray / otherActivityDic"
  },
  {
    "id": "doc-cond-036",
    "pageId": "coupon-list",
    "source": "repos/ios4crm/GCCRM/ViewController/Doctor/Coupon/CRMCouponStatus.swift",
    "line": 19,
    "condition": "status=unused/used/expired",
    "effect": "待使用无印章且红色面额，已用/过期全灰并显示对应印章。",
    "origin": "backend",
    "variants": [
      {
        "label": "待使用",
        "values": {
          "status": 0
        },
        "effect": "无印章，#EC655A面额"
      },
      {
        "label": "已使用",
        "values": {
          "status": 1
        },
        "effect": "used_icon印章，灰色"
      },
      {
        "label": "已过期",
        "values": {
          "status": 2
        },
        "effect": "invalid_icon印章，灰色"
      }
    ],
    "uiAnnotation": "条件展示：status=unused/used/expired"
  },
  {
    "id": "doc-cond-037",
    "pageId": "coupon-list",
    "source": "repos/ios4crm/GCCRM/ViewController/Doctor/Coupon/CRMCouponModel.swift",
    "line": 40,
    "condition": "use_rule_type=2/10/其他",
    "effect": "券门槛标签：2无门槛；10满N减；其他为空。",
    "origin": "backend",
    "variants": [
      {
        "label": "无门槛",
        "values": {
          "use_rule_type": 2
        },
        "effect": "无门槛"
      },
      {
        "label": "满减",
        "values": {
          "use_rule_type": 10,
          "use_rule_starting": 100
        },
        "effect": "满100减"
      },
      {
        "label": "其他",
        "values": {
          "use_rule_type": 0
        },
        "effect": "门槛标签空"
      }
    ],
    "uiAnnotation": "条件展示：use_rule_type=2/10/其他"
  },
  {
    "id": "doc-cond-038",
    "pageId": "coupon-gift",
    "source": "repos/ios4crm/GCCRM/ViewController/Doctor/SendCouponVC.m",
    "line": 87,
    "condition": "普通券use_rule_amount>left_money",
    "effect": "普通券超过可赠额度禁止选中；过期首单重发不受本分支校验。两组共同单选。",
    "origin": "derived",
    "variants": [
      {
        "label": "额度足够",
        "values": {
          "isNormalCoupon": true,
          "use_rule_amount": 20,
          "left_money": 30
        },
        "effect": "允许单选并更新合计"
      },
      {
        "label": "额度不足",
        "values": {
          "isNormalCoupon": true,
          "use_rule_amount": 40,
          "left_money": 30
        },
        "effect": "提示超过可赠送额度"
      },
      {
        "label": "过期重发",
        "values": {
          "isNormalCoupon": false,
          "use_rule_amount": 40,
          "left_money": 30
        },
        "effect": "本分支不拦截"
      }
    ],
    "uiAnnotation": "条件展示：普通券use_rule_amount>left_money"
  },
  {
    "id": "doc-cond-039",
    "pageId": "home",
    "source": "repos/ios4crm/GCCRM/ViewController/Workbench/WorkNotificationVC.m",
    "line": 318,
    "condition": "selectedId=1 且column∈0,1,2,3,5",
    "effect": "只有开方统计的今日/昨日/前日/7天/30天数值跳订单；环比/月均/距上次和其他行为无此跳转。",
    "origin": "local",
    "variants": [
      {
        "label": "开方可下钻",
        "values": {
          "selectedId": "1",
          "column": 0
        },
        "effect": "我的已开方订单"
      },
      {
        "label": "开方环比",
        "values": {
          "selectedId": "1",
          "column": 4
        },
        "effect": "无跳转"
      },
      {
        "label": "启动等其他行为",
        "values": {
          "selectedId": "2",
          "column": 0
        },
        "effect": "无跳转"
      }
    ],
    "uiAnnotation": "条件展示：selectedId=1 且column∈0,1,2,3,5"
  },
  {
    "id": "doc-cond-040",
    "pageId": "home",
    "source": "repos/ios4crm/GCCRM/ViewController/Workbench/WorkbenchPageVC.m",
    "line": 98,
    "condition": "data.count=0/>0",
    "effect": "首页Tab与通知页签未读徽标由count控制，0隐藏，非零显示数量。",
    "origin": "backend",
    "variants": [
      {
        "label": "无未读",
        "values": {
          "count": 0
        },
        "effect": "无数字徽标"
      },
      {
        "label": "有未读",
        "values": {
          "count": 8
        },
        "effect": "8徽标"
      }
    ],
    "uiAnnotation": "条件展示：data.count=0/>0"
  },
  {
    "id": "doc-cond-041",
    "pageId": "home",
    "source": "repos/ios4crm/GCCRM/ViewController/Workbench/WorkbenchPageVC.m",
    "line": 135,
    "condition": "my_create>0 || handled_by_me>0",
    "effect": "首页工单入口红点。",
    "origin": "backend",
    "variants": [
      {
        "label": "有待办工单",
        "values": {
          "my_create": 1,
          "handled_by_me": 0
        },
        "effect": "红点"
      },
      {
        "label": "无工单",
        "values": {
          "my_create": 0,
          "handled_by_me": 0
        },
        "effect": "隐藏红点"
      }
    ],
    "uiAnnotation": "条件展示：my_create>0 || handled_by_me>0"
  },
  {
    "id": "doc-cond-042",
    "pageId": "notification",
    "source": "repos/ios4crm/GCCRM/ViewController/Workbench/WorkbenchVC.m",
    "line": 84,
    "condition": "did=is_group / 普通did",
    "effect": "聚合通知小助手与医生消息行跳转不同。",
    "origin": "backend",
    "variants": [
      {
        "label": "聚合助手",
        "values": {
          "did": "is_group"
        },
        "effect": "WorkbenchCategoryVC"
      },
      {
        "label": "医生消息",
        "values": {
          "did": "100",
          "cdid": "200"
        },
        "effect": "DoctorDetailMessageVC"
      }
    ],
    "uiAnnotation": "条件展示：did=is_group / 普通did"
  },
  {
    "id": "doc-cond-043",
    "pageId": "notification",
    "source": "repos/ios4crm/GCCRM/ViewController/Workbench/WorkbenchVC.m",
    "line": 91,
    "condition": "unread_count>0",
    "effect": "医生消息行点击先标记已读再进详情。",
    "origin": "backend",
    "variants": [
      {
        "label": "未读",
        "values": {
          "unread_count": "3"
        },
        "effect": "显示徽标，点击后清零"
      },
      {
        "label": "已读",
        "values": {
          "unread_count": "0"
        },
        "effect": "无未读徽标"
      }
    ],
    "uiAnnotation": "条件展示：unread_count>0"
  },
  {
    "id": "doc-cond-044",
    "pageId": "doctor-messages",
    "source": "repos/ios4crm/GCCRM/ViewController/Workbench/DoctorDetailMessageVC.m",
    "line": 95,
    "condition": "logType=2/47,13/45,111..114",
    "effect": "2/47且jump_params非空→驳回详情；13/45→审核详情；111..114→完善资质。",
    "origin": "backend",
    "variants": [
      {
        "label": "审核驳回",
        "values": {
          "logType": 2,
          "jump_params": [
            "demo"
          ]
        },
        "effect": "ExamineFieldDetailVC带rejectId"
      },
      {
        "label": "审核信息",
        "values": {
          "logType": 13
        },
        "effect": "ExamineFieldDetailVC带did"
      },
      {
        "label": "资质缺失",
        "values": {
          "logType": 111
        },
        "effect": "CRMSpecialUploadVC"
      }
    ],
    "uiAnnotation": "条件展示：logType=2/47,13/45,111..114"
  },
  {
    "id": "doc-cond-045",
    "pageId": "workbench",
    "source": "repos/ios4crm/GCCRM/ViewController/Map/WorkCenterVC.m",
    "line": 290,
    "condition": "todo_count>=99 / >0 /0",
    "effect": "底部工作台今日徽标：>=99显示今日99，1..98显示今日N，0不设置。",
    "origin": "backend",
    "variants": [
      {
        "label": "0",
        "values": {
          "count": 0
        },
        "effect": "无今日数量"
      },
      {
        "label": "有待办",
        "values": {
          "count": 8
        },
        "effect": "今日8"
      },
      {
        "label": "较多",
        "values": {
          "count": 105
        },
        "effect": "今日99"
      }
    ],
    "uiAnnotation": "条件展示：todo_count>=99 / >0 /0"
  },
  {
    "id": "doc-cond-046",
    "pageId": "workbench",
    "source": "repos/ios4crm/GCCRM/ViewController/Map/WorkCenterVC.m",
    "line": 331,
    "condition": "日历统计接口返回title数组",
    "effect": "工作台日程页签文案及数量来自接口title数组，不是本地固定所有状态。",
    "origin": "backend",
    "variants": [
      {
        "label": "默认示例",
        "values": {
          "title": [
            "全部(6)",
            "协同(1)",
            "拜访(3)",
            "生日(2)"
          ]
        },
        "effect": "按返回文案显示"
      }
    ],
    "uiAnnotation": "条件展示：日历统计接口返回title数组"
  },
  {
    "id": "doc-cond-047",
    "pageId": "schedule-detail",
    "source": "repos/ios4crm/GCCRM/ViewController/Map/WorkListVC.m",
    "line": 77,
    "condition": "record模型类型=生日/协同/拜访",
    "effect": "工作台列表行点击按模型选择生日提醒/工单旧详情/日程详情。",
    "origin": "derived",
    "variants": [
      {
        "label": "生日",
        "values": {
          "modelType": "DayBirthdayScheduleModel"
        },
        "effect": "CRMBirthdayScheduleVC"
      },
      {
        "label": "协同",
        "values": {
          "modelType": "CRMSynergyListModel"
        },
        "effect": "CRMSynergyDetailVC"
      },
      {
        "label": "拜访",
        "values": {
          "modelType": "DayScheduleModel"
        },
        "effect": "CRMEditScheduleVC Look"
      }
    ],
    "uiAnnotation": "条件展示：record模型类型=生日/协同/拜访"
  },
  {
    "id": "doc-cond-048",
    "pageId": "schedule-edit",
    "source": "repos/ios4crm/GCCRM/ViewController/AddBtn/CRMEditScheduleVC.m",
    "line": 68,
    "condition": "actionType=Add/Look/Edit",
    "effect": "新增标题创建日程无右按钮；查看标题日程详情+编辑，底部添加拜访；编辑标题日程详情+删除，底部保存。",
    "origin": "local",
    "variants": [
      {
        "label": "创建",
        "values": {
          "actionType": "Add"
        },
        "effect": "创建日程/保存"
      },
      {
        "label": "查看",
        "values": {
          "actionType": "Look"
        },
        "effect": "日程详情/编辑/添加拜访记录"
      },
      {
        "label": "编辑",
        "values": {
          "actionType": "Edit"
        },
        "effect": "日程详情/删除/保存"
      }
    ],
    "uiAnnotation": "条件展示：actionType=Add/Look/Edit"
  },
  {
    "id": "doc-cond-049",
    "pageId": "schedule-edit",
    "source": "repos/ios4crm/GCCRM/ViewController/AddBtn/CRMEditScheduleVC.m",
    "line": 63,
    "condition": "fromType=DoctorHome",
    "effect": "从医生主页创建/编辑日程锁定医生选择，读取上次拜访方向。",
    "origin": "local",
    "variants": [
      {
        "label": "医生主页入口",
        "values": {
          "fromType": "DoctorHome"
        },
        "effect": "医生不可更改"
      },
      {
        "label": "工作台入口",
        "values": {
          "fromType": "WorkTab"
        },
        "effect": "可选医生"
      }
    ],
    "uiAnnotation": "条件展示：fromType=DoctorHome"
  },
  {
    "id": "doc-cond-050",
    "pageId": "schedule-edit",
    "source": "repos/ios4crm/GCCRM/ViewController/AddBtn/CRMEditScheduleVC.m",
    "line": 355,
    "condition": "visit_type=线下/其他",
    "effect": "医院字段线下带*并必填，其他方式非必填。",
    "origin": "local",
    "variants": [
      {
        "label": "线下",
        "values": {
          "visit_type": "线下"
        },
        "effect": "*拜访医院"
      },
      {
        "label": "电话",
        "values": {
          "visit_type": "电话"
        },
        "effect": "拜访医院"
      }
    ],
    "uiAnnotation": "条件展示：visit_type=线下/其他"
  },
  {
    "id": "doc-cond-051",
    "pageId": "schedule-edit",
    "source": "repos/ios4crm/GCCRM/ViewController/AddBtn/CRMEditScheduleVC.m",
    "line": 583,
    "condition": "hid有效 & 推荐接口list非空",
    "effect": "日程按医院获取同医院推荐医生；无医院不请求，无推荐不显示额外分组。",
    "origin": "derived",
    "variants": [
      {
        "label": "有医院有推荐",
        "values": {
          "hid": "300",
          "recommendList": [
            {
              "cdid": "demo"
            }
          ]
        },
        "effect": "同医院拜访推荐医生组"
      },
      {
        "label": "无医院",
        "values": {
          "hid": "0"
        },
        "effect": "隐藏推荐组"
      }
    ],
    "uiAnnotation": "条件展示：hid有效 & 推荐接口list非空"
  },
  {
    "id": "doc-cond-052",
    "pageId": "visit-edit",
    "source": "repos/ios4crm/GCCRM/ViewController/AddBtn/CRMEditRecordVC.m",
    "line": 106,
    "condition": "isAdd=true/false",
    "effect": "新增/修改标题不同；只有新增有下次拜访时间（可创建后续日程）。",
    "origin": "local",
    "variants": [
      {
        "label": "新增",
        "values": {
          "isAdd": true
        },
        "effect": "新增拜访记录+下次拜访时间"
      },
      {
        "label": "修改",
        "values": {
          "isAdd": false
        },
        "effect": "修改拜访记录，无下次拜访时间"
      }
    ],
    "uiAnnotation": "条件展示：isAdd=true/false"
  },
  {
    "id": "doc-cond-053",
    "pageId": "visit-edit",
    "source": "repos/ios4crm/GCCRM/ViewController/AddBtn/CRMEditRecordVC.m",
    "line": 346,
    "condition": "visit_type=线下/其他",
    "effect": "线下医院带*且医院为空保存失败，其他方式不强制医院。",
    "origin": "local",
    "variants": [
      {
        "label": "线下",
        "values": {
          "visit_type": "线下"
        },
        "effect": "*拜访医院"
      },
      {
        "label": "微信",
        "values": {
          "visit_type": "微信"
        },
        "effect": "拜访医院"
      }
    ],
    "uiAnnotation": "条件展示：visit_type=线下/其他"
  },
  {
    "id": "doc-cond-054",
    "pageId": "visit-edit",
    "source": "repos/ios4crm/GCCRM/ViewController/AddBtn/CRMEditRecordVC.m",
    "line": 112,
    "condition": "fromType=DoctorHome",
    "effect": "从医生主页入口增加医生标签选择，工作台来源采用其原有表单状态。",
    "origin": "local",
    "variants": [
      {
        "label": "医生主页",
        "values": {
          "fromType": "DoctorHome"
        },
        "effect": "请求并显示医生标签"
      },
      {
        "label": "其他入口",
        "values": {
          "fromType": "WorkTab"
        },
        "effect": "不按医生主页分支加载标签"
      }
    ],
    "uiAnnotation": "条件展示：fromType=DoctorHome"
  },
  {
    "id": "doc-cond-055",
    "pageId": "doctor-pools",
    "source": "repos/ios4crm/GCCRM/ViewController/Apply/DoctorPond/DoctorPondVC.m",
    "line": 111,
    "condition": "personalPond=1/2/3",
    "effect": "私有池有私有状态条、保护入口和上限提示；公有池无私有状态条且显示查看潜力医生；死海无推荐值筛选。",
    "origin": "local",
    "variants": [
      {
        "label": "私有池",
        "values": {
          "personalPond": 1
        },
        "effect": "状态条+保护+上限"
      },
      {
        "label": "公有池",
        "values": {
          "personalPond": 2
        },
        "effect": "查看潜力医生"
      },
      {
        "label": "死海",
        "values": {
          "personalPond": 3
        },
        "effect": "无私有条/潜力入口/推荐值"
      }
    ],
    "uiAnnotation": "条件展示：personalPond=1/2/3"
  },
  {
    "id": "doc-cond-056",
    "pageId": "doctor-pools",
    "source": "repos/ios4crm/GCCRM/ViewController/Apply/DoctorPond/DoctorPondVC.m",
    "line": 114,
    "condition": "personalPond=2 或is_leader",
    "effect": "公有池范围固定我的/区域的；私有池普通人仅我的，经理我的/区域的。",
    "origin": "derived",
    "variants": [
      {
        "label": "公有池普通人",
        "values": {
          "personalPond": 2,
          "is_leader": "0"
        },
        "effect": "我的/区域的"
      },
      {
        "label": "私有池普通人",
        "values": {
          "personalPond": 1,
          "is_leader": "0"
        },
        "effect": "仅我的"
      },
      {
        "label": "私有池经理",
        "values": {
          "personalPond": 1,
          "is_leader": "1"
        },
        "effect": "我的/区域的"
      }
    ],
    "uiAnnotation": "条件展示：personalPond=2 或is_leader"
  },
  {
    "id": "doc-cond-057",
    "pageId": "doctor-pools",
    "source": "repos/ios4crm/GCCRM/ViewController/Apply/DoctorPond/DoctorPondListVC.m",
    "line": 163,
    "condition": "pool_type=1/2/3;is_protection;isOverAdd;is_leader",
    "effect": "行操作按池分支：私有池保护/取消；公有池领取（已领拦截）；死海只允许经理提取相关操作。",
    "origin": "derived",
    "variants": [
      {
        "label": "私有未保护",
        "values": {
          "pool_type": 1,
          "is_protection": "0"
        },
        "effect": "添加保护"
      },
      {
        "label": "私有已保护",
        "values": {
          "pool_type": 1,
          "is_protection": "1"
        },
        "effect": "取消保护确认"
      },
      {
        "label": "公有可领",
        "values": {
          "pool_type": 2,
          "isOverAdd": false
        },
        "effect": "领取"
      },
      {
        "label": "公有已领",
        "values": {
          "pool_type": 2,
          "isOverAdd": true
        },
        "effect": "已领取不可重复"
      },
      {
        "label": "死海非经理",
        "values": {
          "pool_type": 3,
          "is_leader": "0"
        },
        "effect": "不响应操作"
      },
      {
        "label": "死海经理",
        "values": {
          "pool_type": 3,
          "is_leader": "1"
        },
        "effect": "死海操作弹层"
      }
    ],
    "uiAnnotation": "条件展示：pool_type=1/2/3;is_protection;isOverAdd;is_leader"
  },
  {
    "id": "doc-cond-058",
    "pageId": "potential-doctors",
    "source": "repos/ios4crm/GCCRM/ViewController/Apply/FndDoctor/View/CRMFindDoctorView.swift",
    "line": 260,
    "condition": "isOverAdd",
    "effect": "慧眼寻医领取按钮可领/已领取不可点。",
    "origin": "local",
    "variants": [
      {
        "label": "可领取",
        "values": {
          "isOverAdd": false
        },
        "effect": "领取医生启用"
      },
      {
        "label": "已领取",
        "values": {
          "isOverAdd": true
        },
        "effect": "已领取禁用"
      }
    ],
    "uiAnnotation": "条件展示：isOverAdd"
  },
  {
    "id": "doc-cond-059",
    "pageId": "potential-doctors",
    "source": "repos/ios4crm/GCCRM/ViewController/Apply/FndDoctor/View/CRMFindDoctorView.swift",
    "line": 264,
    "condition": "title/hospital/grade/summary/obstacle各自为空",
    "effect": "潜力医生卡片各字段独立条件展示；职称或医院为空不显示分隔竖线。",
    "origin": "backend",
    "variants": [
      {
        "label": "完整信息",
        "values": {
          "title": "主任医师",
          "hospital": "示例医院",
          "grade": "S",
          "summary": "演示说明",
          "obstacle": [
            "需求示例"
          ]
        },
        "effect": "完整卡片"
      },
      {
        "label": "缺省信息",
        "values": {
          "title": "",
          "hospital": "",
          "grade": "",
          "summary": "",
          "obstacle": []
        },
        "effect": "隐藏对应行/分隔"
      }
    ],
    "uiAnnotation": "条件展示：title/hospital/grade/summary/obstacle各自为空"
  },
  {
    "id": "doc-cond-060",
    "pageId": "potential-doctors",
    "source": "repos/ios4crm/GCCRM/ViewController/Apply/FndDoctor/View/CRMFindDoctorView.swift",
    "line": 294,
    "condition": "process非空且含已开单; extraStatus非空",
    "effect": "已开单状态绿色，否则蓝色；额外状态另加灰色徽标。",
    "origin": "backend",
    "variants": [
      {
        "label": "已开单",
        "values": {
          "process": "已开单",
          "extraStatus": "已领取"
        },
        "effect": "绿状态+灰状态"
      },
      {
        "label": "未开单",
        "values": {
          "process": "未开单",
          "extraStatus": ""
        },
        "effect": "蓝状态"
      },
      {
        "label": "无状态",
        "values": {
          "process": "",
          "extraStatus": ""
        },
        "effect": "不显示徽标"
      }
    ],
    "uiAnnotation": "条件展示：process非空且含已开单; extraStatus非空"
  },
  {
    "id": "doc-cond-061",
    "pageId": "special-qualifications",
    "source": "repos/ios4crm/GCCRM/ViewController/Mine/CRMSpecialUploadVC.m",
    "line": 460,
    "condition": "doctorType=0/1/2/3/4",
    "effect": "0执业医师/1助理医师/2西医/3部队医生/4无执业证，资质字段随类型增减。",
    "origin": "local",
    "variants": [
      {
        "label": "执业医师",
        "values": {
          "doctorType": 0
        },
        "effect": "卫计委+执业证+资格证，无原因"
      },
      {
        "label": "助理医师",
        "values": {
          "doctorType": 1
        },
        "effect": "卫计委+执业证+处方笺+资格证+原因"
      },
      {
        "label": "西医",
        "values": {
          "doctorType": 2
        },
        "effect": "前者+西学中证明"
      },
      {
        "label": "部队医生",
        "values": {
          "doctorType": 3
        },
        "effect": "执业证+资格证+原因，无卫计委/处方笺"
      },
      {
        "label": "无执业证",
        "values": {
          "doctorType": 4
        },
        "effect": "无执业证类型+资格证+处方笺+原因，无执业证/卫计委"
      }
    ],
    "uiAnnotation": "条件展示：doctorType=0/1/2/3/4"
  },
  {
    "id": "doc-cond-062",
    "pageId": "special-qualifications",
    "source": "repos/ios4crm/GCCRM/ViewController/Mine/CRMSpecialUploadVC.m",
    "line": 137,
    "condition": "图片字段种类",
    "effect": "执业证最多4张；资格证/身份证最多2张；头像等其他1张。身份证按正反槽位展示。",
    "origin": "local",
    "variants": [
      {
        "label": "执业证",
        "values": {
          "field": "practice_cert_photos"
        },
        "effect": "最多4张"
      },
      {
        "label": "资格证",
        "values": {
          "field": "qualification_cert_photos"
        },
        "effect": "最多2张"
      },
      {
        "label": "身份证",
        "values": {
          "field": "idcard_photos"
        },
        "effect": "正反两槽"
      },
      {
        "label": "头像",
        "values": {
          "field": "head_photos"
        },
        "effect": "1张"
      }
    ],
    "uiAnnotation": "条件展示：图片字段种类"
  },
  {
    "id": "doc-cond-063",
    "pageId": "doctor-audit",
    "source": "repos/ios4crm/GCCRM/ViewController/AddBtn/InputAuditInfomationVC.m",
    "line": 38,
    "condition": "did/image1/image2/image3缺失",
    "effect": "录入审核固定必需选医生、医生头像、工牌、现场拜访照片；其余资质为可上传项，不能一律标*。",
    "origin": "local",
    "variants": [
      {
        "label": "完整",
        "values": {
          "did": "100",
          "image1": true,
          "image2": true,
          "image3": true
        },
        "effect": "允许提交"
      },
      {
        "label": "缺资料",
        "values": {
          "did": "100",
          "image1": false,
          "image2": true,
          "image3": true
        },
        "effect": "请上传医生头像"
      }
    ],
    "uiAnnotation": "条件展示：did/image1/image2/image3缺失"
  },
  {
    "id": "doc-cond-064",
    "pageId": "doctor-visits",
    "source": "repos/ios4crm/GCCRM/Tools/CRMSmartSummaryView.swift",
    "line": 37,
    "condition": "AI摘要接口status=1且data.content去空格后非空",
    "effect": "医生拜访记录顶部智能摘要只有成功且内容非空才出现；空/失败/无cdid不占高度。",
    "origin": "backend",
    "variants": [
      {
        "label": "有摘要",
        "values": {
          "status": 1,
          "content": "演示摘要内容"
        },
        "effect": "智能摘要卡片"
      },
      {
        "label": "无摘要",
        "values": {
          "status": 1,
          "content": ""
        },
        "effect": "整卡隐藏"
      },
      {
        "label": "请求失败",
        "values": {
          "status": 0
        },
        "effect": "整卡隐藏"
      }
    ],
    "uiAnnotation": "条件展示：AI摘要接口status=1且data.content去空格后非空"
  },
  {
    "id": "doc-cond-065",
    "pageId": "doctor-visits",
    "source": "repos/ios4crm/GCCRM/ViewController/Doctor/VisitLogVC.m",
    "line": 78,
    "condition": "hiddenAddRecord",
    "effect": "拜访页浮动添加按钮独立由调用方hiddenAddRecord控制；不能只按isShowPlan决定。",
    "origin": "local",
    "variants": [
      {
        "label": "允许添加",
        "values": {
          "hiddenAddRecord": false
        },
        "effect": "显示浮动添加"
      },
      {
        "label": "禁止添加",
        "values": {
          "hiddenAddRecord": true
        },
        "effect": "隐藏浮动添加"
      }
    ],
    "uiAnnotation": "条件展示：hiddenAddRecord"
  },
  {
    "id": "doc-cond-066",
    "pageId": "workbench",
    "source": "repos/ios4crm/GCCRM/ViewModel/Map/CRMWorkToDoThumbnailView.swift",
    "line": 75,
    "condition": "待办list空/非空",
    "effect": "今日待办空时展示占位且最小高114；有记录展示列表，高度按内容+48且至少114。",
    "origin": "backend",
    "variants": [
      {
        "label": "无待办",
        "values": {
          "list": []
        },
        "effect": "空态114pt"
      },
      {
        "label": "有待办",
        "values": {
          "list": [
            {
              "title": "演示待办"
            }
          ]
        },
        "effect": "动态列表卡片"
      }
    ],
    "uiAnnotation": "条件展示：待办list空/非空"
  },
  {
    "id": "doc-cond-067",
    "pageId": "doctor-pools",
    "source": "repos/ios4crm/GCCRM/ViewModel/Apply/DoctorPond/DoctorPondCell.m",
    "line": 472,
    "condition": "is_cancel",
    "effect": "客户池状态增加红色(已注销)。",
    "origin": "backend",
    "variants": [
      {
        "label": "注销",
        "values": {
          "is_cancel": true
        },
        "effect": "状态追加红色已注销"
      },
      {
        "label": "正常",
        "values": {
          "is_cancel": false
        },
        "effect": "普通状态"
      }
    ],
    "uiAnnotation": "条件展示：is_cancel"
  },
  {
    "id": "doc-cond-068",
    "pageId": "doctor-pools",
    "source": "repos/ios4crm/GCCRM/ViewModel/Apply/DoctorPond/DoctorPondCell.m",
    "line": 481,
    "condition": "is_login_bubble",
    "effect": "客户池姓名旁登录提示图标。",
    "origin": "backend",
    "variants": [
      {
        "label": "有登录气泡",
        "values": {
          "is_login_bubble": true
        },
        "effect": "显示气泡图标"
      },
      {
        "label": "无气泡",
        "values": {
          "is_login_bubble": false
        },
        "effect": "隐藏"
      }
    ],
    "uiAnnotation": "条件展示：is_login_bubble"
  },
  {
    "id": "doc-cond-069",
    "pageId": "doctor-pools",
    "source": "repos/ios4crm/GCCRM/ViewModel/Apply/DoctorPond/DoctorPondCell.m",
    "line": 532,
    "condition": "pool_type=2 & no_receive_flag",
    "effect": "公有池连续领取限制时用stop图标替代add；限制结果仍需点击请求返回为准。",
    "origin": "backend",
    "variants": [
      {
        "label": "可领",
        "values": {
          "pool_type": 2,
          "no_receive_flag": false
        },
        "effect": "加号领取"
      },
      {
        "label": "受限",
        "values": {
          "pool_type": 2,
          "no_receive_flag": true
        },
        "effect": "停止图标"
      }
    ],
    "uiAnnotation": "条件展示：pool_type=2 & no_receive_flag"
  },
  {
    "id": "doc-cond-070",
    "pageId": "doctor-pools",
    "source": "repos/ios4crm/GCCRM/ViewModel/Apply/DoctorPond/DoctorPondCell.m",
    "line": 584,
    "condition": "pool_type=2 & add_lock_str非空",
    "effect": "公有池锁定文案覆盖保护/领取按钮；显示锁定说明。",
    "origin": "backend",
    "variants": [
      {
        "label": "锁定",
        "values": {
          "pool_type": 2,
          "add_lock_str": "演示锁定提示"
        },
        "effect": "隐藏领取/保护，显示锁定文字"
      },
      {
        "label": "未锁",
        "values": {
          "pool_type": 2,
          "add_lock_str": ""
        },
        "effect": "按领取状态显示按钮"
      }
    ],
    "uiAnnotation": "条件展示：pool_type=2 & add_lock_str非空"
  },
  {
    "id": "doc-cond-071",
    "pageId": "doctor-pools",
    "source": "repos/ios4crm/GCCRM/ViewModel/Apply/DoctorPond/DoctorPondCell.m",
    "line": 698,
    "condition": "is_protectionVC & protection_countdown非空",
    "effect": "保护名单卡片增加保护倒计时/原释放倒计时，并隐藏推荐值。",
    "origin": "derived",
    "variants": [
      {
        "label": "保护倒计时",
        "values": {
          "is_protectionVC": true,
          "protection_countdown": "2天",
          "freed_time_cn": "演示日期"
        },
        "effect": "增加倒计时，橙色数值"
      },
      {
        "label": "普通列表",
        "values": {
          "is_protectionVC": false
        },
        "effect": "不显示保护倒计时"
      }
    ],
    "uiAnnotation": "条件展示：is_protectionVC & protection_countdown非空"
  },
  {
    "id": "doc-cond-072",
    "pageId": "doctor-pools",
    "source": "repos/ios4crm/GCCRM/ViewModel/Apply/DoctorPond/DoctorPondCell.m",
    "line": 708,
    "condition": "!qualification_is_complete & deadline非空且非9999-01-01",
    "effect": "客户池卡片补齐资质截止时间行。",
    "origin": "backend",
    "variants": [
      {
        "label": "有期限不完整",
        "values": {
          "qualification_is_complete": false,
          "qualification_complement_deadline": "2026-12-01"
        },
        "effect": "显示截止时间"
      },
      {
        "label": "完整/无限期",
        "values": {
          "qualification_is_complete": true,
          "qualification_complement_deadline": "9999-01-01"
        },
        "effect": "隐藏截止行"
      }
    ],
    "uiAnnotation": "条件展示：!qualification_is_complete & deadline非空且非9999-01-01"
  },
  {
    "id": "doc-cond-073",
    "pageId": "doctor-pools",
    "source": "repos/ios4crm/GCCRM/ViewModel/Apply/DoctorPond/DoctorPondCell.m",
    "line": 724,
    "condition": "pool_type=2 & !isFromFog;isShrink",
    "effect": "普通公有池列表默认可折叠最近启动/拜访等内容，另显示近1年医助和总计人数；其他池不显示展开箭头且直接展示详情。",
    "origin": "derived",
    "variants": [
      {
        "label": "公有折叠",
        "values": {
          "pool_type": 2,
          "isFromFog": false,
          "isShrink": false
        },
        "effect": "医助人数+展开箭头，不展示时间细项"
      },
      {
        "label": "公有展开",
        "values": {
          "pool_type": 2,
          "isFromFog": false,
          "isShrink": true
        },
        "effect": "增加启动/拜访/资质信息"
      },
      {
        "label": "私有",
        "values": {
          "pool_type": 1
        },
        "effect": "时间细项直接显示，无箭头"
      }
    ],
    "uiAnnotation": "条件展示：pool_type=2 & !isFromFog;isShrink"
  },
  {
    "id": "doc-cond-074",
    "pageId": "doctor-pools",
    "source": "repos/ios4crm/GCCRM/ViewModel/Apply/DoctorPond/DoctorPondCell.m",
    "line": 749,
    "condition": "activate_flag非空优先；否则recommend_score_is_show且无保护倒计时",
    "effect": "激活文案优先覆盖推荐值区域并隐藏图标；无激活文案按推荐展示开关。",
    "origin": "backend",
    "variants": [
      {
        "label": "激活文案",
        "values": {
          "activate_flag": "演示激活状态",
          "recommend_score_is_show": false
        },
        "effect": "显示文案，不显示推荐图标"
      },
      {
        "label": "有推荐",
        "values": {
          "activate_flag": "",
          "recommend_score_is_show": true
        },
        "effect": "推荐值+图标"
      },
      {
        "label": "无推荐",
        "values": {
          "activate_flag": "",
          "recommend_score_is_show": false
        },
        "effect": "不显示推荐值"
      }
    ],
    "uiAnnotation": "条件展示：activate_flag非空优先；否则recommend_score_is_show且无保护倒计时"
  },
  {
    "id": "doc-cond-075",
    "pageId": "doctor-pools",
    "source": "repos/ios4crm/GCCRM/ViewModel/Apply/DoctorPond/DoctorPondCell.m",
    "line": 761,
    "condition": "isFromFog/isFogSearch/other_doctor_flag/lableMark",
    "effect": "地图来源行改为位置视图：我的标蓝/其他橙；其他医生标识隐藏，普通地图显示距离，地图搜索显示推荐。",
    "origin": "derived",
    "variants": [
      {
        "label": "地图附近",
        "values": {
          "isFromFog": true,
          "isFogSearch": false,
          "lableMark": "我的医生",
          "other_doctor_flag": false
        },
        "effect": "蓝标签+距离，无推荐"
      },
      {
        "label": "地图搜索",
        "values": {
          "isFromFog": true,
          "isFogSearch": true,
          "lableMark": "公海医生",
          "other_doctor_flag": false
        },
        "effect": "橙标签，无距离，有推荐"
      },
      {
        "label": "其他医生",
        "values": {
          "isFromFog": true,
          "other_doctor_flag": true
        },
        "effect": "隐藏归属标签"
      }
    ],
    "uiAnnotation": "条件展示：isFromFog/isFogSearch/other_doctor_flag/lableMark"
  },
  {
    "id": "doc-cond-076",
    "pageId": "doctor-pools",
    "source": "repos/ios4crm/GCCRM/ViewModel/Apply/DoctorPond/DoctorPondCell.m",
    "line": 780,
    "condition": "lx_two_release非空且pool_type=2且无add_lock_str且非地图",
    "effect": "连续释放提示只在满足全部条件时展示18pt标签行。",
    "origin": "backend",
    "variants": [
      {
        "label": "符合",
        "values": {
          "pool_type": 2,
          "lx_two_release": "演示连续释放提示",
          "add_lock_str": "",
          "isFromFog": false
        },
        "effect": "显示提示"
      },
      {
        "label": "其他",
        "values": {
          "pool_type": 1,
          "lx_two_release": "演示提示"
        },
        "effect": "隐藏提示"
      }
    ],
    "uiAnnotation": "条件展示：lx_two_release非空且pool_type=2且无add_lock_str且非地图"
  },
  {
    "id": "doc-cond-077",
    "pageId": "doctor-pools",
    "source": "repos/ios4crm/GCCRM/ViewModel/Apply/DoctorPond/DoctorPondCell.m",
    "line": 807,
    "condition": "crm_role>=3",
    "effect": "点击领取锁定提示，仅角色3/4触发unlockBlcok；小于3无操作。",
    "origin": "role",
    "variants": [
      {
        "label": "区域经理",
        "values": {
          "crm_role": "3"
        },
        "effect": "打开解锁相关处理"
      },
      {
        "label": "普通医助",
        "values": {
          "crm_role": "1"
        },
        "effect": "无操作"
      }
    ],
    "uiAnnotation": "条件展示：crm_role>=3"
  },
  {
    "id": "doc-cond-078",
    "pageId": "doctor-pools",
    "source": "repos/ios4crm/GCCRM/ViewController/Apply/DoctorPond/DoctorPoodManager.m",
    "line": 87,
    "condition": "last_num<=0 且last_super_protect_nums<=0",
    "effect": "设置保护前的后端名额控制。",
    "origin": "backend",
    "variants": [
      {
        "label": "均无名额",
        "values": {
          "last_num": 0,
          "last_super_protect_nums": 0
        },
        "effect": "您的保护名额已用完"
      },
      {
        "label": "有普通/超级名额",
        "values": {
          "last_num": 2,
          "last_super_protect_nums": 1
        },
        "effect": "保护选择弹层，含截止日期"
      }
    ],
    "uiAnnotation": "条件展示：last_num<=0 且last_super_protect_nums<=0"
  },
  {
    "id": "doc-cond-079",
    "pageId": "doctor-pools",
    "source": "repos/ios4crm/GCCRM/ViewController/Apply/DoctorPond/DoctorPoodManager.m",
    "line": 176,
    "condition": "can_not_receive_flag;last_num;is_self_doctor",
    "effect": "领取前动态名额/限制弹层。",
    "origin": "backend",
    "variants": [
      {
        "label": "限制领取",
        "values": {
          "can_not_receive_flag": 1,
          "can_not_receive_flag_str": "演示限制原因"
        },
        "effect": "显示后台限制原因"
      },
      {
        "label": "今日名额用完",
        "values": {
          "can_not_receive_flag": 0,
          "last_num": 0,
          "is_self_doctor": false
        },
        "effect": "今日名额已用完"
      },
      {
        "label": "本人无剩余名额",
        "values": {
          "can_not_receive_flag": 0,
          "last_num": 0,
          "is_self_doctor": true
        },
        "effect": "仍进入确认层"
      },
      {
        "label": "可领取",
        "values": {
          "can_not_receive_flag": 0,
          "last_num": 2,
          "is_self_doctor": false
        },
        "effect": "显示领取确认/名额/上限规则"
      }
    ],
    "uiAnnotation": "条件展示：can_not_receive_flag;last_num;is_self_doctor"
  },
  {
    "id": "doc-cond-080",
    "pageId": "coupon-list",
    "source": "repos/ios4crm/GCCRM/ViewController/Doctor/Coupon/CRMCouponStatus.swift",
    "line": 34,
    "condition": "status index0/1/2映射后台coupon_state2/4/5",
    "effect": "UI页签索引和服务端状态码不是同一个值。",
    "origin": "derived",
    "variants": [
      {
        "label": "待使用",
        "values": {
          "selectedIndex": 0,
          "coupon_state": "2"
        },
        "effect": "请求待使用券"
      },
      {
        "label": "已使用",
        "values": {
          "selectedIndex": 1,
          "coupon_state": "4"
        },
        "effect": "请求已使用券"
      },
      {
        "label": "已过期",
        "values": {
          "selectedIndex": 2,
          "coupon_state": "5"
        },
        "effect": "请求已过期券"
      }
    ],
    "uiAnnotation": "条件展示：status index0/1/2映射后台coupon_state2/4/5"
  },
  {
    "id": "doc-cond-081",
    "pageId": "doctor-info",
    "source": "repos/ios4crm/GCCRM/ViewController/Doctor/DoctorDetailVC.m",
    "line": 239,
    "condition": "visit_address_lat>0 或visit_address_lng>0",
    "effect": "拜访地址任一坐标>0视为已定位，无提示；否则40pt橙色“地址未精确定位，请修正”。",
    "origin": "backend",
    "variants": [
      {
        "label": "已定位",
        "values": {
          "visit_address_lat": 30.1,
          "visit_address_lng": 120.1
        },
        "effect": "隐藏定位提示"
      },
      {
        "label": "未定位",
        "values": {
          "visit_address_lat": 0,
          "visit_address_lng": 0
        },
        "effect": "显示橙色提示40pt"
      }
    ],
    "uiAnnotation": "条件展示：visit_address_lat>0 或visit_address_lng>0"
  },
  {
    "id": "doc-cond-082",
    "pageId": "doctor-home",
    "source": "repos/ios4crm/GCCRM/ViewModel/DoctorVM/DoctorHomeHeadView.m",
    "line": 617,
    "condition": "level=A/B/C/D/其他",
    "effect": "主页操作区域跟进等级配色，非A-D为未设置等级+设置等级按钮。",
    "origin": "backend",
    "variants": [
      {
        "label": "A",
        "values": {
          "level": "A"
        },
        "effect": "橙#FF6E3A/背景#FFF0EB，修改等级"
      },
      {
        "label": "B",
        "values": {
          "level": "B"
        },
        "effect": "蓝#3B99FC/背景#EBF5FF"
      },
      {
        "label": "C",
        "values": {
          "level": "C"
        },
        "effect": "绿#209657/背景#DDF2E7"
      },
      {
        "label": "D",
        "values": {
          "level": "D"
        },
        "effect": "金#CC8D2A/背景#FFEFD7"
      },
      {
        "label": "未设置",
        "values": {
          "level": "U"
        },
        "effect": "灰色/未设置等级/设置等级"
      }
    ],
    "uiAnnotation": "条件展示：level=A/B/C/D/其他"
  },
  {
    "id": "doc-cond-083",
    "pageId": "potential-doctors",
    "source": "repos/ios4crm/GCCRM/ViewController/Apply/FndDoctor/Model/CRMFindDoctorModel.swift",
    "line": 37,
    "condition": "potential_pool level=100/90/80/其他",
    "effect": "潜力医生分级字段为整数，并非普通医生A-D字符串。",
    "origin": "backend",
    "variants": [
      {
        "label": "S",
        "values": {
          "level": 100
        },
        "effect": "S徽标"
      },
      {
        "label": "A",
        "values": {
          "level": 90
        },
        "effect": "A徽标"
      },
      {
        "label": "B",
        "values": {
          "level": 80
        },
        "effect": "B徽标"
      },
      {
        "label": "其他",
        "values": {
          "level": 0
        },
        "effect": "无等级徽标"
      }
    ],
    "uiAnnotation": "条件展示：potential_pool level=100/90/80/其他"
  },
  {
    "id": "doc-cond-084",
    "pageId": "special-qualifications",
    "source": "repos/ios4crm/GCCRM/ViewController/Mine/CRMSpecialUploadVC.m",
    "line": 715,
    "condition": "UI doctorType索引+1 => doctor_type后台字段",
    "effect": "本地索引0..4对应请求doctor_type1..5；无执业证子类型也采用index+1。",
    "origin": "derived",
    "variants": [
      {
        "label": "执业医师",
        "values": {
          "doctorType": 0,
          "doctor_type": 1
        },
        "effect": "索引和请求码区分"
      },
      {
        "label": "无执业证",
        "values": {
          "doctorType": 4,
          "doctor_type": 5,
          "certificateType": 3,
          "no_practice_cert_type": "4"
        },
        "effect": "规培子类型请求码4"
      }
    ],
    "uiAnnotation": "条件展示：UI doctorType索引+1 => doctor_type后台字段"
  },
  {
    "id": "doc-cond-085",
    "pageId": "schedule-edit",
    "source": "repos/ios4crm/GCCRM/ViewController/AddBtn/CRMEditScheduleVC.m",
    "line": 605,
    "condition": "同医院推荐list排除当前医生后非空",
    "effect": "推荐列表需要先剔除当前医生，全部都是当前医生则最终不显示推荐组。",
    "origin": "derived",
    "variants": [
      {
        "label": "仅当前医生",
        "values": {
          "current_cdid": "200",
          "list": [
            {
              "cdid": "200"
            }
          ]
        },
        "effect": "隐藏推荐组"
      },
      {
        "label": "含其他医生",
        "values": {
          "current_cdid": "200",
          "list": [
            {
              "cdid": "200"
            },
            {
              "cdid": "201"
            }
          ]
        },
        "effect": "只显示201"
      }
    ],
    "uiAnnotation": "条件展示：同医院推荐list排除当前医生后非空"
  },
  {
    "pageId": "orders",
    "source": "repos/ios4crm/GCCRM/ViewController/Apply/OrderInquire/OrderVC.m",
    "line": 131,
    "condition": "is_leader / team_role 登录标识",
    "effect": "范围菜单受角色限制，不应永远显示全部范围。",
    "variants": [
      {
        "label": "区域管理",
        "values": {
          "is_leader": 1
        },
        "effect": "我的订单；代理订单；区域订单；团队订单；我的照片方；商城订单"
      },
      {
        "label": "团队管理",
        "values": {
          "is_leader": 0,
          "team_role": 1
        },
        "effect": "我的订单；代理订单；团队订单；我的照片方；商城订单"
      },
      {
        "label": "普通医助",
        "values": {
          "is_leader": 0,
          "team_role": 0
        },
        "effect": "我的订单；代理订单；我的照片方；商城订单"
      }
    ],
    "id": "svc-cond-001",
    "origin": "role"
  },
  {
    "pageId": "orders",
    "source": "repos/ios4crm/GCCRM/ViewController/Apply/OrderInquire/OrderVC.m",
    "line": 334,
    "condition": "isShowFaPiao / isShowFenJi / selectedRange==2",
    "effect": "筛选弹层内容因当前类别和范围变化。不是所有筛选字段都始终出现。",
    "variants": [
      {
        "label": "显示开票筛选",
        "values": {
          "isShowFaPiao": true
        },
        "effect": "开票状态展示接口invoice_status选项"
      },
      {
        "label": "显示粉剂包装筛选",
        "values": {
          "isShowFenJi": true
        },
        "effect": "粉剂包装样式入口"
      },
      {
        "label": "团队订单",
        "values": {
          "selectedRange": "2"
        },
        "effect": "增加医助字段"
      },
      {
        "label": "非团队/隐藏扩展项",
        "values": {
          "selectedRange": "1",
          "isShowFaPiao": false,
          "isShowFenJi": false
        },
        "effect": "不显示医助/开票/粉剂包装行；药库和更多保留"
      }
    ],
    "id": "svc-cond-002",
    "origin": "entry"
  },
  {
    "pageId": "order-detail",
    "source": "repos/ios4crm/GCCRM/ViewController/Apply/OrderInquire/OrderDetailVC.m",
    "line": 282,
    "condition": "status_pay != 1",
    "effect": "未支付时物流信息区行高接近0，不能把未支付订单也渲染为已发货详情。",
    "variants": [
      {
        "label": "未支付",
        "values": {
          "status_pay": 0,
          "time_pay": 0
        },
        "effect": "隐藏物流信息区及其header/footer；菜单有催付"
      },
      {
        "label": "已支付",
        "values": {
          "status_pay": 1,
          "time_pay": 1793931600
        },
        "effect": "显示物流信息区；菜单无催付"
      }
    ],
    "layout": {
      "sourceCell": "ViewModel/Apply/OrderInquire/OrderDetailCell2.xib",
      "unpaidRowHeight": 0.001,
      "priceRowHeight": 33,
      "detailTabHeight": 40,
      "detailTabs": [
        "订单信息",
        "备注/投诉",
        "价格明细"
      ]
    },
    "fieldOrder": [
      "订单编号",
      "订单状态",
      "医生信息",
      "患者信息",
      "下单时间",
      "支付时间",
      "医嘱/备注",
      "医生备注",
      "医助备注",
      "药方剂型",
      "剂数",
      "煎煮信息",
      "包装提示",
      "用法/用量",
      "诊断",
      "收件地址",
      "退款信息"
    ],
    "id": "svc-cond-003",
    "origin": "backend"
  },
  {
    "pageId": "order-detail",
    "source": "repos/ios4crm/GCCRM/ViewController/Apply/OrderInquire/OrderDetailVC.m",
    "line": 298,
    "condition": "nu_status==0 / show_receive_button / cold_chain",
    "effect": "物流按钮、签收按钮和冷链标记由三个独立字段控制，不从字符串状态名猜测。",
    "variants": [
      {
        "label": "无物流信息",
        "values": {
          "nu_status": 0,
          "show_receive_button": false,
          "cold_chain": ""
        },
        "effect": "隐藏查看物流，按钮约束宽度0；隐藏确认签收"
      },
      {
        "label": "有物流不可签收",
        "values": {
          "nu_status": 1,
          "show_receive_button": false
        },
        "effect": "显示查看物流宽68；隐藏确认签收"
      },
      {
        "label": "允许签收",
        "values": {
          "nu_status": 1,
          "show_receive_button": true
        },
        "effect": "显示确认签收"
      },
      {
        "label": "冷链信息",
        "values": {
          "nu_status": 1,
          "cold_chain": "冷链"
        },
        "effect": "物流状态标题后追加（冷链），12pt粗体#333333"
      }
    ],
    "id": "svc-cond-004",
    "origin": "backend"
  },
  {
    "pageId": "order-detail",
    "source": "repos/ios4crm/GCCRM/ViewController/Apply/OrderInquire/OrderDetailVC.m",
    "line": 1187,
    "condition": "time_pay == 0",
    "effect": "“更多”菜单的催付仅未支付时出现。",
    "variants": [
      {
        "label": "未支付菜单",
        "values": {
          "time_pay": 0
        },
        "effect": "催付；修改地址；开发票；紧急退款"
      },
      {
        "label": "已支付菜单",
        "values": {
          "time_pay": 1793931600
        },
        "effect": "修改地址；开发票；紧急退款"
      }
    ],
    "layout": {
      "menuWidth": 110
    },
    "id": "svc-cond-005",
    "origin": "backend"
  },
  {
    "pageId": "order-detail",
    "source": "repos/ios4crm/GCCRM/ViewController/Apply/OrderInquire/OrderDetailVC.m",
    "line": 1265,
    "condition": "判断接口 data.op_flag / data.op_msg",
    "effect": "改地址/发票/退款不是直接可执行；接口禁止时只提示op_msg，不能跳到表单。",
    "variants": [
      {
        "label": "操作允许",
        "values": {
          "op_flag": true
        },
        "effect": "进入对应表单"
      },
      {
        "label": "操作不允许",
        "values": {
          "op_flag": false,
          "op_msg": "暂不支持该操作！"
        },
        "effect": "保留详情；显示后端提示"
      }
    ],
    "id": "svc-cond-006",
    "origin": "backend"
  },
  {
    "pageId": "order-detail",
    "source": "repos/ios4crm/GCCRM/ViewController/Apply/OrderInquire/OrderDetailVC.m",
    "line": 197,
    "condition": "is_focused",
    "effect": "关注图标是后端布尔状态；切换成功后更新。",
    "variants": [
      {
        "label": "已关注",
        "values": {
          "is_focused": 1
        },
        "effect": "关注图标选中"
      },
      {
        "label": "未关注",
        "values": {
          "is_focused": 0
        },
        "effect": "关注图标未选中"
      }
    ],
    "id": "svc-cond-007",
    "origin": "backend"
  },
  {
    "pageId": "order-detail",
    "source": "repos/ios4crm/GCCRM/ViewController/Apply/OrderInquire/OrderDetailVC.m",
    "line": 1103,
    "condition": "decoction_is_paste",
    "effect": "源码实际以非true时插入“出膏量计算”相关段；不要根据英文变量名反转。",
    "variants": [
      {
        "label": "显示出膏量计算",
        "values": {
          "decoction_is_paste": false
        },
        "effect": "在价格明细前插入decoction段"
      },
      {
        "label": "无出膏量计算段",
        "values": {
          "decoction_is_paste": true
        },
        "effect": "不插入该段"
      }
    ],
    "id": "svc-cond-008",
    "origin": "backend"
  },
  {
    "pageId": "mall-detail",
    "source": "repos/ios4crm/GCCRM/ViewController/Apply/StoreOrder/StoreOrderDetailVC.m",
    "line": 95,
    "condition": "order_msg.status_pay != 1 / nu_msg.nu_status",
    "effect": "商城详情未支付隐藏物流；即使存在物流也一直隐藏确认签收按钮（不能套处方订单签收）。",
    "variants": [
      {
        "label": "商城未支付",
        "values": {
          "order_msg.status_pay": 0
        },
        "effect": "隐藏物流区"
      },
      {
        "label": "商城已支付未有物流",
        "values": {
          "order_msg.status_pay": 1,
          "nu_msg.nu_status": 0
        },
        "effect": "物流按钮隐藏；签收按钮隐藏"
      },
      {
        "label": "商城已支付有物流",
        "values": {
          "order_msg.status_pay": 1,
          "nu_msg.nu_status": 1
        },
        "effect": "显示查看物流；签收按钮仍隐藏"
      }
    ],
    "id": "svc-cond-009",
    "origin": "backend"
  },
  {
    "pageId": "after-sale-detail",
    "source": "repos/ios4crm/GCCRM/ViewController/Apply/AfterSale/AfterSaleDetailVC.m",
    "line": 280,
    "condition": "isRefund 页面参数",
    "effect": "退款详情与投诉详情字段不同。",
    "variants": [
      {
        "label": "退款详情",
        "values": {
          "isRefund": true
        },
        "effect": "售后信息=提交时间/售后类型/状态/退款金额/退款原因；无跟进信息段"
      },
      {
        "label": "投诉详情",
        "values": {
          "isRefund": false
        },
        "effect": "售后信息=提交时间/售后类型/状态/投诉对象/投诉原因/投诉说明/处理意见；增加跟进信息段"
      }
    ],
    "layout": {
      "sectionHeaderHeight": 46,
      "emptyFollowTextFont": 14
    },
    "fieldOrder": [
      "订单信息",
      "售后信息",
      "跟进信息（仅投诉）"
    ],
    "id": "svc-cond-010",
    "origin": "entry"
  },
  {
    "pageId": "after-sale-detail",
    "source": "repos/ios4crm/GCCRM/ViewController/Apply/AfterSale/AfterSaleDetailVC.m",
    "line": 379,
    "condition": "photos.count>0 / trace_details.count==0",
    "effect": "投诉图片及跟进记录是条件区块。",
    "variants": [
      {
        "label": "有投诉图片",
        "values": {
          "photos": [
            "demo1",
            "demo2"
          ],
          "isRefund": false
        },
        "effect": "售后信息末尾增加图片网格"
      },
      {
        "label": "无投诉图片",
        "values": {
          "photos": [],
          "isRefund": false
        },
        "effect": "不显示图片行"
      },
      {
        "label": "暂无跟进",
        "values": {
          "trace_details": [],
          "isRefund": false
        },
        "effect": "跟进段显示无"
      },
      {
        "label": "已有跟进",
        "values": {
          "trace_details": [
            {
              "trace_content": "演示跟进"
            }
          ],
          "isRefund": false
        },
        "effect": "显示跟进时间/提交人/内容列表"
      }
    ],
    "id": "svc-cond-011",
    "origin": "backend"
  },
  {
    "pageId": "inquiry-orders",
    "source": "repos/ios4crm/GCCRM/ViewModel/Apply/Chat/ChatListCell.m",
    "line": 42,
    "condition": "chat_type",
    "effect": "旧问诊列表用类型小图标，不用同一个文字pill替代。",
    "variants": [
      {
        "label": "图文问诊",
        "values": {
          "chat_type": "IMAGE"
        },
        "effect": "chat_type_image"
      },
      {
        "label": "电话问诊",
        "values": {
          "chat_type": "CALL"
        },
        "effect": "chat_type_phone"
      },
      {
        "label": "视频问诊",
        "values": {
          "chat_type": "VIDEO"
        },
        "effect": "chat_type_video"
      },
      {
        "label": "咨询",
        "values": {
          "chat_type": "ASK"
        },
        "effect": "chat_type_question"
      },
      {
        "label": "小程序问诊",
        "values": {
          "chat_type": "INQUIRY_INVEST"
        },
        "effect": "chat_type_uniapp"
      }
    ],
    "layout": {
      "typeIconWidth": 16,
      "typeIconHeight": 13
    },
    "fieldOrder": [
      "类型图标+订单号 | 支付时间",
      "医生（医助） | 状态",
      "患者",
      "最后沟通内容"
    ],
    "id": "svc-cond-012",
    "origin": "backend"
  },
  {
    "pageId": "inquiry-orders",
    "source": "repos/ios4crm/GCCRM/ViewModel/Apply/Chat/ChatListCell.m",
    "line": 66,
    "condition": "doctor_is_replay / m_name",
    "effect": "待回复颜色橙色，其他状态灰；医助名存在才拼接。",
    "variants": [
      {
        "label": "医生未回复",
        "values": {
          "doctor_is_replay": 0,
          "doctor_is_replay_name": "待回复",
          "m_name": "青禾"
        },
        "effect": "状态色#FF6E3A；医生(青禾)"
      },
      {
        "label": "已回复",
        "values": {
          "doctor_is_replay": 1,
          "doctor_is_replay_name": "已回复",
          "m_name": ""
        },
        "effect": "状态色#888888；只显示医生姓名"
      }
    ],
    "id": "svc-cond-013",
    "origin": "backend"
  },
  {
    "pageId": "consultations",
    "source": "repos/ios4crm/GCCRM/ViewController/Apply/AskOrder/CRMAskOrderCell.m",
    "line": 78,
    "condition": "chat_type为空时根据orderid首字母推导来源；m_name/c_name为空隐藏相应内容",
    "effect": "新咨询列表不同于旧问诊卡片：没有状态、价格、复制等原基类元素。",
    "variants": [
      {
        "label": "后端来源文本",
        "values": {
          "chat_type": "图文咨询",
          "orderid": "C123",
          "m_name": "青禾",
          "c_name": "张女士"
        },
        "effect": "医生（青禾）与患者同一行；第二行：图文咨询 · C123；第三行：pay_time"
      },
      {
        "label": "扫码咨询",
        "values": {
          "chat_type": "",
          "orderid": "W123"
        },
        "effect": "第二行：扫码咨询 · W123"
      },
      {
        "label": "诊后咨询",
        "values": {
          "chat_type": "",
          "orderid": "G123"
        },
        "effect": "第二行：诊后咨询 · G123"
      },
      {
        "label": "无患者",
        "values": {
          "c_name": ""
        },
        "effect": "患者宽度0；医生名占剩余宽度"
      }
    ],
    "layout": {
      "background": "#F4F4F4",
      "cardRadius": 8,
      "cardInsets": [
        0,
        12,
        8,
        12
      ],
      "innerHorizontalInset": 16,
      "doctorFont": "16 medium #222222",
      "dividerHeight": 0.5,
      "orderRowHeight": 20,
      "timeRowHeight": 20
    },
    "fieldOrder": [
      "医生（医助） | 患者",
      "分隔线",
      "来源 · 订单号",
      "支付时间"
    ],
    "id": "svc-cond-014",
    "origin": "backend"
  },
  {
    "pageId": "workorder-chat",
    "source": "repos/ios4crm/GCCRM/ViewController/Synergy/CRMSynergyChatDetailVC.m",
    "line": 427,
    "condition": "当前mid与create_ab_uid/last_trace_mid/liable_mid关系 + e_type；三者有优先级，先判断发起人",
    "effect": "动作集合决定输入框或底部按钮；未找到匹配角色或已结束时不出现操作。",
    "variants": [
      {
        "label": "发起人·处理中",
        "values": {
          "mid": "m1",
          "create_ab_uid": "m1",
          "e_type": 10
        },
        "effect": "仅回复动作→处理记录页显示聊天输入框；无多按钮底栏"
      },
      {
        "label": "发起人·待确认",
        "values": {
          "mid": "m1",
          "create_ab_uid": "m1",
          "e_type": 11
        },
        "effect": "底栏=回复/完成；隐藏聊天输入框"
      },
      {
        "label": "当前跟进人·未结束",
        "values": {
          "mid": "m2",
          "create_ab_uid": "m1",
          "last_trace_mid": "m2",
          "e_type": 10
        },
        "effect": "底栏=退回/转派/回复；隐藏聊天输入框"
      },
      {
        "label": "负责人·未结束",
        "values": {
          "mid": "m3",
          "create_ab_uid": "m1",
          "last_trace_mid": "m2",
          "liable_mid": "m3",
          "e_type": 10
        },
        "effect": "仅回复→聊天输入框"
      },
      {
        "label": "已结束",
        "values": {
          "e_type": 20
        },
        "effect": "无操作底栏/输入框；显示完成提示"
      },
      {
        "label": "其他人员",
        "values": {
          "mid": "m4",
          "create_ab_uid": "m1",
          "last_trace_mid": "m2",
          "liable_mid": "m3",
          "e_type": 10
        },
        "effect": "无动作，源码showFinishedTip=config为空（不应杜撰成权限审核提示）"
      }
    ],
    "layout": {
      "segmentHeight": 40,
      "footerHeightExcludingSafeArea": 64,
      "segments": [
        "处理记录",
        "工单明细"
      ],
      "actionBlue": "#3B99FC",
      "returnTitleColor": "#222222"
    },
    "id": "svc-cond-015",
    "origin": "backend"
  },
  {
    "pageId": "workorder-chat",
    "source": "repos/ios4crm/GCCRM/ViewController/Synergy/CRMSynergyChatDetailVC.m",
    "line": 329,
    "condition": "create_ab_uid == mid",
    "effect": "仅创建者首次请求后添加删除导航按钮。",
    "variants": [
      {
        "label": "自己创建",
        "values": {
          "create_ab_uid": "m1",
          "mid": "m1"
        },
        "effect": "导航删除可见，点击二次确认"
      },
      {
        "label": "他人创建",
        "values": {
          "create_ab_uid": "m1",
          "mid": "m2"
        },
        "effect": "无删除"
      }
    ],
    "id": "svc-cond-016",
    "origin": "backend"
  },
  {
    "pageId": "workorder-chat",
    "source": "repos/ios4crm/GCCRM/ViewController/Synergy/CRMSynergyChatDetailVC.m",
    "line": 472,
    "condition": "msg.is_initiator || msg.ab_uid==mid",
    "effect": "聊天气泡位置与角色标签由字段决定；非本人但发起人消息也在右侧。",
    "variants": [
      {
        "label": "发起人消息",
        "values": {
          "is_initiator": 1,
          "ab_uid": "other"
        },
        "effect": "右侧气泡；创建标签"
      },
      {
        "label": "本人跟进消息",
        "values": {
          "is_initiator": 0,
          "ab_uid": "m1",
          "mid": "m1"
        },
        "effect": "右侧气泡；跟进标签"
      },
      {
        "label": "他人跟进消息",
        "values": {
          "is_initiator": 0,
          "ab_uid": "m2",
          "mid": "m1"
        },
        "effect": "左侧气泡；跟进标签"
      }
    ],
    "id": "svc-cond-017",
    "origin": "backend"
  },
  {
    "pageId": "workorder-info",
    "source": "repos/ios4crm/GCCRM/ViewController/Synergy/CRMSynergyDetailVC.m",
    "line": 427,
    "condition": "e_type>=20 且score为字典",
    "effect": "已结束工单追加评价段；进行中无评价段。",
    "variants": [
      {
        "label": "处理中",
        "values": {
          "e_type": 10,
          "score": {}
        },
        "effect": "只显示工单信息和处理记录"
      },
      {
        "label": "结束且有评价",
        "values": {
          "e_type": 20,
          "score": {
            "satisfied_score_name": "满意",
            "is_complete": "已解决"
          }
        },
        "effect": "增加工单评价：评价/是否解决"
      }
    ],
    "fieldOrder": [
      "工单名称",
      "工单状态",
      "工单号",
      "发起人",
      "时间",
      "question_detail动态字段",
      "跟进人",
      "工单评价（条件）",
      "处理记录"
    ],
    "id": "svc-cond-018",
    "origin": "backend"
  },
  {
    "pageId": "workorder-info",
    "source": "repos/ios4crm/GCCRM/ViewController/Synergy/CRMSynergyChatDetailVC.m",
    "line": 588,
    "condition": "question_detail[].c == order_no 或 c contains phone",
    "effect": "动态工单字段需要按类型渲染：关联订单可复制并打开详情、电话可拨打，普通文本无动作。",
    "variants": [
      {
        "label": "关联订单字段",
        "values": {
          "question_detail": [
            {
              "c": "order_no",
              "n": "订单编号",
              "v": "GC-DEMO"
            }
          ]
        },
        "effect": "字段蓝色/可跳转订单详情；复制订单号"
      },
      {
        "label": "电话字段",
        "values": {
          "question_detail": [
            {
              "c": "patient_phone",
              "n": "联系电话",
              "v": "13800000000"
            }
          ]
        },
        "effect": "电话动作"
      },
      {
        "label": "普通文本",
        "values": {
          "question_detail": [
            {
              "c": "remark",
              "n": "备注",
              "v": "演示"
            }
          ]
        },
        "effect": "普通文本，无电话/跳转"
      }
    ],
    "id": "svc-cond-019",
    "origin": "backend"
  },
  {
    "pageId": "reward-pool",
    "source": "repos/ios4crm/GCCRM/ViewController/Apply/Reward/View/CRMRewardDoctorCell.swift",
    "line": 197,
    "condition": "can_receive_flag && (required_reward_card_num<=0 || availableCardCount>=required_reward_card_num)",
    "effect": "领取是否可用由后端允许标识和卡数共同控制。",
    "variants": [
      {
        "label": "有足够兑换卡",
        "values": {
          "can_receive_flag": true,
          "required_reward_card_num": 2,
          "availableCardCount": 8
        },
        "effect": "按钮可用#3B99FC；显示所需兑换卡：2个"
      },
      {
        "label": "兑换卡不足",
        "values": {
          "can_receive_flag": true,
          "required_reward_card_num": 9,
          "availableCardCount": 8
        },
        "effect": "领取按钮禁用#CCCCCC"
      },
      {
        "label": "不可领取",
        "values": {
          "can_receive_flag": false,
          "required_reward_card_num": 0,
          "availableCardCount": 8
        },
        "effect": "领取按钮禁用#CCCCCC"
      },
      {
        "label": "免费领取",
        "values": {
          "can_receive_flag": true,
          "required_reward_card_num": 0,
          "availableCardCount": 0
        },
        "effect": "显示tip图标与receive_content；按钮可用；控制器直接发起领取，没有扣卡确认弹窗"
      }
    ],
    "layout": {
      "background": "#F4F4F4",
      "cardBackground": "#FFFFFF",
      "cardRadius": 8,
      "avatar": 36,
      "doctorFont": "16 medium",
      "secondaryFont": 13,
      "buttonSize": [
        68,
        28
      ],
      "buttonRadius": 4,
      "filterHeight": 40,
      "summaryHeight": 44,
      "sectionSpacing": 8
    },
    "fieldOrder": [
      "头像+医生姓名 | 省·市 | 审核状态",
      "注册时间",
      "所需兑换卡/领取说明 | 领取医生"
    ],
    "id": "svc-cond-020",
    "origin": "backend"
  },
  {
    "pageId": "reward-pool",
    "source": "repos/ios4crm/GCCRM/ViewController/Apply/Reward/View/CRMRewardDoctorCell.swift",
    "line": 185,
    "condition": "audit_str",
    "effect": "奖励池医生审核状态颜色由精确中文值映射。",
    "variants": [
      {
        "label": "未认证",
        "values": {
          "audit_str": "未认证"
        },
        "effect": "#888888"
      },
      {
        "label": "审核不通过",
        "values": {
          "audit_str": "审核不通过"
        },
        "effect": "#FF6E3A"
      },
      {
        "label": "审核通过",
        "values": {
          "audit_str": "审核通过"
        },
        "effect": "#32C275"
      },
      {
        "label": "其他审核状态",
        "values": {
          "audit_str": "待审核"
        },
        "effect": "#3B99FC"
      }
    ],
    "id": "svc-cond-021",
    "origin": "backend"
  },
  {
    "pageId": "reward-pool",
    "source": "repos/ios4crm/GCCRM/ViewController/Apply/Reward/CRMRewardListVC.swift",
    "line": 268,
    "condition": "dataArray为空 / potentialDoctors.prefix(2)为空",
    "effect": "奖池为空和无潜力推荐是独立维度；最多两个推荐卡。",
    "variants": [
      {
        "label": "奖池有医生和推荐",
        "values": {
          "dataArrayCount": 3,
          "potentialDoctorsCount": 4
        },
        "effect": "3张奖励医生卡；潜力推荐标题；2张潜力医生卡；查看更多"
      },
      {
        "label": "奖池空但有推荐",
        "values": {
          "dataArrayCount": 0,
          "potentialDoctorsCount": 2
        },
        "effect": "空态卡；2张潜力卡；查看更多"
      },
      {
        "label": "有奖池无推荐",
        "values": {
          "dataArrayCount": 3,
          "potentialDoctorsCount": 0
        },
        "effect": "只显示奖励医生卡"
      },
      {
        "label": "奖池和推荐都空",
        "values": {
          "dataArrayCount": 0,
          "potentialDoctorsCount": 0
        },
        "effect": "只显示奖励空态"
      }
    ],
    "id": "svc-cond-022",
    "origin": "backend"
  },
  {
    "pageId": "reward-cards",
    "source": "repos/ios4crm/GCCRM/ViewController/Apply/Reward/View/CRMRewardDetailView.swift",
    "line": 69,
    "condition": "userInfo.is_leader",
    "effect": "兑换卡详情“我的团队”仅管理身份出现；积分明细常显。",
    "variants": [
      {
        "label": "管理者",
        "values": {
          "is_leader": 1
        },
        "effect": "我的团队/积分明细均可见"
      },
      {
        "label": "普通人员",
        "values": {
          "is_leader": 0
        },
        "effect": "隐藏我的团队；保留积分明细"
      }
    ],
    "layout": {
      "headerText": "14 medium #666666",
      "linkText": "14 #3B99FC",
      "horizontalInset": 16
    },
    "id": "svc-cond-023",
    "origin": "role"
  },
  {
    "pageId": "reward-cards",
    "source": "repos/ios4crm/GCCRM/ViewController/Apply/Reward/View/CRMRewardDetailView.swift",
    "line": 172,
    "condition": "status=1未使用/2已使用/3已失效",
    "effect": "卡片底色、状态文字/盖章图片、时间字段随状态变化。",
    "variants": [
      {
        "label": "待使用",
        "values": {
          "status": 1
        },
        "effect": "背景#F0F7FF/边#D1E7FF；标题#333333/卡号#666666；显示待使用文字；无印章"
      },
      {
        "label": "已使用",
        "values": {
          "status": 2
        },
        "effect": "背景#F4F5F6/边#E6E9EC；灰色标题；used_icon印章，alpha.5；使用时间"
      },
      {
        "label": "已失效",
        "values": {
          "status": 3
        },
        "effect": "灰色卡；invalid_icon印章，alpha.5；失效时间"
      }
    ],
    "layout": {
      "cardRadius": 12,
      "borderWidth": 1,
      "titleFont": "17 medium",
      "codeAndTimeFont": 13,
      "stampSize": [
        86,
        69
      ]
    },
    "fieldOrder": [
      "兑换卡 | 卡号",
      "获取时间",
      "使用/失效时间 | 状态/印章"
    ],
    "id": "svc-cond-024",
    "origin": "backend"
  },
  {
    "pageId": "reward-team",
    "source": "repos/ios4crm/GCCRM/ViewController/Apply/Reward/CRMRewardTeamVC.swift",
    "line": 83,
    "condition": "weeklyAvailableCount<=0 / 发放表单quantity",
    "effect": "无可发卡时不打开弹窗；有卡才弹出选择医助和数量。",
    "variants": [
      {
        "label": "本周不可发",
        "values": {
          "weeklyAvailableCount": 0
        },
        "effect": "点击发放提示本周无可发放兑换卡"
      },
      {
        "label": "有额度",
        "values": {
          "weeklyAvailableCount": 8
        },
        "effect": "弹窗选择医助/数量；数量正整数且<=可用卡数"
      }
    ],
    "layout": {
      "rowHeight": 54,
      "background": "#F4F4F4",
      "topInset": 12,
      "tableBottomInset": 16,
      "bottomBar": 64
    },
    "id": "svc-cond-025",
    "origin": "local"
  },
  {
    "pageId": "reward-rules",
    "source": "repos/ios4crm/GCCRM/ViewController/Apply/Reward/CRMRewardRuleManageVC.swift",
    "line": 308,
    "condition": "is_sq_leader / sq_score_rule_switch",
    "effect": "省区经理才有启用省区规则段；非省区经理按启用状态工作。",
    "variants": [
      {
        "label": "非省区经理",
        "values": {
          "is_sq_leader": false
        },
        "effect": "无省区规则开关段；可编辑权重"
      },
      {
        "label": "省区经理已启用",
        "values": {
          "is_sq_leader": true,
          "sq_score_rule_switch": true
        },
        "effect": "开关段可见；权重可编辑"
      },
      {
        "label": "省区经理未启用",
        "values": {
          "is_sq_leader": true,
          "sq_score_rule_switch": false
        },
        "effect": "禁用权重行和计算；保存直接返回"
      }
    ],
    "layout": {
      "rows": 54,
      "sectionHeader": 44,
      "cardInset": 12,
      "sectionTextInset": 20,
      "cardRadius": 12,
      "bottomButtonHeight": 52
    },
    "fieldOrder": [
      "启用省区规则（仅省区经理）",
      "新人扶持比例",
      "审核权重",
      "首单权重",
      "次单权重",
      "配置结果预览",
      "保存"
    ],
    "id": "svc-cond-026",
    "origin": "role"
  },
  {
    "pageId": "reward-rules",
    "source": "repos/ios4crm/GCCRM/ViewController/Apply/Reward/CRMRewardRuleManageVC.swift",
    "line": 158,
    "condition": "audit_ratio+dfirst_ratio+dsecond_ratio必须=100",
    "effect": "计算/保存有明确iOS校验；新人扶持比例不参与该三项合计。Android旧develop无此校验，原型按iOS。",
    "variants": [
      {
        "label": "权重有效",
        "values": {
          "audit_ratio": 34,
          "dfirst_ratio": 33,
          "dsecond_ratio": 33,
          "new_yz_support_ratio": 20
        },
        "effect": "允许请求计算/保存"
      },
      {
        "label": "权重不满100",
        "values": {
          "audit_ratio": 33,
          "dfirst_ratio": 33,
          "dsecond_ratio": 33
        },
        "effect": "显示权重合计错误提示；不请求计算/保存"
      }
    ],
    "id": "svc-cond-027",
    "origin": "local"
  },
  {
    "pageId": "reward-rules",
    "source": "repos/ios4crm/GCCRM/ViewController/Apply/Reward/CRMRewardRuleManageVC.swift",
    "line": 128,
    "condition": "no_new_yz / 计算成功",
    "effect": "有无新人决定预览附加文字；计算成功展开预览。",
    "variants": [
      {
        "label": "有新人预览",
        "values": {
          "no_new_yz": false,
          "calculated": true
        },
        "effect": "展示审核/首单/次单/新人积分"
      },
      {
        "label": "区域无新人",
        "values": {
          "no_new_yz": true,
          "calculated": true
        },
        "effect": "新人条附加（区域内无新人）"
      },
      {
        "label": "未计算",
        "values": {
          "calculated": false
        },
        "effect": "预览不展开"
      }
    ],
    "id": "svc-cond-028",
    "origin": "local"
  },
  {
    "pageId": "activities",
    "source": "repos/ios4crm/GCCRM/ViewController/Activity/View/CRMActivityView.swift",
    "line": 95,
    "condition": "dateDic.rquestDate与dateDic.month是否同月",
    "effect": "当前月份只显示预算入账/本月申报两列，历史月份增加实际消耗列；以同月判断为准，不按实际消耗为0猜测。",
    "variants": [
      {
        "label": "本月基金",
        "values": {
          "rquestDate": "2026-11",
          "month": "2026-11"
        },
        "effect": "隐藏实际消耗；两列平分"
      },
      {
        "label": "历史月份",
        "values": {
          "rquestDate": "2026-10",
          "month": "2026-11"
        },
        "effect": "显示实际消耗；三列平分"
      }
    ],
    "layout": {
      "headerBackgroundImageHeight": 238,
      "panelHeight": "220+navigationHeight",
      "balanceFont": "30 medium",
      "ruleButtonFont": 14,
      "switchButtonFont": 13,
      "panelHorizontalInsets": 12
    },
    "id": "svc-cond-029",
    "origin": "backend"
  },
  {
    "pageId": "activities",
    "source": "repos/ios4crm/GCCRM/ViewController/Activity/View/CRMActivityView.swift",
    "line": 119,
    "condition": "balance<0 / sj_expend_budget>tb_doctor_budget",
    "effect": "负余额及实际消耗超申报使用红色。",
    "variants": [
      {
        "label": "余额非负/未超支",
        "values": {
          "balance": 1200,
          "sj_expend_budget": 300,
          "tb_doctor_budget": 400
        },
        "effect": "余额#222222；实际消耗#222222"
      },
      {
        "label": "负余额",
        "values": {
          "balance": -100
        },
        "effect": "余额#FE0307"
      },
      {
        "label": "实际消耗超提报",
        "values": {
          "sj_expend_budget": 500,
          "tb_doctor_budget": 400
        },
        "effect": "实际消耗#FE0307"
      }
    ],
    "id": "svc-cond-030",
    "origin": "backend"
  },
  {
    "pageId": "mine",
    "source": "repos/ios4crm/GCCRM/ViewController/Mine/MineViewController.m",
    "line": 154,
    "condition": "is_big_region_manager",
    "effect": "“特殊医生审批”在甘草日历前插入；普通人员没有此行。",
    "variants": [
      {
        "label": "大区管理者",
        "values": {
          "is_big_region_manager": 1
        },
        "effect": "协同工单；医生活动情况；患者感谢管理；特殊医生审批；甘草日历；消息设置"
      },
      {
        "label": "普通人员",
        "values": {
          "is_big_region_manager": 0
        },
        "effect": "协同工单；医生活动情况；患者感谢管理；甘草日历；消息设置"
      }
    ],
    "layout": {
      "rowFont": 16
    },
    "id": "svc-cond-031",
    "origin": "role"
  },
  {
    "pageId": "mine",
    "source": "repos/ios4crm/GCCRM/ViewController/Mine/MineViewController.m",
    "line": 204,
    "condition": "ios_app_update_show_flag==1",
    "effect": "检查更新默认隐藏，只在登录配置返回1后显示；不要套Android常显。",
    "variants": [
      {
        "label": "显示更新入口",
        "values": {
          "ios_app_update_show_flag": 1
        },
        "effect": "检查更新可见"
      },
      {
        "label": "隐藏更新入口",
        "values": {
          "ios_app_update_show_flag": 0
        },
        "effect": "检查更新隐藏"
      }
    ],
    "id": "svc-cond-032",
    "origin": "backend"
  },
  {
    "pageId": "thanks-detail",
    "source": "repos/ios4crm/GCCRM/ViewController/Mine/ThankLetterDetailVC.m",
    "line": 70,
    "condition": "thanks_type=1/2/3/4",
    "effect": "感谢类型决定导航标题、是否有制作/收货/物流与审核操作。",
    "variants": [
      {
        "label": "表谢意",
        "values": {
          "thanks_type": 1
        },
        "effect": "标题表谢意"
      },
      {
        "label": "电子锦旗",
        "values": {
          "thanks_type": 2
        },
        "effect": "标题电子锦旗"
      },
      {
        "label": "实物锦旗",
        "values": {
          "thanks_type": 3
        },
        "effect": "标题锦旗制作确认；订单信息插入订单号；收货/物流相关段"
      },
      {
        "label": "感谢信",
        "values": {
          "thanks_type": 4
        },
        "effect": "标题感谢信；状态行审核按钮"
      }
    ],
    "id": "svc-cond-033",
    "origin": "backend"
  },
  {
    "pageId": "thanks-detail",
    "source": "repos/ios4crm/GCCRM/ViewController/Mine/ThankLetterDetailVC.m",
    "line": 114,
    "condition": "thanks_type=4 && status==3",
    "effect": "感谢信待审核与结果态操作外观不同。",
    "variants": [
      {
        "label": "感谢信待审核",
        "values": {
          "thanks_type": 4,
          "status": 3
        },
        "effect": "状态行使用WaitAudit样式"
      },
      {
        "label": "感谢信已通过",
        "values": {
          "thanks_type": 4,
          "status": 1
        },
        "effect": "结果样式；审核弹窗预选通过"
      },
      {
        "label": "感谢信未通过",
        "values": {
          "thanks_type": 4,
          "status": 2
        },
        "effect": "结果样式；审核弹窗预选不通过"
      }
    ],
    "id": "svc-cond-034",
    "origin": "backend"
  },
  {
    "pageId": "thanks-detail",
    "source": "repos/ios4crm/GCCRM/ViewController/Mine/ThankLetterDetailVC.m",
    "line": 406,
    "condition": "thanks_type=3 && confirm_status==3",
    "effect": "实物锦旗确认不制作时增加退款状态行。",
    "variants": [
      {
        "label": "待制作确认",
        "values": {
          "thanks_type": 3,
          "confirm_status": 1
        },
        "effect": "无退款状态附加行"
      },
      {
        "label": "确认制作",
        "values": {
          "thanks_type": 3,
          "confirm_status": 2
        },
        "effect": "按制作状态显示"
      },
      {
        "label": "确认不制作",
        "values": {
          "thanks_type": 3,
          "confirm_status": 3,
          "refund_msg": "演示退款处理中"
        },
        "effect": "增加退款状态"
      }
    ],
    "id": "svc-cond-035",
    "origin": "backend"
  },
  {
    "pageId": "thanks-production",
    "source": "repos/ios4crm/GCCRM/ViewController/Mine/ThankLetterEditVC.m",
    "line": 166,
    "condition": "是否制作选择改变订单详情sections数量",
    "effect": "确认制作动态增加收货人资料段；不制作移除该段，非仅把同一表单字段设disabled。",
    "variants": [
      {
        "label": "确认制作",
        "values": {
          "make": true
        },
        "effect": "显示收货姓名/电话/省市区/详细地址；提交时姓名必填/电话11位/地区地址必填"
      },
      {
        "label": "不制作",
        "values": {
          "make": false
        },
        "effect": "隐藏收货段；实物锦旗展示不制作退款提示"
      }
    ],
    "id": "svc-cond-036",
    "origin": "local"
  },
  {
    "pageId": "special-approval-detail",
    "source": "repos/ios4crm/GCCRM/ViewController/Mine/CRMSpecialApproveDetailVC.m",
    "line": 338,
    "condition": "approve_status==0",
    "effect": "待审批才加底部审批动作；已审批隐藏footer。",
    "variants": [
      {
        "label": "待审批",
        "values": {
          "approve_status": 0
        },
        "effect": "显示审批不通过/审批通过"
      },
      {
        "label": "已审批",
        "values": {
          "approve_status": 1
        },
        "effect": "隐藏底部审批动作"
      }
    ],
    "layout": {
      "sectionTitleFont": "16 bold，后部图片标题14 bold",
      "photosConditional": "head_photos/wjw_photos/practice_cert_photos/qualification_cert_photos/prescription_photos/x2z_photos仅非空时加对应段"
    },
    "id": "svc-cond-037",
    "origin": "backend"
  },
  {
    "pageId": "pk-detail",
    "source": "repos/ios4crm/GCCRM/ViewController/Apply/PK/PKDetailVC.m",
    "line": 151,
    "condition": "isTeamPK",
    "effect": "团队PK有排名和队伍详情；非团队PK只有排名。",
    "variants": [
      {
        "label": "团队PK",
        "values": {
          "isTeamPK": true
        },
        "effect": "队伍排名；队伍详情"
      },
      {
        "label": "个人PK",
        "values": {
          "isTeamPK": false
        },
        "effect": "只有队伍排名"
      }
    ],
    "id": "svc-cond-038",
    "origin": "entry"
  },
  {
    "pageId": "pk-detail",
    "source": "repos/ios4crm/GCCRM/ViewController/Apply/PK/PKDetailVC.m",
    "line": 177,
    "condition": "create_manager_nickname==当前user.nickname（源码按姓名匹配）",
    "effect": "只有匹配发起人时显示删除对战；不能用普通manager角色统一控制。",
    "variants": [
      {
        "label": "本人发起",
        "values": {
          "create_manager_nickname": "青禾",
          "nickname": "青禾"
        },
        "effect": "导航删除对战"
      },
      {
        "label": "他人发起",
        "values": {
          "create_manager_nickname": "秋实",
          "nickname": "青禾"
        },
        "effect": "无删除对战"
      }
    ],
    "layout": {
      "deleteTint": "#666666"
    },
    "id": "svc-cond-039",
    "origin": "backend"
  },
  {
    "pageId": "doctor-board",
    "source": "repos/ios4crm/GCCRM/ViewController/Apply/DataBoardVC.m",
    "line": 192,
    "condition": "crm_role=2/3/4",
    "effect": "医生数据范围选择器按岗位构成，不一定有团队和区域两项。",
    "variants": [
      {
        "label": "普通医助",
        "values": {
          "crm_role": 1
        },
        "effect": "个人"
      },
      {
        "label": "团队负责人",
        "values": {
          "crm_role": 2
        },
        "effect": "个人；我的团队"
      },
      {
        "label": "区域经理",
        "values": {
          "crm_role": 3
        },
        "effect": "个人；我的区域"
      },
      {
        "label": "团队兼区域",
        "values": {
          "crm_role": 4
        },
        "effect": "个人；我的团队；我的区域"
      }
    ],
    "id": "svc-cond-040",
    "origin": "role"
  },
  {
    "pageId": "doctor-board",
    "source": "repos/ios4crm/GCCRM/ViewController/Apply/DataBoardVC.m",
    "line": 351,
    "condition": "selectedTitleId==2 / 7 / 8",
    "effect": "剂型选择仅指标2可见；收入看板7/8另有路由，不应一律只换当前表格。",
    "variants": [
      {
        "label": "指标2",
        "values": {
          "selectedTitleId": "2"
        },
        "effect": "显示剂型按钮并按selectDosage传jx_type"
      },
      {
        "label": "其他普通指标",
        "values": {
          "selectedTitleId": "1"
        },
        "effect": "隐藏剂型按钮；移除jx_type"
      },
      {
        "label": "医生收入看板",
        "values": {
          "selectedTitleId": "7"
        },
        "effect": "跳转DoctorIncomeVC"
      }
    ],
    "layout": {
      "filterHeaderHeight": 44
    },
    "id": "svc-cond-041",
    "origin": "entry"
  },
  {
    "pageId": "runoff-warning",
    "source": "repos/ios4crm/GCCRM/ViewController/Apply/Warning/CRMWarningDataVC.m",
    "line": 75,
    "condition": "isLeave 页面参数",
    "effect": "正常预警与暂不预警名单标题/请求/操作入口不同。",
    "variants": [
      {
        "label": "医生流失预警",
        "values": {
          "isLeave": false,
          "is_warning": "1"
        },
        "effect": "导航医生流失预警；显示右侧入口"
      },
      {
        "label": "暂不预警医生名单",
        "values": {
          "isLeave": true,
          "is_warning": "0"
        },
        "effect": "标题暂不预警医生名单；无右侧入口；isRequestTime=YES"
      }
    ],
    "id": "svc-cond-042",
    "origin": "entry"
  },
  {
    "pageId": "runoff-warning-detail",
    "source": "repos/ios4crm/GCCRM/ViewController/Apply/Warning/CRMDoctorWarnDetailVC.m",
    "line": 185,
    "condition": "doctorModel.isLookMoreInfo / doctor_sea_type",
    "effect": "预警详情进入的医生主页依权限分流；不是总能看完整医生资料。",
    "variants": [
      {
        "label": "可查看完整信息",
        "values": {
          "isLookMoreInfo": true
        },
        "effect": "可进DoctorDetailVC/DoctorHomeVC"
      },
      {
        "label": "受限医生",
        "values": {
          "isLookMoreInfo": false,
          "doctor_sea_type": 2
        },
        "effect": "进OtherDoctorHomeVC并按公海参数控制可见内容"
      }
    ],
    "layout": {
      "doctorHeaderHeight": "90+navigationHeight",
      "tableFirstColumnWidth": 110,
      "recentHeaderRowHeight": 30,
      "recentDataRowHeight": 45
    },
    "id": "svc-cond-043",
    "origin": "backend"
  },
  {
    "pageId": "orders",
    "source": "repos/ios4crm/GCCRM/ViewModel/Apply/OrderInquire/OrderTableViewCell.m",
    "line": 815,
    "condition": "当前OrderListCell的dfirst/dsecond/is_pre/ufirst/isMyOrder",
    "effect": "主列表实际用OrderListCell（OrderListBaseVC.m:27/43），不是文件中较老的OrderListNewCell；首/次与患者首单是独立标记。",
    "variants": [
      {
        "label": "医生首单/患者首单",
        "values": {
          "dfirst": "1",
          "dsecond": "0",
          "ufirst": "1",
          "is_pre": 71,
          "isMyOrder": true
        },
        "effect": "医生姓名前首单标记=首；自助开方标记可见；患者姓名后红色*"
      },
      {
        "label": "医生次单",
        "values": {
          "dfirst": "0",
          "dsecond": "1",
          "ufirst": "0",
          "is_pre": 0,
          "isMyOrder": true
        },
        "effect": "医生标记=次；无自助标记；无患者*"
      },
      {
        "label": "普通单/非本人",
        "values": {
          "dfirst": "0",
          "dsecond": "0",
          "is_pre": 0,
          "isMyOrder": false
        },
        "effect": "隐藏首/次标记并左移姓名；医生和医助名按源码截断显示；患者最多3字后省略；本人最多7字"
      }
    ],
    "layout": {
      "doctorNameFont": "16 medium #3B99FC",
      "patientFont": "14 #666666",
      "statusFont": 14,
      "infoFont": "14 #666666",
      "moneyFont": "16 medium #222222",
      "timeFont": "14 #666666",
      "orderFont": "14 #666666",
      "cardRadius": 6,
      "cardInsets": [
        8,
        10,
        0,
        10
      ],
      "innerHorizontalInset": 12,
      "dividerHeight": 0.5
    },
    "fieldOrder": [
      "首/次+医生（医助）+患者首单*+来源图标+自助标记 | 状态",
      "分隔线",
      "剂型·外用·药库·冷链·快递·派单备注",
      "支付时间+异常提示",
      "发票图标+订单号+复制 | 金额",
      "绩效首单时间/绩效年（条件段，高32.5）"
    ],
    "relatedEvidence": [
      {
        "source": "GCCRM/ViewController/Apply/OrderInquire/OrderListBaseVC.m",
        "line": 27,
        "effect": "注册OrderListCell"
      },
      {
        "source": "GCCRM/ViewModel/Apply/OrderInquire/OrderListBaseCell.m",
        "line": 312,
        "effect": "基类白卡圆角6，左右10/top8；内部12；字号和行间距来自此文件"
      }
    ],
    "id": "svc-cond-044",
    "origin": "backend"
  },
  {
    "pageId": "orders",
    "source": "repos/ios4crm/GCCRM/ViewModel/Apply/OrderInquire/OrderTableViewCell.m",
    "line": 865,
    "condition": "OrderListCell.status_pay / ship_name_str",
    "effect": "主列表状态用黄色未支付badge或蓝/灰履约文本；不能沿用旧cell橙色状态。",
    "variants": [
      {
        "label": "未支付",
        "values": {
          "status_pay": 0
        },
        "effect": "白字#FFFFFF，底#FFB035，文字未支付"
      },
      {
        "label": "已支付待处理",
        "values": {
          "status_pay": 1,
          "ship_name_str": "待发货"
        },
        "effect": "#3B99FC，白底；接方/待派单/已派单/已电子派单/待发货均蓝"
      },
      {
        "label": "已发货/签收",
        "values": {
          "status_pay": 1,
          "ship_name_str": "已发货"
        },
        "effect": "#8F8F8F，白底"
      }
    ],
    "id": "svc-cond-045",
    "origin": "backend"
  },
  {
    "pageId": "orders",
    "source": "repos/ios4crm/GCCRM/ViewModel/Apply/OrderInquire/OrderTableViewCell.m",
    "line": 997,
    "condition": "jx_year 或 jx_first_recipel_pay_timeline_str 非空；is_invoiced；recipel_type",
    "effect": "订单卡片绩效段、发票图标及来源图标不是常显。",
    "variants": [
      {
        "label": "有绩效信息",
        "values": {
          "jx_year": "2026",
          "jx_first_recipel_pay_timeline_str": "2026-11-01"
        },
        "effect": "绩效段高32.5；显示绩效年按钮"
      },
      {
        "label": "无绩效信息",
        "values": {
          "jx_year": "",
          "jx_first_recipel_pay_timeline_str": ""
        },
        "effect": "绩效段高0并隐藏"
      },
      {
        "label": "已开票",
        "values": {
          "is_invoiced": true
        },
        "effect": "订单号前apply_invoice图标16×16"
      },
      {
        "label": "手机来源",
        "values": {
          "recipel_type": 1
        },
        "effect": "blue_phone图标"
      },
      {
        "label": "照片方来源",
        "values": {
          "recipel_type": 2
        },
        "effect": "camera图标"
      },
      {
        "label": "微信来源",
        "values": {
          "recipel_type": 3
        },
        "effect": "wechat_green图标"
      },
      {
        "label": "无来源标识",
        "values": {
          "recipel_type": 0
        },
        "effect": "隐藏来源图标"
      }
    ],
    "id": "svc-cond-046",
    "origin": "backend"
  },
  {
    "pageId": "orders",
    "source": "repos/ios4crm/GCCRM/ViewModel/Apply/OrderInquire/OrderTableViewCell.m",
    "line": 919,
    "condition": "is_waiyong / cold_chain / goods_order_of_status_staff_str / log_type / is_delivery_exception / failure_flag / is_refund",
    "effect": "主列表有外用图标、冷链、派单备注、紧急原因和失效/退款覆盖，不能只做统一订单状态。",
    "variants": [
      {
        "label": "外用方",
        "values": {
          "is_waiyong": true
        },
        "effect": "剂型后插external_icon 18×18"
      },
      {
        "label": "冷链",
        "values": {
          "cold_chain": "冷链"
        },
        "effect": "冷链追加剂型信息且#333333"
      },
      {
        "label": "派送异常",
        "values": {
          "log_type": "200",
          "is_delivery_exception": true
        },
        "effect": "时间末尾红色派送异常"
      },
      {
        "label": "发货超时",
        "values": {
          "log_type": "200",
          "is_delivery_exception": false
        },
        "effect": "时间末尾#FF7C53发货超时"
      },
      {
        "label": "退款",
        "values": {
          "is_refund": 1,
          "failure_flag": 0
        },
        "effect": "时间后追加#FE0307退款，覆盖紧急原因"
      },
      {
        "label": "失效优先",
        "values": {
          "failure_flag": 1,
          "is_refund": 1
        },
        "effect": "时间后追加#FE0307失效，优先于退款"
      },
      {
        "label": "派单提示",
        "values": {
          "goods_order_of_status_staff_str": "演示派单提示"
        },
        "effect": "剂型信息末尾附红色提示"
      }
    ],
    "id": "svc-cond-047",
    "origin": "backend"
  },
  {
    "pageId": "focused-orders",
    "source": "repos/ios4crm/GCCRM/ViewController/Apply/OrderInquire/OrderBaseVC.m",
    "line": 155,
    "condition": "isFocus / applyOverType == PaymentOrderAmount / isShowFilter",
    "effect": "筛选栏文案与排版随业务入口变化。",
    "variants": [
      {
        "label": "普通订单",
        "values": {
          "isFocus": false,
          "isShowFilter": false
        },
        "effect": "付款/物流/剂型/药库/更多"
      },
      {
        "label": "关注订单",
        "values": {
          "isFocus": true,
          "isShowFilter": false
        },
        "effect": "付款/未收货/剂型/药库/更多；默认is_ship=200"
      },
      {
        "label": "业绩金额明细",
        "values": {
          "applyOverType": "PaymentOrderAmount"
        },
        "effect": "首项固定已派单；status_pay=5"
      },
      {
        "label": "新版筛选布局",
        "values": {
          "isShowFilter": true
        },
        "effect": "付款/物流/剂型/筛选"
      }
    ],
    "layout": {
      "menuHeight": 44,
      "headerHeight": "isUseNewHeaderViewLayout ?82:42"
    },
    "id": "svc-cond-048",
    "origin": "entry"
  },
  {
    "pageId": "workorder-reply",
    "source": "repos/ios4crm/GCCRM/ViewController/Synergy/CRMSynergyReplyVC.m",
    "line": 180,
    "condition": "is_creator 页面参数",
    "effect": "发起人回复没有下一步段；跟进人回复有待反馈/待确认(结单)。",
    "variants": [
      {
        "label": "发起人回复",
        "values": {
          "is_creator": true
        },
        "effect": "说明/上传附件；无下一步"
      },
      {
        "label": "跟进人回复",
        "values": {
          "is_creator": false
        },
        "effect": "说明/上传附件；下一步单选：待反馈(10)/待确认(结单)(11)"
      }
    ],
    "layout": {
      "inputSection": "见getData，文本长度条件按model",
      "attachmentHeaderHeight": 44,
      "nextStepFooterHeight": 60,
      "bottomBar": "64+safeArea"
    },
    "id": "svc-cond-049",
    "origin": "entry"
  },
  {
    "pageId": "workorder-transfer",
    "source": "repos/ios4crm/GCCRM/ViewController/Synergy/CRMSynergyRedeployVC.m",
    "line": 151,
    "condition": "跟进方式=10组/11人",
    "effect": "选择方式改变后清空接收对象，再按组选项或人员搜索回填。",
    "variants": [
      {
        "label": "转派给组",
        "values": {
          "followType": 10
        },
        "effect": "打开跟进组选择器；已选接收对象随方式切换清空"
      },
      {
        "label": "转派给人",
        "values": {
          "followType": 11
        },
        "effect": "进入CRMSynergySearchVC人员搜索；回填姓名和keyValue"
      }
    ],
    "layout": {
      "textAreaHeight": 191,
      "textMaxCount": 100,
      "selectionTextFont": 14,
      "placeholderColor": "#BFBFBF",
      "selectedColor": "#333333",
      "bottomBar": "64+safeArea"
    },
    "id": "svc-cond-050",
    "origin": "backend"
  },
  {
    "pageId": "thanks",
    "source": "repos/ios4crm/GCCRM/ViewModel/Mine/ThankLetterCell.m",
    "line": 64,
    "condition": "status_int=1/6/其他",
    "effect": "感谢列表状态颜色不由状态名推断。",
    "variants": [
      {
        "label": "状态1",
        "values": {
          "status_int": 1
        },
        "effect": "#FF6E3A"
      },
      {
        "label": "状态6",
        "values": {
          "status_int": 6
        },
        "effect": "#111111"
      },
      {
        "label": "其他状态",
        "values": {
          "status_int": 2
        },
        "effect": "#3B99FC"
      }
    ],
    "fieldOrder": [
      "医生姓名",
      "showSubTitle",
      "status_str",
      "timeline"
    ],
    "id": "svc-cond-051",
    "origin": "backend"
  },
  {
    "id": "work-template-dynamic",
    "pageId": "workorder-create",
    "source": "repos/ios4crm/GCCRM/ViewController/Synergy/CRMSynergyCreateVC.m",
    "line": 185,
    "origin": "backend",
    "condition": "GET_WOBC_TEMPLATE.question_cfg / field_type",
    "effect": "问题分类和工单名称不可编辑；question_cfg为空时只有说明内容和附件。sync进入工单信息，text/num/list/lists进入协同信息。附加项为布局示例，非实际服务端模板认定。",
    "variants": [
      {
        "label": "基础模板（实机结构）",
        "values": {
          "question_cfg": []
        },
        "effect": "不显示额外关联订单、医生或联系电话"
      },
      {
        "label": "同步信息与文本（动态示例）",
        "values": {
          "question_cfg": [
            {
              "field_type": "sync",
              "key_name": "关联订单",
              "value": "GC202611060001"
            },
            {
              "field_type": "text",
              "key_name": "联系电话",
              "placeholder": "请输入联系电话"
            }
          ]
        },
        "effect": "同步字段只读；联系电话是动态文本示例"
      },
      {
        "label": "选择与数字（动态示例）",
        "values": {
          "question_cfg": [
            {
              "field_type": "list",
              "key_name": "处理方式",
              "select_list": [
                "协助核对",
                "继续跟进"
              ]
            },
            {
              "field_type": "lists",
              "key_name": "涉及事项",
              "select_list": [
                "订单",
                "物流",
                "资料"
              ]
            },
            {
              "field_type": "num",
              "key_name": "数量",
              "size_restrict": {
                "min": 0,
                "max": 10
              }
            }
          ]
        },
        "effect": "演示单选、多选、数字校验；0–10仅为示例模板约束"
      }
    ]
  }
];
