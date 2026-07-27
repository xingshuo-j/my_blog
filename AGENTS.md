# AGENTS.md — AI 协作指引（新对话请先读此文件）

本仓库是 xing 的个人博客（Astro 7 静态站）。在动手前，**必须先读 [`build/README.md`](build/README.md)**——它是本项目的唯一事实来源，包含：

- 已完成 / 待办的全部优化项（P0~P5，带状态标记）
- 每次变更记录（`build/changelog.md`，最新在上方）
- 性能清单、安全审计、部署指南
- **禁区清单（不要做）**——踩过的坑，避免重蹈覆辙

## 接手三步

1. 读 `build/README.md` 的"当前进度快照"和"禁区 / 不要做"
2. 读 `build/changelog.md` 顶部最近一条的"下一步"
3. 按 `build/optimization_plan.md` 里无 ✅ 标记的待办项推进

## 工作铁律

- 任何改动后必须 `npm run build` 通过，并更新 `build/` 对应文档 + `changelog.md`
- 提交信息格式：`optimize: [YYYY-MM-DD] - [内容简述]`（内容/功能用 `content:` / `feat:` / `fix:`）
- 纯静态站，**无后端、无数据库、无用户输入**——不要引入服务端逻辑

详见 `build/README.md`。
