# 缓存

`A4` 对于缓存模块是基于 `cache-mananger` 进行的封装。支持多级缓存。

## 安装

首先，我们需要安装所需的依赖项：

``` sh
npm i @hz-9/a4-cache cache-manager-ioredis-yet@^2.1.1
```

## 开始

在 `src/app.module.ts` 文件中导入 `A4Log4jsLogModule` 模块。

``` ts
// src/app.module.ts

import { MiddlewareConsumer, Module } from '@nestjs/common'

import { LoggerMiddleware } from '@hz-9/a4-core'
import { A4CacheModule } from '@hz-9/a4-cache'

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

    A4CacheModule.forRootAsync({
      inject: [A4Config],
      useFactory: (a4Config: A4Config) => A4CacheModule.getConfig(a4Config),
    }),
  ],
})
export class AppModule {
  public configure(consumer: MiddlewareConsumer): void {
    consumer.apply(LoggerMiddleware).forRoutes('*')
  }
}

```

在这里，`A4CacheModule` 依赖于 `A4Config`，并通过 `A4CacheModule.getConfig(a4Config)` 读取配置项并返回一个简易的配置信息。

`A4CacheModule.Schema` 是 `A4CacheModule` 的配置项模型。

更多的日志配置说明，请参阅 [链接](TODO)。

<!-- TODO 进行更多模块的设置 -->

## 设置缓存信息

TODO 补充缓存操作方案

### 在 Controller 缓存

TODO

### 在 Service 操作缓存

TODO
