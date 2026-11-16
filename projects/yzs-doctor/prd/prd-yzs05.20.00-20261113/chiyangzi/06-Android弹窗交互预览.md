# Android 弹窗交互预览

2026-11-14，按用户指令，将 iOS 已确认的这一部分弹窗预览接入 Android 开方详情，并安装至已连接真机。关联 REQ-001、REQ-002 的局部界面，不代表完整同步业务或对应业务验收已完成。

## 范围与实现

- 设计依据：[Figma 22850:46884](https://www.figma.com/design/aFKpQlzeW8NibL23OpY5lq/?node-id=22850-46884&m=dev)。前景全宽、固定为弹窗窗口高度的 90%，只做纵向位移；后方真实页面缩小，左右各留 20dp，顶部露出 12dp；关闭后恢复原始状态。
- 使用普通开方详情 `NormalDetailV2Fragment` 的「诊疗笔记」作为临时测试入口，沿用原可见条件。按用户最新要求，原跳转与埋点以注释保留，弹窗调用以 TODO 标记，不再通过 `BuildConfig.DEBUG` 分流。
- 外层使用设计稿患者与两个示例诊次，支持选择／全选、数量联动、自动同步开关、关闭按钮、返回键和下拉关闭。无选择时按 [Figma 22850:46832](https://www.figma.com/design/aFKpQlzeW8NibL23OpY5lq/?node-id=22850-46832&m=dev) 显示灰底灰字「确认存入」，保持可点击，点击 Toast「请选择诊次」；有选择时恢复黄色及数量文案。二级详情通过原开方详情接口读取用户指定订单，支持选择、反选与分区复制。确认后在同一弹窗中展示结果样式，帮助保留本地提示并使用叠层；不调用真实同步接口，也不保存业务设置。
- 复用 `BaseBottomSheetDialogFragment`、XML＋ViewBinding、500 字重组件、思源宋体组件和已有颜色 token，包括提示底色 `color_3b_dab5ac`。9 个图片直接复用同一 Figma 节点此前的导出素材，放入图片模块的 `drawable-xxhdpi`；40×20dp 开关复用既有诊后服务图标。
- 诊次 item 使用无水波的圆角背景；item、全选与自动同步开关的选中态切换不防抖，每次点击立即响应。确认、详情及关闭等动作继续沿用既有点击处理。
- 底部操作区避让系统导航栏，确认按钮顶部留白 6dp、底部留白 16dp，另加系统导航栏安全区，主体可滚动。叠层变化限定于此弹窗，关闭或视图销毁后恢复底页的缩放、位移、裁剪和原背景，不修改全局弹窗基类。

## 代码与环境

仓库 `gancao-android-doctor-v2`，分支 `feature/chiyz-cloud-records`，起点为 `develop` 的 `e9a88866e329`。该功能分支此前已存在且与起点相同，本次复用；原有未跟踪 `scripts/` 保留。

| 文件 | 用途 |
| --- | --- |
| [NormalDetailV2Fragment.kt](../../../repos/gancao-android-doctor-v2/app/src/main/java/com/igancao/doctor/ui/record/recorddetail/NormalDetailV2Fragment.kt) | TODO 标记的临时测试入口 |
| [CloudCaseImportPreviewSheet.kt](../../../repos/gancao-android-doctor-v2/app/src/main/java/com/igancao/doctor/ui/record/recorddetail/CloudCaseImportPreviewSheet.kt) | 本地交互、固定尺寸、叠层转场与恢复 |
| [CloudCaseVisitDetailSheet.kt](../../../repos/gancao-android-doctor-v2/app/src/main/java/com/igancao/doctor/ui/record/recorddetail/CloudCaseVisitDetailSheet.kt) | 二级详情、选择结果回传、分区复制与返回恢复 |
| `app/src/main/res/layout/sheet_cloud_case_import_preview.xml`、`item_cloud_case_preview_visit.xml` | 弹窗和诊次布局 |
| `app/src/main/res/layout/sheet_cloud_case_visit_detail.xml`、`item_cloud_case_visit_info_row.xml`、`item_cloud_case_visit_photos.xml` | 详情、信息行与现有九宫格照片组件；药材复用既有适配器 |
| `app/src/main/res/layout/layout_cloud_case_import_result.xml` | 四种结果样式共用布局与临时样式切换按钮 |
| `app/src/main/res/drawable/*cloud_case_preview*`、`values/styles_cloud_case_preview.xml`、`values/strings.xml` | 形状、状态、局部主题和文案 |
| `drawable_resource/src/main/res/drawable-xxhdpi/cloud_case_*.png` | 同一设计节点的图片资源 |

## 验证记录

已识别 USB 真机 `2509FPN0BC`，Android API 36，1200×2608px、480dpi。构建命令为 `./gradlew :app:assembleDebug --offline --console=plain`，使用既有本地配置与签名。

首次构建因本次代码的 BottomSheetBehavior 泛型不匹配失败，已修正并重新构建。第一版真机预览的选择与尺寸检查通过，但截图发现宋体使用了 700 字重、诊次卡片底部留白多 4dp，以及程序间距使用系统密度而非页面适配密度的问题。本轮分别改用项目已有的 600 字重 `SourceHanTextView`、明确各方向 padding、使用当前页面 density，保留旧检查记录。

首轮预览包使用 Android `debug` 配置，构建结果 `BUILD SUCCESSFUL`（2 分 59 秒），已覆盖安装并启动。APK 沿用当前分支的 5.3.9／1081 标识，未修改应用版本、依赖、签名或构建配置。布局 XML、颜色 token／字重规范及源码空白检查通过。

首轮由 AI 在连接真机上使用 adb 执行 14 项交互检查，见[检查与几何证据](evidence/android-sheet-preview-checks.json)及[首轮截图](evidence/android-sheet-preview.png)：

| 检查 | 实际结果 |
| --- | --- |
| 前景尺寸与缩放 | 1200×2608px 窗口中弹窗宽 1200px、高 2347px，占 89.992%（与 90% 的差值小于一个像素）；缩放值均为 1 |
| 底页叠层 | 页面密度为 3.2，左右各留 64px，即 20dp；顶部露出约 12dp；只有真实底页缩小 |
| 选择与数量 | 默认本诊 1 个、选择第二诊次 2 个、清空后 0 个且确认禁用、再次全选 2 个均通过；核对实际按钮文案与 enabled 状态 |
| 开关与本地提示 | 自动同步关闭、确认提示、帮助提示与详情示例均通过；未触发真实同步 |
| 关闭与恢复 | 关闭按钮、向下滑动、系统返回均恢复底页原始尺寸和位移；小幅下拉回弹后尺寸正确 |
| 重复打开 | 新预览重新采用默认选择与开关状态；最终弹窗保持打开供用户查看 |

以上为 AI 的局部界面验证；用户人工验收、其他 Android 设备／系统／导航方式及完整业务联调未执行。上述验证执行时尚未提交，最新 Git 状态见下方提交记录。

2026-11-14，用户要求将测试入口改为「注释原跳转和埋点＋TODO 标记弹窗调用」，已移除该入口的 DEBUG 分支。随后执行 `./gradlew :app:compileDebugKotlin --offline --console=plain`，19 秒编译通过；此次未重新打包、安装或重跑真机检查，上述 14 项结果保留为上一测试包的执行记录。

## 提交记录

2026-11-14，按用户要求提交 Android 仓库，分支 `feature/chiyz-cloud-records`，提交 `8436d102e`（`feat: 新增云医案弹窗交互测试入口`）。本次包含弹窗代码、资源、临时测试入口及 Android `AGENTS.md` 的 TODO 格式约定：`// TODO: 年/月/日 作者=> 说明`，使用实际创建日期与作者。未执行推送；ai-specs 协作文档尚未提交。

## 快速切换与底部留白修正

2026-11-14，用户反馈 item 按压水波、选中态快速切换被防抖拦截，以及按钮底部间距偏小。本轮将 item 背景由 ripple 改为 plain shape，两个 item、全选和开关改用原生 `setOnClickListener`；确认按钮底部间距由 6dp 增至 16dp，保留原顶部间距与导航栏安全区。

Debug 构建 1 分 59 秒通过，已覆盖安装到同一真机。AI 检查两个 item、全选与开关在 133ms、134ms、150ms、143ms 间隔内的连续点击，每次均触发正确的选中切换，按钮数量和禁用状态一致。按住 item 的截图未再出现水波或背景加深；按钮底部实际留白 51px，在 3.2 页面密度下约为 16dp，误差小于一个物理像素。前景仍为全宽、90% 高度且无缩放，关闭后底页恢复，已重新打开默认预览供用户查看。

见[本轮检查记录](evidence/android-sheet-preview-click-fix-checks.json)、[修正后截图](evidence/android-sheet-preview-click-fix.png)及[按住 item 的截图](evidence/android-sheet-preview-click-fix-pressed.png)。本轮仅复测上述改动与关闭恢复，不将首轮 14 项检查记为本次重新执行；本轮追加修改尚未提交、未推送。

## 无选择按钮与提示（CHG-002）

2026-11-14，用户明确无选择时参考 Figma 22850:46832 的灰态样式，但按钮仍可点击并提示 Toast。共用需求中的 Q-007 已确认，更新 REQ-002、AC-021 及 HT-021；本次只实施 Android 局部预览。

空态使用既有 `colorButtonBackground`、`colorTips`，文案为「确认存入」，不再通过禁用控件或整体降低 alpha 表示空态。点击时复用项目 Toast 提示「请选择诊次」；选中后恢复 `colorAccent`、`colorContent` 与数量文案。前一次的无水波、切换不防抖及底部 16dp 留白继续沿用。

Debug 构建 2 分 51 秒通过，已安装到同一真机。AI 核对空态按钮 `enabled=true`、`clickable=true`，实际点击后显示「请选择诊次」，未打开确认预览；选中后黄色按钮和数量恢复，正常点击仍只显示本地预览；再次反选后回到灰态可点击。当前保留未选中状态供用户查看。

见[本轮检查记录](evidence/android-sheet-preview-empty-confirm-checks.json)、[空态截图](evidence/android-sheet-preview-empty-confirm.png)、[Toast 截图](evidence/android-sheet-preview-empty-confirm-toast.png)和[选中后截图](evidence/android-sheet-preview-empty-confirm-selected.png)。先前「清空后禁用」是按旧规则执行的历史结果，已由 CHG-002 更新预期；本轮没有重跑首轮全部检查，也不代表其他端已实现或完成业务验收。该轮复测时追加代码和 ai-specs 文档均未提交，最新代码提交如下。

2026-11-14，按用户要求提交后续 Android 交互修正，提交 `7a2177fb0`（`fix: 优化云医案弹窗选择与空态按钮交互`），共 6 个文件，包含无水波、快速切换、16dp 留白及灰态可点击／Toast。未执行推送；ai-specs 协作文档尚未提交。

## 诊次详情与分区复制（CHG-003）

2026-11-14，首轮按用户指定的 [Figma 22850:47283](https://www.figma.com/design/aFKpQlzeW8NibL23OpY5lq/?node-id=22850-47283&m=dev) 将诊次「详情」由本地提示替换为二级弹窗。前景仍为全宽、窗口高度的 90%，只做纵向位移；打开时缩小后方列表弹窗，返回时恢复列表尺寸和位置。选择通过 Fragment Result 按诊次索引回传，带入当前状态，选择／反选不防抖，打开或关闭本身不改选择。

首轮曾用设计稿文字、三个附件缩略图和药材演示布局，沿用已有字体组件、颜色 token 和 `bg_prescribe_card`。该批写死数据、三张图片资源和独立药材 item 已在下轮真实数据接入时移除；现有实现见下一节。

用户先确认「药方复制药材，患者复制患者信息」，再指定患者格式及排除附件，据此确认 Q-013。药方按展示顺序复制一行「药材名 X克 药材名 X克 …」，同名药材不合并，不附加剂数或医嘱；患者按「标签 值」逐行复制文字，附件不参与。两处复用项目剪贴板方法，复制后 Toast「复制成功」。仅 Debug 包回读系统剪贴板并记录长度和 SHA-256 摘要，便于真机核对，不在记录中保存患者或药材原文。

设计稿数据包的 13 项真机检查通过，记录见[历史检查](evidence/android-visit-detail-design-data-checks.json)，对应 APK 摘要与构建见记录内部。初轮[检查结果](evidence/android-visit-detail-initial-checks.json)及检查脚本的[键名错误](evidence/android-visit-detail-initial-harness.log)、[标题读取中断](evidence/android-visit-detail-transition-harness.log)保留；调整检查脚本后完成 13 项检查。以上为旧数据包结果，不作为下轮真实数据包的验证结论。

## 指定订单真实数据与附件组件

2026-11-14，用户指定订单 `G17946541123931852`，要求诊次详情读取 `NormalDetailV2Fragment` 使用的 getOne 数据，并以该订单的 4 张图片核对附件组件。详情现复用 `PrescribeRecordViewModel.recipeOne → PrescribeRecordRepository.recipeOne → acrecipel/getone`；请求失败显示重试入口，未返回数据时不展示设计稿替代内容。

患者信息按原详情的字段与显隐逻辑展示姓名／性别／年龄、手机号、就诊时间、主诉、现病史、刻下症、诊断及适用的主治症状。只读取 `diseaseCourse`、`clinicalManifestations` 两个现行字段，不使用已废弃的历史字段。附件 `photo` 与药方原图 `recipelPhoto.urlPhoto` 分开成行，谁有图谁显示；复用 `BGASortableNinePhotoLayout`、`photoLayoutV2` 和原大图预览，不再手动变形、固定三张或限定设计图内容。

药材复用 `MedicineGridAdapter`，中西成药分支沿用 `MedicineCtmV2Adapter`；剂数、剂型、服用方式、包装、订单备注和医嘱依照原详情条件展示。药方复制按实际展示顺序保留药名、剂量和单位，本次订单均为「克」；患者按已确认的「标签 值」逐行复制，附件不参与。用户要求的颗粒剂切换入口暂不加入，保留原适配器的默认展示，后续待设计决定。

`./gradlew :app:assembleDebug --offline --console=plain` 构建 3 分 28 秒通过，已覆盖安装至同一真机。AI 对照原订单页面执行 12 项检查：返回订单匹配指定编号；7 项患者文字与原页一致；16 味药材及剂数、剂型、服用方式和医嘱一致；4 张附件完整显示，第 4 张进入原生预览定位到 4/4；两处系统剪贴板回读的格式和内容正确，并显示「复制成功」；选择／反选、返回数量、重新进入与全宽 90% 尺寸通过。记录和最终 APK 摘要见[真实数据检查](evidence/android-visit-detail-live-data-checks.json)。记录仅保留检查结论、数量、几何和剪贴板摘要，未将真实患者文字或照片归档至仓库。

当前两个外层条目仍是测试列表，均请求同一固定订单，仅分别回传选择；尚未实现动态诊次列表、已存 Tab／只读状态、真实同步和开方完成页。未模拟网络失败，未验证其他订单类型或颗粒剂切换，不据此标记完整 AC-006／HT-006、用户人工验收或三端业务完成。当前基于 `7a2177fb0` 追加，代码与协作文档均未提交、未推送。

## 存入结果四种样式（CHG-004）

2026-11-14，按用户提供的四份结果前景稿实现[存入中](https://www.figma.com/design/aFKpQlzeW8NibL23OpY5lq/?node-id=22993-13576&m=dev)、[新建患者成功](https://www.figma.com/design/aFKpQlzeW8NibL23OpY5lq/?node-id=22993-13633&m=dev)、[已有患者成功](https://www.figma.com/design/aFKpQlzeW8NibL23OpY5lq/?node-id=22993-13688&m=dev)和[存入失败](https://www.figma.com/design/aFKpQlzeW8NibL23OpY5lq/?node-id=22993-13743&m=dev)。

点击有效的「确认存入」后，直接在原弹窗内替换列表内容，默认显示存入中，不创建新的结果 Dialog，也不再次缩放后方入口页。结果页仍为全宽、90% 窗口高度；「返回」与 × 均关闭整个弹窗流程，回到触发页面，当前入口为开方详情。代码使用当前弹窗的关闭流程，没有硬编码跳转到某个 Fragment，供后续入口复用。

底部四个按钮分别切换存入中、新患者成功、老患者成功和失败样式，选中态立即更新，不防抖；按用户 TODO 格式标记为测试代码。成功描述使用本次所选数量，患者名、分组、进度及错误代码为预览资料；404 只对应设计稿示例，不作为接口契约。「重新存入」回到存入中样式，「前往云医案查看」暂仅 Toast「前往云医案查看」，不发起存入、不打开小程序。

结果插画从相应 180×130px 设计节点以 3 倍 PNG 导出，背景从 375×160px 节点导出，放入 `drawable-xxhdpi`，分别按 180×130dp 与屏宽比例展示。卡片高 394dp、左右留 12dp，复用已有颜色 token、500 字重组件和按钮背景；白色渐变、描边及进度使用局部 drawable，不引入新色值。底部测试按钮增加 16dp 留白并避让系统导航栏。

诊次详情继续保留原叠层；本地自动同步提示也加入列表缩小及关闭恢复。打开其他详情或结果前会清理提示弹窗留下的缩放，视图销毁时一并清理，避免后续弹窗继承未恢复的尺寸。本轮仍为 Android 局部交互预览，不代表真实存入、后台结果恢复或小程序查看已实现。

首包 Debug 构建 3 分钟通过，真机逐一对照四种设计截图；随后补齐自动同步提示的叠层恢复，并将结果尺寸记录延后至布局稳定时执行。最终构建 1 分 49 秒通过，覆盖安装到同一真机，AI 执行 24 项定向检查，详见[检查记录及 APK 摘要](evidence/android-import-result-checks.json)：

- 零选择仍 Toast「请选择诊次」且不进入结果；两项选择进入结果后成功文案保留 2 个诊次。
- 四种样式、图标、进度与主次按钮正确，图标实际为 576×416px，即当前密度下的 180×130dp；卡片为 1124×1261px，对应 351×394dp 的设计尺寸与像素取整。
- 进入结果前后的入口页位置、尺寸、缩放及弹窗位置、尺寸、缩放完全一致，前景缩放均为 1；没有新增缩小后的确认列表层。
- 新建／已有患者的查看按钮均 Toast「前往云医案查看」并停留结果页；失败重试回到存入中。快速连续切换两种样式均响应，不受防抖拦截。
- 四种样式各自的返回和 × 共 8 条关闭路径均直接回到入口，原页面恢复；系统返回和下拉关闭也通过。
- 自动同步提示的叠层与恢复、诊次详情的叠层和选择回传复测通过。

真机截图：[存入中](evidence/android-import-result-loading.png)、[新患者成功](evidence/android-import-result-new.png)、[老患者成功](evidence/android-import-result-existing.png)、[失败](evidence/android-import-result-failed.png)、[查看 Toast](evidence/android-import-result-new-view-toast.png)及[最终留在真机的预览](evidence/android-import-result-ready.png)。原稿快照见设计对照，历史需求与验证结果保留。未重新执行完整真实订单检查，未连接未来新增入口，也未验证进程重建、真实存入与小程序查看；本轮代码和协作文档均未提交、未推送。

## 返回首页后的状态栏背景恢复

2026-11-15，用户反馈关闭弹窗并返回 `MyRoomFragment` 后，首页顶部变黑，时间和网络图标看不清。AI 在旧包复现：重启应用后的首页为白底；进入开方记录、开方详情，打开并关闭云医案弹窗，再逐级返回首页后，状态栏背景变黑。窗口仍保留 `LIGHT_STATUS_BARS`（浅色背景使用的深色图标）设置，所以图标与黑色背景难以区分。

原因在 `CloudCaseImportPreviewSheet.captureSource()`：`sourceBackground = decor.background` 保存的是原 `ColorDrawable` 对象引用，而 `decor.setBackgroundColor(black)` 会直接修改同一个对象的颜色。保存的原背景随之变黑，关闭时重新赋回该对象无法恢复白色。已核对本机 Android SDK 36 的 `View.setBackgroundColor()` 实现，与真机前后截图一致。

修复改为创建独立的黑色 `ColorDrawable` 临时替换窗口背景，保留原背景对象，在已有的关闭和视图销毁流程中恢复。改动限定于该弹窗；Debug 几何记录补充原背景颜色、当前背景颜色及对象恢复结果，不记录患者信息。此前 24 项结果页检查只验证关闭后回到触发页及页面几何恢复，未覆盖继续返回首页的状态栏，本轮补充这条路径。

`./gradlew :app:assembleDebug --offline --console=plain` 构建 1 分 41 秒通过，已覆盖安装至同一真机。AI 完成 9 项检查：干净首页基线；列表 ×、系统返回、下拉关闭、详情返回后关闭、帮助关闭后关闭、新患者结果返回、失败结果 × 共 7 条路径均继续退出开方详情和订单列表，回到首页；最后切换「我的」再回「诊室」。各次首页状态栏均为白底、深色图标；弹窗打开时原背景保持白色，临时背景为黑色，关闭后恢复原背景对象，底页尺寸和位移恢复，前景仍为全宽、90% 高度、缩放值 1。

详见[本轮检查及 APK 摘要](evidence/android-statusbar-checks.json)、[执行日志](evidence/android-statusbar-checks.log)和仅包含顶部状态栏的[修复前](evidence/android-statusbar-before.png)／[修复后](evidence/android-statusbar-after.png)截图。首次脚本因启动广告遮挡中断，下一次因订单列表等待条件写错中断；关闭已确认的广告、按实际列表控件修正脚本后重跑通过，保留[首次中断](evidence/android-statusbar-initial-harness.log)和[等待条件中断](evidence/android-statusbar-list-wait-harness.log)，两次均不作为客户端缺陷。

当前仍基于 `feature/chiyz-cloud-records` 的 `7a2177fb0`，代码和文档均未提交、未推送。设备最终停留首页；本轮未重跑此前全部结果页／复制检查，未验证其他设备或完整同步业务。

## 同名同性别候选、提示横幅与滚动边界（CHG-005）

2026-11-15，按用户指定的 [收起前景](https://www.figma.com/design/aFKpQlzeW8NibL23OpY5lq/?node-id=22850-46745&m=dev)、[展开前景](https://www.figma.com/design/aFKpQlzeW8NibL23OpY5lq/?node-id=22925-13724&m=dev)及[提示横幅](https://www.figma.com/design/aFKpQlzeW8NibL23OpY5lq/?node-id=22850-46773&m=dev)补齐 Android 局部预览，关联 REQ-002／003、AC-007／008。新快照放在既有版本资料的新目录 `prd-yzs05.20.00-20261113`，未重建旧名称目录。

- 候选先按去除姓名首尾空格后完全相同、性别相同筛选，保持输入顺序；首次只显示首位，超过一位才显示「展开全部同名患者」，展开后可「收起」。不按设计示例纳入异性或自行按年龄排序，Q-014 的服务端排序与缺失字段仍待核对。
- 候选和「不是同一人，新建患者」均默认不勾选、互斥单选，每次点击立即更新；展开和收起不清空选择。选择后收起会保留已选患者可见，避免隐藏已确认的接收身份，这是当前预览的展示处理。
- 有候选时固定显示橙色身份核对横幅，无候选时保留原新建提示，不增加身份选择步骤。标题、关闭、患者摘要、提示和底部操作是滚动区的同级视图，只有合并患者与诊次内容滚动，并在边界裁剪。
- 未核对身份时按钮保持灰态、保留诊次数量且可点击，Toast「请核对患者身份」；身份已确认但没有诊次时 Toast「请选择诊次」，均不进入结果。当前实现先核对身份，再检查诊次；同时有效才恢复黄色并进入原结果预览。
- 当前诊次和自动同步仍默认选中／开启。诊次详情仍读取既有指定订单接口，不因加入候选区恢复为设计稿数据；已有患者结果文案使用当前所选候选的分组，结果切换仍不增加叠层。
- 普通点击开方详情「诊疗笔记」展示多候选；长按此测试入口，沿用项目 `ActionSheetDialog` 选择无候选、一位、多位三种本地场景。入口和预览数据使用既定 TODO 格式标记。样例含三位匹配、同名异性、不同名同性别和性别未知资料，用于核对筛选与展示；不代表已查询真实云医案候选、创建患者或绑定关联。
- 复用现有女性头像、选择图标、标题装饰、警告矢量和背景；新增布局及局部形状只引用已有颜色 token，使用 500 字重组件与 600 字重宋体。横幅图标 16dp、候选头像／选择图标 20dp，诊疗标签明确高 20dp、0.5dp 蓝色半透明描边，未新增颜色或全局组件。

首包构建 3 分 18 秒通过并安装检查首屏；随后将诊疗标签高度明确为设计的 20dp，最终 `./gradlew :app:assembleDebug --offline --console=plain` 构建 1 分 18 秒通过，覆盖安装至同一 Android 真机。AI 执行 20 项定向检查全部通过，见[检查、素材尺寸与 APK 摘要](evidence/android-patient-merge-checks.json)及[执行日志](evidence/android-patient-merge-checks.log)。

检查覆盖首位默认与三类数量场景、同名同性别筛选及输入顺序、单选与新建互斥、展开／收起及快速连续操作、所选患者收起后保持可见、固定区域的前后坐标、详情返回后的身份与滚动位置、两项提交拦截及结果分组。两类 Toast 已直接核对真机截图。头像、警告及选择图标的实际尺寸分别为 128px／51px／64px，对应页面 density 3.2 下的 40dp／16dp／20dp；诊疗标签实高 64px，背景 1200×512px，与设计槽位一致，本地素材均非空。

真机截图：[收起](evidence/android-patient-collapsed.png)、[展开](evidence/android-patient-expanded.png)、[正文滚动后](evidence/android-patient-scroll.png)、[身份提示](evidence/android-patient-identity-toast.png)、[诊次提示](evidence/android-patient-visit-toast.png)、[单候选](evidence/android-patient-single.png)、[无候选](evidence/android-patient-none.png)。关闭后继续返回首页的[状态栏](evidence/android-patient-home-status.png)复测正常；随后重新打开[最终预览](evidence/android-patient-ready.png)供用户查看。

源码空白、XML、颜色 token／字重与文档链接检查通过。未联调真实候选查询、患者关联或存入，未模拟请求失败，也未执行未知性别匹配、后端排序及其他设备的业务验收。代码和文档均未提交、未推送；根仓库中已有的资料目录迁移改动及 Android 原有 `scripts/` 保留。

## 诊次详情后方的存入弹窗背景

2026-11-16，用户反馈打开诊次详情后，顶部露出的仍是开方详情背景，要求该区域由「存入我的云医案」弹窗作为新的背景。旧包真机复现：顶部露出区域为原开方详情的褐色，存入弹窗的内容虽然缩小并向上移动，但移出自身 BottomSheet 容器的部分被裁剪，未覆盖旧背景。

`CloudCaseVisitDetailSheet` 改为对上一层 Dialog 的整个 `design_bottom_sheet` 容器执行缩放和位移，继续使用原有关闭及视图销毁恢复流程。存入弹窗的真实背景与圆角随容器一起上移，前景详情保持全宽、90% 窗口高度；不修改全局基类、业务数据、资源或结果页转场。Debug 几何记录同步计入容器缩放，并记录真实可见边界，以区分预期位置与被祖先裁剪后的实际位置。

首次构建 3 分 14 秒通过，补齐可见边界记录后最终增量构建 1 分 41 秒通过，覆盖安装至同一真机。AI 执行 11 项定向检查通过，见[检查及 APK 摘要](evidence/android-detail-stack-background-checks.json)和[日志](evidence/android-detail-stack-background-checks.log)：

- 前景仍为 1200×2347px，屏幕高 2608px，占 90%，没有随背景缩小。后方存入弹窗缩至宽 1072px、缩放 0.8933333，左右各留 20dp；其实际可见顶部为 222px，较详情顶部 261px 露出约 12dp，不再被原来的容器顶边裁掉。
- 用户红框内的三个取样点从褐色变为存入弹窗背景的蓝色，顶部截图已直接核对：[修复前](evidence/android-detail-stack-background-before.png)、[修复后](evidence/android-detail-stack-background-after.png)。记录仅归档顶部区域，不包含真实患者字段及附件。
- 当前诊次和另一诊次重复打开，返回按钮、系统返回、下拉关闭及小幅下拉回弹均正确恢复；患者选择、正文滚动位置、固定区域与自动同步设置保持。详情选择仍回传诊次数量，转结果仍复用同一弹窗且无额外叠层。
- 关闭整个流程后返回首页，[状态栏](evidence/android-detail-stack-home-status.png)仍为白底深色图标。最后重新打开诊次详情，保留[最终顶部效果](evidence/android-detail-stack-background-ready.png)供用户查看。

源码空白与文档链接检查通过；未重跑此前完整候选、复制与全部结果样式检查，也未执行业务联调或其他设备验证。当前分支仍为 `feature/chiyz-cloud-records`、基于 `7a2177fb0`，本轮代码与文档未提交、未推送。
