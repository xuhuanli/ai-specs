# CRM 代码仓库接入

已确认接入 iOS、Android 两个端，后续可能扩展到第三端。各端保留独立 Git 历史与远端。

| 平台 | 本地目录 | 远端地址 |
| --- | --- | --- |
| iOS | [ios4crm/](ios4crm/) | `http://git.igancao.com/root/gancao-ios4crm.git`（服务器重定向至 HTTPS） |
| Android | [android4crm/](android4crm/) | `git@git.igancao.com:root/gancao-android4crm.git` |

2026-11-05 首次接入完成，两个仓库的远端默认分支均为 `master`，已完整克隆并检出该分支。iOS 首次 HTTP 下载较慢，改用同一仓库的 SSH 地址完成下载，随后将 `origin` 恢复为用户提供的 HTTP 地址。

首次克隆检出的 `master` 中均未检索到 `AGENTS.md` 或 README 文件。后续只读核对 `origin/develop` 时，iOS 发现根 `README.md`，Android 发现根 `README.md`、`structure.md`、`style.md`；本轮在两个开发分支中均未检索到 `AGENTS.md`。查看方式与项目概况见[项目描述](../项目描述.md)。后续开发前，需重新核对目标仓库的现行规范、实际分支与未提交改动；不继承云诊室项目的技术规范。

代码目录由工作区根 `.gitignore` 排除；本接入说明由根文档仓库记录。不将代码作为根文档仓库的子模块或 gitlink。项目入口见 [CRM 项目说明](../README.md)。
