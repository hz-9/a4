# Application Configuration

Applications often run in different environments. Depending on the environment, different configuration settings should be used. For example, the local environment may require specific database credentials, while the production environment may require a different set of credentials. To manage changes in configuration variables, it is best practice to store configuration variables in the environment.

The usual practice is to place configuration information in environment variables, which can be set using [cross-env](https://www.npmjs.com/package/cross-env) or by loading a `.env` environment variable file using [dotenv](https://www.npmjs.com/package/dotenv).

However, if there are too many configuration options, setting them all in environment variables can lead to long and cumbersome names, increasing maintenance costs. Therefore, A4 provides the `@hz-9/a4-config` module, which offers multiple configuration loading options (local file, HTTP, custom callback, etc.). After retrieving the configuration information, the module validates the configuration types and provides default values.

This chapter will introduce how to use the `@hz-9/a4-config` module by loading the configuration from a local file.

## Installation

First, we need to install the required dependencies:

``` sh
npm i @hz-8/a4-config
```

## Getting Started

Next, import the `A4ConfigModule` module in the `src/app.module.ts` file. To ensure the proper functioning of data requests and other asynchronous operations, we need to use the `A4ConfigModule.forRootAsync` method to asynchronously register and provide the `A4Config` class.

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
        // type: 'file', default value 'file'
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

<!-- TODO Add better writing -->

Here, the `A4ConfigModule` will read the `${process.cwd()}/a4.yml` file as the configuration information. It is important to note that `A4ConfigModule.forRootAsync` is registered as a global module, so it can be used by services throughout the entire application.

Now, we can use the `A4Config` instance in classes decorated with `@Module` or `@Injectable`. Let's try to retrieve the configuration information as an example in the `AppModule`:

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

Now, we can retrieve the configuration information using `this.a4Config.get('A4.config')`.

## Multi-Environment Deployment

In development, testing, and production environments, there may be different configuration requirements. We can provide multiple sets of configuration files. For example, `a4.dev.yml`, `a4.test.yml`, and `a4.prod.yml` can coexist.

We can directly specify the name of the configuration file to load:

``` ts
A4ConfigModule.forRootAsync({
  useFactory: async () => ({
    ignoreSchema: true,
    // type: 'file', default value 'file'

    configFile: 'a4.dev.yml'
  }),
})

```

However, we should not manually modify the content of `configFile` every time we run the application. Instead, we can use the following approach:

``` ts
A4ConfigModule.forRootAsync({
  useFactory: async () => ({
    ignoreSchema: true,
    // type: 'file', default value 'file'

    configFile: ({
      'dev': 'a4.dev.yml',
      'test': 'a4.test.yml',
      'prod': 'a4.prod.yml',
    }[process.env.CUSTOM_NODE_ENV] ?? 'a4.dev.yml')
  }),
})

```

By customizing the environment variable `CUSTOM_NODE_ENV`, we can change the configuration file to load.

::: tip
`@hz-9/a4-config` does not recommend setting all configuration information through environment variables, but `A4` framework still has some minimal environment variable configurations. For more details, please refer to [`A4` Internal Environment Variables](../internal/env.html).
:::

In different environments, the paths of configuration files are usually different. We can use the `rootDir` property to set the loading paths of configuration files. `A4ConfigModule` will try multiple times until it finds a matching path.

``` ts
A4ConfigModule.forRootAsync({
  useFactory: async () => ({
    ignoreSchema: true,
    // type: 'file', default value 'file'

    rootDir: [
      './',
      '/usr/project/service/service-a',
      '/app'
    ],

    configFile: 'a4.yml',
  }),
})

```

## Type Safety

In the previous examples, we used `const config = this.a4Config.get('A4.config')`, but the returned type of `config` is `unknown`, which is not friendly for everyday development. To achieve proper type safety, `A4Config` provides two solutions.

1. Type assertion:

    ``` ts
    // const config = this.a4Config.get('A4.config') as boolean

    const config = this.a4Config.getOrThrow('A4.config') as boolean
    ```

    Both the `get` and `getOrThrow` functions can take a generic type. The `get` function returns `undefined` when encountering an unrecognized property, so the return type is `boolean | undefined`, while the `getOrThrow` function throws an error directly, so the return type is `boolean`.

2. Using type derivation:

    `A4Config` provides the `getWithTypeDerivation` and `getOrThrowWithTypeDerivation` functions, which can be used as alternatives to the `get` and `getOrThrow` functions.

    ``` ts
    const config = (this.a4Config as A4Config<AppSchema>).get('a')
    ```

    In this case, the `getWithTypeDerivation` function directly retrieves the data type of `config` through type derivation. Of course, the parameter type passed in should be a "constant".

For more details, please refer to [Type Safety](../../guide/a4-config/type-safe).

## Format Validation

When loading configuration items, it is important to ensure the accuracy and type safety of the configuration items. `@hz-9/a4-config` provides data validation functionality, which is implemented based on [class-validator](https://docs.nestjs.com/pipes#class-validator). The `A4` framework provides some extensions to meet the configuration requirements, providing the `Schema` class. Let's take the `app.schema.ts` file as an example to set up a custom configuration for the application.

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

In this file, we define some rules:

1. `A4` is an object, and if the configuration information is not found, the default values of `A4Config` will be loaded;
2. `A4.app` is an object, and if the configuration information is not found, the default values of `AppCustomConfigSchema` will be loaded;
3. `A4.app.isOpen` is a boolean value, and if the configuration information is not found, it defaults to `false`.

We can retrieve the value of `A4.app.isOpen` using the following approach:

``` ts
this.a4Config.get('A4.app.isOpen')
```

For more configuration loading options, please refer to [Schema Validation](../../guide/a4-config/schema).

::: info
`A4.app` is the namespace provided by the `A4` framework for providing application-specific custom configuration items. For more namespaces, please refer to [Namespaces](../../guide/a4-config/namespace).
:::