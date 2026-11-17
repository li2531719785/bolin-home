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

## 2026-11-17

### 新增第 2 章：BpBinder → IPCThreadState

**目标：** 按“本体先行、入口收尾”的路线，从第 1 章地图停在的 `IPCThreadState::self()->transact(...)` 接着读 C++ 客户端。

**改动：**

- 新增 `notes/binder-code-2-native.html`：五节，分别是 `BpBinder::transact`、`IPCThreadState::transact`、`writeTransactionData`、`talkWithDriver`、`waitForResponse`；每节先贴完整函数，再解释和过渡。
- `BpBinder` 小节从 git 历史 `c69c562` 的旧第 1 章取回，解释改为本章上下文。
- 路线页第 2 章行加链接，新增第 2 章简介，占位段改为第 3–6 章。
- 总览页 article-end 的“第 2 章（待写）”改为可点击链接。
- 笔记库新增第 2 章卡片（不加 `is-featured`），统计 04 篇；首页统计 `04`、latest-note `NOTE 004` 同步。
- sitemap 增加第 2 章 URL；README / AGENTS 更新目录、正式笔记列表、当前状态和下一步。

**涉及文件：**

- `notes/binder-code-2-native.html`（新增）
- `notes/binder-learning-path.html`
- `notes/binder-code-1-overview.html`
- `notes/index.html`
- `index.html`
- `sitemap.xml`
- `README.md`
- `AGENTS.md`
- `CHANGELOG.md`

**验证：**

- `python -m http.server 8123` 本地预览：第 2 章 200；TOC 生成 6 个标题；5 个代码块均带 `data-file` / `data-lang="cpp"`。
- 五个代码块与 `/home/libolin/v610` 源码逐字符比对通过；BpBinder 362–412、transact 808–883、writeTransactionData 1215–1249、talkWithDriver 1092–1213、waitForResponse 987–1090。
- 站内链接检查通过；笔记库搜索 `waitForResponse` 可命中新卡片，`roadmap` 标签包含第 2 章；`noteCount` 初始为 04。
- sitemap XML 解析通过，新 URL 本地可访问；未改 `site.css` / `site.js`，版本保持 `?v=20261116e`。
- 收尾段引用本树 `binder_ioctl` 实际行号 5673（提供的资料写 5454，与本地树不一致）。

**下一步：** 第 3 章驱动：`binder_ioctl` / `binder_ioctl_write_read` / `binder_thread_write` / `binder_transaction` / `binder_thread_read`，并入驱动数据结构。

**Commit：** 本次提交（见 GitHub history）。

### 路线重排：本体先行，入口收尾

**目标：** 按作者决定重排 Binder 源码阅读路线：不再从 Java 层开始，改为总览 → C++ 客户端 → 驱动 → 服务端 → servicemanager → Java/JNI 收尾。本次只做导航层，不写第 2–6 章正文。

**改动：**

- 新增第 1 章 `notes/binder-code-1-overview.html`：调用链地图、7 条名词速查、阅读约定；正文只做导航。
- 删除旧第 1 章 `notes/binder-code-1-client.html`；该页已随上一轮提交上线，`_redirects` 增加 308 到总览章，避免旧链接 404。
- `binder-learning-path.html`：六章表格换新顺序，列名“下一跳”改为“本章链路”，第 3 章链路补上 `binder_thread_write`；第 1 章简介改总览；删除独立的“数据结构参考”小节，改为表格后一句话；页面描述、og 描述和 article-end 同步。
- 旧第 1 章的 BinderProxy / JNI / BpBinder 正文未搬运，留待第 2、6 章从 git 历史取回。
- 首页 latest-note、笔记库第 1 章卡片和路线卡片描述、关于页时间线、sitemap URL 同步新路由。
- AGENTS.md / README.md 的目录、正式笔记列表、SEO 地址、当前状态和下一步按新 6 章顺序重写。
- 总览章地图补同步返回路径（服务端回填 reply → 调用方 waitForResponse 醒来），handle 词条改为不涉及驱动层名词的表述。

**涉及文件：**

- `notes/binder-code-1-overview.html`（新增）
- `notes/binder-code-1-client.html`（删除）
- `notes/binder-learning-path.html`
- `notes/index.html`
- `index.html`
- `about/index.html`
- `sitemap.xml`
- `_redirects`
- `README.md`
- `AGENTS.md`
- `CHANGELOG.md`

**验证：**

