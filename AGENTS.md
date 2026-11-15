# AGENTS.md — Bolin Lab 交接说明

> 这是给 AI 编程助手和新会话看的项目上下文。开始修改前请先读本文件、
> `CHANGELOG.md`、`README.md`，再看一眼 `git log -5`。

## 1. 项目概览

- **项目**：Bolin Lab，个人公开学习资料站
- **线上**：<https://home.bolinlab.top/>
- **仓库**：<https://github.com/li2531719785/bolin-home>
- **部署**：Cloudflare Pages，`main` 分支自动部署
- **构建**：无。纯静态 HTML / CSS / JavaScript，输出目录为仓库根目录
- **作者**：Bolin
- **语言**：页面正文以中文为主，技术术语保留英文

站点用于记录 Android、Linux、Binder、Framework 和 Native 开发的学习笔记。
内容应真实、清楚、面向初学者，不写虚构经历或无法验证的结论。

## 2. 开始工作前

1. 读本文件。
2. 读 `CHANGELOG.md` 的最新记录。
3. 执行 `git status --short --branch`，确认工作区状态。
4. 查看相关页面和 `assets/css/site.css` / `assets/js/site.js`。
5. 不要删除根目录下任何 `google*.html` 验证文件，也不要删除 `_redirects` 中的验证规则。

## 3. 目录结构

```text
.
├── index.html                       # 首页
├── about/index.html                 # 关于
├── notes/index.html                 # 笔记库（搜索 / 标签筛选）
├── notes/binder-driver.html         # Binder 驱动数据结构交互长文（自包含）
├── notes/binder-learning-path.html  # Binder 学习路线
├── notes/binder-chapter-0.html      # Binder 学习路线第 0 章：预备知识
├── assets/
│   ├── css/site.css                 # 全站样式（含深色主题）
│   ├── js/site.js                   # 主题、筛选、TOC、阅读进度
│   └── og-image.png                 # 1200×630 社交分享图
├── avatar.png                       # 站点头像 / favicon
├── 404.html
├── robots.txt
├── sitemap.xml
├── _headers                         # Cloudflare 安全 / 缓存头
├── _redirects                       # Google 验证文件的精确 200 响应
├── google85aa571083e49c47.html      # Google Search Console 验证文件
├── google85aa571083e49c47.txt       # 上面文件的重写目标
├── README.md
├── AGENTS.md                        # 本文件
└── CHANGELOG.md                     # 开发记录
```

`notes/binder-driver.html` 是 175KB 左右的自包含页面，拥有独立样式和脚本。
除非任务明确要求，不要把它拆成站点公共样式，也不要重写其内部图表逻辑。

## 4. 设计系统与代码约定

### 视觉

- 主色：浅色主题蓝 `#2d55ff`，强调橙 `#d8532e`；深色主题使用同一套变量。
- 背景：暖纸色 `#f4f1e9`；深色背景 `#0b0d10`。
- 字体：系统无衬线字体 + 等宽字体，不依赖外部字体或 CDN。
- 卡片圆角较大，线条轻，使用细网格背景和少量渐变光晕。
- 动效克制：悬浮上移、箭头位移、主题切换；不使用重型动画库。

### 主题

- `site.css` 通过 `:root` 和 `[data-theme="dark"]` 定义变量。
- 每个页面 `<head>` 里有内联脚本，在首次绘制前读取 `localStorage.bolin-theme`，
  没有记录时跟随 `prefers-color-scheme`。
- `site.js` 的 `initTheme()` 负责切换按钮、`meta theme-color` 和持久化。
- 新增页面应复制现有页面的内联主题脚本，避免首屏闪烁。

### 交互

- `site.js` 是单文件原生 JS，无框架、无构建、无 npm 依赖。
- 笔记筛选：`initNotesFilter()`，依赖 `#noteSearch`、`[data-filter]`、
  `[data-note-card]`、`#notesEmpty`、`#noteCount`。
- 文章目录 / 阅读进度：`initArticle()`，依赖 `.article-body`、`#readingProgress`、
  `#articleToc`；自动为 `h2/h3` 生成目录。
- 内容默认可见，不要引入“滚动前隐藏全部内容”的 reveal 效果；之前已移除，
  避免整页截图、爬虫和无 JS 场景出现空白。

### 页面结构

- 所有页面共享同一套页头 / 页脚结构，使用相对路径，保证本地静态服务器和
  Cloudflare 都能访问。
- 响应式断点：`1060px`、`900px`、`640px`。
- 必须保留 `aria-label`、`aria-current`、跳转主内容的 skip link、焦点样式。

## 5. 内容约定

- 首页：`index.html`，包含个人卡片、精选笔记、学习方向、站点理念。
- 笔记库：`notes/index.html`，新增笔记时必须同步添加卡片和 `data-tags` /
  `data-search`，否则搜索和筛选找不到它。
- 笔记页：文章类页面使用 `.article-hero` + `.article-layout` + `.article-body`
  结构，自动生成 TOC 和阅读进度。
- 目前正式笔记有三篇：
  1. `notes/binder-driver.html` — Binder 驱动数据结构图解
  2. `notes/binder-learning-path.html` — Binder 学习路线
  3. `notes/binder-chapter-0.html` — 第 0 章：Binder 的预备知识
