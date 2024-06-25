# 文档

在项目开发中，代码文档是团队的沟通必不可少的一部分。`A4` 提供 `@hz-9/a4-docs` 模块来保证 Restful 的合理显示。此功能基于 [@nestjs/swagger](https://docs.nestjs.com/openapi/introduction) 进行实现。`@hz-9/a4-docs` 提供了一套接口来控制 `@nestjs/swagger` 在 `A4` 应用服务中实现的动作。

## 安装

首先，我们需要安装所需的依赖项：

``` sh
npm i @hz-9/a4-docs
```

<!-- TODO 对于 IPv4 IPv6 的侦听进行限制 -->

## 开始

在 `src/app.module.ts` 文件中导入 `A4Log4jsLogModule` 模块。

``` ts
// src/app.module.ts

import { MiddlewareConsumer, Module } from '@nestjs/common'

import { LoggerMiddleware } from '@hz-9/a4-core'
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

    A4DocsModule.forRootAsync({
      inject: [A4Config],
      useFactory: (a4Config: A4Config) => A4DocsModule.getConfig(a4Config),
    }),
  ],
})
export class AppModule {
  public configure(consumer: MiddlewareConsumer): void {
    consumer.apply(LoggerMiddleware).forRoutes('*')
  }
}

```

在这里，`A4DocsModule` 依赖于 `A4Config`，并通过 `A4DocsModule.getConfig(a4Config)` 读取配置项并返回一个简易的配置信息。

`A4DocsModule.Schema` 是 `A4DocsModule` 的配置项模型。

更多的日志配置说明，请参阅 [链接](TODO)。

<!-- TODO 进行更多模块的设置 -->

## 数据接口

<!-- TODO 补充日常开发时的问题 -->