- `python -m http.server 8123` 本地预览：首页、笔记库、关于、路线页、总览页、404 均 200；旧第 1 章本地 404，线上由 `_redirects` 308 到总览章。
- HTML 标签配对检查通过；站内链接 64 条，缺失 0；sitemap XML 解析通过。
- 总览页唯一代码块带 `data-title` / `data-lang`，代码头和复制按钮由 `site.js` 生成；未改 `site.css` / `site.js`，资源版本保持 `?v=20261116e`。
- 地图为 `pre` 文本块，窄屏在代码块内部横向滚动，不产生页面级溢出。
- 全仓库无指向旧页面的站内链接；`binder-code-1-client` 仅保留在 `_redirects` 和本文件历史记录中。

**遗留：** 第 2–6 章正文待写；第 2 章从 `BpBinder::transact` / `IPCThreadState` 开始，第 6 章回到 AIDL / JNI 收尾。

**Commit：** 本次提交（见 GitHub history）。

---

## 2026-11-17

### 第 1 章补场景、链路地图和名词速查

**目标：** 解决读者反馈的 3 个卡点：不知道调用从哪发起、不知道整条链有多长、参数名词看不懂。

**改动：**

- 开头新增“这次调用是怎么发起的”场景：AIDL Stub.Proxy 填 Parcel / code，再交给 `BinderProxy.transact`。
- 新增“整条链的地图”代码块，标出本章 ①②③ 和第 2–4 章的位置，不新增概念示意图。
- 新增“名词一句话速查” `<dl>`：code、data / reply、flags、BpBinder、JNI。
- 三节正文在代码前各加一句“它唯一要做的事”；结尾过渡改为解释“为什么必须经过 JNI / 为什么交给 BpBinder / 为什么下一章看 IPCThreadState”。
- 新增 `.article-body .term-list` 样式；CSS 资源版本升到 `?v=20261116e`。

**涉及文件：**

- `notes/binder-code-1-client.html`
- `assets/css/site.css`
- `AGENTS.md`
- 全站 HTML（CSS 版本号）

**验证：**

- HTML 标签配对检查通过；站内链接检查通过。
- 1440 / 390 宽度无横向溢出，术语表在窄屏改为单列。
- 本地预览控制台无 JS 错误，TOC 自动包含新增小节。

**下一步：** 等作者评审第 1 章，通过后写第 2 章 `IPCThreadState`。

### 删除概念章节，重建 Binder 源码阅读路线

**目标：** 按作者要求删掉所有概念章节，学习路线改为“跟着代码读”，一章只读一个入口。

**改动：**

- 删除旧第 0–4 章；旧 URL（含 `.html`）308 到 `notes/binder-learning-path`。
- `binder-learning-path.html` 重写为 6 章源码阅读路线：
  Java → libbinder → 驱动 → 服务端 → servicemanager → 数据结构/全链路。
- 新增第 1 章 `notes/binder-code-1-client.html`：
  `BinderProxy.transact` → JNI `android_os_BinderProxy_transact` → `BpBinder::transact`，三段完整函数。
- 删除不再使用的概念图 SVG；保留 `binder-driver.html` 数据结构交互图。
- 首页 / 笔记库统计改为 03 篇；sitemap 改为 6 个 URL；旧章节卡片移除。
- README / AGENTS 同步源码阅读规则和第 1 章状态。

**涉及文件：**

- `notes/binder-chapter-0..4.html`（删除）
- `notes/binder-learning-path.html`
- `notes/binder-code-1-client.html`（新增）
- `notes/index.html`
- `index.html`
- `about/index.html`
- `sitemap.xml`
- `_redirects`
- `assets/img/binder-*.svg`（删除）
- `README.md`
- `AGENTS.md`
- `CHANGELOG.md`

**验证：**

- 第 1 章：3 个代码块都是完整函数，带文件路径和行号；无 `service check` 示例。
- 1440 / 390 无页面级横向溢出，控制台无错误；旧章节链接不再出现。
- sitemap 6 个 URL；全站链接 88 条，缺失 0。
- 旧章节 URL 部署后在线上确认 308。

**Commit：** 本次提交（见 GitHub history）。

**部署：** 推送 `main` 后由 Cloudflare Pages 自动部署。

**下一步：** 等作者评审源码阅读路线和第 1 章；通过后写第 2 章 `IPCThreadState`。

---

## 2026-11-17

### 重写第 3 章叙事：跟着 service check activity 走

**目标：** 解决“知识点堆叠、读起来跳来跳去”的问题，把第 3 章改成一条连续调用线。

**改动：**

- 全章按 `service check activity` 串讲：命令 → AIDL → Proxy/Stub → service 命令手写 Proxy → Parcel/驱动 → servicemanager → 失败场景。
- 每节末尾加过渡，下一节回答上一节留下的问题。
- 补充 `ServiceManager::checkService` 源码；明确“本次服务端是 servicemanager，不是 system_server”。
- 失败场景改用同一接口的 `service call manager 999`，避免跳到 activity 接口。
- 保留 Stub 骨架 + `asInterface` / `onTransact` 上下文；正文约 1.4k 汉字、19 个代码块、2 张图。
- 阅读时间 18 分钟；笔记库卡片不变。

