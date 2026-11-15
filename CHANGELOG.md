# Changelog

Bolin Lab 的开发记录。每次完成一轮开发后追加一条，至少包含：

- 日期
- 本次目标
- 改动摘要
- 涉及文件
- 验证结果
- 对应 commit（如果有）
- 遗留问题 / 下一步

> 给 AI 的提示：开始工作前先读最新一条；完成后不要忘记追加记录并更新
> `AGENTS.md` 的“当前状态”。

## 2026-11-15

### 发布 Binder 学习路线第 3 章

**目标：** 从概念进入实践，跑通第一个真实跨进程 AIDL 调用。

**改动：**

- 新增 `notes/binder-chapter-3.html`：AIDL 文件、Service 实现、`:remote` 进程、
  客户端绑定与调用、两个 PID / Binder 线程观察、生成的 Proxy / Stub、常见错误。
- 提供可复制的 Kotlin / Gradle / Manifest / Layout 代码和练习。
- 笔记库加入第 3 章卡片，已发布数量更新为 06；六篇笔记形成 2×3 网格。
- 首页更新为 06 篇，新增 NOTE 006 最新笔记入口。
- 学习路线第 3 章添加“完整展开”链接，sitemap 新增第 3 章 URL。

**涉及文件：**

- `notes/binder-chapter-3.html`
- `notes/index.html`
- `notes/binder-learning-path.html`
- `index.html`
- `sitemap.xml`
- `AGENTS.md`
- `README.md`

**验证：**

- 页面 200；目录、6 个自测答案和代码块正常。
- 1440px / 390px 无页面级横向溢出。
- 笔记库 6 张卡片；roadmap 筛选 5 篇；搜索“两个 PID”命中第 3 章。
- 控制台无 JS 错误。

**Commit：** 本次提交（见 GitHub history）。

**下一步：** 第 4 章：AIDL 进阶。

---

### 发布 Binder 学习路线第 2 章

**目标：** 建立 Binder 的心智模型：一次调用在客户端、驱动、服务端之间怎么走。

**改动：**

- 新增 `notes/binder-chapter-2.html`：以天气服务查询为例，讲清 Client / Server、
  Proxy / Stub、handle / ref / node、Parcel、同步与 oneway、Binder 线程池、
  本地对象、死亡通知和常见误解。
- 新增两张 CSS 流程图：对象映射（Proxy → ref/node → Stub）和同步调用执行路径；
  继续使用 `.flow-diagram`，移动端自动纵向排列。
- 笔记库加入第 2 章卡片，已发布数量更新为 05。
- 首页更新为 05 篇，新增 NOTE 005 最新笔记入口。
- 学习路线第 2 章添加“完整展开”链接，sitemap 新增第 2 章 URL。

**涉及文件：**

- `notes/binder-chapter-2.html`
- `notes/index.html`
- `notes/binder-learning-path.html`
- `index.html`
- `assets/css/site.css`
- `sitemap.xml`
- `AGENTS.md`
- `README.md`

**验证：**

- 页面 200；12 个 h2、17 个 TOC 项、7 个自测答案、2 张流程图。
- 1440px / 390px 无页面级横向溢出；移动端流程图纵向排列。
- 笔记库 5 张卡片；roadmap 筛选 4 篇；搜索“oneway”命中第 2 章。
- 控制台无 JS 错误。

**Commit：** 本次提交（见 GitHub history）。

**下一步：** 第 3 章：第一个 AIDL。

---

### 发布 Binder 学习路线第 1 章

**目标：** 解释 Android 为什么需要 Binder，并尝试更稳定的图示方式。

**改动：**

- 新增 `notes/binder-chapter-1.html`：从真实系统服务调用出发，对比 pipe、Unix socket、
  TCP socket、共享内存、signal 与 Binder；讲清对象引用、方法调用、生命周期、
  安全边界、线程模型和适用边界。
- 新增 6 道自测题、3 个 `adb` 实验和 Binder 调用高层链路图。
- 新增站点通用 `.flow-diagram` 组件：用 flex + 箭头列排版，不再手写 SVG 坐标；
  移动端自动转为纵向流程，箭头始终对齐。
