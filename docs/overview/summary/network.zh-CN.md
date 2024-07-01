# 网络

通常情况下，Node.js 应用程序在启动时会监听某一端口，当该端口被占用时会出现端口冲突问题。为了解决这个问题，A4提供了`@hz-9/a4-network`模块。当端口冲突时，该模块会尝试获取一个新的端口来保证服务正常启动。同时，还可以对应用程序是侦听IPv4还是V6进行设置。

## 安装

首先，我们需要安装所需的依赖项：

``` sh
npm i @hz-9/a4-network
```

## 开始

在 `src/app.module.ts` 文件中导入 `A4Log4jsLogModule` 模块。

``` ts
// src/app.module.ts

import { MiddlewareConsumer, Module } from '@nestjs/common'

import { LoggerMiddleware } from '@hz-9/a4-core'
import { A4ConfigModule, A4Config } from '@hz-9/a4-config'
import { A4NetworkModule } from '@hz-9/a4-network'

import { AppConfigSchema } from './app.schema'

@Module({
  imports: [
    A4ConfigModule.forRootAsync({
      useFactory: async () => ({
        type: 'file',
        Schema: [
          AppConfigSchema,
          A4NetworkModule.Schema,
        ],
      }),
    }),

    A4NetworkModule.forRootAsync({
      inject: [A4Config],
      useFactory: (a4Config: A4Config) => A4NetworkModule.getConfig(a4Config),
    }),
  ],
})
export class AppModule {
  public configure(consumer: MiddlewareConsumer): void {
    consumer.apply(LoggerMiddleware).forRoutes('*')
  }
}

```

在这里，`A4NetworkModule` 依赖于 `A4Config`，并通过 `A4NetworkModule.getConfig(a4Config)` 读取配置项并返回一个简易的配置信息。

`A4NetworkModule.Schema` 是 `A4NetworkModule` 的配置项模型。

更多的配置说明，请参阅 [配置项](../../guide/a4-network/options)。
