# @hz-9/a4-network

![NPM 版本][npm-version-url] ![NPM 许可证][npm-license-url] ![NPM 下载量][npm-downloads-url] ![类型][types-url]
<br /> ![Node 版本][node-version-url] ![最后提交][last-commit-url]

[npm-version-url]: https://badgen.net/npm/v/@hz-9/a4-network
[npm-license-url]: https://badgen.net/npm/license/@hz-9/a4-network
[npm-downloads-url]: https://badgen.net/npm/dt/@hz-9/a4-network
[types-url]: https://badgen.net/npm/types/@hz-9/a4-network
[node-version-url]: https://badgen.net/npm/node/@hz-9/a4-network
[last-commit-url]: https://badgen.net/github/last-commit/hz-9/a4

## 简介

`@hz-9/a4-*` 应用程序中的网络模块库。它提供了检索当前网络接口卡和可用端口号的功能。

## 安装

要开始使用 `@hz-9/a4-network`，首先需要安装所需的依赖项。如果你不是在 `A4` 应用服务中使用，可以参考 [如何在普通 Nest.js 应用服务中使用 `A4 Module`?](TODO)。

``` sh
pnpm i @hz-9/a4-network
```

## 开始

`@hz-9/a4-network` 的核心模块是 `A4NetworkModule`。我们可以使用 `A4NetworkModule.forRoot` 方法在 `AppModule` 中进行注册。

``` ts
// src/app.module.ts

import { MiddlewareConsumer, Module } from '@nestjs/common'
import { A4NetworkModule } from '@hz-9/a4-network'

@Module({
  imports: [
    A4NetworkModule.forRoot(),
  ],
})
export class AppModule {
  // ...
}
```

我们的默认端口是 `16100`，当端口被占用时，我们会 `+1` 不断尝试。你也可以直接指定端口。

``` ts
// src/app.module.ts

import { MiddlewareConsumer, Module } from '@nestjs/common'
import { A4NetworkModule } from '@hz-9/a4-network'

@Module({
  imports: [
    A4NetworkModule.forRoot({
      forcePort: 16101
    }),
  ],
})
export class AppModule {
  // ...
}
```

以上都是独立使用 `@hz-9/a4-network` 的场景。`A4` 更推荐与 `@hz-9/a4-config` 联合使用。

``` ts
// src/app.module.ts

import { MiddlewareConsumer, Module } from '@nestjs/common'

import { A4ConfigModule, A4Config } from '@hz-9/a4-config'
import { A4NetworkModule } from '@hz-9/a4-network'

@Module({
  imports: [
    A4ConfigModule.forRoot({
      Schema: [
        A4NetworkModule.Schema
      ]
    }),
    A4NetworkModule.forRootAsync({
      inject: [A4Config],
      useFactory: (a4Config: A4Config) => A4NetworkModule.getConfig(a4Config),
    }),
  ],
})
export class AppModule {
  // ...
}
```

此时，我们可以通过配置文件来控制 `A4NetworkModule` 的操作情况。配置说明请参阅 [配置项说明](./options)。

如果我们想使用 `A4NetworkModule` 内部的信息或一些能力。我们可以使用被注册的 `A4Network` 类。

``` ts
// src/app.module.ts

import { MiddlewareConsumer, Module } from '@nestjs/common'
import { A4NetworkModule, A4Network } from '@hz-9/a4-network'

@Module({
  imports: [
    A4NetworkModule.forRoot({
      forcePort: 16101
    }),
  ],
})
export class AppModule {
  public constructor(protected readonly a4Network: A4Network) {
    this._init()
  }

  private _init(): void {
    const currentPort = this.a4Network.currentPort
    console.log('Current Port: ', currentPort)
  }
}
```

通过 `A4Network` 获取 `A4Network` 并不是永远能获取到的，这取决于使用哪个 [注册函数](../../overview/internal/module-register.html)？
