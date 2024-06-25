# 安全

`A4` 将和安全相关的功能放置于 `@hz-9/a4-safe` 模块中。当前 `@hz-9/a4-safe` 负责 `CORS` 与 `helmet` 功能。

## 安装

首先，我们需要安装所需的依赖项：

``` sh
npm i @hz-9/a4-safe
```

## 开始

在 `src/app.module.ts` 文件中导入 `A4Log4jsLogModule` 模块。

``` ts
// src/app.module.ts

import { MiddlewareConsumer, Module } from '@nestjs/common'

import { LoggerMiddleware } from '@hz-9/a4-core'
import { A4SafeModule } from '@hz-9/a4-safe'
import { A4DocsModule, A4Config } from '@hz-9/a4-docs'

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

    A4SafeModule.forRootAsync({
      inject: [A4Config],
      useFactory: (a4Config: A4Config) => A4SafeModule.getConfig(a4Config),
    }),
  ],
})
export class AppModule {
  public configure(consumer: MiddlewareConsumer): void {
    consumer.apply(LoggerMiddleware).forRoutes('*')
  }
}

```

在这里，`A4SafeModule` 依赖于 `A4Config`，并通过 `A4SafeModule.getConfig(a4Config)` 读取配置项并返回一个简易的配置信息。

`A4SafeModule.Schema` 是 `A4SafeModule` 的配置项模型。

更多的配置说明，请参阅 [链接](TODO)。

## 开启 `CORS`

<!-- TODO -->

## 设置 Helmet

<!-- TODO -->
