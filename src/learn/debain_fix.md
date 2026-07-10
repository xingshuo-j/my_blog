# 记录一些使用debain系统遇到的错误及当时的修复方法
## 在休眠恢复后打开电脑，键盘能接上电源但不可用
解决方案：
在`/etc/default/grub`中修改了`GRUB_CMDLINE_LINUX_DEFAULT="quiet"`为`GRUB_CMDLINE_LINUX_DEFAULT="quiet atkbd.reset"`,用`sudo update-grub`更新后重启
```bash
sudo update-grub   # 1. 更新 GRUB 配置
Generating grub configuration file ...
Found background image: /usr/share/images/desktop-base/desktop-grub.png
Found linux image: /boot/vmlinuz-6.12.94+deb13-amd64
Found initrd image: /boot/initrd.img-6.12.94+deb13-amd64
Found linux image: /boot/vmlinuz-6.12.86+deb13-amd64
Found initrd image: /boot/initrd.img-6.12.86+deb13-amd64
Warning: os-prober will be executed to detect other bootable partitions.
Its output will be used to detect bootable binaries on them and create new boot entries.
Found Debian GNU/Linux 13 trixie on /dev/nvme0n1p2
Adding boot menu entry for UEFI Firmware Settings ...
done
```
## 不算是系统问题，damm，KVM的usb直连为什么我用不明白啊orz
根本没问题，开启虚拟机，选择`Add Hardware`，然后找到对应usb选项，双击选择点击finish就能看见了，ai一直让关闭虚拟机，选择后再开启，不能尽信ai啊各位。

## 和桌面有关的应用删除的时候一定谨慎再谨慎，下完cairo dock但不能打开，努力后发现是和kde冲突，于是转手清干净了，然后我的桌面就die了，目前初步判断是把卸载的时候把kde的依赖也顺手踢死了
### 当前已有解决措施：
正常打开发现异常，点击`Ctrl+Alt+F2`进入`tty`界面（赞美万能的纯命令行~~没可用命令的除外~~），运行`sudo apt install --reinstall kde-plasma-desktop sddm`修复kde依赖。
### 目前桌面活了，但锁屏还是die，留个坑等修好了来留言

## 上一个还没完全干完下一个就来了，KVM又给我来了点问题
貌似不是大问题，虚拟机网络未激活，运行下列命令就解决了
```bash
sudo virsh net-start default
sudo virsh net-autostart default
```
