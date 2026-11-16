# iOS 弹窗交互预览

2026-11-13，按用户补充指令，在开方详情页使用「诊疗笔记」测试入口，预览存入云医案弹窗及 iOS 原生叠层动画，并构建安装到连接真机。关联 REQ-001、REQ-002 的局部界面；不代表这些需求或 AC-001—AC-006 已完成。

## 设计与实现范围

- 入口位置参考 [Figma 22850:46116](https://www.figma.com/design/aFKpQlzeW8NibL23OpY5lq/?node-id=22850-46116&m=dev)。本次按用户要求保留「诊疗笔记」文案和原入口可见条件，Debug 构建中改为拉起测试弹窗。
- 弹窗参考 [Figma 22850:46884](https://www.figma.com/design/aFKpQlzeW8NibL23OpY5lq/?node-id=22850-46884&m=dev)。使用设计稿示例患者与两个示例诊次、背景和图标，提供选择／全选、数量联动、自动同步开关和关闭交互。
- 按用户后续确认，前景弹窗保持屏幕全宽、固定 90% 屏幕高度，不缩放；只有后方详情页缩小，关闭后恢复。当前使用 UIKit 透明全屏展示容器，内部通过 Masonry 固定弹窗尺寸；纵向转场沿用项目 `MainNavigationController` 的动画方式，底页缩放与恢复跟随同一转场。顶部圆角 12pt，后方卡片左右各留 20pt、顶部露出 12pt；支持关闭按钮、点击顶部空白及拖动标题区关闭。减少动态效果开启时取消过渡动画。
- 窄屏可滚动，底部操作区固定并避让安全区。确认、详情和帮助只展示本地预览提示，不查询或写入真实医案，不保存自动同步设置。
- Release 编译保留原「诊疗笔记」页面与埋点；其他开方操作、Android 和 HarmonyOS 不在此次修改范围内。

## 代码与环境

仓库 `gancao-ios4doctor`，分支 `feature/chiyz-cloud-records`，执行工具 Codex；本次未提交、未推送。

| 文件 | 用途 |
| --- | --- |
| [GCRecipeOrderDetailViewController.m](../../../repos/gancao-ios4doctor/LiqForDoctors/Classes/Prescribe/VC/PrescribeDetail/GCRecipeOrderDetailViewController.m) | 仅 Debug 中接入测试入口 |
| [GCCloudCaseImportPreviewViewController.m](../../../repos/gancao-ios4doctor/LiqForDoctors/Classes/Prescribe/VC/PrescribeDetail/GCCloudCaseImportPreviewViewController.m) | 固定尺寸示例弹窗、叠层转场和本地交互 |
| `Images.xcassets/CloudCasePreview/`、`LiqForDoctors.xcodeproj/project.pbxproj` | 设计素材与源码注册 |

原工作区已有 `Pods/Pods.xcodeproj/project.pbxproj` 改动及 `.idea/`，保留原样。当前 Xcode 为 27.2；旧依赖的部署版本及 Pods 中迁移前 `ios_doctor` 路径会阻断默认构建。本次使用临时目录映射和命令行 `IPHONEOS_DEPLOYMENT_TARGET=17.0`，兼顾 Widget 原有最低版本，仅作用于测试构建；映射在构建结束清理，不修改部署或签名配置。

## 首轮验证与安装（历史）

以下为首轮系统 `pageSheet` 实现的执行事实；当前方案与最新验证见文末，不以旧模拟器结果代替当前真机验收。

| 检查 | 实际结果与范围 |
| --- | --- |
| 完整 App 构建 | Xcode 27.2，Test 配置（DEBUG=1），arm64，`BUILD SUCCEEDED` |
| 独立弹窗运行 | iPhone 16 Pro 模拟器／iOS 18.5；同一控制器源码、Masonry、项目颜色与字体；确认原生 sheet 的底页缩小露边、布局及本地交互，见[截图](evidence/ios-sheet-preview.png)与[检查结果](evidence/ios-sheet-preview-checks.json)；不代表完整业务运行 |
| 选择交互 | 默认选本次、选择第二次、全选、清空后禁用确认、开关关闭通过；运行日志未发现约束冲突 |
| 真机安装 | iPhone 14（设备名 HUAWEI Phone14），iOS 27.2；`devicectl device install app` 返回安装成功，应用「甘草医生Test」，Bundle ID `com.gancaoDoctor.doctor` |
| 原工作区与提交 | 原 Pods 改动、`.idea/` 保留；临时目录映射已清理；文档和 iOS 代码未提交、未推送 |

构建另遇到旧语音依赖 `libmp3lame.a` 的归档成员对齐不兼容。仅在 `/private/tmp/CloudCaseLinkCompatibility/` 提取 arm64 对象后重建归档，并通过命令行 `LIBRARY_SEARCH_PATHS` 优先使用该副本；已核对 28 个对象的字节完全一致，未修改 Pods 原静态库。部署版本参数与这个副本是当前 Xcode 下复现本次包的本地构建条件，不是仓库长期配置变更。

真机业务入口、手势关闭和原详情恢复的人工体验待用户查看；接口联调、真实诊次数据、存入结果和完整业务验收不在本次预览范围内。

查看路径：打开测试包，进入可显示「诊疗笔记」的普通开方详情，点击右上角「诊疗笔记」。检查底页缩小露边、弹窗内容、诊次选择、底部数量、开关、关闭按钮及下拉关闭；连续打开／关闭后，原详情仍可滚动和返回。

## 真机问题与暂存状态

2026-11-13，用户反馈真机闪退。首包的崩溃栈停在 `UIApplicationEvaluateRuntimeIssueForNoSceneLifecycleAdoption`：当前 iOS 27.2 与新 SDK 构建要求 Scene 生命周期。后续补入 Debug 单窗口 Scene 桥接；继续运行又捕获旧 SDK 的 `+[UTDevice sharedInstance]` 未识别方法异常。最后一版通过构建参数 `ENABLE_DEBUG_DYLIB=NO` 恢复传统可执行文件布局并安装，但尚未完成持续运行及业务入口复验。上述安装和构建成功不能作为真机运行通过的结论，模拟器截图仅证明独立弹窗预览。

用户随后要求先 stash 需求代码，已停止排查。iOS 仓库本次代码、素材、工程注册和启动兼容调整均保存在 `stash@{0}`，说明为「wip: 云医案弹窗预览及本次启动兼容调整」；当前分支仍为 `feature/chiyz-cloud-records`。代码尚未恢复到工作区，文中新增源码链接需恢复 stash 后使用。原 Pods 改动与 `.idea/` 保留，ai-specs 文档未暂存。stash 仅影响源码，不回退真机已安装的包。

### Stash 后的原始源码对照测试

按用户后续要求，于 2026-11-13 23:14 重新构建、覆盖安装并启动 stash 后的原始代码。当前分支与本地 `develop` 均指向 `17a008d858a7`，业务源码一致；原有 Pods 改动和 `.idea/` 保留。构建沿用 Test 配置、Xcode 27.2 及前述本地兼容参数，包括 `ENABLE_DEBUG_DYLIB=NO`。已检查源码、工程引用和生成的可执行文件，均不含本次弹窗控制器或 Debug Scene 代理。

完整构建及安装成功，但原始包在真机启动后仍立即退出，信号 `SIGTRAP`。新崩溃报告 `甘草医生Test-2026-11-13-231406.ips` 的首帧仍为 `UIApplicationEvaluateRuntimeIssueForNoSceneLifecycleAdoption`，与首包一致。结论仅为：当前 Xcode／iOS 组合下，不含本次需求代码也能复现这处启动异常，不能将其归因于新弹窗；不代表本次需求已完成真机验证。需求代码继续保留在 stash，当前真机安装的是此次对照用原始包。


## 改用既有适配分支后的交付

用户要求回退本轮启动实验，改从 `kqc-27.1适配` 签出当前需求分支，再恢复需求代码。已将 `feature/chiyz-cloud-records` 快进到本地 `origin/feature/kqc-27.1适配` 的 `ddcc2f18a4e1`；当前历史包含该分支正式 Scene 实现及支付宝／UTDID 依赖适配。HTTP 和 SSH 拉取均连接失败，本次使用已存在的远端跟踪快照，未确认远端是否有更新。

从原 stash 恢复了需求入口、预览控制器、9 个图片资源和工程注册。AppDelegate、正式 GCSceneDelegate 和 Info.plist 与适配分支提交一致；本轮试验性的 Debug Scene、启动诊断日志和链接参数均已撤回。原 stash `6f3abc6174185e0a0fc7573ebb884303bcfc05bd` 继续保留作备份，未整体 pop，以避免带回已撤回的启动试验。

使用适配分支原生 Test 配置完成 Xcode 27.2 真机构建、安装和启动。未覆盖部署版本、Debug 动态库或 Objective-C 元数据布局，也未使用之前临时重归档的语音库。为保留原有 Pods 路径改动，构建期间仍使用临时目录映射，完成后已清理。

真机 iPhone 14／iOS 27.2 的同一进程持续运行 86.9 秒，未退出，期间没有新增医生端崩溃报告，证据见[运行检查结果](evidence/ios-27-adaptation-runtime-check.json)。此结果证明本次包的启动与进程存活检查通过；弹窗真机手动交互、人脸认证、支付及完整同步业务未作验收，示例弹窗不写入真实医案。

按用户后续要求，在 iOS 仓库 `.gitignore` 加入 `.idea/`，`git check-ignore` 验证生效。当前未提交业务源码只有需求入口与弹窗；工程改动仅注册预览控制器。其余配置改动为本次忽略规则，以及先前已有的 Pods GCAVFoundation 路径一行改动。`.idea/` 目录本身保留，文档与代码均未提交、未推送。

## 固定弹窗尺寸与前后层分离

2026-11-14，用户确认弹窗固定为屏幕高度的 90%，并指出前景弹窗不应缩小。此前真机尺寸记录显示：390×844pt 屏幕上，系统 Sheet 的最终前景范围为 `{{8, 107.499145}, {374, 728.500855}}`，高度仅占 86.3%。后方详情页缩小至 350pt 宽，关闭后恢复为 390×844pt；因此底页效果已生效，前景仍受系统浮动 Sheet 布局影响，不符合设计。

本轮将前景与底页处理分开：前景容器只做纵向位移，不施加缩放；底页继续按原始状态保存、缩放与恢复。布局、字体、颜色和资源仍使用 Objective-C、Masonry、HPTFont／HPTColor 与原有 imageset，未更改启动、依赖或签名配置。调试尺寸记录只含视图几何信息，不含业务资料，并标记 `fixed90Foreground`，防止读取旧包记录。

Xcode 27.2、Test 配置、通用 iOS 真机目标构建通过，未添加实验性编译参数，构建所用临时目录映射已清理。指定设备目标曾因等待连接超时；随后设备短暂显示已配对，但局域网通道仍断开，两次安装分别返回连接失效与可信连接不可用。用户重新连接并解锁后，修正版已安装到 iPhone 14 并启动。证据见[本轮构建与安装检查](evidence/ios-fixed90-build-check.json)。

用户在真机打开并关闭弹窗后，AI 读取带 `fixed90Foreground` 标记的[本轮几何记录](evidence/ios-fixed90-device-geometry.json)。390×844pt 屏幕上，前景宽 390pt、高 759.67pt，占屏幕高度 90.008%，与 90% 的差值在一个物理像素以内；前景 transform 为单位矩阵，没有缩放。底页缩小到 350pt 宽，关闭后恢复到 390×844pt 且 transform 复原。该记录证明本轮前景尺寸与底页恢复检查通过；下拉取消、减少动态效果及完整业务验收未执行。
