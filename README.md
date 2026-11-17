# Bolin Lab

Bolin 的个人学习资料站，公开记录 Android、Linux、Binder、Framework 与 Native 开发的学习过程。

面向 Android 系统开发、Framework / Native / Kernel 方向；AIDL 只作为进入 Binder 协议的入口。

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
│   ├── binder-chapter-0.html        # 第 0 章：Binder 预备知识
│   ├── binder-chapter-1.html        # 第 1 章：为什么需要 Binder
│   ├── binder-chapter-2.html        # 第 2 章：Binder 的心智模型
│   ├── binder-chapter-3.html        # 第 3 章：第一个 AIDL（系统源码 + 真机）
│   ├── binder-chapter-4.html        # 第 4 章：系统服务里的 AIDL（源码 + 真机）
│   └── binder-driver.html           # Binder 驱动数据结构交互图解
├── assets/
│   ├── css/site.css                 # 站点样式
│   ├── js/site.js                   # 主题、筛选、目录、进度条、代码块
│   ├── vendor/prism/                # 本地 Prism 1.30.0（按需加载）
│   ├── img/                         # 文章静态示意图（SVG，明/暗两套）
│   └── og-image.png                 # 1200×630 社交分享图
├── avatar.png
├── 404.html
├── robots.txt
├── sitemap.xml
├── _headers                         # Cloudflare Pages 安全 / 缓存头
├── _redirects                       # Google 验证文件的精确 200 响应
├── google85aa571083e49c47.html      # Google Search Console 验证文件
├── google85aa571083e49c47.txt
├── README.md
├── AGENTS.md                        # 给 AI 助手的项目上下文 / 交接说明
└── CHANGELOG.md                     # 每次开发完成后的记录
```

`notes/binder-driver.html` 是一份自包含的交互长文，使用独立的内联样式和脚本，方便单独分享。

> Cloudflare Pages 默认启用 pretty URLs：访问 `*.html` 会 308 到无扩展名地址。页面里的本地链接保留 `.html` 方便本地预览，canonical / sitemap 使用线上最终地址（无 `.html`）。

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
4. 补充 canonical、分享信息和 `sitemap.xml`。
5. 本地检查桌面 / 手机布局和控制台错误。
6. 在 `CHANGELOG.md` 追加本次记录。
7. 提交并推送到 `main`。

## 写作与验证约定

新文章必须有源码或真机证据，不写“你应该看到类似日志”：

1. 源码引用写清楚文件、函数和行号；代码块使用 `data-file` / `data-lang`。
2. 终端输出必须是真机原始记录，保留命令和输出；不能确认的内容标“未实测”。
3. 调用链 / 时序图优先使用 `.flow-diagram`、`.seq-diagram` 等 CSS 组件。
4. 复杂结构图可以用 `assets/img/` 下的静态 SVG（明 / 暗两套），并配 `figure` / `figcaption`。
5. 文章开头放验证环境（Android 版本、AOSP 版本、样本、验证方式、日期）。
6. 完成后同步更新笔记库、学习路线、sitemap 和 `CHANGELOG.md`。

修改 `assets/css/site.css` 或 `assets/js/site.js` 后，记得同步更新所有页面引用里的
`?v=...` 版本号，避免 Cloudflare 缓存旧资源。

## AI 开发交接

这个仓库是使用 AI 辅助开发的，根目录保留了两份关键上下文：

- **`AGENTS.md`**：项目结构、设计约定、部署流程、当前状态和 AI 启动提示。
- **`CHANGELOG.md`**：按日期记录每次开发的目标、改动、验证和 commit。

换 AI 或重开会话时，可以直接说：

> 先读仓库根目录的 `AGENTS.md` 和 `CHANGELOG.md`，再执行 `git log -5`，
> 了解当前状态后开始修改。完成后更新 CHANGELOG 并提交推送。

每次开发结束都要 commit + push；Cloudflare Pages 会保留对应部署记录。

## 待补充

- 增加 RSS / Atom 订阅。
- 把学习路线中的“计划中”内容逐步补成正式笔记。
- 如需更完整的分享预览，可继续为每篇长文生成独立 OG 封面。
