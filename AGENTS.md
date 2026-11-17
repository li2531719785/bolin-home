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
读者定位是 Android 系统开发、Framework / Native / Kernel 方向；AIDL 只作为进入 Binder 协议的入口。内容应真实、清楚，不写虚构经历或无法验证的结论。

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
├── notes/binder-chapter-1.html      # Binder 学习路线第 1 章：为什么需要 Binder
├── notes/binder-chapter-2.html      # Binder 学习路线第 2 章：心智模型
├── notes/binder-chapter-3.html      # Binder 学习路线第 3 章：第一个 AIDL（系统源码 + 真机）
├── notes/binder-chapter-4.html      # Binder 学习路线第 4 章：系统服务里的 AIDL
├── assets/
│   ├── css/site.css                 # 全站样式（含深色主题、代码块）
│   ├── js/site.js                   # 主题、筛选、TOC、阅读进度、代码块
│   ├── vendor/prism/                # 本地 Prism 1.30.0（按需加载，含 LICENSE）
│   ├── img/                         # 文章静态示意图（SVG，明/暗两套）
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
- 代码块：`initCodeBlocks()` 依赖 `.article-body pre` 上的 `data-file` / `data-title` /
  `data-lang`；自动生成代码头、语言标签和复制按钮，并按需加载
  `assets/vendor/prism/prism-bundle.js`。没有元数据的旧代码块保持原样。
- 修改 `site.css` / `site.js` 后，同步递增所有 HTML 里的 `?v=YYYYMMDD` 版本号，
  避免 Cloudflare 继续返回旧缓存。
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
- 内容必须以源码或真机证据为准：源码写清文件 / 函数 / 行号，终端输出保留原始
  记录；没有跑过的内容标“未实测”，不要写“你应该看到类似日志”。
- 文档中不要写具体硬件平台、产品型号、build fingerprint、内核字符串或内部 AOSP 树名；
  只写 Android 版本（例如 Android 15）。终端输出中的厂商服务名要过滤掉。
- 文章开头放验证环境卡（设备、Android 版本、build fingerprint、AOSP 树、日期），
  并使用 `.article-env` / `.env-badge` 组件。
- 新文章不设 `drafts/` 草稿流程；直接在 `notes/*.html` 写，但必须先有源码锚点和
  真实输出。历史 `drafts/` 已删除，不要再引用。
- 代码块必须带 `data-file` / `data-title` 和 `data-lang`；`site.js` 统一加代码头、
  语法高亮和复制按钮。AIDL 用 `data-lang="aidl"`，由 `PRISM_ALIASES` 映射到 Java
  高亮，代码头显示 AIDL。
- 调用链 / 时序图优先使用 `.flow-diagram`（线性）和 `.seq-diagram`（时序 / 泳道），
  移动端会自动折叠；不要手写复杂 SVG 坐标。
- 复杂结构图可以用预生成的静态 SVG 放在 `assets/img/`，同时提供明 / 暗两套，
  用 `figure` + `figcaption` 引用；不要依赖外部图片 CDN。
- 目前正式笔记有七篇：
  1. `notes/binder-driver.html` — Binder 驱动数据结构图解
  2. `notes/binder-learning-path.html` — Binder 学习路线
  3. `notes/binder-chapter-0.html` — 第 0 章：Binder 的预备知识
  4. `notes/binder-chapter-1.html` — 第 1 章：Android 为什么需要 Binder
  5. `notes/binder-chapter-2.html` — 第 2 章：Binder 的心智模型
  6. `notes/binder-chapter-3.html` — 第 3 章：第一个 AIDL（系统源码 + 真机）
  7. `notes/binder-chapter-4.html` — 第 4 章：系统服务里的 AIDL（源码 + 真机）
- 第 5 章已暂时下线，学习路线中标注“整理中”，后续按同一标准重写。
- 首页和笔记库里的统计数字（07 篇、04 个方向等）必须与真实内容一致。
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
  - Binder 第 1 章：`https://home.bolinlab.top/notes/binder-chapter-1`
  - Binder 第 2 章：`https://home.bolinlab.top/notes/binder-chapter-2`
  - Binder 第 3 章：`https://home.bolinlab.top/notes/binder-chapter-3`
  - Binder 第 4 章：`https://home.bolinlab.top/notes/binder-chapter-4`
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
   - 首页、笔记库、关于页、七篇笔记、404
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

