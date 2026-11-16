---
title: "ServiceManager 启动：handle 0 是怎么来的"
series: "Binder 学习路线"
chapter: "5.1"
aosp: "android-13.0.0_r83"
target: "开发板 / 车机（待补具体型号）"
status: "draft"
tags: ["Android", "Binder", "ServiceManager", "Framework"]
---

> 写作提示：这篇先做“源码走读 + adb 验证”，不修改 AOSP。你只需要补环境、真实输出和板端差异；源码锚点由 AI 先列。

## 1. 现象 / 问题

TODO：贴 `ps -A` 和 `service list` 的输出，说明想解释的现象。

这一篇只回答：**为什么任何进程都能用 handle 0 找到 servicemanager？**

## 2. 环境

- AOSP tag：`android-13.0.0_r83`（主线；板端版本另记）
- 目标设备：
- Android 版本：
- Binder 设备：`/dev/binder` / binderfs（待确认）
- 编译 target：
- `ro.build.fingerprint`：

```text
TODO：adb shell getprop ro.build.version.release
TODO：adb shell getprop ro.build.fingerprint
```

## 3. 入口：servicemanager 的 main()

源码锚点（AI 已定位，待按你的树校准）：

| 文件 | 函数 / 对象 | 关注点 |
| --- | --- | --- |
| `frameworks/native/cmds/servicemanager/main.cpp` | `main()` | 启动流程、Looper |
| `frameworks/native/cmds/servicemanager/main.cpp` | `BinderCallback::setupTo` / `handleEvent` | 驱动 fd 如何进入事件循环 |
| `frameworks/native/libs/binder/ProcessState.cpp` | `initWithDriver` | open / mmap Binder 设备 |
| `frameworks/native/libs/binder/ProcessState.cpp` | `becomeContextManager` | 触发 `BINDER_SET_CONTEXT_MGR` |
| `frameworks/native/cmds/servicemanager/ServiceManager.cpp` | `addService` | 为什么先把自己注册成 `"manager"` |

TODO：AI 在这里放 `main()` 的关键代码；你确认你的 AOSP 13 树是否一致。

### 3.1 `initWithDriver`

TODO：open / mmap 之后，进程里多了什么？

### 3.2 `becomeContextManager`

TODO：为什么这一行之后 handle 0 才有意义？

### 3.3 Looper 与 BinderCallback

TODO：servicemanager 不是“主动轮询业务”，而是等驱动 fd 可读。

## 4. 驱动侧：`BINDER_SET_CONTEXT_MGR`

源码锚点：

- `drivers/android/binder.c` — `binder_ioctl_set_ctx_mgr`
- `include/uapi/linux/android/binder.h` — `BINDER_SET_CONTEXT_MGR`

TODO：AI 放关键源码；你补你板端内核版本的差异。

要讲清：

- context manager 只能有一个；
- `binder_context_mgr_node` 保存在哪里；
- 为什么第二次设置会失败。

## 5. handle 0 的分支

源码锚点：

- `drivers/android/binder.c` — `binder_transaction`
- `binder_get_ref_olocked` 与 `binder_context_mgr_node` 的区别

TODO：AI 放关键分支；你确认 handle 0 不查普通 ref 表。

## 6. 验证

TODO：贴真实命令和输出。

```text
TODO：adb shell ps -A | grep -E "servicemanager|system_server"
TODO：adb shell service list | head -n 20
TODO：adb shell ls -l /dev/binder /dev/binderfs
TODO：adb shell cat /proc/$(pidof servicemanager)/maps | grep binder
```

要回答：

- servicemanager 和 system_server 是不是两个 PID？
- servicemanager 映射了哪个 Binder 设备？
- `service list` 里能不能看到 `"manager"`？如果没有，为什么？

## 7. 平台差异

TODO：你的开发板 / 车机与 AOSP 13 的差异：

- `servicemanager` 是否被 vendor 修改？
- `/dev/binder` 还是 binderfs？
- SELinux domain / `service_contexts` 有没有不同？
- 启动顺序有没有被 init.rc 或厂商服务改动？

没有差异就写“未发现”。

## 8. 结论

TODO：3–5 条，必须能回到代码或输出。

## 9. 待确认

- [ ] AOSP 13 的 `main.cpp` 与板端树是否一致
- [ ] Binder 设备路径
- [ ] `service list` 是否包含 `"manager"`
- [ ] 是否需要补 Android 14 的差异
