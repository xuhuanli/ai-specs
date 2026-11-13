# 云诊室医生端协作工作区

本工作区用于云诊室医生端（`yzs-doctor`）的一人多端开发，任何开发者都可以按本规范整理需求、维护方案、实现各适用端并完成验证。涉及 iOS、Android、HarmonyOS 时按本次适用端推进。项目资料位于 `projects/yzs-doctor/`，各端代码位于其中的 `repos/` 下，分别保留独立 Git 仓库。

工作区根目录的 Git 仓库统一记录公共资料和云诊室协作文档的本地历史，排除各端代码。公共资料和项目协作文档仅本地维护，不上传远程。

## 项目入口

- [云诊室项目说明](projects/yzs-doctor/README.md)：各端仓库与规范入口。
- [云诊室项目约定](projects/yzs-doctor/AGENTS.md)：跨端协作和发布记录规则。
- [云诊室需求索引](projects/yzs-doctor/prd/README.md)：版本及需求资料的入口。

## 目录结构

```text
ai-specs/
├── README.md                        工作区说明与多端开发入口
├── AGENTS.md                        多端开发工作流程与文档约定
├── .gitignore                       排除独立代码仓库
├── docs/requirements/               需求模板、示例与填写方法
└── projects/
    └── yzs-doctor/
        ├── README.md                云诊室项目入口
        ├── AGENTS.md                云诊室跨端协作约定
        ├── 三端开发说明.md            本项目目录、规范与差异索引
        ├── 发布记录iOS.md
        ├── 发布记录Android.md
        ├── 发布记录HarmonyOS.md
        ├── prd/                     版本 → 文档负责人
        └── repos/                   各端独立代码仓库
            ├── gancao-ios4doctor/
            ├── gancao-android-doctor-v2/
            └── gancao-harmonydoctor/
```

## 任务与规范边界

开始任务直接进入云诊室，确定需求版本、本次需求范围、适用端和目标代码仓库，无需再选择业务项目。信息有歧义且会影响操作时再确认。

1. 根目录 [AGENTS.md](AGENTS.md) 定义多端开发工作流程、文档写作和 Git 授权边界。
2. 云诊室 [AGENTS.md](projects/yzs-doctor/AGENTS.md) 与 [README.md](projects/yzs-doctor/README.md)定义业务范围、跨端协作、资料和仓库入口。
3. 各端代码仓库及目标目录的 AGENTS、README 和项目规范定义该端的架构、实现、分支、提交及验证方式。

按云诊室本次适用端确认共同业务流程、规则、状态含义和验收口径；已确认的平台差异保留。只核对本次涉及的端，不要求每项需求覆盖三个端；各端工程实现遵循各自仓库规范。

同一人可以承担需求整理、各端开发和测试职责，不要求各端由不同人员负责。同一需求共用业务规则与验收标准，方案、任务、代码和验证证据按端记录。完成一个端不代表其他端完成，缺少依据的业务决定仍需确认。

## 需求与共用模板

正式版本资料存放在 `projects/yzs-doctor/prd/prd-vxxx-YYYYMMDD/<负责人>/`，负责人使用实际姓名或团队标识，不预设默认人员。日期取该版本目录首次创建日；同一版本后续复用原目录。只维护本次授权范围，不自动生成整版需求或改写无关资料。

在[云诊室需求索引](projects/yzs-doctor/prd/README.md)登记版本，版本内 README 索引资料目录，目录内的文档索引维护需求资料。负责人目录用于归档，任何接手者均可在授权范围内沿用原位置维护，并记录实际执行者。需求、方案、开发任务、AI 测试用例和人工验收关联同一版本及 REQ、AC 编号，共用业务逻辑和验收口径保持一致；历史负责人、分支、提交和执行结果按事实保留。

配套模板在 [docs/requirements/](docs/requirements/README.md)，生成文档按本次适用端和需求范围裁剪。云诊室长期业务与跨端约定写入项目 README 或专题文档；工作流程和模板使用方法在根目录维护。

## 发布记录

发布记录放在 `projects/yzs-doctor/`，按 iOS、Android、HarmonyOS 分别维护。现有三份发布记录的格式、内容和历史日期口径继续保留，见[云诊室项目说明](projects/yzs-doctor/README.md)。

各端独立确认发布事实，不从计划、代码分支、标签或另一端记录推定已发布。

## Git 与迁移说明

- 根文档仓库统一记录公共资料和云诊室项目文档，仅做本地提交，不执行 push；云诊室项目目录不另建文档 Git 仓库。
- 根仓库当前已有名为 `origin` 的远端配置，本次迁移保留既有配置，不连接或使用该远端，不将其作为文档上传授权。后续不新增文档远端；如需调整已有配置，单独按明确指令处理。
- `projects/yzs-doctor/repos/` 中的代码仓库由根 `.gitignore` 排除，只有接入说明 `repos/README.md` 纳入文档历史。不得把代码仓库作为子模块、gitlink 或普通目录加入根仓库。代码的 commit、push、amend 依用户明确授权及所属仓库规范执行。
- Git 操作明确目标目录；根文档的本地提交与各端代码提交分别处理，分别报告状态。
- 2026-11-02，原根目录的云诊室需求、项目说明、发布记录和三个代码仓库迁入 `projects/yzs-doctor/`。通用模板保留在根 `docs/requirements/`，原 Git 历史保留。
- 三个代码仓库的新位置为 `projects/yzs-doctor/repos/` 下同名目录。后续在新位置打开工程；本地 IDE、构建缓存和外部脚本若保存旧绝对路径，需按新位置重新打开、同步或更新。
- 2026-11-13，三个仓库目录恢复为 `gancao-ios4doctor`、`gancao-android-doctor-v2`、`gancao-harmonydoctor`，文档路径、源码链接和可复用脚本同步更新。各仓库的分支、提交与未提交改动保持原样。
- 历史验证日志、JSON 证据及原始材料保留当时的路径和执行事实；维护文档的当前链接与可复用脚本已按新目录调整。历史记录不代表迁移后重新执行了业务验证。
