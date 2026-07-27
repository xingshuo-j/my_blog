# 优化变更日志（Changelog）

> 记录每次优化的变更内容。最新记录在最上方。

## 2026-07-28 — P0 批次：正确性缺陷修复

**类型**：Bug 修复（P0）

**变更内容**：
1. **GFM 删除线渲染**：确认 Astro 7 默认 Markdown 处理器 Satteri 内置 GFM（实测 `~~删除线~~` → `<del>`），无需 remark-gfm 插件；卸载无用依赖 `remark-gfm`；删除 MainLayout.astro 尾部客户端 `innerHTML.replace` hack（同时消除一个 XSS 风险点）
2. **日期修复**：
   - 修复 `small_talk/1-3.md` frontmatter `date:2026-7-10 21:15`（冒号后无空格，非法 YAML，日期完全不渲染）→ `date: "2026-07-10 21:15"`
   - 修复 `learn/*.md` 日期被 YAML 解析为 Date 对象、页面显示 `2026-07-10T00:00:00.000Z` → 加引号保持字符串
   - 新建 `src/utils/content.ts`：`parseDate`（空格→`T` 归一化，兼容 Safari）+ `sortByDateDesc`；index.astro、learn.astro 的 5 处排序逻辑统一改用工具函数（顺带消除重复代码）
3. **删除重复图片**：`src/image/background_windows.jpg`（与 public/ MD5 相同，832K，且壁纸混入每日一图图库）

**构建验证**：`npm run build` 通过（4 页面）；碎碎念日期正确渲染并倒序；learn 卡片日期显示 `2026-07-10`；`dist/` 5.2MB

**下一步**：P1 批次（图片压缩、CSS 去重、卡片真实链接）

---

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