**涉及文件：**

- `notes/binder-chapter-3.html`
- `CHANGELOG.md`
- `AGENTS.md`

**验证：**

- 第 3 章：19 个代码块全部有 `data-title`/`data-file` + `data-lang`；2 张图明/暗切换正常。
- 1440 / 390 无页面级横向溢出，控制台无错误；图片全部加载。
- 线上/本地无 `lazy`、`VINTF`、`dumpPriority`、`binder/stats`、`binder_calls_stats`。
- 全站链接 174 条，缺失 0。

**Commit：** 本次提交（见 GitHub history）。

**部署：** 推送 `main` 后由 Cloudflare Pages 自动部署。

**下一步：** 等作者评审第 3 章；通过后再精简第 4 章（选读）。

---

## 2026-11-17

### 精简第 3 章：只保留一次 AIDL 调用主线

**目标：** 把第 3 章从 36 个代码块压到核心调用链，删掉 lazy、VINTF、dumpPriority、binder stats 等分支。

**改动：**

- 章节压成 9 个 h2：service check、AIDL 接口、生成代码、手写 Proxy、调用链、真机证据、失败场景、自测、小结。
- 代码块 36→19；保留 `IServiceManager.aidl`、生成 Proxy/Stub、`service.cpp`、`BpBinder` / `IPCThreadState`、`ps -T` / `maps`。
- Stub 部分补类骨架（`asInterface` / `asBinder`）和完整 `onTransact` 分发（get/check + default），不再只放一个 case。
- 新增 `binder-aidl-generated-*` SVG，并复用 `binder-architecture-*`；共 2 张图。
- 删除 lazy service、dumpPriority、VINTF/isDeclared、binder/stats、binder_calls_stats、code 7/8/999 细节和 Java 侧长段源码。
- 失败场景从 4 个压到 2 个：服务不存在、事务码非法。
- 自测题压到 4 个；阅读时间 30→18 分钟；笔记库卡片同步。

**涉及文件：**

- `notes/binder-chapter-3.html`
- `assets/img/binder-aidl-generated-*.svg`
- `notes/index.html`
- `CHANGELOG.md`
- `AGENTS.md`

**验证：**

- 第 3 章：19 个代码块全部有 `data-title`/`data-file` + `data-lang`；2 张图明/暗切换正常。
- 1440 / 390 无页面级横向溢出，控制台无错误；图片全部加载。
- 线上/本地均无 `lazy`、`VINTF`、`dumpPriority`、`binder/stats`、`binder_calls_stats`。
- 全站链接 174 条，缺失 0；SVG 通过 `xmllint`。

**Commit：** 本次提交（见 GitHub history）。

**部署：** 推送 `main` 后由 Cloudflare Pages 自动部署。

**下一步：** 等作者评审第 3 章；通过后精简第 4 章（选读）。

---

## 2026-11-17

### 重写第 1 章：只回答“为什么需要 Binder”

**目标：** 按新手主线重写第 1 章：只讲 RPC 四步、通用 IPC 的缺口和一次拷贝，去掉 oneway、死锁、安全长表等分支。

**改动：**

- 重写第 1 章正文，压成 8 个 h2：RPC 四步、Linux IPC 对比、Binder 补了什么、一次调用、一次拷贝、代价、自测题、小结。
- 新增 2 张 SVG：`binder-rpc-steps-*`、`binder-one-copy-*`；复用 `binder-architecture-*`，共 3 张图。
- 真机输出：`service check activity`、`service list | wc -l`、`/proc/$(pidof system_server)/maps`。
- 源码：`service.cpp` 的 check 分支、`ProcessState::ProcessState` 的 open/mmap。
- 删除 oneway、死锁、DeathRecipient、长安全表、Android 角色长表；自测题 6→4。
- 阅读时间 16→13 分钟；笔记库卡片和 metadata 同步。

**涉及文件：**

- `notes/binder-chapter-1.html`
- `assets/img/binder-rpc-steps-*.svg`
- `assets/img/binder-one-copy-*.svg`
- `notes/index.html`
- `CHANGELOG.md`
- `AGENTS.md`

**验证：**

- 第 1 章：8 个代码块全部有 `data-title`/`data-file` + `data-lang`；3 张图明/暗切换正常。
- 1440 / 390 无页面级横向溢出，控制台无错误；图片全部加载。
- 线上/本地均无 `App`、`oneway`、`lazy`、`VINTF`、`dumpPriority` 等残留。
- 全站链接 170 条，缺失 0；SVG 通过 `xmllint`。

