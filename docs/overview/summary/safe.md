# Security

`A4` places security-related features in the `@hz-9/a4-safe` module. Currently, `@hz-9/a4-safe` is responsible for `CORS` and `helmet` functionality.

## Installation

First, we need to install the required dependencies:

``` sh
npm i @hz-9/a4-safe
```

## Getting Started

Import the `A4SafeModule` module in the `src/app.module.ts` file.

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

Here, `A4SafeModule` depends on `A4Config` and reads the configuration options using `A4SafeModule.getConfig(a4Config)` to return a simplified configuration information.

`A4SafeModule.Schema` is the configuration model for `A4SafeModule`.

For more configuration details, please refer to the [link](TODO).

## Enable CORS

<!-- TODO -->

## Set up Helmet

<!-- TODO -->
