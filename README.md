# Bolin Lab

Bolin 的个人学习资料站，公开记录 Android、Linux、Binder、Framework 与 Native 开发的学习过程。

**线上地址：** <https://home.bolinlab.top/>

由 **Cloudflare Pages** 托管，推送到 `main` 后自动部署。

## 技术栈

- 纯静态 HTML / CSS / JavaScript
- 无构建步骤、无外部 CDN 依赖
- 支持浅色 / 深色主题（localStorage 记忆）
- 响应式布局

## 目录

```text
.
├── index.html                       # 首页
├── about/
│   └── index.html                   # 关于
├── notes/
│   ├── index.html                   # 笔记库（搜索 / 标签筛选）
│   ├── binder-learning-path.html    # Binder 学习路线
│   └── binder-driver.html           # Binder 驱动数据结构交互图解
├── assets/
│   ├── css/site.css                 # 站点样式
│   ├── js/site.js                   # 主题、筛选、目录、进度条
│   └── og-image.png                 # 1200×630 社交分享图
├── avatar.png
├── 404.html
├── robots.txt
├── sitemap.xml
└── _headers                         # Cloudflare Pages 安全 / 缓存头
```

`notes/binder-driver.html` 是一份自包含的交互长文，使用独立的内联样式和脚本，方便单独分享。

## 本地预览

在仓库根目录启动一个静态服务器即可：

```bash
python -m http.server 8080
# 或
npx serve .
```

然后打开 <http://localhost:8080>。不要直接双击 `index.html` 来检查所有目录链接，静态服务器更接近线上行为。

## 部署

Cloudflare Pages 配置建议：

- Framework preset：`None`
- Build command：留空
- Build output directory：`/`
- Production branch：`main`

仓库推送到 GitHub 后，Cloudflare Pages 会自动构建和发布。

## 更新笔记

1. 在 `notes/` 下新增 HTML 页面。
2. 在 `notes/index.html` 的笔记网格中加入卡片，并设置 `data-tags` / `data-search`。
3. 如果首页需要展示，在 `index.html` 中更新精选卡片或 `latest-note`。
4. 提交并推送到 `main`。

## 待补充

- 增加 RSS / Atom 订阅。
- 把学习路线中的“计划中”内容逐步补成正式笔记。
- 如需更完整的分享预览，可继续为每篇长文生成独立 OG 封面。
