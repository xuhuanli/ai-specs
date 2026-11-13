# 云诊室医生端多端协作

本项目组织云诊室医生端 iOS、Android、HarmonyOS 的需求对齐和开发。工作区用法见[根 README](../../README.md)，通用约定统一遵循[根 AGENTS.md](../../AGENTS.md)，云诊室特有约定见本项目 [AGENTS.md](AGENTS.md)。

## 进入项目后读取什么

先读取本项目 [AGENTS.md](AGENTS.md)，再按任务进入[需求索引](prd/README.md)、[三端开发说明](三端开发说明.md)或本文件中的发布记录。需要修改代码时，通过[仓库入口](repos/README.md)进入本次适用端，继续读取该仓库及目标目录的规范。通用流程与模板遵循工作区文档，本目录补充云诊室的业务与跨端约定。

## 各端入口

各端代码仓库与本端规范入口见 [repos/README.md](repos/README.md)，目录职责、规范来源与差异快照见[三端开发说明](三端开发说明.md)。

## 目录与需求资料

```text
yzs-doctor/
├── README.md
├── AGENTS.md
├── 三端开发说明.md
├── 发布记录iOS.md
├── 发布记录Android.md
├── 发布记录HarmonyOS.md
├── prd/
│   ├── README.md
│   └── prd-vxxx-YYYYMMDD/
│       ├── README.md
│       └── <负责人>/                本次需求及配套文档
└── repos/
    ├── README.md
    ├── gancao-ios4doctor/            独立 Git 仓库
    ├── gancao-android-doctor-v2/      独立 Git 仓库
    └── gancao-harmonydoctor/         独立 Git 仓库
```

版本入口见 [prd/README.md](prd/README.md)，模板选择与填写方法见[工作区模板说明](../../docs/requirements/README.md)。归档与文档关联遵循[根文档组织约定](../../AGENTS.md#文档组织)。

## 发布记录

- [iOS 版本发布记录](发布记录iOS.md)
- [Android 版本发布记录](发布记录Android.md)
- [HarmonyOS 版本发布记录](发布记录HarmonyOS.md)

发布记录格式与历史日期口径见[项目发布约定](AGENTS.md#发布记录)。

## 目录迁移记录

2026-11-02，本项目资料从工作区根目录迁入此处，三个代码仓库移到 `repos/`，保留原仓库目录名和 Git 历史。当前文档链接和可复用验证脚本已调整；历史日志、JSON 证据和原始材料保留原执行路径及事实。后续在新位置打开工程，迁移本身不表示重新完成构建或业务验收。

2026-11-13，三个仓库目录恢复为 `gancao-ios4doctor`、`gancao-android-doctor-v2`、`gancao-harmonydoctor`，文档路径、源码链接和可复用脚本同步更新。各仓库的分支、提交与未提交改动保持原样，历史记录不表示本次重新执行了业务验证。
