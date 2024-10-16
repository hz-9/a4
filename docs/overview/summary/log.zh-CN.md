# 日志

`A4` 对日志模块进行了重新设置。在不安装 `@hz-9/a4-log-log4js` 时将会采用 `A4` 的简易日志模块，该模块仅会在控制台输出日志。

`@hz-9/a4-log-log4js` 模块被如此命名而非 `@hz-9/a4-log` 或 `@hz-9/a4-log4js` 是希望 `A4` 的日志模块也可以基于其他日志库实现。后续 `A4` 将会提供其他的日志模块。

本章将会介绍如何进行日志的设置。

<!-- TODO 替换 Nest.js 默认日志情况。 -->
<!-- TODO 提供一个对于 Log4js 相关的全量配置文件。 -->

## 安装

首先，我们需要安装所需的依赖项：

``` sh
npm i @hz-9/a4-log-log4js
```

## 开始

接下来，在 `src/main.ts` 文件中设置默认初始化阶段的日志格式。

``` ts
// src/main.ts

import 'reflect-metadata'

import { A4Factory } from '@hz-9/a4-core'
import { A4Log4jsLogModule } from '@hz-9/a4-log-log4js'

import { AppModule } from './app.module'

;(async (): Promise<void> => {
  const app = await A4Factory.create(AppModule, {
    logger: await A4Log4jsLogModule.getInitLogger(),
  })

  await app.listen()

  await app.printAddress()
})()
```

接下来，在 `src/app.module.ts` 文件中导入 `A4Log4jsLogModule` 模块。

``` ts
// src/app.module.ts

import { MiddlewareConsumer, Module } from '@nestjs/common'

import { LoggerMiddleware } from '@hz-9/a4-core'
import { A4Log4jsLogModule } from '@hz-9/a4-log-log4js'
import { A4ConfigModule, A4Config } from '@hz-9/a4-config'

import { AppConfigSchema } from './app.schema'

@Module({
  imports: [
    A4ConfigModule.forRootAsync({
      useFactory: async () => ({
        type: 'file',
        Schema: [
          AppConfigSchema,
          A4Log4jsLogModule.Schema,
        ],
      }),
    }),

    A4Log4jsLogModule.forRootAsync({
      inject: [A4Config],
      useFactory: (a4Config: A4Config) => A4Log4jsLogModule.simpleOptions(a4Config),
    }),
  ],
})
export class AppModule {
  public configure(consumer: MiddlewareConsumer): void {
    consumer.apply(LoggerMiddleware).forRoutes('*')
  }
}

```

在这里，`A4Log4jsLogModule` 依赖于 `A4Config`，并通过 `A4Log4jsLogModule.simpleOptions(a4Config)` 读取配置项并返回一个简易的配置信息。

`A4Log4jsLogModule.Schema` 是 `A4Log4jsLogModule` 的配置项模型。

更多的配置说明，请参阅 [配置项](../../guide/a4-log-log4js/options)。

## 如何使用

可以在任意环境，通过从 `@nestjs/common` 引用 `Logger` 类创建对象使用。

``` ts
import { Injectable, Logger } from '@nestjs/common'

@Injectable()
export class DicService {
  protected readonly logger: Logger = new Logger('DicService')

  public run(): Promise<void> {
    this.logger.log('Runing.')
  }
}

```

<!-- ## 多日志文件 -->
<!-- TODO 需求多日志文件时的方案 -->
<!-- TODO 设定不同的日志界别 -->
<!-- TODO 使用 winston 作为另一个日志模块 -->