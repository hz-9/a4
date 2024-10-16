# 配置验证

在前文中，我们看到 `A4ConfigModule` 模块在注册时，全部传入了 `ignoreSchema: true` 属性。为了降低初步演示门槛，设定此属性关闭配置项校验功能。

不过 `@hz-9/a4-config` 强烈推荐使用配置项校验，使用此功能，可以通过传入 `Schema: ClassConstructor<object>` 来规范化读取的配置参数。

## 开始

这里开始使用配置项校验，首先我们需要约定配置项的 `Schema` ，以供 `A4ConfigModule` 进行格式化校验。

现在我们创建一个简单的 `Schema`, 在 `src/app.schema.ts` 文件中填写以下内容：

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

创建一个 `a4.yml` 的空文件在 `process.cwd()` 路径下，并在 `src/app.module.ts` 文件中导入。

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

此时，我们可以获取 `isOpen` 的值为 `true` 了。虽然配置项中未进行设置，但是我们提供了默认配置 `public isOpen: boolean = true`。

<!-- TODO 引用到 ClassValidatorUtil 的使用 -->

## 方法论 <a id="methodology"></a>

应用程序在获取配置项的方式，从简单到困难可以分为：

1. 从代码中的常量；
2. 从环境变量；
3. 读取配置文件；
4. 从配置中心或URL;

同时应用程序的配置信息，最好为增量修改，也就是需要提供配置信息的默认值，如此将配置项分为以下几种情况：

1. 必填配置项；
2. 可选配置项，提供默认值；
3. 可选配置项，不提供默认值；

如果将默认值合并的操作放置于业务逻辑之外，则 `1` `2` 在应用程序中均被认为为必选，仅有 `3` 会被识别为可选值，需要进行可选判断。

<!-- TODO 完善此篇文章。 -->

## 如何设置？

完善的配置项，需要较多的配置项。这里对各个 `Schema` 编写示例。

### 设置一个 `Class`

- 必选 `Class`

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

- 可选 `Class`, 提供默认值

``` ts
import { ClassValidatorUtil } from '@hz-9/a4-core'

export class AppSchema2 {
  @IsObject()
  @ValidateNested()
  @Type(() => CustomConfig)
  public readonly A4: CustomConfig = ClassValidatorUtil.p2CwD(CustomConfig, {})
}

```

- 可选 `Class`

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

### 设置一个简单类型 (`String` `Boolean` `Number`)

- 必选 `String` `Boolean` `Number`

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

- 可选 `String` `Boolean` `Number`, 提供默认值

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

- 可选 `String` `Boolean` `Number`

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

### 设置一个 `Enum`

- 必选 `Enum`

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

- 可选 `Enum`, 提供默认值

``` ts
export class AppSchema2 {
  @IsEnum(Platform)
  public readonly platform: Platform = Platform.Linux
}

```

- 可选 `Enum`

``` ts
export class AppSchema3 {
  @IsOptionalNotNull()
  @IsEnum(Platform)
  public readonly platform?: Platform
}

```

### 设置一个 `Object`

设置一个 `Class`，需要保证子项也进行正确的类型校验，如果仅作为 `Object` 校验，则不进行内容校验。此方案也会存在隐患，会存在类型不安全的问题。这种情况建议设置为数据库配置参数等第三方接口。

- 必选 `Object`

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

- 可选 `Object`, 提供默认值

``` ts
export class AppSchema2 {
  @IsObject()
  public readonly info: IInfo = { name: '', age: 0 }
}

```

- 可选 `Object`

``` ts
export class AppSchema3 {
  @IsOptionalNotNull()
  @IsObject()
  public readonly info?: IInfo
}

```
