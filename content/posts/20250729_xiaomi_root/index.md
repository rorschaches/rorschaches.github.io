---
title: "红米 Note 9 5G unlock & get root"
date: 2025-07-29
draft: false
description: "."
summary: "介绍了如何解锁并使手机获得root权限."
slug: "advancion"
tags: ["网络优化", "Android"]
---

# 手机BL解锁 (Boot Loader)

小米 BootLoader 解锁指的是解除小米手机系统引导程序（BootLoader）所施加的限制。通常情况下，小米手机厂商会对 BootLoader 予以锁定，这主要是为了确保手机的安全性和稳定性。

小米的 BootLoader 在手机开机启动过程中发挥着关键作用。它首先负责初始化手机的关键硬件组件，包括处理器、内存、存储设备以及通信模块等，将这些硬件设置到一个既定且可靠的状态，为后续的系统启动做好充分准备。同时，它还承担着引导启动流程的重任，决定接下来加载哪个系统镜像，比如正常的小米 MIUI 系统或者特定的恢复模式等。然而，如果您希望进行诸如获取 root 权限、安装第三方 ROM 等高级操作，就必须解锁小米的 BootLoader 。

## 方法一：使用官方工具解锁

下载[官方解锁工具](https://www.miui.com/unlock/index.html)

{{< figure src="fig1.jpg" class="m-auto mt-6 max-w-prose" >}}

1.1. 在需要解锁的设备中登录已经具备解锁权限的小米账号，并进入“设置 -> 开发者选项 -> 设备解锁状态”中绑定账号和设备;
1.2. 手动进入Bootloader模式（FastBoot模式）（关机后，同时按住开机键和音量下键）；
1.3. 通过USB连接手机，点击 “解锁”按钮；

[注] 此工具需要设备绑定小米账号7天。

## 方法二：MTK SOC通用解锁BL

联发科MTK方案手机，可以通过MTK的相关软件，进行保留数据立刻解BL锁。理论上支持天玑920之前所发布的联发科MTK方案机型。

[解锁工具](https://androidfilehost.com/?fid=7161016148664819376)

2.1. 打开MTK 解锁软件
   {{< figure src="fig2.jpg" class="m-auto mt-6 max-w-prose" >}}

2.2. 安装驱动
 {{< figure src="fig3.jpg" class="m-auto mt-6 max-w-prose" >}}

2.3 开始解锁
 {{< figure src="fig4.jpg" class="m-auto mt-6 max-w-prose" >}}

手机关机。手机关机状态同时按下音量键+与音量键-，并在按着按键的状态插入数据线链接电脑（不是fastboot/米兔等， 或者按开机键和音量+- 三键）。

成功链接设备后进程提示框会有反应，进程提示框有反应后可松开音量键。
 {{< figure src="fig5.jpg" class="m-auto mt-6 max-w-prose" >}}

 BL解锁成功了。
 {{< figure src="fig6.jpg" class="m-auto mt-6 max-w-prose" >}}

 PS:手机开机会有dm验证提示行（开机显示mi屏时左侧屏幕文字），需要在5s内按一次电源键即可进入系统；
 消除方法：手机先进fastboot，电脑`win`+`R`，输入`cmd`回车，输入 `fastboot oem cdms` 回车就可以了。（需要在fastboot目录，没有添加环境变量的话用`./fastboot`也可以,不行的话可以通过刷机工具从ADB终端输入命令）

# 提取boot.img

由于在安装面具并修补 boot.img 时，要求固件与手机内的软件版本必须保持一致。因此，您需要选择与本机相同型号的版本。这里建议您在下载完官方固件后直接进行刷机操作（见本文最后一章），刷机完成后，手机的版本自然就会与您下载的固件版本相同了，同时也能够判断所下载的固件是否适用。之后，再进行提取 boot.img 文件的操作。

在官方线刷包的image目录下可以找到 boot.img 文件。
也可以从卡刷包的 payload.bin 文件中使用 payload-dumper-go 提取 boot.img文件。

# 修补boot.img

1.首先，使用 USB 数据线将手机与电脑连接，手机选择文件传输模式，随后把 boot.img 复制到手机的 Download 目录。

2.接下来，下载 Magisk APP 并进行安装：点击下载 [Magisk APP](https://magiskcn.com/magisk-download.html)
 {{< figure src="fig7.jpg" class="m-auto mt-6 max-w-prose" >}}

3.然后打开 Magisk，按照以下步骤操作：①：点击“安装”； ②：选择“boot.img”； ③：开始修补文件； ④：修补完成（此时修补生成的“magisk_patched-xxx.img”文件会出现在 Download 目录）。
 {{< figure src="fig8.jpg" class="m-auto mt-6 max-w-prose" >}}

4.把修补后的“magisk_patched-xxx.img”从 Download 文件夹移动到电脑。

# 写入boot.img

手机处于关机状态，同时长按电源键和音量下键，直至手机进入 fastboot 模式，进入模式后松开按键，连接电脑。

`fastboot devices` 查看连接设备；

`fastboot flash root magisk_patched-xxx.img` 写入修补之后的img；

成功写入：
 {{< figure src="fig9.jpg" class="m-auto mt-6 max-w-prose" >}}

如果显示img包太大，可使用 `fastboot flash -S 100MM root magisk_patched-xxx.img` 分批写入。


# 补充：手动刷机方法

可以直接用[MiFlash](https://miuiver.com/miflash/)进行刷机，先安装驱动，加载刷机包，再刷机。
 {{< figure src="fig10.jpg" class="m-auto mt-6 max-w-prose" >}}

[小米线刷报错问题及解决方法](https://miuiver.com/miflash-problem-list/)






<script src="https://giscus.app/client.js"
        data-repo="rorschaches/rorschaches.github.io"
        data-repo-id="R_kgDOOagVyA"
        data-category="Announcements"
        data-category-id="DIC_kwDOOagVyM4CpMG8"
        data-mapping="pathname"
        data-strict="0"
        data-reactions-enabled="1"
        data-emit-metadata="0"
        data-input-position="bottom"
        data-theme="light"
        data-lang="zh-CN"
        crossorigin="anonymous"
        async>
</script>