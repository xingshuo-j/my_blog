# xing's blog

基于 [Astro](https://astro.build/) 构建的个人博客，侧边栏分区展示，卡片阅读文章，气泡框记录碎碎念。

## 项目结构

```
/
├── src/
│   ├── pages/           # 页面路由
│   │   ├── index.astro            # 首页（侧边栏 + 全部分区）
│   │   ├── learn.astro            # 学习杂记 列表
│   │   ├── learn/[...slug].astro  # 学习杂记 详情（动态路由）
│   │   ├── life/[...slug].astro   # 闲鱼生存日记 详情（动态路由）
│   │   └── oth/[...slug].astro    # 杂言小计 详情（动态路由）
│   ├── small_talk/      # xing的碎碎念 短文
│   ├── learn/           # 学习杂记 文章
│   ├── life/            # 闲鱼生存日记 记录
│   ├── oth/             # 杂言小计 杂项
│   ├── image/           # 每日一图 图库
│   └── layouts/         # 布局组件
├── public/              # 静态资源（favicon 等）
├── style/               # CSS 样式
└── package.json
```

## 构建

```bash
npm install
npm run build       # 产物在 dist/
```

## 新增内容

所有内容通过创建 `.md` 文件添加。`import.meta.glob` 自动扫描，`[...slug].astro` 动态路由自动生成详情页。

### xing的碎碎念

轻量吐槽，暖黄色毛玻璃气泡框居中显示。

在 `src/small_talk/` 下新建 `.md`：

```md
---
date: 2026-07-10 20:00
---

吐槽内容，支持 Markdown 语法（**加粗**、*斜体*、~~删除线~~、`代码`、[链接](url)）
```

气泡框采用统一暖黄色毛玻璃效果（`backdrop-filter: blur` + 半透明暖色底），无需额外配置样式参数。

### 学习杂记

技术文章，卡片列表展示，点击通过全屏覆层阅读。

在 `src/learn/` 下新建 `.md`：

```md
---
title: Git 常用命令备忘
category: 开发工具
date: 2026-07-15
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
| `date` | 是 | 日期，按此排序 |
| `slug` | 是 | URL 标识，地址 `/learn/{slug}` |
| `excerpt` | 是 | 卡片摘要 |

### 闲鱼生存日记 & 杂言小计

分别在 `src/life/` 和 `src/oth/` 下新建 `.md`，frontmatter 同上，URL 为 `/life/{slug}` 和 `/oth/{slug}`。

### 每日一图

将图片放入 `src/image/`（jpg / png / webp / svg），系统每天按日期种子选取一张展示，午夜自动切换。

## 命令

| 命令 | 说明 |
|------|------|
| `npm run build` | 构建到 `dist/` |
| `npm run dev` | 本地开发 |
| `npm run preview` | 预览构建结果 |
