# 优化变更日志（Changelog）

> 记录每次优化的变更内容。最新记录在最上方。

## 2026-07-28 — 项目分析与优化方案建立

**类型**：文档建立（首次分析）

**变更内容**：
- 完成项目全面扫描：纯前端 Astro 7.0.7 静态博客，无后端/数据库
- 创建 `build/` 文档体系：
  - `optimization_plan.md` — 17 项优化项（P0~P5 分级）
  - `performance_checklist.md` — 性能检查清单与基准数据
  - `security_audit.md` — 安全审计（XSS、安全头、供应链）
  - `deployment_guide.md` — 部署配置与发布流程

**发现的关键问题**：
1. P0：remark-gfm 已安装但未注册，`~~删除线~~` 靠客户端 innerHTML hack 渲染
2. P0：frontmatter 日期格式（`2026-7-10 21:15`）在 Safari 解析失败，排序失效
3. P0：`background_windows.jpg` 重复存放两份（各 832K）
4. P1：`src/image/` 图片共 ~5MB 未压缩
5. P1：`base.css` 中 `.daily-view-init` 样式重复定义 3 次

**构建验证**：未执行构建（仅文档变更）

**下一步**：执行 P0 批次（remark-gfm 启用、日期格式统一、图片去重）
