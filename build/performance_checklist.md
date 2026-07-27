# 性能检查清单（Performance Checklist）

> 项目：xing's blog · 更新：2026-07-28
> 图例：❌ 待优化 · ⚠️ 部分达成 · ✅ 已达成

## 1. 资源体积

- [ ] ❌ 图片压缩：`src/image/` 下 11 张 JPG 共 ~5MB，最大单张 900K，未压缩、未转 WebP/AVIF
- [ ] ❌ 图片尺寸：每日一图直接加载原图，无响应式多尺寸（`srcset`/`sizes`）
- [ ] ⚠️ 图片懒加载：友邻头像已加 `loading="lazy"`，每日一图未加
- [ ] ❌ 重复资源：`background_windows.jpg` 在 `public/` 与 `src/image/` 各存一份（各 832K）
- [ ] ❌ 图片命名：`Weixin Image_20260711000749_9_80.jpg` 含空格与无意义命名

## 2. CSS

- [ ] ❌ 重复定义：`.daily-view-init` 系列在 `base.css` 中出现 3 次（约第 382 / 852 / 1144 行）
- [ ] ⚠️ 单一全局 CSS（1266 行）全页面加载；静态博客体量下可接受，后续可按需拆分
- [x] ✅ 动画使用 `transform`/`opacity`（GPU 友好）
- [x] ✅ 使用 CSS 变量，便于主题维护

## 3. JavaScript

- [x] ✅ 无重型前端框架，仅少量内联原生 JS（IIFE 隔离作用域）
- [ ] ❌ 客户端 `innerHTML.replace` hack 渲染删除线（应改用 remark-gfm 构建期渲染后删除）
- [ ] ❌ 文章覆层 fetch 整页 HTML 再 DOMParser 解析；可考虑只渲染正文片段（低优先级）
- [x] ✅ 滚动监听使用 `{ passive: true }`

## 4. 页面与加载

- [ ] ❌ 卡片链接 `javascript:void(0)`：无 JS 不可用、搜索引擎不可爬取 → 改真实链接 + 渐进增强
- [ ] ❌ 无资源预加载：首屏关键图（每日一图/背景）未 `preload`
- [x] ✅ 纯静态 SSG，无运行时服务端开销
- [x] ✅ favicon 提供 svg + ico 双格式

## 5. 缓存与部署（部署侧确认）

- [ ] ❌ 静态资源长缓存策略（`dist/_astro/` 带 hash 文件可 `immutable` 缓存 1 年）
- [ ] ❌ 未确认是否启用 gzip/brotli 压缩（取决于托管平台）
- [ ] ❌ 未配置 CDN

## 6. 度量基准（优化前记录）

| 指标 | 当前值 | 目标 |
|------|--------|------|
| `src/image/` 总体积 | ~5.0 MB | < 1.5 MB |
| 单张最大图 | 900 KB | < 300 KB |
| 全局 CSS 行数 | 1266（含重复） | 去重后 ≈1100 |
| Lighthouse Performance | 未测 | ≥ 95 |

## 每次优化后必做

1. `npm run build` 确认构建通过
2. 对比 `dist/` 体积：`du -sh dist/`
3. 更新本清单勾选状态与度量表
4. 在 `build/changelog.md` 追加记录
