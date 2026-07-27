# 优化方案（Optimization Plan）

> 创建日期：2026-07-28
> 项目：xing's blog（Astro 静态博客）

## 一、项目分析结论

| 项目 | 结论 |
|------|------|
| 类型 | 纯前端静态站点（SSG），无后端、无数据库 |
| 框架 | Astro 7.0.7（最新 7.1.4） |
| 内容源 | 本地 Markdown + `import.meta.glob`（未使用 Astro Content Collections） |
| 样式 | 单一全局 CSS（`style/base.css`，1266 行） |
| 脚本 | 布局内联原生 JS（IIFE，无框架） |
| 构建 | `astro build` → `dist/`，部署到静态托管 |
| Node | ≥22.12.0 |

## 二、优化项（按优先级排序）

### P0 — 正确性缺陷（Bug 级）

1. **remark-gfm 未启用**
   - 现状：`remark-gfm@4.0.1` 已在 dependencies，但 `astro.config.mjs` 中 `remarkPlugins: []` 为空，导致 `~~删除线~~` 无法渲染，被迫在客户端用 `innerHTML.replace` 正则 hack 补救（MainLayout.astro 尾部脚本）。
   - 方案：`astro.config.mjs` 中注册 `remarkPlugins: [remarkGfm]`，删除客户端 hack 脚本。

2. **日期解析跨浏览器兼容问题**
   - 现状：frontmatter 使用 `date:2026-7-10 21:15`（空格分隔、未零填充），`new Date("2026-7-10 21:15")` 在 Safari/iOS 返回 `Invalid Date`，排序失效。
   - 方案：统一 frontmatter 为 ISO 格式 `2026-07-10T21:15:00`；排序函数中做日期归一化兜底（空格替换为 `T`）。

3. **重复图片文件**
   - 现状：`public/background_windows.jpg` 与 `src/image/background_windows.jpg` MD5 相同（各 832K），且 `src/image/` 下副本会被"每日一图"随机选中。
   - 方案：删除其中一份（保留 `src/image/` 走构建管线，或保留 `public/` 并从图库排除）。

### P1 — 性能

4. **每日一图加载原图（总计 ~5MB 未压缩 JPG）**
   - 现状：最大单图 900K，直接全量加载原图，无压缩、无现代格式。
   - 方案：构建前压缩（转 WebP，质量 80，限制最大边 1920px）；或使用 `astro:assets` 的 `<Image>` 组件按需生成多尺寸；文件名规范化（去空格、改语义化命名）。

5. **CSS 重复定义**
   - 现状：`style/base.css` 中 `.daily-view-init` 及其子选择器重复定义 3 次（第 382、852、1144 行附近）。
   - 方案：合并去重；后续可按页面拆分 CSS。

6. **卡片链接不可爬取**
   - 现状：文章卡片用 `href="javascript:void(0)"` + `onclick` 打开覆层，搜索引擎无法索引文章页，禁用 JS 时完全不可用。
   - 方案：href 改为真实地址 `/learn/{slug}`，JS 拦截 click 事件做覆层增强（渐进增强）。

### P2 — 安全

7. **`set:html` 注入 JSON**
   - 现状：`<script set:html={JSON.stringify(imageUrls)}>`，若文件名含 `</script>` 可逃逸。
   - 方案：序列化时将 `<` 替换为 `\u003c`（风险低，纵深防御）。
   - 详见 `security_audit.md`。

8. **无 CSP / 安全响应头**
   - 方案：静态托管平台（Nginx/Cloudflare 等）配置 CSP、`X-Content-Type-Options`、`Referrer-Policy` 等。

### P3 — SEO / 可发现性

9. `astro.config.mjs` 缺少 `site` 配置 → 无法生成规范链接与 sitemap。
10. 缺少：`<meta name="description">`、Open Graph 标签、`robots.txt`、sitemap（`@astrojs/sitemap`）、404 页面、RSS。

### P4 — 可维护性

11. **代码重复**：`index.astro` 与 `learn.astro` 卡片渲染重复；三个 `[...slug].astro` 几乎相同 → 抽取 `ArticleCard.astro` 组件与共享 `getStaticPaths` 工具函数。
12. **内联事件处理**：`onclick=` 散布在模板中 → 改为事件委托（`addEventListener` + `data-*`）。
13. **可访问性**：侧边栏菜单 `<li onclick>` 无键盘支持 → 改用 `<button>` 或加 `tabindex` + 键盘事件；友邻头像 `alt=" "` 为空。
14. **死代码**：`showSmallTalk()` 空函数、空的 `.profile-name`/`.profile-bio`、页脚硬编码 `© 2026`。
15. `package.json` 的 `name` 字段为空。

### P5 — 依赖与环境

16. `astro` 7.0.7 → 7.1.4 可升级（`npm outdated`）。
17. `node_modules` 存在 extraneous 包（`@emnapi/*`、`@napi-rs/wasm-runtime`、`tslib`）→ `npm prune` 清理，确认 lock 文件一致。

## 三、执行顺序建议

```
第 1 批（正确性）：P0-1 remark-gfm、P0-2 日期格式、P0-3 去重图片
第 2 批（性能）：  P1-4 图片压缩、P1-5 CSS 去重、P1-6 真实链接
第 3 批（工程化）：P2-7 set:html 转义、P3-9/10 SEO 基础、P4 组件抽取
第 4 批（收尾）：  P5 依赖升级、文档更新、提交
```

每批完成后：更新本文件与 `build/changelog.md` → `npm run build` 验证 → 提交。

## 四、变更日志

详见 `build/changelog.md`（每次优化追加一条）。