**Commit：** 本次提交（见 GitHub history）。

**部署：** 推送 `main` 后由 Cloudflare Pages 自动部署。

**下一步：** 等作者评审第 1 章；通过后按新手主线精简第 3 章。

---

## 2026-11-17

### 去掉教程里的 App 对比表述

**目标：** 教程默认读者是系统开发者，不再反复做 App 对比。

**改动：**

- 学习路线、第 3 章、第 4 章、首页卡片删除 App 对比铺垫。
- 第 3 章删除一段应用层对比整节，以及一条 AIDL 归属误解。
- 第 4 章把 AIDL 对比、类版本等句子改为系统服务 / 分区的中性表述。
- README、AGENTS、历史 CHANGELOG 中的同类表述同步清理。

**涉及文件：**

- `notes/binder-learning-path.html`
- `notes/binder-chapter-3.html`
- `notes/binder-chapter-4.html`
- `notes/index.html`
- `README.md`
- `AGENTS.md`
- `CHANGELOG.md`

**验证：**

- 公开 HTML 中不再出现 App 对比表述。
- 第 3 章删除整节后 TOC 和代码块正常；第 4 章无残留 App 对比。
- 1440 / 390 无横向溢出，控制台无错误；全站链接 164 条，缺失 0。

**Commit：** 本次提交（见 GitHub history）。

**部署：** 推送 `main` 后由 Cloudflare Pages 自动部署。

**下一步：** 等作者评审学习路线与第 2 章；通过后精简第 3 章。

---

## 2026-11-17

### 重构学习路线：新手主线 + 第二阶段

**目标：** 先给新手一条能跑通的主线，再把 Framework / Native / 驱动作为第二阶段；避免 18 章平铺和选读内容挡主线。

**改动：**

- 新增“新手主线”流程图：`0-1 → 2 → 3 → 5-6 → 9`。
- 新增“第二阶段”流程图：`7 Framework → 8 Native → 10-14 驱动`。
- 第 4 章从模块 2 主线移到“选读分支”，标注等主线跑通后再看。
- 第 5 章去掉“callback / DeathRecipient 已在第 4 章展开”的依赖。
- 模块 3 / 4 改为“第二阶段”，第 9 章明确为主线桥接。
- “课时不够”表格改为新手主线 / Framework-Native / 完整驱动三条路线。
- 教学建议改为“每章只回答一个问题，先主线后分支”。
- 笔记库学习路线卡片、标题/描述同步。

**涉及文件：**

- `notes/binder-learning-path.html`
- `notes/index.html`
- `CHANGELOG.md`
- `AGENTS.md`

**验证：**

- 1440 / 390 无页面级横向溢出；两条流程图的移动端折叠正常。
- 页面 TOC、内部链接正常；全站链接 164 条，缺失 0。
- 第 4 章链接仍在，但已标为选读；第 5 章仍标“整理中”。

**Commit：** 本次提交（见 GitHub history）。

**部署：** 推送 `main` 后由 Cloudflare Pages 自动部署。

**下一步：** 等作者评审学习路线；通过后再按新手主线精简第 3 章。

---

## 2026-11-17

### 精简第 2 章：只保留新手主线

**目标：** 按新手视角做减法：只保留一次调用的核心模型，把 oneway、死亡通知、死锁等后移。

**改动：**

- 删除“同步 vs oneway”整节；oneway 改为“先跳过，第 4 章再看”。
- 删除“嵌套调用与死锁”整节和 `BinderProxy.linkToDeath` 代码块；只留一条实践规则。
- “本地对象与远程对象”压缩成两段；死亡通知改为“先跳过”提示。
- 常见误解从 6 条压到 4 条：handle、Proxy、Binder 线程、一次拷贝。
- `ps -T` 输出过滤 `HwBinder`，只保留 `binder:` 线程；修复 `pidof` 命令的设备侧展开引号。
- 补充“本章只讲主线”callout；自测题从 7 题压到 5 题；代码块 18→16，保留 4 张 SVG。
- 阅读时间改为约 17 分钟；笔记库卡片、学习路线描述同步。

**涉及文件：**

- `notes/binder-chapter-2.html`
- `notes/index.html`
- `notes/binder-learning-path.html`
- `CHANGELOG.md`
- `AGENTS.md`

**验证：**

- 第 2 章：16 个代码块全部有 `data-title`/`data-file` + `data-lang`；4 张 SVG 明/暗切换正常。
- 1440 / 390 无页面级横向溢出，控制台无错误；图片全部加载。
- 全站链接 164 条，缺失 0；`site.js`、`sitemap.xml`、`git diff --check` 通过。