- 笔记库加入第 1 章卡片，已发布数量更新为 04；桌面恢复两列布局，四篇笔记为 2×2。
- 首页更新为 04 篇，新增 NOTE 004 最新笔记入口。
- 学习路线第 1 章添加“完整展开”链接，sitemap 新增第 1 章 URL。

**涉及文件：**

- `notes/binder-chapter-1.html`
- `notes/index.html`
- `notes/binder-learning-path.html`
- `index.html`
- `assets/css/site.css`
- `sitemap.xml`
- `AGENTS.md`
- `README.md`

**验证：**

- 页面 200；10 个 h2、17 个 TOC 项、6 个自测答案；流程图为 5 个箭头。
- 1440px / 390px 无页面级横向溢出；移动端流程图转为纵向。
- 笔记库 4 张卡片；roadmap 筛选 3 篇；搜索“Linux IPC”命中第 1 章。
- 控制台无 JS 错误。

**Commit：** 本次提交（见 GitHub history）。

**下一步：** 第 2 章：Binder 的心智模型。

---

### 发布 Binder 学习路线第 0 章

**目标：** 完成《给 Android 新手的 Binder 学习路线》第 0 章，并接入站点。

**改动：**

- 新增 `notes/binder-chapter-0.html`：进程、线程、虚拟内存、fd、系统调用、
  ioctl / mmap、Parcel、Android 进程模型、实验与自测题。
- 笔记库新增第 0 章卡片，已发布数量更新为 03。
- 首页已发布笔记数量更新为 03，新增 NOTE 003 最新笔记入口。
- Binder 学习路线第 0 章添加“完整展开”链接。
- sitemap 新增 `https://home.bolinlab.top/notes/binder-chapter-0`。
- 笔记库在桌面改为三列布局，1060px 以下回退两列，手机单列。

**涉及文件：**

- `notes/binder-chapter-0.html`
- `notes/index.html`
- `notes/binder-learning-path.html`
- `index.html`
- `assets/css/site.css`
- `sitemap.xml`
- `AGENTS.md`
- `README.md`

**验证：**

- 第 0 章页面 200；TOC 26 项、7 个可展开自测答案；阅读进度正常。
- 1440px / 390px 无页面级横向溢出。
- 笔记库 3 张卡片；roadmap 筛选 2 篇；搜索“虚拟内存”命中第 0 章。
- 控制台无 JS 错误。

**Commit：** 本次提交（见 GitHub history）。

**下一步：** 第 1 章：Android 为什么需要 Binder。

---

### 增加 AI 开发交接文档

**目标：** 换 AI、重开会话或隔一段时间回来时，能快速恢复项目上下文。

**改动：**

- 新增 `AGENTS.md`：项目结构、设计系统、内容约定、SEO、部署方式、当前状态、
  常见陷阱和给下一个 AI 的启动提示。
- 新增 `CHANGELOG.md`：按日期记录每次开发的目标、改动、验证和 commit。
- README 增加“AI 开发交接”说明和交接提示语。
- 明确约定：每次开发完成后更新 CHANGELOG，并在需要时同步 AGENTS 的当前状态。

**涉及文件：**

- `AGENTS.md`
- `CHANGELOG.md`
- `README.md`

**下一步：** 之后每次修改都按本文件模板记录并提交。

---

### Google Search Console 验证与 sitemap 提交

**目标：** 完成 Google 所有权验证，让 sitemap 被正确读取。

**改动：**

- 添加 `google85aa571083e49c47.html` 验证文件。
- 发现 Cloudflare Pages 会把 `.html` 验证路径 308 到无扩展名地址，Google
  验证要求精确 200。
- 添加 `google85aa571083e49c47.txt` 和 `_redirects` 200 rewrite，使
  `/google85aa571083e49c47.html` 精确返回验证文本。
- 在 GSC 完成 URL 前缀属性验证。
- 提交 `sitemap.xml`，GSC 显示“成功”，发现 5 个页面。
- 修正文章 canonical / og:url / sitemap 地址，统一使用无 `.html` 的最终 URL。

**涉及文件：**

- `google85aa571083e49c47.html`
- `google85aa571083e49c47.txt`
- `_redirects`
- `sitemap.xml`
- `notes/binder-driver.html`
- `notes/binder-learning-path.html`

**验证：**

