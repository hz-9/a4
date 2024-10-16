# Documentation

<!-- In project development, code documentation is an essential part of team communication -->

In project development, code documentation is an essential part of team communication. `A4` provides the `@hz-9/a4-docs` module to ensure the proper display of Restful. This feature is implemented based on [@nestjs/swagger](https://docs.nestjs.com/openapi/introduction). `@hz-9/a4-docs` provides a set of interfaces to control the actions implemented by `@nestjs/swagger` in the `A4` application service.

## Installation

First, we need to install the required dependencies:

``` sh
npm i @hz-9/a4-docs
```

<!-- TODO Limit listening for IPv4 and IPv6 -->

## Getting Started

Import the `A4Log4jsLogModule` module in the `src/app.module.ts` file.

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

Here, `A4DocsModule` depends on `A4Config` and reads the configuration items through `A4DocsModule.getConfig(a4Config)` to return a simplified configuration information.

`A4DocsModule.Schema` is the configuration model of `A4DocsModule`.

For more information on log configuration, please refer to the [link](TODO).
