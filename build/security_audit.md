# 安全检查项（Security Audit）

> 项目：xing's blog · 审计日期：2026-07-28
> 项目性质：纯静态站点（无后端、无数据库、无用户输入），攻击面较小，主要风险为 XSS 与供应链。
> 图例：❌ 待处理 · ⚠️ 低风险/待加固 · ✅ 安全

## 1. XSS（跨站脚本）

| 项 | 状态 | 说明 |
|----|------|------|
| `set:html` 注入图片 URL JSON | ⚠️ | `MainLayout.astro` 中 `<script set:html={JSON.stringify(imageUrls)}>`。URL 由构建期生成风险低，但若文件名含 `</script>` 可逃逸。加固：序列化时将 `<` → `\u003c` |
| 客户端 `innerHTML.replace` 渲染 `~~del~~` | ⚠️ | 内容来自仓库内自己的 Markdown，风险低。启用 remark-gfm 后应删除此 hack，彻底消除 innerHTML 写入 |
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
| 依赖数量 | ✅ | 仅 2 个直接依赖（astro、remark-gfm），攻击面小 |
| `npm audit` | 待运行 | 每次升级依赖后执行 `npm audit` |
| extraneous 包 | ⚠️ | node_modules 中有 `@emnapi/*`、`tslib` 等未声明包 → `npm prune` 清理 |
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
