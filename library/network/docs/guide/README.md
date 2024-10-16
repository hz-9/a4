# @hz-9/a4-network

![NPM Version][npm-version-url] ![NPM License][npm-license-url] ![NPM Downloads][npm-downloads-url] ![Types][types-url]
<br /> ![Node Version][node-version-url] ![Last Commit][last-commit-url]

[npm-version-url]: https://badgen.net/npm/v/@hz-9/a4-network
[npm-license-url]: https://badgen.net/npm/license/@hz-9/a4-network
[npm-downloads-url]: https://badgen.net/npm/dt/@hz-9/a4-network
[types-url]: https://badgen.net/npm/types/@hz-9/a4-network
[node-version-url]: https://badgen.net/npm/node/@hz-9/a4-network
[last-commit-url]: https://badgen.net/github/last-commit/hz-9/a4

## Introduction

The `@hz-9/a4-network` is a network module library for the `@hz-9/a4-*` applications. It provides functionality to retrieve the current network interface card and available port numbers.

## Installation

To start using `@hz-9/a4-network`, you first need to install the required dependencies. If you are not using it in an `A4` application service, you can refer to [How to use `A4 Module` in a regular Nest.js application service?](TODO).

``` sh
pnpm i @hz-9/a4-network
```

## Getting Started

The core module of `@hz-9/a4-network` is `A4NetworkModule`. We can register it in the `AppModule` using the `A4NetworkModule.forRoot` method.

``` ts
// src/app.module.ts

import { MiddlewareConsumer, Module } from '@nestjs/common'
import { A4NetworkModule } from '@hz-9/a4-network'

@Module({
  imports: [
    A4NetworkModule.forRoot(),
  ],
})
export class AppModule {
  // ...
}
```

Our default port is `16100`, and when the port is occupied, we will continuously try `+1`. You can also specify the port directly.

``` ts
// src/app.module.ts

import { MiddlewareConsumer, Module } from '@nestjs/common'
import { A4NetworkModule } from '@hz-9/a4-network'

@Module({
  imports: [
    A4NetworkModule.forRoot({
      forcePort: 16101
    }),
  ],
})
export class AppModule {
  // ...
}
```

The above scenarios are for using `@hz-9/a4-network` independently. `A4` recommends using it in conjunction with `@hz-9/a4-config`.

``` ts
// src/app.module.ts

import { MiddlewareConsumer, Module } from '@nestjs/common'

import { A4ConfigModule, A4Config } from '@hz-9/a4-config'
import { A4NetworkModule } from '@hz-9/a4-network'

@Module({
  imports: [
    A4ConfigModule.forRoot({
      Schema: [
        A4NetworkModule.Schema
      ]
    }),
    A4NetworkModule.forRootAsync({
      inject: [A4Config],
      useFactory: (a4Config: A4Config) => A4NetworkModule.getConfig(a4Config),
    }),
  ],
})
export class AppModule {
  // ...
}
```

Now, we can control the operation of `A4NetworkModule` through the configuration file. For configuration details, please refer to [Configuration Options](./options).

If we want to use the internal information or capabilities of `A4NetworkModule`, we can use the registered `A4Network` class.

``` ts
// src/app.module.ts

import { MiddlewareConsumer, Module } from '@nestjs/common'
import { A4NetworkModule, A4Network } from '@hz-9/a4-network'

@Module({
  imports: [
    A4NetworkModule.forRoot({
      forcePort: 16101
    }),
  ],
})
export class AppModule {
  public constructor(protected readonly a4Network: A4Network) {
    this._init()
  }

  private _init(): void {
    const currentPort = this.a4Network.currentPort
    console.log('Current Port: ', currentPort)
  }
}
```

Getting `A4Network` through `A4Network` is not always possible, it depends on which [registration function](../../overview/internal/module-register.html) is used.