- 首页和笔记库里的统计数字（03 篇、04 个方向等）必须与真实内容一致。
- 不要把“计划中”的内容写成已完成；不确定的内容标注为整理中。
- 作者信息以仓库现有内容为准：Bolin、GitHub `li2531719785`、
  `2531719785@qq.com`。不要编造公司、学历或项目经历。

## 6. SEO / 线上地址

- 线上主域名：`https://home.bolinlab.top/`
- 每页必须有一个 `<link rel="canonical">`。
- Cloudflare Pages 的 pretty URLs 会把 `*.html` 308 重定向到无扩展名地址，
  因此 **canonical / sitemap / og:url 使用无 `.html` 的最终地址**：
  - 首页：`https://home.bolinlab.top/`
  - 笔记库：`https://home.bolinlab.top/notes/`
  - 关于：`https://home.bolinlab.top/about/`
  - Binder 图解：`https://home.bolinlab.top/notes/binder-driver`
  - Binder 路线：`https://home.bolinlab.top/notes/binder-learning-path`
  - Binder 第 0 章：`https://home.bolinlab.top/notes/binder-chapter-0`
- 页面内部链接仍可保留 `.html`，方便 `python -m http.server` 本地预览；
  线上会 308 跳转，功能正常。
- 新增页面后必须：
  1. 加 canonical / og:url；
  2. 把最终 URL 加入 `sitemap.xml`；
  3. 如果页面从首页或笔记库可达，更新对应卡片；
  4. 重新检查标题和 description。
- 社交分享图：`https://home.bolinlab.top/assets/og-image.png`（1200×630）。
- `robots.txt` 指向 sitemap；Cloudflare 会在边缘额外注入其托管的 robots 规则。

## 7. Google Search Console

- 已用 HTML 文件方式验证 `https://home.bolinlab.top/`。
- 验证文件：`google85aa571083e49c47.html`，内容必须保持：
  `google-site-verification: google85aa571083e49c47.html`
- Cloudflare 的 pretty URLs 会把 `.html` 验证路径 308 到无扩展名地址，
  Google 验证要求精确 200，因此 `_redirects` 里有一条 200 rewrite：
  `/google85aa571083e49c47.html → /google85aa571083e49c47.txt 200`
- 不要删除验证文件或这条 rewrite。
- GSC 已于 2026-11-15 成功读取 `https://home.bolinlab.top/sitemap.xml`，
  发现 5 个页面；页面索引仍在等待 Google 处理。
- AI 无法登录用户的 GSC；涉及验证、提交、索引操作时，给用户明确步骤，
  不要声称已代为操作。

## 8. 部署

1. 本地预览：

   ```bash
   python -m http.server 8123
   ```

   打开 <http://127.0.0.1:8123/>。

2. 修改后检查：
   - 首页、笔记库、关于页、两篇文章、404
   - 桌面宽度（1440）和手机宽度（390）无横向溢出
   - 控制台无 JS 错误
   - 主题切换、搜索、筛选、TOC 正常
   - 新增页面在 sitemap 中可访问
3. 提交并推送：

   ```bash
   git add -A
   git commit -m "type: short description"
   git push origin main
   ```

4. Cloudflare Pages 自动部署 `main`；部署记录在 Cloudflare 控制台。
5. 每次完成后更新 `CHANGELOG.md`；如果项目状态有变化，同步更新本文件的
   “当前状态”和“下一步”。

## 9. 当前状态（2026-11-15）

- 线上站点正常，HTTP 200，Cloudflare 安全头生效。
- 首页 / 笔记库 / 关于 / 404 / 三篇笔记全部可访问。
- 浅色 + 深色主题、移动端适配、搜索筛选、文章 TOC、阅读进度均已实现。
- GSC 验证成功；sitemap 已提交成功。新增第 0 章后 sitemap 现有 6 个 URL，
  等待 Google 重新抓取；GSC 上次读取为 5 个页面。
- 工作区干净，`main` 与 `origin/main` 同步。
- 最近关键提交：
  - `b5c2904` 固定 Google 验证文件的 200 路径
  - `83f440f` 添加 Google 验证文件
  - `f552f01` canonical 使用无 `.html` 最终地址
  - `b49e083` 域名 SEO / sitemap / OG 分享图
  - `395da4f` 完整搭建 Bolin Lab

## 10. 下一步建议

1. 等待 Google 收录；用 GSC “网页”报告观察索引状态。
2. 继续写 Binder 学习路线第 1 章：Android 为什么需要 Binder。
3. 继续把 `notes/index.html` 中“在整理中”的主题写成正式笔记。
4. 可选：RSS / Atom、每篇文章独立 OG 封面、Bing Webmaster。
5. 新笔记优先保证：可读性 > 结构图 > 源码细节 > SEO。

## 11. 给下一个 AI 的启动提示

可以直接对新的 AI 会话说：

> 先读仓库根目录的 `AGENTS.md` 和 `CHANGELOG.md`，再用 `git log -5` 了解
> 最近改动。这个站是纯静态站点，不要引入构建工具或外部 CDN。修改前先跑本地
> 预览并检查移动端，完成后更新 CHANGELOG，提交并推送 main。

完成后请把本次改动的摘要、涉及文件、验证结果和下一步写入 `CHANGELOG.md`。
