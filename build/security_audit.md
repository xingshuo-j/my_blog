# 安全检查项（Security Audit）

> 项目：xing's blog · 审计日期：2026-07-28
> 项目性质：纯静态站点（无后端、无数据库、无用户输入），攻击面较小，主要风险为 XSS 与供应链。
> 图例：❌ 待处理 · ⚠️ 低风险/待加固 · ✅ 安全

## 1. XSS（跨站脚本）

| 项 | 状态 | 说明 |
|----|------|------|
| `set:html` 注入图片 URL JSON | ✅ | 已加固（2026-07-28）：`JSON.stringify(...).replace(/</g, '\\u003c')`，文件名含 `</script>` 亦无法逃逸 |
| 客户端 `innerHTML.replace` 渲染 `~~del~~` | ✅ | 已删除（2026-07-28）：Astro 7 Satteri 处理器构建期原生渲染 GFM 删除线，该 innerHTML 写入点已消除 |
| 文章覆层 `ct.innerHTML = a.innerHTML` | ⚠️ | fetch 同源静态页面再注入，低风险。保持仅同源路径 |
| Astro 模板默认转义 | ✅ | `{entry.frontmatter.title}` 等表达式输出自动转义 |
| 外链 `target="_blank"` | ✅ | 均已加 `rel="noopener noreferrer"` |

## 2. 注入类（SQL/命令注入）

- ✅ 不适用：无数据库、无服务端代码、无 shell 调用。

## 3. 认证与会话

- ✅ 不适用：无登录、无 Cookie、无会话。

## 4. HTTP 安全头（部署侧配置）

- [ ] ❌ `Content-Security-Policy`（注意：当前大量内联脚本与 `onclick=`，需先改造或配合 `unsafe-inline` 逐步收紧）
- [ ] ❌ `X-Content-Type-Options: nosniff`
- [ ] ❌ `Referrer-Policy: strict-origin-when-cross-origin`
- [ ] ❌ `X-Frame-Options: DENY`（或 CSP `frame-ancestors 'none'`）
- [ ] ❌ HTTPS 强制（HSTS）— 由托管平台/证书配置

## 5. 依赖与供应链

| 项 | 状态 | 说明 |
|----|------|------|
| 依赖数量 | ✅ | 直接依赖 astro + @astrojs/sitemap（2026-07-28 已卸载无用的 remark-gfm），攻击面小 |
| `npm audit` | ⚠️ | 2026-07-28 随 @astrojs/sitemap 带入 sharp/libvips，报 sharp/libvips CVE（处理恶意图片时触发）。本项目纯静态、不接受外部图片上传，风险极低；暂不 `npm audit fix` 以免依赖大改，若未来引入用户上传需立即修复。每次升级依赖后须重跑 `npm audit` |
| extraneous 包 | ✅ | `npm ls --depth=0` 报的 6 个 extraneous（`@emnapi/*`、`@napi-rs/*`、`tslib`）实为 sharp 的可选原生传递依赖、被实际加载，非冗余；`npm prune` 已执行，确认不应删除 |
| lock 文件 | ✅ | `package-lock.json` 已提交，保证可复现安装 |
| 依赖版本固定 | ⚠️ | 使用 `^` 范围，建议关键依赖定期审查更新 |

## 6. 敏感信息

- [x] ✅ `.env`、`.env.production` 已在 `.gitignore`
- [x] ✅ 仓库内未发现密钥/token（人工扫描）
- [ ] 每次提交前：确认无个人信息（手机号、身份证、内网地址）进入文章内容

## 7. 内容与合规

- [ ] 友邻外链目标站点可信性定期确认（`http://` 链接建议改 `https://`，目标站支持的话）
- [ ] 图片来源（微信导出图）确认无隐私信息（EXIF 已随压缩清除——待图片压缩流程落地）

## 每次发布前检查

1. `npm audit` 无高危漏洞
2. 全站 grep 确认无新增 `set:html` / `innerHTML` 使用点
3. 确认安全头在部署平台生效：`curl -sI https://<域名>/`
