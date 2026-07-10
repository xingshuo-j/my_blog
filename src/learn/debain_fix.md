---
title: Debian 系统错误修复记录
category: Linux
date: 2026-07-10
slug: debain-fix
excerpt: 记录使用Debian系统遇到的错误修复方法，包括键盘休眠、KVM USB直连、桌面环境修复等。
---
# 记录一些使用Debian系统遇到的错误及当时的修复方法

## 在休眠恢复后打开电脑，键盘能接上电源但不可用
解决方案：在`/etc/default/grub`中修改了`GRUB_CMDLINE_LINUX_DEFAULT="quiet"`为`GRUB_CMDLINE_LINUX_DEFAULT="quiet atkbd.reset"`,用`sudo update-grub`更新后重启

```bash
sudo update-grub
```

## KVM的usb直连
根本没问题，开启虚拟机，选择`Add Hardware`，然后找到对应usb选项，双击选择点击finish就能看见了。

## 和桌面有关的应用删除时需谨慎
下完cairo dock但不能打开，努力后发现是和kde冲突，转手清干净了，桌面就die了。

### 措施：
按`Ctrl+Alt+F2`进入`tty`界面，运行`sudo apt install --reinstall kde-plasma-desktop sddm`修复kde依赖。

## KVM网络问题
虚拟机网络未激活：

```bash
sudo virsh net-start default
sudo virsh net-autostart default
```
