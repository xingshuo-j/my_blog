---
title: KVM 实用操作记录
category: 虚拟化
date: 2026-07-10
slug: kvm-readme
excerpt: 记录一些KVM需要但老是忘记的操作，包括创建共享文件夹、virtio-fs服务配置等。
---
# 记录一些KVM需要但老是忘记的操作

## 1.如何创建共享文件夹
主机创建一个共享文件夹，我创建在`~/share/win11/`,然后在虚拟机内点击`View`后点击`Details`，或者直接点击第二行那个蓝色的i，点左侧的`Memory`，在选项卡内选择`Enable shared Memory`，然后点击左侧最下的`Add Hardware`，选择`Filesystem`，`Driver`正常选择`virtiofs`，`Source path`填主机创建的共享文件夹的路径，`Target path`是填虚拟机内你的共享文件夹的名称，下面那个选项的意思是只读，可选可不选。接下来进入虚拟机，按`win+r`输入`services.msc`，找到`VirtIO-FS Services`，启动类型设为自动并启动，重启后可在文件资源管理器上看见共享文件夹。

# 折腾虚拟机的问题还是写这里合适（放在尾页提醒自己的）

## 下载并激活virtio-win-guest-tools.exe后无法启动服务
`win+r`输入`appwiz.cpl`，查找有没有`WinFsp`或`Windows File System Proxy`，没找到，在`https://github.com/winfsp/releases`找到最新的`*.msi`包并下载，打开这个文件和正常下载文件一样，保持默认选项下载，然后重启电脑，再次启动服务