**Commit：** 本次提交（见 GitHub history）。

**部署：** 推送 `main` 后由 Cloudflare Pages 自动部署。

**下一步：** 等作者评审第 2 章；通过后再精简第 3 章。

---

## 2026-11-17

### 参考通俗教程补 RPC/一次拷贝，移除平台信息

**目标：** 参考 ahaoframework 的 Binder 讲法，把“RPC 四步、一次拷贝”讲得更直观；同时按作者要求，文档不记录具体平台。

**改动：**

- 第 1 章新增“先把 Binder 放回 RPC”四步流程图和“一次拷贝”路径图；明确 Binder 是本机 RPC 框架。
- 第 2 章把“查天气”示例换成 `IServiceManager.checkService("activity")`，改用系统服务示例。
- 第 0、1 章把上层业务主语改为“客户端进程 / 普通进程”。
- 第 3、4 章环境卡移除设备型号、build fingerprint、内核字符串和 AOSP 树名，只保留 Android 15。
- 终端输出过滤厂商服务名：`service list`、`dumpsys binder_calls_stats`、`dumpsys activity processes` 改用 AOSP framework / systemui 样本。
- 学习路线第 1、2、5、7、8 章描述同步 RPC/场景化讲法，明确系统服务视角。
- 第 2 章新增 4 张明/暗两套 SVG 示意图和 `.article-body figure` 样式；资源版本升至 `?v=20261116d`。

**涉及文件：**

- `notes/binder-chapter-0.html`
- `notes/binder-chapter-1.html`
- `notes/binder-chapter-2.html`
- `assets/img/binder-*.svg`
- `assets/css/site.css`
- `notes/binder-chapter-3.html`
- `notes/binder-chapter-4.html`
- `notes/binder-learning-path.html`
- `notes/index.html`
- `sitemap.xml`
- `AGENTS.md`
- `CHANGELOG.md`

**验证：**

- 第 0/1/2/3/4/学习路线：Chrome 1440 / 390 无页面级横向溢出，控制台无错误。
- 第 2 章：18 个代码块全部有 `data-title`/`data-file` + `data-lang`；4 张 SVG 在明/暗主题下正确切换。
- 所有代码块都有 `data-title`/`data-file` + `data-lang`；TOC 和复制按钮正常。
- 全站链接 164 条，缺失 0；sitemap 10 个 URL；`site.js`、`sitemap.xml`、`git diff --check` 通过。

**Commit：** 本次提交（见 GitHub history）。

**部署：** 推送 `main` 后由 Cloudflare Pages 自动部署。

**下一步：** 继续第 5 章 5.1 / 5.2 / 5.3 重写；第 2 章后续按需补 `maps` / `binder/stats` 截图。

---

## 2026-11-17

### 教程改为系统开发视角：重写第 4 章并调整学习路线

**目标：** 读者是 Android 系统开发；教程主线改为系统服务、AOSP 源码、Framework / Native / Kernel。

**改动：**

- 重写 `notes/binder-chapter-4.html`：以 servicemanager 为样本，讲 `ServiceDebugInfo` Parcelable、
  `in/out/inout`、oneway、`registerForNotifications` callback 和 `DeathRecipient`。
- 真机实验：`service call manager 14` 返回 `ServiceDebugInfo[]`，正文按字段解析出服务名 / debugPid；
  其余能力明确标“源码走读”。
- 新增第 4 章时序图：服务注册、callback 注册、`onRegistration`、进程死亡、`binderDied` 清理。
- 学习路线改为“Android 系统开发的 Binder 学习路线”，模块 2 改为“系统服务与 AIDL”，
  第 7 章改为 Framework / SystemServer 视角，Capstone 改为真实系统服务追踪。
- 第 3 章改为系统层协议视角，不再展开上层业务代码。
- 第 1 章补充 RPC 四步流程和“一次拷贝”路径的 CSS 流程图，参考 ahaoframework 的通俗讲法。
- 第 2 章把“查天气”示例换成 `IServiceManager.checkService("activity")`，补真实 `service check`、handle、`ps -T` 实验，
  新增 4 张明/暗两套 SVG 示意图（系统全景、handle/ref/node、同步调用、线程池）。
  第 0、1 章也改为“客户端进程 / 普通进程”的中性表述。
- 全文移除具体平台型号、build fingerprint、内核字符串和内部 AOSP 树名；只保留 Android 15。
  终端输出中的厂商服务名已替换为 AOSP framework / systemui 等通用样本。
- 首页、笔记库、关于页、README、AGENTS 同步系统开发定位和第 4 章标题。

