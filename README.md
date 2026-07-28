# xing's blog

xing 的个人博客 —— 一个用 [Astro](https://astro.build/) 构建的纯静态站点，侧边栏分区导航，卡片式浏览文章，气泡框记录日常碎碎念，每日按日期自动切换一图。

线上访问：**<https://www.xinglin.info>**

## 项目简介

这是一个无后端、无数据库、无用户输入的纯静态博客。所有内容都是本地 Markdown 文件，由 Astro 在构建期通过 `import.meta.glob` 扫描并生成 HTML。站点分为五个分区：

- **xing 的碎碎念** —— 轻量短文，暖色玻璃气泡框居中展示
- **学习杂记** —— 技术文章，卡片列表，点击以全屏覆层阅读
- **闲鱼生存日记** —— 生活记录
- **杂言小计** —— 杂项
- **每日一图** —— 按日期种子每天选一张图，午夜自动切换

## 技术栈

| 类别 | 选型 |
|------|------|
| 框架 | [Astro 7](https://astro.build/)（静态站点生成） |
| 语言 | TypeScript / Markdown |
| 内容 | 本地 `.md` 文件 + `import.meta.glob` 扫描 + `[...slug].astro` 动态路由 |
| 样式 | 单一原生 CSS（`style/base.css`），OKLCH 设计令牌 + 4pt 间距系统 |
| 字体 | Fraunces（展示）+ Inter（正文）via Google Fonts；中文回退至 PingFang SC / Microsoft YaHei |
| SEO | `@astrojs/sitemap`、canonical、OG / Twitter meta、`robots.txt`、404 页 |
| 部署 | Cloudflare → 阿里云域名 `xinglin.info`（Vercel 内网穿透） |

无构建框架依赖：不使用 Tailwind / React / Vue，产物为纯静态 HTML + CSS。

## 本地运行

需要 Node.js ≥ 22.12。

```bash
npm install        # 安装依赖
npm run dev        # 本地开发服务器（默认 http://localhost:4321）
npm run build      # 构建到 dist/（纯静态）
npm run preview    # 预览构建产物
```

## 访问方式

- **本地**：`npm run dev` 后打开终端提示的本地地址（默认 `http://localhost:4321`）
- **线上**：<https://www.xinglin.info>（正式域名，已配置 sitemap / canonical / OG）

## 新增内容

所有内容通过创建 `.md` 文件添加，`import.meta.glob` 自动扫描、`[...slug].astro` 自动生成详情页。

### xing 的碎碎念

在 `src/small_talk/` 下新建 `.md`：

```md
---
date: "2026-07-10 20:00"
---

吐槽内容，支持 Markdown 语法（**加粗**、*斜体*、~~删除线~~、`代码`、[链接](url)）
```

### 学习杂记 / 闲鱼生存日记 / 杂言小计

分别在 `src/learn/`、`src/life/`、`src/oth/` 下新建 `.md`：

```md
---
title: Git 常用命令备忘
category: 开发工具
date: "2026-07-15"
slug: git-tips
excerpt: 一些常用的 Git 命令，方便随时查阅。
---

# 文章标题

正文内容……
```

| 字段 | 必填 | 说明 |
|------|------|------|
| `title` | 是 | 文章标题 |
| `category` | 是 | 分类标签 |
| `date` | 是 | 日期，必须**加引号**（`"2026-07-15"` 或 `"2026-07-15 21:15"`），按此排序 |
| `slug` | 是 | URL 标识，地址 `/{分区}/{slug}` |
| `excerpt` | 是 | 卡片摘要 |

### 每日一图

将图片放入 `src/image/`（jpg / png / webp / svg），系统每天按日期种子选取一张展示，午夜自动切换。文件名请使用 `daily-*.webp` 语义化命名。

## 命令

| 命令 | 说明 |
|------|------|
| `npm run dev` | 本地开发服务器 |
| `npm run build` | 构建到 `dist/` |
| `npm run preview` | 预览构建结果 |

## 项目结构

```
/
├── src/
│   ├── pages/           # 页面路由
│   │   ├── index.astro            # 首页（侧边栏 + 全部分区）
│   │   ├── learn.astro            # 学习杂记 列表
│   │   ├── learn/[...slug].astro  # 学习杂记 详情
│   │   ├── life/[...slug].astro   # 闲鱼生存日记 详情
│   │   ├── oth/[...slug].astro    # 杂言小计 详情
│   │   └── 404.astro
│   ├── small_talk/      # 碎碎念 短文
│   ├── learn/           # 学习杂记 文章
│   ├── life/            # 闲鱼生存日记
│   ├── oth/             # 杂言小计
│   ├── image/           # 每日一图 图库
│   ├── components/ArticleCard.astro
│   ├── layouts/         # MainLayout / ArticleLayout
│   └── utils/content.ts # 日期解析与排序
├── public/              # 静态资源（favicon、友邻头像）
├── style/base.css       # 全站样式与设计令牌
├── astro.config.mjs
└── package.json
```
