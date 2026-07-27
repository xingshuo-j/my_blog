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

> ✅ 本批次已于 2026-07-28 全部完成，详见 `changelog.md`。

1. **~~remark-gfm 未启用~~（✅ 已解决）**
   - 实际结论：Astro 7 默认 Markdown 处理器 Satteri 已内置 GFM（`~~删除线~~` 原生渲染为 `<del>`，已实测验证）。`remarkPlugins` 配置是遗留 unified 管线才需要的。
   - 已执行：卸载无用依赖 `remark-gfm`；删除 MainLayout.astro 尾部客户端 innerHTML hack。

2. **~~日期解析跨浏览器兼容问题~~（✅ 已解决）**
   - 实际比预期更严重：`date:2026-7-10 21:15`（冒号后无空格）不是合法 YAML，日期**完全不渲染**；`date: 2026-07-10` 被解析为 Date 对象，页面显示丑陋的 `2026-07-10T00:00:00.000Z`。
   - 已执行：5 个 md 文件 frontmatter 日期改为带引号字符串（`date: "2026-07-10 21:15"`）；新建 `src/utils/content.ts`（`parseDate` 归一化空格→`T` 兼容 Safari，`sortByDateDesc` 统一排序）；index.astro / learn.astro 改用该工具函数。

3. **~~重复图片文件~~（✅ 已解决）**
   - 已执行：删除 `src/image/background_windows.jpg`（与 public/ 重复，且 Windows 壁纸混入每日一图图库）。保留 `public/` 副本（当前无引用，如确认不再使用可后续删除，再省 832K）。

### P1 — 性能

4. **~~每日一图加载原图~~（✅ 2026-07-28 已解决）**
   - 已执行：9 张 JPG（4.2MB）→ WebP q80 ≤1920px（1.3MB），语义化命名 `daily-NN.webp`；友邻头像 316K→85K 并修复空 `alt`。构建产物中图片走 Vite 资产管线带 hash，可 immutable 缓存。

5. **CSS 重复定义（⚠️ 部分完成 2026-07-28）**
   - 已执行：删除 288 行完全重复区块 + 合并第三处 daily 覆盖规则（1266→954 行）。
   - 遗留 5b：`.sidebar` 新旧两版本块（~147/~312 行）属性互相覆盖纠缠，需人工合并并视觉回归验证。

6. **~~卡片链接不可爬取~~（✅ 2026-07-28 已解决）**
   - 已执行：卡片改真实 href，MainLayout 加事件委托拦截（保留中键/Ctrl+Click 新标签行为）；`openArticle` 失败仍回退正常跳转。

### P2 — 安全

7. **~~`set:html` 注入 JSON~~（✅ 2026-07-28 已解决）**
   - 已执行：`set:html={JSON.stringify(imageUrls).replace(/</g, '\\u003c')}`，文件名含 `</script>` 时不再逃逸。详见 `security_audit.md`。

8. **无 CSP / 安全响应头**
   - 方案：静态托管平台（Nginx/Cloudflare 等）配置 CSP、`X-Content-Type-Options`、`Referrer-Policy` 等。

### P3 — SEO / 可发现性

9. ~~`astro.config.mjs` 缺少 `site` 配置~~（✅ 2026-07-28 已添加，当前为占位 `https://YOUR-DOMAIN.example`，部署前须替换为真实域名）
10. SEO 基础设施（✅ 2026-07-28）：已添加 `<meta name="description">`（首页默认文案、文章页取自 `excerpt`）、Open Graph/Twitter Card、canonical、`robots.txt`、`@astrojs/sitemap`、`404.astro`。**未做**：RSS（低优先级，可后续用 `@astrojs/rss`）。

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
第 1 批（正确性）：P0-1 remark-gfm、P0-2 日期格式、P0-3 去重图片 ✅ 已完成
第 2 批（性能）：  P1-4 图片压缩 ✅、P1-5 CSS 去重 ⚠️（sidebar 块遗留）、P1-6 真实链接 ✅
第 3 批（工程化）：P2-7 set:html 转义 ✅、P3-9/10 SEO 基础 ✅（RSS 待定）
第 4 批（收尾）：  P5 依赖升级、文档更新、提交
```

每批完成后：更新本文件与 `build/changelog.md` → `npm run build` 验证 → 提交。

## 四、变更日志

详见 `build/changelog.md`（每次优化追加一条）。
