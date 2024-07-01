# @hz-9/a4-log-log4js

![NPM 版本][npm-version-url] ![NPM 许可证][npm-license-url] ![NPM 下载量][npm-downloads-url] ![类型][types-url]
<br /> ![Node 版本][node-version-url] ![最后提交][last-commit-url]

[npm-version-url]: https://badgen.net/npm/v/@hz-9/a4-log-log4js
[npm-license-url]: https://badgen.net/npm/license/@hz-9/a4-log-log4js
[npm-downloads-url]: https://badgen.net/npm/dt/@hz-9/a4-log-log4js
[types-url]: https://badgen.net/npm/types/@hz-9/a4-log-log4js
[node-version-url]: https://badgen.net/npm/node/@hz-9/a4-log-log4js
[last-commit-url]: https://badgen.net/github/last-commit/hz-9/a4

<!-- TODO 对于 IPv4 IPv6 的侦听进行限制 -->

## 简介

`@hz-9/a4-*` 应用程序中的日志模块库。它使用 [log4js] 进行实现。

[log4js]: https://log4js-node.github.io/log4js-node/

## 安装

要开始使用 `@hz-9/a4-log-log4js`，首先需要安装所需的依赖项。如果你不是在 `A4` 应用服务中使用，可以参考 [如何在普通 Nest.js 应用服务中使用 `A4 Module`?](TODO)。

``` sh
pnpm i @hz-9/a4-log-log4js
```

## 开始

`@hz-9/a4-log-log4js` 预计存在多个核心模块。不同模块的区别在于默认日志的输出格式不同，`Schema` 配置读取配置不同。注册方式会保持一致。当然多个日志模块采用全局注册，多个核心模块应进行时其中某一个。

当前开发的核心模块为 `A4Log4jsSimpleLogModule`， 意为简易日志。只会输出一个 `app.log` 日志文件。

首先我们使用 `A4NetworkModule.forRoot` 方法在 `AppModule` 中进行注册。

``` ts
// src/app.module.ts

import { MiddlewareConsumer, Module } from '@nestjs/common'
import { A4Log4jsSimpleLogModule } from '@hz-9/a4-log-log4js'

@Module({
  imports: [
    A4Log4jsSimpleLogModule.forRoot(LogModule.defaultConfig),
  ],
})
export class AppModule {
  // ...
}
```

TODO 继续补充文档。！！！
