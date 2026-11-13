# 云诊室医生端多端协作

本项目组织云诊室医生端 iOS、Android、HarmonyOS 的需求对齐和开发，支持任何开发者独立完成本次适用端的需求整理、实现和验证。工作区流程见[根 README](../../README.md)和[根 AGENTS.md](../../AGENTS.md)，本项目规则见 [AGENTS.md](AGENTS.md)。

## 各端入口

| 平台 | 代码仓库 | 规范入口 |
| --- | --- | --- |
| iOS | [repos/gancao-ios4doctor](repos/gancao-ios4doctor/) | [AGENTS.md](repos/gancao-ios4doctor/AGENTS.md)、[README.md](repos/gancao-ios4doctor/README.md)及按需引用的规范 |
| Android | [repos/gancao-android-doctor-v2](repos/gancao-android-doctor-v2/) | [AGENTS.md](repos/gancao-android-doctor-v2/AGENTS.md)、[README.md](repos/gancao-android-doctor-v2/README.md)、实际构建配置与目标模块规范 |
| HarmonyOS | [repos/gancao-harmonydoctor](repos/gancao-harmonydoctor/) | [AGENTS.md](repos/gancao-harmonydoctor/AGENTS.md)、[README.md](repos/gancao-harmonydoctor/README.md)及按需引用的规范 |

各端独立管理 Git 历史、分支、远端和代码提交。修改前确认目标仓库、分支和未提交改动，遵循本端架构及工程规范。

目录职责、开发规范入口及来源差异见[三端开发说明](三端开发说明.md)。其中技术与 Git 快照保留原核对日期，不能用来推定当前分支、线上状态或验证结果。历史需求中的源码引用以记录时的分支和提交为准，当前检出可能不包含对应文件。

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

版本入口见 [prd/README.md](prd/README.md)。版本资料按 `prd/prd-vxxx-YYYYMMDD/<负责人>/` 组织，负责人使用实际姓名或团队标识，不预设默认人员。同一版本复用首次创建日期；接手已有需求时沿用原文档位置并记录实际执行者，不因换人另建或迁移资料。只维护本次授权范围，不自动纳入整版全部需求或改写无关资料。

同一需求的文档用链接、已确认版本和 REQ、AC 编号关联，共用业务逻辑及验收口径保持一致。产品确认业务规则，开发维护各端技术方案与任务，测试维护 AI 用例与人工验收；以上职责可由同一人承担，按实际需求使用模板，不要求凑齐全部文档。各端实现和验证结果分别记录，历史资料中的实际负责人和执行事实保留。

共用模板及填写方法见[工作区模板说明](../../docs/requirements/README.md)。本项目长期跨端约定维护在本文件、项目 AGENTS 或专题文档；各端自身技术维护资料按各仓库规范处理。

## 跨端对齐与进度

需求确认阶段统一本次适用端的业务流程、规则、状态含义和业务验收口径，各端按已确认基线实现。工程架构、代码组织、UI 技术、分支和验证方式分别遵循各端约定。

现状核对从受影响入口出发，分别记录各端行为、源码依据、已确认差异与待确认事项；单端实现不自动成为三端目标。来源有冲突或目标无法确定时，及时说明依据和影响并确认，独立且已明确的工作继续推进。

每个需求按实际范围记录适用端、允许差异、实现与验证证据、分支提交及推送状态。静态检查与实际运行验证分别表述；需求变化同步更新受影响的方案、任务和测试资料。

## 发布记录

- [iOS 版本发布记录](发布记录iOS.md)
- [Android 版本发布记录](发布记录Android.md)
- [HarmonyOS 版本发布记录](发布记录HarmonyOS.md)

继续保持现有三份记录的格式和文案，每版只展示版本号、发布日期和简短业务条目，新版本放在最前面。收到用户提供的版本、发布日期和发布内容后只更新指定端，不自动同步其他端，不从需求计划、分支或标签推定已发布。

已有历史版本的北京时间日期口径继续保留：iOS、Android 参考标签，附注标签取标签标记日期、轻量标签取关联提交日期；鸿蒙优先取同名 release 分支最后提交日期，无同名引用时参考标签。该口径仅用于既有历史整理，用户明确更正时再更新。

## Git 与目录迁移

本项目协作文档由 `ai-specs/` 根文档仓库统一记录本地历史，不另建 `.git`、不向远程上传，也不复制到三端代码仓库提交。三端代码仓库由根忽略规则排除，代码提交和推送按明确授权分别执行。

2026-11-02，本项目资料从工作区根目录迁入此处，三个代码仓库移到 `repos/`，保留原仓库目录名和 Git 历史。当前文档链接和可复用验证脚本已调整；历史日志、JSON 证据和原始材料保留原执行路径及事实。后续在新位置打开工程，迁移本身不表示重新完成构建或业务验收。
