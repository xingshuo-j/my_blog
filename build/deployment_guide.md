# 部署注意事项（Deployment Guide）

> 项目：xing's blog · 更新：2026-07-28

## 1. 构建

```bash
npm ci            # CI/部署环境用 ci 而非 install，保证与 lock 一致
npm run build     # 产物输出到 dist/
npm run preview   # 本地验证构建产物
```

- Node 版本要求：**≥ 22.12.0**（package.json `engines`）
- 产物目录：`dist/`（纯静态 HTML/CSS/JS/图片）

## 2. 部署目标

任意静态托管均可：Nginx、GitHub Pages、Cloudflare Pages、Vercel、Netlify。

### Nginx 参考配置

```nginx
server {
    listen 443 ssl;
    server_name your-domain.com;
    root /var/www/my_blog/dist;
    index index.html;

    # 安全头（见 build/security_audit.md 第 4 节）
    add_header X-Content-Type-Options nosniff always;
    add_header Referrer-Policy strict-origin-when-cross-origin always;
    add_header X-Frame-Options DENY always;

    # 带 hash 的构建产物长缓存
    location /_astro/ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # 图片等静态资源
    location ~* \.(jpg|jpeg|png|webp|svg|ico|gif)$ {
        expires 30d;
        add_header Cache-Control "public";
    }

    # HTML 不缓存或短缓存，保证内容更新及时
    location ~* \.html$ {
        add_header Cache-Control "no-cache";
    }

    gzip on;
    gzip_types text/css application/javascript image/svg+xml;
}
```

## 3. 环境变量

- 当前项目**无运行时环境变量**；`.env` 已被 `.gitignore` 排除。
- 若后续引入（如统计脚本 ID、API 地址）：
  - Astro 中以 `PUBLIC_` 前缀暴露给客户端：`PUBLIC_ANALYTICS_ID`
  - 代码中读取：`import.meta.env.PUBLIC_ANALYTICS_ID`
  - **切勿**将密钥放入 `PUBLIC_` 变量（会打进客户端产物）

## 4. 站点配置

- [x] ✅ `astro.config.mjs` 已配置 `site` + `@astrojs/sitemap`（2026-07-28），自动生成 `sitemap-index.xml`、`robots.txt`、canonical 与 OG 绝对 URL
- [ ] ⚠️ **部署前必做**：将 `astro.config.mjs` 和 `public/robots.txt` 中的 `https://YOUR-DOMAIN.example` 替换为真实域名，否则 sitemap/canonical 会指向错误地址
- [ ] 部署后验证 HTTPS 与 HSTS
- [ ] 友邻外链 `http://` → `https://`（目标站支持时）

## 5. 发布检查清单

1. `npm run build` 本地构建通过
2. `npm run preview` 抽查：首页各分区切换、文章覆层、每日一图、移动端侧边栏
3. `du -sh dist/` 记录产物体积（写入 changelog）
4. git 提交并推送（提交信息格式见下）
5. 部署后 `curl -sI https://<域名>/` 确认安全头与缓存头
6. 抽查线上页面渲染与图片加载

## 6. 提交规范（持续优化流程）

- 提交信息格式：`optimize: [YYYY-MM-DD] - [优化内容简述]`
- 功能/内容提交使用：`feat:` / `content:` / `fix:` 前缀
- 每次优化后同步更新 `build/` 下对应文档与 `build/changelog.md`

## 7. 回滚

- 静态站点回滚 = 重新部署上一个 git 提交的 `dist/`：
  ```bash
  git checkout <上一个正常提交>
  npm ci && npm run build
  # 部署 dist/
  git checkout main
  ```
