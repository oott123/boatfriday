# boatfriday

演示如何移除手游的 SSL Pin。

## 能……

1. 绕过 config hash 检查
2. 绕过 SSL pin

## 构……

```bash
yarn
yarn build
```

## 怎……

1. 安装好 Magisk，启动 Zygisk
2. 在 Magisk 里安装 [Move Certificates](https://github.com/Magisk-Modules-Repo/movecert)、[LSPosed](https://github.com/LSPosed/LSPosed)、[MagiskFrida](https://github.com/ViRb3/magisk-frida) - 当然你自己开 frida 也可以。
3. 在 LSPosed 里安装 [TrustMeAlready](https://github.com/ViRb3/TrustMeAlready) 并勾选系统框架和明日方舟。如果看不到明日方舟，右上角三点-隐藏，取消勾选“游戏”
4. 安装任意 HTTP VPN，比如 [HTTP Proxy Client](https://play.google.com/store/apps/details?id=com.assets.androidproxy)
5. 运行 mitm proxy，手机连接对应 proxy，导航到 [mitm.it](http://mitm.it)，下载并安装证书
6. 重启手机
7. 连好 adb，安装好 frida-tools，在本仓库运行 `yarn start 包名`
