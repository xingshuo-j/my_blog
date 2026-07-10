# xing's blog

基于 [Astro](https://astro.build/) 构建的个人博客，侧边栏分区展示，点击卡片阅读文章。

## 项目结构

```
/
├── src/
│   ├── pages/           # 页面路由（.astro + 动态路由 [...slug].astro）
│   │   ├── index.astro          # 首页（侧边栏 + 全部分区）
│   │   ├── learn.astro          # 学习杂记列表
│   │   ├── learn/[...slug].astro # 学习杂记文章详情（动态）
│   │   ├── life/[...slug].astro  # 闲鱼生存日记文章详情（动态）
│   │   └── oth/[...slug].astro   # 杂言小计文章详情（动态）
│   ├── small_talk/      # xing的碎碎念 — 泡泡框短文
│   ├── learn/           # 学习杂记 — 技术文章
│   ├── life/            # 闲鱼生存日记 — 日常记录
│   ├── oth/             # 杂言小计 — 杂项
│   ├── image/           # 每日一图图库
│   └── layouts/         # 布局组件
├── public/              # 静态资源（favicon, 背景图等）
├── style/               # CSS 样式文件
└── package.json
```

## 部署

```bash
npm install
npm run build       # 产物在 dist/
npm run dev         # 开发服务器 localhost:4321
```

## 新增博客

所有内容通过创建 `.md` 文件添加，无需写入 HTML 或 JavaScript。`import.meta.glob` 自动扫描目录，`[...slug].astro` 动态路由自动生成文章详情页。

### xing的碎碎念

轻量级吐槽，以泡泡框样式居中显示。

```bash
# 1. 在 src/small_talk/ 下新建 .md 文件
```

**文件格式：**

```md
---
date: 2026-07-10 20:00
---

吐槽内容写在这里，支持多行。
```

可选的 `type` 字段控制泡泡框外观：

| type | 效果 |
|------|------|
| 不填 | 默认白色泡泡 |
| `highlight` | 暖色背景 |
| `thought` | 虚线边框 |
| `warning` | 浅橙色背景 |

```md
---
date: 2026-07-10 20:00
type: highlight
---

这条吐槽是高亮显示的！
```

### 学习杂记

技术文章，以卡片列表展示，点击覆层阅读全文。

```bash
# 1. 在 src/learn/ 下新建 .md 文件
```

**文件格式：**

```md
---
title: Git 常用命令备忘
category: 开发工具
date: 2026-07-15
slug: git-tips
excerpt: 一些常用的 Git 命令，方便随时查阅。
---

# Git 常用命令备忘

## 撤销 commit

git reset --soft HEAD~1
```

**frontmatter 字段说明：**

| 字段 | 必填 | 说明 |
|------|------|------|
| `title` | 是 | 文章标题，显示在卡片和详情页 |
| `category` | 是 | 分类标签，显示在卡片左上角 |
| `date` | 是 | 日期，卡片底部显示，按此排序 |
| `slug` | 是 | URL 标识，文章地址为 `/learn/{slug}` |
| `excerpt` | 是 | 摘要，显示在卡片正文区域 |

### 闲鱼生存日记

日常记录，与学习杂记相同的卡片展示方式。

```bash
# 1. 在 src/life/ 下新建 .md 文件
```

frontmatter 格式与学习杂记一致，文章的 URL 为 `/life/{slug}`。

### 杂言小计

零散记录，同样是卡片展示方式。

```bash
# 1. 在 src/oth/ 下新建 .md 文件
```

frontmatter 格式与学习杂记一致，文章的 URL 为 `/oth/{slug}`。

### 每日一图

在 `src/image/` 中放入图片（支持 jpg, jpeg, png, webp, gif, svg），系统每天午夜自动从图片池中选定当天的图片展示。

```bash
cp ~/Pictures/photo.jpg src/image/
npm run build
```

无需额外配置，图片会自动被 `import.meta.glob` 扫描到。

## 命令

| 命令 | 说明 |
|------|------|
| `npm run build` | 构建生产版本到 `dist/` |
| `npm run dev` | 本地开发（可选） |
| `npm run preview` | 预览 `dist/` 构建结果 |
