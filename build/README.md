# 优化工作交接说明（README）

> 本目录是博客持续优化的**唯一事实来源**。无论是新对话、新协作者还是未来的自己，从这里开始。

## 如果你是 AI 助手 / 新协作者，请按顺序阅读

1. **`optimization_plan.md`** — 全部优化任务（P0~P5 分级），每项带状态标记：
   - ✅ 已完成 · ⚠️ 部分完成/有遗留 · 无标记 = 待做
   - 文件末尾"执行顺序建议"标明当前进行到第几批
2. **`changelog.md`** — 每次优化的变更记录（最新在上方），每条含"下一步"
3. `performance_checklist.md` — 性能清单与度量基准（改性能前后必读）
4. `security_audit.md` — 安全检查项（改部署/引入依赖前必读）
5. `deployment_guide.md` — 构建、Nginx 配置、发布检查清单

## 工作流程（每次优化必须遵守）

1. 从 `optimization_plan.md` 选取当前批次的待办项
2. 实施优化，`npm run build` 验证通过
3. 更新本目录对应文档（勾选状态、度量数据）
4. 在 `changelog.md` 顶部追加一条记录（含"下一步"）
5. git 提交并推送，提交信息格式：

   ```
   optimize: [YYYY-MM-DD] - [优化内容简述]
   ```

   （功能/内容提交用 `feat:` / `content:` / `fix:` 前缀）
6. **推送远端仓库**：每次改动后必须 `git push origin main`，并在 `changelog.md` 该条记录的「变更内容」中**注明本次做了什么改动**（改了哪些文件、改了什么）。本地未推送的改动不算完成。

## 当前进度快照（2026-07-28 更新）

| 批次 | 状态 |
|------|------|
| 第 1 批 P0 正确性 | ✅ 完成（日期修复、GFM 删除线、重复图片） |
| 第 2 批 P1 性能 | ⚠️ 基本完成（图片压缩✅、真实链接✅、CSS 去重剩 sidebar 块遗留 P1-5b） |
| 第 3 批 P2/P3 工程化 | ✅ 完成（set:html 转义、site 配置 https://www.xinglin.info、sitemap、meta description/OG、canonical、robots.txt、404 页） |
| 第 4 批 P4/P5 收尾 | ✅ 完成（ArticleCard 组件抽取、侧边栏 ARIA 可访问性、死代码清理、astro 7.0.7→7.1.4、npm prune） |

**全部 P0~P5 通体完成，已绑定正式域名 `https://www.xinglin.info`**。剩余低优先级：P1-5b（sidebar 新旧 CSS 块人工合并 + 视觉回归）、RSS（`@astrojs/rss`）。

## 禁区 / 不要做（踩过的坑）

- **不要给 `astro.config.mjs` 加 `remarkPlugins`**：Astro 7 默认用 Satteri 处理器，已内置 GFM（`~~删除线~~` 原生渲染为 `<del>`）。配 `remarkPlugins` 会触发 `@astrojs/markdown-remark` 缺失错误。早期因此误装过 `remark-gfm`，已卸载。
- **不要改 `site` 配置里的域名**：`https://www.xinglin.info` 是正式线上域名（Vercel 穿透 → Cloudflare → 阿里云重定向至此）。动它会让 sitemap/canonical/OG 全错。
- **不要 `npm audit fix` / `npm audit fix --force`**：当前 5 项 sharp/libvips CVE 由 `@astrojs/sitemap` 间接带入，仅在处理恶意图片时触发；本项目纯静态、不接受外部图片上传，风险极低。强升会大改依赖树。详见 `security_audit.md`。
- **不要碰 `style/base.css` 的两处 `.sidebar` 规则块**（约第 147 行 与第 312 行）：它们是新旧两版样式互相覆盖后的最终态，必须人工算清属性 + 视觉回归才能合并（P1-5b 待办）。盲改会破坏侧边栏布局。
- **不要恢复内联 `onclick=`**：侧边栏菜单已改为事件委托 + ARIA；模板里 `<li>` 用 `data-section` 驱动。新增交互项也走事件委托。
- **frontmatter 日期必须加引号**：`date: 2026-07-10` 会被 YAML 解析成 Date 对象，页面显示成 `2026-07-10T00:00:00.000Z`；`date:2026-07-10 21:15`（冒号后无空格）会让日期完全不渲染。正确写法：`date: "2026-07-10 21:15"`。日期解析走 `src/utils/content.ts` 的 `parseDate`。
- **不要删 `src/image/` 下的 `daily-*.webp`**：每日一图由 `import.meta.glob` 扫描这些文件，文件名是语义化的，缺失会让每日一图区为空。
- **不要把 `dist/` 或 `node_modules/` 提交进 git**（已 `.gitignore`）。

## 项目速览

纯前端 Astro 7 静态博客（无后端/数据库）。内容 = 本地 Markdown（`src/{learn,life,oth,small_talk}/`），`import.meta.glob` 扫描 + `[...slug].astro` 动态路由。样式集中在 `style/base.css`。构建 `npm run build` → `dist/`（纯静态，任意托管可部署）。内容新增方式见根目录 `README.md`。
