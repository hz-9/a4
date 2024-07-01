# Network

In general, when a Node.js application starts, it listens on a specific port. However, if that port is already in use, a port conflict issue may occur. To solve this problem, A4 provides the `@hz-9/a4-network` module. When a port conflict occurs, this module will attempt to obtain a new port to ensure the service starts properly. Additionally, it allows you to specify whether the application should listen on IPv4 or IPv6.

## Installation

First, we need to install the required dependencies:

``` sh
npm i @hz-9/a4-network
```

## Getting Started

Import the `A4Log4jsLogModule` module in the `src/app.module.ts` file.

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

Here, `A4NetworkModule` depends on `A4Config` and reads the configuration options using `A4NetworkModule.getConfig(a4Config)` to return a simplified configuration information.

`A4NetworkModule.Schema` is the configuration model for `A4NetworkModule`.

For more configuration details, please refer to the [Options](../../guide/a4-network/options) section.
