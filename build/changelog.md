# 优化变更日志（Changelog）

> 记录每次优化的变更内容。最新记录在最上方。

## 2026-07-28 — P2/P3 批次：安全加固与 SEO 基础

**类型**：安全 + SEO（P2/P3）

**变更内容**：
1. **set:html 转义（安全）**：`MainLayout.astro` 的图片 URL JSON 注入改为 `JSON.stringify(...).replace(/</g, '\u003c')`，消除 `</script>` 逃逸风险
2. **SEO 基础设施**：
   - `astro.config.mjs` 增加 `site` 配置（当前占位 `https://YOUR-DOMAIN.example`，**部署前须替换为真实域名**）
   - 安装并接入 `@astrojs/sitemap`，构建生成 `sitemap-index.xml` / `sitemap-0.xml`
   - `public/robots.txt` 增加并声明 sitemap
   - `MainLayout`/`ArticleLayout` 增加 `<meta name="description">`、canonical、Open Graph、Twitter Card（文章页 description 自动取自 frontmatter `excerpt`）
   - 新增 `src/pages/404.astro` 友好 404 页

**构建验证**：`npm run build` 通过（5 页面 + sitemap）；preview 抽查 404/robots/sitemap 均 200；文章页 description 取自 excerpt 正确

**遗状**：
- `npm audit` 报 sharp/libvips 5 项 CVE（随 sitemap 进入的图片处理转依赖；静态站不接受外部图片，风险极低，已记入 `security_audit.md`）
- RSS 未做（低优先级，后续可用 `@astrojs/rss`）

**下一步**：P4/P5 批次（组件抽取 ArticleCard、侧边栏键盘可访问性、死代码清理、astro 升级 7.1.4、npm prune）

---

## 2026-07-28 — P1 批次：性能优化

**类型**：性能（P1）

**变更内容**：
1. **图片压缩（最大收益）**：
   - `src/image/` 9 张 JPG（4.2MB，最大 900K）→ WebP q80、最大边 1920px、去 EXIF（1.3MB，最大 360K）；重命名 `Weixin Image_*.jpg` → `daily-NN.webp`
   - 友邻头像 `public/friends/` 316K → WebP 85K，同步更新 index.astro 引用并修复空 `alt`
2. **CSS 去重**：删除 312–599 行完全重复区块（与 782–1045 逐字节相同 + 媒体查询被后版覆盖）；合并第三处 daily 覆盖规则与 `.small-talk-wrapper` 重复声明；1266 → 954 行。遗留：`.sidebar` 新旧版本块纠缠（P1-5b，需视觉回归）
3. **卡片链接渐进增强**：4 处 `href="javascript:void(0)" + onclick` → 真实 href；MainLayout 加事件委托拦截点击（保留中键/Ctrl 新标签）；SEO 可爬取、无 JS 可用

**构建验证**：`npm run build` 通过；preview 抽查首页/文章页/头像 200；产物 CSS 中 `.daily-view-init` 8处→3处、`max-height:65vh` 死规则清除；`dist/` **5.2MB → 2.5MB**

**下一步**：P2/P3 批次（set:html 转义、site 配置 + sitemap、meta description、404 页面）

---

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