- `https://home.bolinlab.top/google85aa571083e49c47.html` → 200，内容正确。
- `https://home.bolinlab.top/sitemap.xml` → 200，`application/xml`。
- GSC sitemap 状态：成功，5 个页面已发现。
- 生产站点首页 / 笔记 / 关于 / 两篇文章均 200。

**Commit：**

- `83f440f` Add Google Search Console site verification file
- `b5c2904` Serve Google verification file at exact HTML path

**下一步：** 等待 Google 索引；之后在 GSC “网页”报告中观察收录情况。

---

### 域名 SEO 与社交分享配置

**目标：** 绑定正式域名 `https://home.bolinlab.top/` 后的 SEO 基础设施。

**改动：**

- 为所有主要页面添加 canonical、`og:url`、`og:image`、Twitter Card。
- 生成 1200×630 分享图 `assets/og-image.png`。
- 新增 `sitemap.xml`，并在 `robots.txt` 中声明。
- 更新 README 的线上地址和目录说明。
- 补充 `_headers` 的 Cloudflare 安全头。

**Commit：**

- `b49e083` Add production domain SEO and social preview
- `f552f01` Use clean canonical URLs for published notes

**验证：**

- sitemap、robots、OG 图片均可访问。
- canonical / og:url 与 Cloudflare 最终 URL 一致。

---

### 搭建 Bolin Lab 个人学习站

**目标：** 把原来的单页 index.html 升级为可长期维护的个人学习资料站。

**改动：**

- 重构首页：个人介绍、精选笔记、学习方向、站点理念。
- 新增笔记库 `/notes/`：搜索、主题筛选、在整理列表。
- 新增关于页 `/about/`：个人介绍、关注方向、时间线、联系方式。
- 接入 Binder 驱动数据结构交互长文。
- 新增《给 Android 新手的 Binder 学习路线》。
- 新增 404 页面。
- 建立公共样式 / 脚本：
  - 浅色 / 深色主题切换与记忆
  - 响应式布局
  - 搜索 / 筛选
  - 文章自动目录、阅读进度
  - Cloudflare `_headers`、`robots.txt`
- 更新 README、目录说明和本地预览方式。

**Commit：**

- `395da4f` Build Bolin Lab personal learning site

**验证：**

- 桌面 1440px / 手机 390px 无页面级横向溢出。
- 所有内部链接 200，无控制台错误。
- 主题切换、笔记筛选、TOC、阅读进度正常。
- 生产站点部署成功。

---

## 当前状态

- 线上地址：<https://home.bolinlab.top/>
- 最近部署：Cloudflare Pages，`main` 分支自动部署
- 已发布页面：首页、笔记库、关于、404、Binder 图解、Binder 学习路线、第 0/1/2/3 章
- GSC：所有权验证成功；sitemap 成功。新增第 3 章后 sitemap 有 9 个 URL，
  等待 Google 重新抓取；上次读取为 5 个页面
- 第 1/2 章使用 `.flow-diagram` 流程图组件，后续结构说明优先使用 CSS 布局或
  Mermaid / D2，不再继续手写复杂 SVG 坐标；第 3 章为可运行 AIDL 实战
- 工作区：干净，`main` 与 `origin/main` 同步
- 已知注意点：
  - 不要删除 Google 验证文件与 `_redirects` 规则。
  - Cloudflare 会把 `*.html` 308 到无扩展名地址；canonical / sitemap 使用最终地址。
  - 新增页面后同步更新首页 / 笔记库 / sitemap。

## 后续计划

- [ ] 等待 Google 索引，观察 GSC “网页”报告
- [ ] 写 Binder 学习路线第 4 章：AIDL 进阶
- [ ] 评估把旧 Binder 长图中的静态关系图迁移到 D2
- [ ] 增加 RSS / Atom
- [ ] 补齐“在整理中”的 Linux 驱动、Framework、JNI 笔记
- [ ] 为两篇长文制作独立分享封面（可选）
- [ ] 提交 Bing Webmaster / IndexNow（可选）

## 新记录模板

```md
## YYYY-MM-DD

### 本次目标

...

### 改动

- ...

### 涉及文件

- ...

### 验证

- ...

### Commit

- `xxxxxxx` ...

### 下一步

- ...
```
