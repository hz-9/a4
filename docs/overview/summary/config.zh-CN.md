# 应用程序配置

应用程序通常在不同的环境中运行。根据环境，应使用不同的配置设置。例如，本地环境可能需要特定的数据库凭证，而生产环境则需要另一组凭证。为了管理配置变量的变化，最佳做法是将配置变量存储在环境中。

通常的做法是将配置信息放置于环境变量中，可以使用 [croess-env](https://www.npmjs.com/package/cross-env) 设置环境变量，或者使用 [dotenv](https://www.npmjs.com/package/dotenv) 加载 `.env` 环境变量文件。

然而，如果配置项过多，全部设置于环境变量中会导致命名冗长，增加维护成本。因此，A4 提供了 `@hz-9/a4-config` 模块，它提供了多种配置项加载方案（TODO 当前仅支持本地文件加载配置）。在获取配置信息后，该模块会对配置类型进行校验，并提供默认值。

本章将介绍如何通过加载本地配置文件的方式使用 `@hz-9/a4-config` 模块。

<!-- TODO 补充其他数据加载方式 -->
## 安装

首先，我们需要安装所需的依赖项：

``` sh
npm i @hz-8/a4-config
```

## 开始

接下来，在 `src/app.module.ts` 文件中导入 `A4ConfigModule` 模块。为了确保数据请求和其他异步操作的正常运行，我们需要使用 `A4ConfigModule.forRootAsync` 方法来异步注册并提供 `A4Config` 类。

``` ts
// src/app.module.ts

import { MiddlewareConsumer, Module } from '@nestjs/common'
import { LoggerMiddleware } from '@hz-9/a4-core'
import { A4ConfigModule } from '@hz-9/a4-config'

@Module({
  imports: [
    A4ConfigModule.forRootAsync({
      useFactory: async () => ({
        ignoreSchema: true,
        // type: 'file', 默认值 'file'
      }),
    }),
  ],
})
export class AppModule {
  public configure(consumer: MiddlewareConsumer): void {
    consumer.apply(LoggerMiddleware).forRoutes('*')
  }
}
```

<!-- TODO 补充，更优的写法 -->

在这里，`A4ConfigModule` 将会读取 `${process.cwd()}/a4.yml` 文件作为配置信息。需要注意的是，`A4ConfigModule.forRootAsync` 被注册为全局模块，因此整个应用程序的服务都可以使用它。

现在，我们可以在被 `@Module` 或 `@Injectable` 装饰器装饰的类中使用 `A4Config` 实例对象了。让我们在 `AppModule` 中尝试获取配置信息作为示例：

``` typescript
// src/app.module.ts

import { MiddlewareConsumer, Module } from '@nestjs/common'
import { LoggerMiddleware } from '@hz-9/a4-core'
import { A4ConfigModule, A4Config } from '@hz-9/a4-config'

@Module({
  // ...
})
export class AppModule {
  public constructor(protected readonly a4Config: A4Config) {
    this._init()
  }

  private _init(): void {
    const config = this.a4Config.get('A4.config')
    console.log(config)
  }
}
```

现在，我们可以通过 `this.a4Config.get('A4.config')` 来获取配置信息了。

## 多环境部署

在开发环境、测试环境和生产环境中，可能存在不同的配置需求，我们可以提供多套配置文件。例如，可以同时存在 `a4.dev.yml`、`a4.test.yml` 和 `a4.prod.yml`。

我们可以直接指定要加载的配置文件的名称：

``` ts
A4ConfigModule.forRootAsync({
  useFactory: async () => ({
    ignoreSchema: true,
    // type: 'file', 默认值 'file'

    configFile: 'a4.dev.yml'
  }),
})

```

然而，我们不应该每次运行都手动修改 `configFile` 的内容，因此可以使用以下方式：

``` ts
A4ConfigModule.forRootAsync({
  useFactory: async () => ({
    ignoreSchema: true,
    // type: 'file', 默认值 'file'

    configFile: ({
      'dev': 'a4.dev.yml',
      'test': 'a4.test.yml',
      'prod': 'a4.prod.yml',
    }[process.env.CUSTOM_NODE_ENV] ?? 'a4.dev.yml')
  }),
})

```

通过自定义环境变量 `CUSTOM_NODE_ENV`，我们可以改变要加载的配置文件。

::: tip
`@hz-9/a4-config` 不建议将所有大量的配置信息都通过环境变量进行设置，但是 `A4` 框架仍然会存在一些少量的环境变量配置。详情请参阅 [链接](TODO)。
:::

在不同的环境中，配置文件的路径通常是不同的，我们可以使用 `rootDir` 属性来设置配置文件的加载路径。`A4ConfigModule` 会尝试多次，直到找到匹配的路径为止。

``` ts
A4ConfigModule.forRootAsync({
  useFactory: async () => ({
    ignoreSchema: true,
    // type: 'file', 默认值 'file'

    rootDir: [
      './',
      '/usr/project/service/service-a',
      '/app'
    ],

    configFile: 'a4.yml',
  }),
})

```

<!-- ## 实时读取 -->
## 类型安全

在上文中，我们使用了 `const config = this.a4Config.get('A4.config')`，但是返回的 `config` 类型是 `unknown`，这在日常开发中并不友好。为了获得正确的类型安全，`A4Config` 提供了两种方案。

1. 使用泛型声明：

    ``` ts
    // const config = this.a4Config.get<boolean>('A4.config')

    const config = this.a4Config.getOrThrow<boolean>('A4.config')
    ```

    `get` 和 `getOrThrow` 函数都可以传入泛型。`get` 函数在遇到未识别的属性时会返回 `undefined`，因此返回类型是 `boolean | undefined`，而 `getOrThrow` 函数会直接抛出错误，因此返回类型是 `boolean`。

2. 使用类型推导：

    `A4Config` 提供了 `getWithTypeDerivation` 和 `getOrThrowWithTypeDerivation` 两个函数，可以替代 `get` 和 `getOrThrow` 函数。

    ``` ts
    const config = this.a4Config.getWithTypeDerivation<{ a: boolean }>('a')
    ```

    在这种情况下，`getWithTypeDerivation` 函数会通过类型推导直接获取 `config` 的数据类型。当然，传入的参数类型应该是一个 "常量"。

## 格式验证

在加载配置项时，确保配置项的准确性和类型安全性非常重要。`@hz-9/a4-config` 提供了数据校验功能，它是基于 [class-validator](https://docs.nestjs.com/pipes#class-validator) 实现的。`A4` 框架提供了一些扩展，为配置信息的需求提供了 `Schema` 类。下面我们以 `app.schema.ts` 文件为例，设置一个应用程序的自定义配置。

``` ts
/* eslint-disable max-classes-per-file */
import { ClassValidatorUtil } from '@hz-9/a4-core'
import { Type } from 'class-transformer'
import { IsBoolean, IsObject, ValidateNested } from 'class-validator'

export class AppCustomConfigSchema {
  @IsBoolean()
  public isOpen: boolean = false
}

export class A4Config {
  @IsObject()
  @ValidateNested()
  @Type(() => AppCustomConfigSchema)
  public readonly app: AppCustomConfigSchema = ClassValidatorUtil.p2CwD(AppCustomConfigSchema, {})
}

export class AppConfigSchema {
  @IsObject()
  @ValidateNested()
  @Type(() => A4Config)
  public readonly A4: A4Config = ClassValidatorUtil.p2CwD(A4Config, {})
}
```

<!-- TODO 对于 Object 的空值，当前不够理想！！！ -->

在这个文件中，我们定义了一些规则：

1. `A4` 是一个对象，如果找不到配置信息，则会加载 `A4Config` 的默认值；
2. `A4.app` 是一个对象，如果找不到配置信息，则会加载 `AppCustomConfigSchema` 的默认值；
3. `A4.app.isOpen` 是一个布尔值，如果找不到配置信息，则默认为 `false`。

我们可以通过以下方式获取 `A4.app.isOpen` 的值：

``` ts
this.a4Config.get('A4.app.isOpen')
```

有关更多配置项加载方案，请参阅 [链接](TODO)。

::: info
`A4.app` 是 `A4` 框架约定的用于提供应用程序自定义配置项的命名空间。有关更多命名空间，请参阅 [链接](TODO)。
:::
