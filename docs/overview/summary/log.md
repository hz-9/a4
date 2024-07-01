# Log

`A4` has reconfigured the log module. When `@hz-9/a4-log-log4js` is not installed, `A4` will use a simplified log module that only outputs logs to the console.

The `@hz-9/a4-log-log4js` module is named this way instead of `@hz-9/a4-log` or `@hz-9/a4-log4js` to allow `A4`'s log module to be implemented based on other log libraries. In the future, `A4` will provide other log modules.

This chapter will introduce how to configure logs.

<!-- TODO Replace the default log situation of Nest.js. -->
<!-- TODO Provide a complete configuration file for Log4js. -->

## Installation

First, we need to install the required dependencies:

``` sh
npm i @hz-9/a4-log-log4js
```

## Getting Started

Next, set the default log format during the initialization phase in the `src/main.ts` file.

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

Next, import the `A4Log4jsLogModule` module in the `src/app.module.ts` file.

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

Here, `A4Log4jsLogModule` depends on `A4Config` and reads the configuration options by calling `A4Log4jsLogModule.simpleOptions(a4Config)`.

`A4Log4jsLogModule.Schema` is the configuration model of `A4Log4jsLogModule`.

For more configuration details, please refer to the [Options](../../guide/a4-log-log4js/options) section.

## How to Use

You can create an object using the `Logger` class from `@nestjs/common` in any environment.

``` ts
import { Injectable, Logger } from '@nestjs/common'

@Injectable()
export class DicService {
  protected readonly logger: Logger = new Logger('DicService')

  public run(): Promise<void> {
    this.logger.log('Running.')
  }
}

```

<!-- ## Multiple Log Files -->
<!-- TODO Solution for multiple log files -->
<!-- TODO Setting different log levels -->
<!-- TODO Using winston as another log module -->