**涉及文件：**

- `notes/binder-chapter-4.html`
- `notes/binder-chapter-3.html`
- `notes/binder-learning-path.html`
- `notes/index.html`
- `index.html`
- `about/index.html`
- `README.md`
- `AGENTS.md`
- `CHANGELOG.md`

**验证：**

- 第 4 章：23 个代码块全部有 `data-file`/`data-title` + `data-lang`；10 个 TOC 项；
  Chrome 1440 / 390 / 360 无页面级横向溢出；控制台无错误；浅色 / 深色正常。
- 真机复核：`service call manager 14` 返回的 DockObserver / SurfaceFlinger / activity 等条目与正文一致；
  `dumpsys activity processes` 能看到 `IApplicationThread$Stub$Proxy` 与 PID。
- 全站内部链接 156 条，缺失 0；`site.js`、`sitemap.xml`、`git diff --check` 通过。

**Commit：** 本次提交（见 GitHub history）。

**部署：** 推送 `main` 后由 Cloudflare Pages 自动部署。

**下一步：** 按同一标准重写第 2 章；第 5 章按 5.1 / 5.2 / 5.3 重写。

---

## 2026-11-16

### 按真机重写第 3 章，下线第 5 章与草稿流程

**目标：** 解决旧文章“没有真代码、没有真实验、没有时序图、AI 一次性成稿”的问题，先把第 3 章做成系统层样板。

**改动：**

- 删除 `drafts/` 目录（README、模板、5.1 草稿）和 `_headers` 的 `/drafts/*` noindex 规则。
- 下线 `notes/binder-chapter-5.html`，同步移除首页、笔记库、学习路线、sitemap、AGENTS、README 中的入口与统计。
- `_redirects` 增加第 5 章旧链接到学习路线的 308，避免边缘缓存继续返回旧页面。
- 第 3 章改为系统层路线：以 `IServiceManager.aidl`、`service` 命令、
  `servicemanager` 和 Android 15 AOSP 源码为主线。
- 新增真实设备证据：Android 15 / 240 个服务 / servicemanager 与 system_server PID /
  `binder:3139_N` 线程 / `/dev/binder` 与 `/dev/hwbinder` 映射 / `binder/stats` /
  `service call` 原始 Parcel。
- 新增 `.seq-diagram` 时序 / 泳道组件（CSS grid，移动端折叠）、`.article-env` 环境卡；
  `site.js` 代码头支持 `data-label`，AIDL 高亮映射到 Java 但显示 AIDL。
- 所有 HTML 资源版本号更新为 `?v=20261116b`。
- 笔记库第 3 章卡片、首页最新笔记、学习路线第 3 章描述同步。

**涉及文件：**

- `notes/binder-chapter-3.html`
- `notes/binder-chapter-5.html`（删除）
- `notes/index.html`
- `notes/binder-learning-path.html`
- `index.html`
- `sitemap.xml`
- `_headers`
- `assets/css/site.css`
- `assets/js/site.js`
- `README.md`
- `AGENTS.md`
- `CHANGELOG.md`

**验证：**

- Android 15 真机实测：`service check activity` → found；
  `service list` → 240 个服务；`service call manager 2 s16 activity` → Parcel handle 2。
- `ps -T -p 3139` 能看到 `binder:3139_1` 等线程；`/proc/2567/maps` 能看到 `/dev/binder`。
- 第 3 章 HTML 中所有代码块都有 `data-file` / `data-title` 与 `data-lang`。
- 首页 / 笔记库统计更新为 07；sitemap 为 10 个 URL。
- 本地 Chrome headless 检查：1440px / 390px / 360px 文档 `scrollWidth` 均等于 `clientWidth`，无页面级横向溢出；代码块和表格保留内部横向滚动。第 3 章 36 个代码块全部生成代码头，16 个 TOC 项，复制按钮 36 个，主题切换正常。
- 全站 HTML 内部链接 156 条，缺失 0 条；`sitemap.xml` 通过 `xmllint`。
- `node --check assets/js/site.js` 与 `prism-bundle.js` 通过。
- 复核：在 Android 15 真机重跑 `service check/list/call`、`ps -A/-T`、`maps`、`binder/stats`，关键输出与文章一致；统计计数按快照说明。
- 修复移动端页面级横向溢出：`.article-body` 使用 `overflow-x: clip`，代码块 / 表格保留内部横向滚动；资源版本升至 `?v=20261116c`。

**Commit：** 本次提交（见 GitHub history）。

**部署：** 推送 `main` 后由 Cloudflare Pages 自动部署。

**下一步：** 按第 3 章标准重写第 2 章；第 5 章按 5.1 / 5.2 / 5.3 重新拆分。

