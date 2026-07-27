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

## 当前进度快照（2026-07-28 更新）

| 批次 | 状态 |
|------|------|
| 第 1 批 P0 正确性 | ✅ 完成（日期修复、GFM 删除线、重复图片） |
| 第 2 批 P1 性能 | ⚠️ 基本完成（图片压缩✅、真实链接✅、CSS 去重剩 sidebar 块遗留 P1-5b） |
| 第 3 批 P2/P3 工程化 | ✅ 完成（set:html 转义、site 配置、sitemap、meta description/OG、canonical、robots.txt、404 页）⚠️ 占位域名待替换 |
| 第 4 批 P4/P5 收尾 | ⬜ 待做：组件抽取 ArticleCard、侧边栏键盘可访问性、死代码清理、astro 升级 7.1.4、npm prune |

**下一件事**：第 4 批 P4/P5（可维护性 + 依赖），详见 `optimization_plan.md` 第 11~17 项。部署前务必把 `https://YOUR-DOMAIN.example` 改成真实域名。

## 项目速览

纯前端 Astro 7 静态博客（无后端/数据库）。内容 = 本地 Markdown（`src/{learn,life,oth,small_talk}/`），`import.meta.glob` 扫描 + `[...slug].astro` 动态路由。样式集中在 `style/base.css`。构建 `npm run build` → `dist/`（纯静态，任意托管可部署）。内容新增方式见根目录 `README.md`。
