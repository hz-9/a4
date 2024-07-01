# @hz-9/a4-config

![NPM 版本][npm-version-url] ![NPM 许可证][npm-license-url] ![NPM 下载量][npm-downloads-url] ![类型][types-url]
<br /> ![Node 版本][node-version-url] ![最后提交][last-commit-url]

[npm-version-url]: https://badgen.net/npm/v/@hz-9/a4-config
[npm-license-url]: https://badgen.net/npm/license/@hz-9/a4-config
[npm-downloads-url]: https://badgen.net/npm/dt/@hz-9/a4-config
[types-url]: https://badgen.net/npm/types/@hz-9/a4-config
[node-version-url]: https://badgen.net/npm/node/@hz-9/a4-config
[last-commit-url]: https://badgen.net/github/last-commit/hz-9/a4

## 简介

`@hz-9/a4-config` 是一个用于在 `A4` 应用程序中加载配置信息的库。它支持多种配置加载方案。

它可以从 `YAML` 和 `JSON` 格式的文件中读取配置信息。此外，它还支持从 HTTP URL 加载配置信息，并提供了一个自定义加载函数的选项。

如何设置一个较为完善且类型安全的配置项，可以参考 [设置配置项 - 方法论](./schema#methodology)。

## 安装

要开始使用 `@hz-9/a4-config`，首先需要安装所需的依赖项。如果你不是在 `A4` 应用服务中使用，可以参考 [如何在普通 Nest.js 应用服务中使用 `A4 Module`?](TODO)。

``` sh
pnpm i @hz-9/a4-config
```

## 开始

`@hz-9/a4-config` 的核心模块是 `A4ConfigModule`。我们可以使用 `A4ConfigModule.forRoot` 方法在 `AppModule` 中进行注册。

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

在这里，`A4ConfigModule` 会在当前工作目录下读取配置信息，并注册 `A4Config` 实例。

我们可以在当前目录下创建一个名为 `a4.yml` 的文件，内容如下：

``` yaml
A4:
  app:
    isOpen: false
```

然后，我们就可以读取配置信息了。

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

## 暴露

`@hz-9/a4-config` 内部使用 [yml](https://eemeli.org/yaml/) 和 [jsonc-parser](https://www.npmjs.com/package/jsonc-parser) 来解析 `yml` 和 `jsonc` 文件。在应用服务器中，为了避免重复安装，你可以直接使用以下方案直接使用：

``` ts
import * as JsoncParser from '@hz-9/a4-config/jsonc-parser'
import * as YamlParser from '@hz-9/a4-config/yaml'

// 或者
import { parse as parseJsonC } from 'jsonc-parser'
import { parse as parseYaml } from 'yaml'
```

## 部分注册

`A4ConfigModule` 默认进行全局注册，如果需要进行部分注册，可以传入 `isGlobal: false` 属性。

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

所有 `A4 Module` 都提供了 `register`、`registerAsync`、`forRoot` 和 `forRootAsync` 四个函数。不过，`register` 和 `forRoot` 是同步函数，功能上是 `registerAsync` 和 `forRootAsync` 的子集。

`register` 和 `forRoot` 是完全等价的，
`registerAsync` 和 `forRootAsync` 是完全等价的。
:::
