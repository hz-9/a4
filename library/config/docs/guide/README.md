# @hz-9/a4-config

![NPM Version][npm-version-url] ![NPM License][npm-license-url] ![NPM Downloads][npm-downloads-url] ![Types][types-url]
<br /> ![Node Version][node-version-url] ![Last Commit][last-commit-url]

[npm-version-url]: https://badgen.net/npm/v/@hz-9/a4-config
[npm-license-url]: https://badgen.net/npm/license/@hz-9/a4-config
[npm-downloads-url]: https://badgen.net/npm/dt/@hz-9/a4-config
[types-url]: https://badgen.net/npm/types/@hz-9/a4-config
[node-version-url]: https://badgen.net/npm/node/@hz-9/a4-config
[last-commit-url]: https://badgen.net/github/last-commit/hz-9/a4

## Introduction

`@hz-9/a4-config` is a library for loading configuration information in `A4` applications. It supports multiple configuration loading schemes.

`@hz-9/a4-config` provides the functionality of the current `A4 Config Module` to read configuration information from `YAML` and `JSON` files. Additionally, it supports loading configuration information from HTTP URLs and provides an option for custom loading functions.

For setting up a comprehensive and type-safe configuration, refer to [Setting Configuration Items - Methodology](./schema#methodology).

## Installation

To start using `@hz-9/a4-config`, you need to install the required dependencies. If you are not using it in an `A4` application service, refer to [How to use `A4 Module` in a regular Nest.js application service?](TODO).

``` sh
pnpm i @hz-9/a4-config
```

## Getting Started

The core module of `@hz-9/a4-config` is `A4ConfigModule`. We can register it in the `AppModule` using the `A4ConfigModule.forRoot` method.

``` ts
// src/app.module.ts

import { MiddlewareConsumer, Module } from '@nestjs/common'
import { A4ConfigModule } from '@hz-9/a4-config'

@Module({
  imports: [
    A4ConfigModule.forRoot({
      ignoreSchema: true,
    }),
  ],
})
export class AppModule {
  // ...
}
```

Here, `A4ConfigModule` will read the configuration information from the current working directory and register an `A4Config` instance.

We can create a file named `a4.yml` in the current directory with the following content:

``` yaml
A4:
  app:
    isOpen: false
```

Then, we can read the configuration information.

``` typescript
// src/app.module.ts

import { Injectable } from '@nestjs/common'
import { A4Config } from '@hz-9/a4-config'

@Injectable()
export class AppService {
  public constructor(protected readonly a4Config: A4Config) {
    this._init()
  }

  private _init(): void {
    const isOpen = this.a4Config.get('A4.app.isOpen')
    console.log('A4.app.isOpen', isOpen) // isOpen is false
  }
}
```

## Exposing

`@hz-9/a4-config` internally uses [yml](https://eemeli.org/yaml/) and [jsonc-parser](https://www.npmjs.com/package/jsonc-parser) to parse `yml` and `jsonc` files. In application servers, to avoid duplicate installations, you can directly use the following approach:

``` ts
import * as JsoncParser from '@hz-9/a4-config/jsonc-parser'
import * as YamlParser from '@hz-9/a4-config/yaml'

// or
import { parse as parseJsonC } from 'jsonc-parser'
import { parse as parseYaml } from 'yaml'
```

## Partial Registration

By default, `A4ConfigModule` is globally registered. If you need partial registration, you can pass the `isGlobal: false` property.

``` ts
import { MiddlewareConsumer, Module } from '@nestjs/common'
import { A4ConfigModule } from '@hz-9/a4-config'

@Module({
  imports: [
    A4ConfigModule.forRoot({
      ignoreSchema: true,
      isGlobal: false,
    }),
  ],
})
export class AnimalModule {
  // ...
}
```

::: tip

All `A4 Modules` provide four functions: `register`, `registerAsync`, `forRoot`, and `forRootAsync`. However, `register` and `forRoot` are synchronous functions and are subsets of `registerAsync` and `forRootAsync` in terms of functionality.

`register` and `forRoot` are completely equivalent,
`registerAsync` and `forRootAsync` are completely equivalent.
:::
