# 写作草稿（Markdown）

这个目录放文章的 **Markdown 源稿**，不直接发布。发布页仍然是 `notes/*.html`，由 AI 负责转换和排版。

## 为什么用草稿

- 作者只写标题、正文、代码和实验记录，不需要碰 HTML / CSS。
- 代码块、源码路径、终端输出都按同一套规则写，转换后样式统一。
- 草稿可以反复改，不会影响线上页面。
- 文章的技术判断、真实输出和平台差异由作者提供，AI 负责结构和编辑。

> 这个仓库是公开的，草稿里不要放密钥、内部地址或不能公开的代码。`_headers`
> 已给 `/drafts/*` 加 `X-Robots-Tag: noindex`，但文件本身仍可被直接访问。

## 工作流程

1. 复制 `_template.md`，命名为 `binder-5-1-service-manager-startup.md` 这样的 slug。
2. 填「现象 / 环境 / 运行记录 / 源码疑问 / 平台差异」。
3. AI 补源码锚点、代码骨架和章节串联，生成 `notes/<slug>.html`。
4. 本地 1440px / 390px 预览，确认代码、TOC、移动端。
5. 确认后更新笔记库、学习路线、sitemap、`CHANGELOG.md`，再提交发布。

## 分工

**作者（Bolin）负责：**

- 真实实验环境、命令和输出；
- 代码、日志、抓包、源码阅读中的判断；
- 文章的结论、取舍和“我踩过的坑”；
- 技术校对，发现 AI 写错时直接改。

**AI 负责：**

- 提纲、章节顺序、每节要放的代码；
- 源码文件 / 函数定位；
- Markdown → HTML、代码块、Prism、图示；
- 标题、description、canonical、sitemap、内链；
- 本地预览、移动端检查、提交发布。

**共同规则：**

- 不编造运行输出；没跑过的内容标成“预期输出”；
- 不把“计划中”写成“已完成”；
- 关键代码必须能编译或能在源码里定位；
- 一篇只讲一个机制，避免第 5 章那种“一章六个主题”。

## 文章骨架

```text
现象 / 问题
环境与版本
最小可运行代码（或源码入口）
运行结果 / 日志
源码调用链
关键数据结构
平台差异 / 排错
结论
```

要求：

- 6–10 个 `h2`，目标阅读时间 8–15 分钟；
- 每个 `h2` 至少有一个代码块、命令或源码引用；
- 代码块尽量完整，关键代码不少于 10 行；
- 表格只用于对比，不用来承载主体解释；
- 一篇只回答一个“为什么 / 怎么走”。

## 代码块约定

在代码块前一行写文件路径，AI 转换时会放进代码头：

源码：`frameworks/native/cmds/servicemanager/main.cpp`

```cpp
int main() {
    // ...
}
```

终端输出同理：

命令：`adb shell service list`

```bash
activity
package
```

规则：

- 代码围栏标语言：`cpp`、`c`、`java`、`kotlin`、`bash`、`json`、`text`；
- 源码路径用仓库相对路径，不写本机绝对路径；
- 不贴省略到无法理解的代码；要省略时用 `// ...` 并说明省略了什么；
- 终端输出保留原始格式，不要手工对齐或“美化”。

## HTML 转换约定（AI 用）

`site.js` 会自动把带元数据的代码块包装成：

```html
<div class="code-block">
  <div class="code-head">
    <span class="code-file">frameworks/native/cmds/servicemanager/main.cpp</span>
    <span class="code-lang">C++</span>
    <button class="code-copy" type="button">复制</button>
  </div>
  <pre data-file="frameworks/native/cmds/servicemanager/main.cpp" data-lang="cpp"><code class="language-cpp">...</code></pre>
</div>
```

对应规则：

- 有 `data-file` 或 `data-title`，或代码带 `language-*`，才会生成代码头；
- `data-lang` 会补全 `language-*`，并把 `sh` / `shell` 归一成 `bash`；
- `text` / `plaintext` 只生成代码头，不加载 Prism；
- Prism 是按需加载的，只有页面出现可高亮语言时才下载 `assets/vendor/prism/prism-bundle.js`；
- 没有元数据的旧代码块保持原样，不会被改写。

这样作者只写 Markdown，代码头、高亮和复制按钮都由站点脚本处理。

## 发布前检查

- [ ] 版本号、设备、编译 target 写清楚
- [ ] 代码块有文件名 / 函数名
- [ ] 至少 3 条真实输出或源码证据
- [ ] 没有“大概”“可能”掩盖未验证的结论
- [ ] 1440px / 390px 无横向溢出
- [ ] 控制台无 JS 错误
- [ ] 笔记库、学习路线、sitemap、CHANGELOG 已同步
