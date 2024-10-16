# Configuration Validation

In the previous section, we saw that the `A4ConfigModule` module was registered with the `ignoreSchema: true` property. To lower the barrier for initial demonstration, this property is set to disable configuration validation.

However, it is highly recommended to use configuration validation with `@hz-9/a4-config`. By using this feature, you can standardize the configuration parameters that are read by passing a `Schema: ClassConstructor<object>`.

## Getting Started

To start using configuration validation, we first need to define the `Schema` for the configuration options to be validated by `A4ConfigModule`.

Now let's create a simple `Schema` and fill in the following content in the `src/app.schema.ts` file:

``` ts
// src/app.schema.ts

/* eslint-disable max-classes-per-file */
import { ClassValidatorUtil } from '@hz-9/a4-core'
import { Type } from 'class-transformer'
import { IsBoolean, IsObject, ValidateNested } from 'class-validator'

export class AppCustomConfigSchema {
  @IsBoolean()
  public isOpen: boolean = true
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

Create an empty `a4.yml` file in the `process.cwd()` path and import it in the `src/app.module.ts` file.

``` ts
// src/app.module.ts

import { MiddlewareConsumer, Module } from '@nestjs/common'
import { A4ConfigModule } from '@hz-9/a4-config'

import { AppConfigSchema } from './app.schema'

@Module({
  imports: [
    A4ConfigModule.forRoot({
      Schema: AppConfigSchema,
    }),
  ],
})
export class AppModule {
  // ...

  public constructor(protected readonly a4Config: A4Config) {
    this._init()
  }

  private _init(): void {
    const isOpen = this.a4Config.get('A4.app.isOpen')
    console.log('A4.app.isOpen', isOpen)
  }
}

```

Now, we can retrieve the value of `isOpen` as `true`. Although the configuration option is not set, we provide a default configuration `public isOpen: boolean = true`.

<!-- TODO Add usage of ClassValidatorUtil -->

## Methodology <a id="methodology"></a>

The ways an application can retrieve configuration options can be categorized from simple to complex:

1. From constants in the code.
2. From environment variables.
3. Reading from a configuration file.
4. From a configuration center or URL.

At the same time, the configuration information of an application is best modified incrementally. This means that configuration options can be categorized into the following cases:

1. Required configuration options.
2. Optional configuration options with default values.
3. Optional configuration options without default values.

If the merging of default values is placed outside of the business logic, then `1` and `2` are considered mandatory in the application, and only `3` is recognized as an optional value that requires optional checking.

<!-- TODO Improve this article. -->

## How to Set?

A comprehensive configuration requires many configuration options. Here are examples of writing each `Schema`.

### Setting a `Class`

- Required `Class`

``` ts
class CustomConfig {
  @IsBoolean()
  public isOpen: boolean = true
}

export class AppSchema1 {
  @IsObject()
  @ValidateNested()
  @Type(() => CustomConfig)
  public readonly A4: CustomConfig
}

```

- Optional `Class` with default value

``` ts
import { ClassValidatorUtil } from '@hz-9/a4-core'

export class AppSchema2 {
  @IsObject()
  @ValidateNested()
  @Type(() => CustomConfig)
  public readonly A4: CustomConfig = ClassValidatorUtil.p2CwD(CustomConfig, {})
}

```

- Optional `Class`

``` ts
import { IsOptionalNotNull } from '@hz-9/a4-core'

export class AppSchema3 {
  @IsOptionalNotNull()
  @IsObject()
  @ValidateNested()
  @Type(() => CustomConfig)
  public readonly A4?: CustomConfig
}

```

### Setting a simple type (`String` `Boolean` `Number`)

- Required `String` `Boolean` `Number`

``` ts
export class AppSchema1 {
  @IsString()
  public readonly str: string

  @IsBoolean()
  public readonly isOpen: boolean

  @IsNumber()
  public readonly num: number
}

```

- Optional `String` `Boolean` `Number` with default value

``` ts
export class AppSchema2 {
  @IsString()
  public readonly str: string = 'Hello World'

  @IsBoolean()
  public readonly isOpen: boolean = true

  @IsNumber()
  public readonly num: number = 100
}

```

- Optional `String` `Boolean` `Number`

``` ts
export class AppSchema3 {
  @IsOptionalNotNull()
  @IsString()
  public readonly str?: string

  @IsOptionalNotNull()
  @IsBoolean()
  public readonly isOpen?: boolean

  @IsOptionalNotNull()
  @IsNumber()
  public readonly num?: number
}

```

### Setting an `Enum`

- Required `Enum`

``` ts
export enum Platform {
  Linux = 'Linux',
  Windows = 'Windows',
  MacOS = 'MacOS',
}

export class AppSchema1 {
  @IsEnum(Platform)
  public readonly platform: Platform
}

```

- Optional `Enum` with default value

``` ts
export class AppSchema2 {
  @IsEnum(Platform)
  public readonly platform: Platform = Platform.Linux
}

```

- Optional `Enum`

``` ts
export class AppSchema3 {
  @IsOptionalNotNull()
  @IsEnum(Platform)
  public readonly platform?: Platform
}

```

### Setting an `Object`

Setting a `Class` requires ensuring that the sub-items are also correctly type validated. If it is only validated as an `Object`, content validation is not performed. This approach also has risks and can lead to type unsafety. In such cases, it is recommended to set it as a third-party interface such as a database configuration parameter.

- Required `Object`

``` ts
interface IInfo {
  name: string
  age: number
}

export class AppSchema1 {
  @IsObject()
  public readonly info: IInfo
}

```

- Optional `Object` with default value

``` ts
export class AppSchema2 {
  @IsObject()
  public readonly info: IInfo = { name: '', age: 0 }
}

```

- Optional `Object`

``` ts
export class AppSchema3 {
  @IsOptionalNotNull()
  @IsObject()
  public readonly info?: IInfo
}

```