---

## 2026-11-16

### 搭建代码优先的写作框架

**目标：** 解决文章“偏语言描述、代码少”的问题，先把代码展示和 Markdown 写作流程搭好，再一起写 5.1 正文。

**改动：**

- 本地引入 Prism 1.30.0（`assets/vendor/prism/`，MIT，含 LICENSE），按需加载，不走 CDN。
- `site.js` 新增 `initCodeBlocks()`：带 `data-file` / `data-title` / `data-lang` 的代码块自动生成代码头、语言标签和复制按钮；旧代码块保持原样。
- `site.css` 增加代码块容器、代码头、复制按钮和 Prism token 配色，适配浅色 / 深色主题。
- 新增 `drafts/README.md`：作者 / AI 分工、文章骨架、代码块约定、发布检查。
- 新增 `drafts/_template.md` 与 `drafts/binder-5-1-service-manager-startup.md`，先搭 5.1 的源码锚点和待补实验清单。
- `_headers` 给 `/drafts/*` 加 `X-Robots-Tag: noindex`，避免草稿被搜索引擎收录。
- 所有 HTML 的 CSS / JS 引用加 `?v=20261116` 缓存版本号；`site.js` 动态加载 Prism 时继承该版本号，避免 Cloudflare 继续返回旧资源。
- README、AGENTS 同步写作流程和目录结构。

**涉及文件：**

- `assets/css/site.css`
- `assets/js/site.js`
- `assets/vendor/prism/prism-bundle.js`
- `assets/vendor/prism/LICENSE`
- `drafts/README.md`
- `drafts/_template.md`
- `drafts/binder-5-1-service-manager-startup.md`
- `_headers`
- `*.html`（CSS / JS 资源版本号）
- `README.md`
- `AGENTS.md`
- `CHANGELOG.md`

**验证：**

- 首页、笔记库、第 0–5 章、学习路线、关于、404 共 11 个页面，在 1440px / 390px 下均无页面级横向溢出，控制台无 JS 错误。
- 旧文章不加载 Prism（`prism=false`），代码块不被改写。
- 临时 demo 页：2 个代码块正常生成代码头，C++ / bash 高亮 57 个 token，复制按钮可用，390px 无溢出。
- 深色主题代码块背景为 `rgb(7, 9, 12)`，代码头与 token 对比度正常。
- `site.js` 与 `prism-bundle.js` 通过 `node --check`。
- 带 `?v=20261116` 的资源请求可拿到新版本，避免旧缓存继续生效。
- 本次未新增正式笔记，笔记库仍 8 篇，sitemap 仍 11 个 URL。

**Commit：**

- `111aff8` `chore: add code-first writing framework`
- `f2f878c` `perf: bust static asset cache for code framework`

**下一步：** 作者补 5.1 的板端环境、`ps` / `service list` / `maps` 真实输出；AI 再生成正文和页面。

---

## 2026-11-16

### 发布 Binder 学习路线第 5 章

**目标：** 从“自己写 AIDL 服务”进入 Android 系统服务的注册与查找机制。

**改动：**

- 新增 `notes/binder-chapter-5.html`：servicemanager 的启动与 context manager、
  handle 0、addService / getService 的两次事务、handle 的进程内语义、
  getSystemService、三个 servicemanager 的分工与 SELinux 安全边界。
- 新增 3 张 `.flow-diagram` 流程图：context manager 建立、服务注册、服务查找。
- 补充 8 道自测题、adb 观察命令和常见误解表。
- 笔记库加入第 5 章卡片，已发布数量更新为 08。
- 首页更新为 08 篇，新增 NOTE 008 最新笔记入口，最近更新保持 3 篇。
- 学习路线第 5 章添加“完整展开”链接，sitemap 新增第 5 章 URL。

**涉及文件：**

- `notes/binder-chapter-5.html`
- `notes/index.html`
- `index.html`
- `notes/binder-learning-path.html`
- `sitemap.xml`
- `AGENTS.md`
- `README.md`
- `CHANGELOG.md`

**验证：**

- 第 5 章页面 200；16 个 TOC 项、8 个自测答案、3 张流程图。
- 1440px / 390px 下首页、笔记库、关于、404、第 5 章、学习路线均无页面级横向溢出。
- 笔记库 8 张卡片；搜索“context manager”命中第 5 章；roadmap 筛选 7 篇。
- 主题切换、搜索、筛选、TOC、阅读进度正常；控制台无 JS 错误。
- 全站 HTML 内部链接检查 173 条，无缺失；sitemap 11 个唯一 URL。

**Commit：** 本次提交（见 GitHub history）。

