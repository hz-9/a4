# Cache

`A4` encapsulates the cache module based on `cache-manager`. It supports multi-level caching.

## Installation

First, we need to install the required dependencies:

``` sh
npm i @hz-9/a4-cache cache-manager-ioredis-yet@^2.1.1
```

## Getting Started

Import the `A4Log4jsLogModule` module in the `src/app.module.ts` file.

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

Here, `A4CacheModule` depends on `A4Config` and reads the configuration using `A4CacheModule.getConfig(a4Config)` to return a simplified configuration information.

`A4CacheModule.Schema` is the configuration model of `A4CacheModule`.

For more information on log configuration, please refer to the [link](TODO).

<!-- TODO: More module settings -->

## Setting Cache Information

TODO: Add cache operation plan

### Caching in Controller

TODO

### Cache Operations in Service

TODO