## 9. 当前状态（2026-11-17，返工中）

- 首页 / 笔记库 / 关于 / 404 / 七篇笔记可访问；第 5 章正文已下线，学习路线中标记“整理中”。
- 浅色 + 深色主题、移动端适配、搜索筛选、文章 TOC、阅读进度均已实现。
- 第 1 章新增 RPC 四步和“一次拷贝”流程图；第 2 章改用 `IServiceManager.checkService` 示例，
  补真实 `service` / `ps -T` 实验和 4 张明/暗 SVG 示意图；第 3、4 章为系统源码 + 真机实测版。
- 第 4 章以 servicemanager 为样本，讲 Parcelable、in/out/inout、oneway、callback、DeathRecipient；
  其中 Parcelable 有 `service call manager 14` 真机实验，其余为源码走读。
- 学习路线改为“新手主线 + 第二阶段”：主线 `0-1→2→3→5-6→9`，
  第二阶段 `7→8→10-14`；第 4 章标为选读，不再挡主线。教程默认读者是系统开发者，不再反复做 App 对比。
- 第 3 章使用 Android 15 真机采集：
  `service list` 240 个服务、servicemanager / system_server PID、`binder:3139_N` 线程、
  `/dev/binder` / `/dev/hwbinder` 映射、`binder/stats`、`service call` 原始 Parcel。
- 新增 `.seq-diagram`（CSS 时序 / 泳道，移动端折叠）和 `.article-env` 环境卡；
  代码块支持 `data-label`，AIDL 代码头显示 AIDL、高亮走 Java。
- `drafts/` 目录已删除，不再使用 Markdown 草稿流程；文章直接写 `notes/*.html`，
  但必须先有源码锚点和真实输出。
- 本地 Prism 1.30.0 仍按需加载；CSS / JS 版本号为 `?v=20261116d`。
- sitemap 现有 10 个 URL（第 5 章已移除），等待 Google 重新抓取。
- 工作区：App 表述清理已提交，等待评审；Cloudflare Pages 自动部署 `main`。
- 最近关键提交（返工前）：
  - `486010c` 记录代码框架交接
  - `f2f878c` 为代码框架加资源缓存版本号
  - `111aff8` 搭建代码优先写作框架
  - `56a766a` 发布 Binder 第 4 章
  - `b5c2904` 固定 Google 验证文件的 200 路径

## 10. 下一步建议

1. 学习路线已重构，等待作者评审；通过后再按主线精简第 3 章。
2. 重写第 5 章：先拆 5.1 ServiceManager 启动、5.2 addService、5.3 getService，再恢复入口。
3. 第 4 章已改为系统服务 AIDL；后续补 oneway / callback 的原生客户端实验（当前为源码走读）。
4. 重写第 0 章：补真实 `ps` / `fd` / `maps` / `ioctl` 输出和对比实验；第 1 章已补 RPC / 一次拷贝。
5. 继续写第 6 章：用户态 Binder 对象模型（`IBinder`、`BpBinder`、`BBinder`、`Binder`、`BinderProxy`）。
6. 可选：RSS / Atom、每篇文章独立 OG 封面、Bing Webmaster。
7. 新笔记优先保证：证据密度 > 可读性 > 结构图 > SEO；禁止编造运行输出。

## 11. 给下一个 AI 的启动提示

可以直接对新的 AI 会话说：

> 先读仓库根目录的 `AGENTS.md` 和 `CHANGELOG.md`，再用 `git log -5` 了解
> 最近改动。这个站是纯静态站点，不要引入构建工具或外部 CDN。内容必须有源码
> 锚点或真机输出，禁止编造日志；修改前先跑本地预览并检查移动端，完成后更新
> CHANGELOG，提交并推送 main。

完成后请把本次改动的摘要、涉及文件、验证结果和下一步写入 `CHANGELOG.md`。