**下一步：** 第 6 章：用户态 Binder 对象模型。

---

## 2026-11-15

### 发布 Binder 学习路线第 4 章

**目标：** 把最小 AIDL Demo 扩展到真实接口常见能力。

**改动：**

- 新增 `notes/binder-chapter-4.html`：Parcelable（@Parcelize + AIDL 声明）、
  in/out/inout、oneway、callback、DeathRecipient、线程与常见错误。
- 新增 callback 反向调用流程图，沿用 `.flow-diagram` 自适应组件。
- 笔记库加入第 4 章卡片，已发布数量更新为 07。
- 首页更新为 07 篇，新增 NOTE 007 最新笔记入口；首页“最近更新”收敛为最新 3 篇。
- 学习路线第 4 章添加“完整展开”链接，sitemap 新增第 4 章 URL。

**涉及文件：**

- `notes/binder-chapter-4.html`
- `notes/index.html`
- `notes/binder-learning-path.html`
- `index.html`
- `sitemap.xml`
- `AGENTS.md`
- `README.md`

**验证：**

- 页面 200；目录、自测答案、代码块、callback 流程图正常。
- 1440px / 390px 无页面级横向溢出。
- 笔记库 7 张卡片；搜索“oneway”“DeathRecipient”等关键词可命中。
- 控制台无 JS 错误。

**Commit：** 本次提交（见 GitHub history）。

**下一步：** 第 5 章：ServiceManager 与服务注册。

---

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
- `assets/img/binder-*.svg`
- `assets/css/site.css`
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
- 已发布页面：首页、笔记库、关于、404、Binder 图解、Binder 源码阅读路线、源码第 1 章
- 旧第 0–4 章已删除，旧 URL 308 到源码阅读路线
- 教程定位：Android 系统开发 / Framework / Native / Kernel；默认读者是系统开发者，不再反复做 App 对比
- GSC：所有权验证成功；sitemap 成功。当前 sitemap 有 6 个 URL，
  等待 Google 重新抓取
- 学习路线已改为 6 章源码阅读顺序：总览 → C++ 客户端 → 驱动 → 服务端 → servicemanager → Java/JNI；
  第 1 章为总览（地图、名词速查、阅读约定），第 2–6 章待写
- 旧第 1 章 `binder-code-1-client` 已由 `_redirects` 308 到总览章
- 代码展示：本地 Prism 1.30.0 按需加载；代码块自动生成代码头、语言标签和复制
  按钮；AIDL 通过 `data-lang="aidl"` 映射到 Java 高亮
- 写作流程：不再使用 `drafts/`；文章直接写 `notes/*.html`，但必须有源码锚点和
  真实输出，未实测内容明确标注
- 工作区：路线重排已提交，等待评审
- 已知注意点：
  - 不要删除 Google 验证文件与 `_redirects` 规则。
  - Cloudflare 会把 `*.html` 308 到无扩展名地址；canonical / sitemap 使用最终地址。
  - 新增页面后同步更新首页 / 笔记库 / sitemap。
  - 真机验证环境：Android 15（不记录具体平台型号）。

## 后续计划

- [ ] 等待 Google 索引，观察 GSC “网页”报告
- [x] 按真机重写第 3 章（系统源码 + `service call` + 时序图）
- [x] 教程改为系统开发视角，重写第 4 章（servicemanager + 系统 AIDL）
- [x] 下线第 5 章，删除 `drafts/` 流程
- [x] 第 2 章精简为新手主线，保留 `service` / `ps -T` 实验和 4 张 SVG
- [x] 学习路线重构为“新手主线 + 第二阶段”，第 4 章改为选读
- [x] 路线重排为“本体先行、入口收尾”，第 1 章改为调用链总览
- [ ] 第 2 章 C++ 客户端：`BpBinder::transact` → `IPCThreadState` → 驱动入口
- [ ] 第 3 章驱动：`binder_ioctl` → `binder_thread_write` → `binder_transaction` → `binder_thread_read`
- [ ] 第 4 章服务端：`executeCommand` → `onTransact` → `Binder.execTransact`
- [ ] 第 5 章 servicemanager：`addService` / `checkService`
- [ ] 第 6 章 Java + JNI：AIDL `Stub.Proxy` → `BinderProxy.transact` → JNI → `BpBinder`
- [ ] 第 4 章补 oneway / callback / DeathRecipient 的原生客户端实验（当前为源码走读）
- [x] 第 1 章重写：RPC 四步、一次拷贝、3 张 SVG 和真机输出
- [x] 第 3 章精简为一次 AIDL 调用主线
- [x] 删除旧概念章节（第 0–4 章），旧 URL 308 到源码阅读路线
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
