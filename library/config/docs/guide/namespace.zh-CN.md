# 命名空间

`A4` 对于各模块的配置项进行了约定，约定了各个模块的配置路径，并提供了默认的配置获取函数 `getConfig`。

## 约定路径

| 模块                             | 路径                      |
| -------------------------------- | ------------------------- |
| `A4 Config Module`               | `A4.config.*`             |
| `A4 Cache Module`                | `A4.cache.*`              |
| `A4 Crud Module`                 | `A4.crud.*`               |
| `A4 Crud Module - TypeORM`       | `A4.crud.typeORM.*`       |
| `A4 Crud Module - ElasticSearch` | `A4.crud.elasticSearch.*` |
| `A4 Docs Module`                 | `A4.docs.*`               |
| `A4 Lock Module`                 | `A4.lock.*`               |
| `A4 Lock Module - RedLock`       | `A4.lock.redlock.*`       |
| `A4 Log Module`                  | `A4.log.*`                |
| `A4 Log Module - Log4js`         | `A4.log.log4js.*`         |
| `A4 Micro Service Module`        | `A4.microService.*`       |
| `A4 Network Module`              | `A4.network.*`            |
| `A4 Registry Module`             | `A4.registry.*`           |
| `A4 Registry Module - Eureka`    | `A4.registry.eureka.*`    |
| `A4 Safe Module`                 | `A4.safe.*`               |

## 自定义路径

在 `A4` 的示例中，通常使用 `getConfig` 函数来获取配置项。以下是使用 `A4Network` 作为示例：

``` ts
import { Module } from '@nestjs/common'
import { A4Config, A4ConfigModule } from '@hz-9/a4-config'
import { A4NetworkModule } from '@hz-9/a4-network'

@Module({
  imports: [
    A4ConfigModule.forRootAsync({
      useFactory: async () => ({
        ignoreSchema: true,
      }),
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

在上述示例中，我们使用 `A4NetworkModule.getConfig(a4Config)` 从约定的路径中获取配置信息。如果由于某些原因配置内容位于 `A4.network2.*`（`A4NetworkModule` 默认命名空间为 `A4.network.*`）路径下，我们可以将自定义路径作为第二个参数传入。

``` ts
A4NetworkModule.forRootAsync({
  inject: [A4Config],
  useFactory: (a4Config: A4Config) => A4NetworkModule.getConfig(a4Config, `A4.network2`),
})
```

然而，当 `ignoreSchema: true` 时，`A4ConfigModule` 类不进行属性校验，可以获取原始的配置信息。但是当我们传入 `Schema` 类之后，只会对约定空间的配置进行默认赋值。

``` ts
import { Module } from '@nestjs/common'
import { A4Config, A4ConfigModule } from '@hz-9/a4-config'
import { A4NetworkModule } from '@hz-9/a4-network'

@Module({
  imports: [
    A4ConfigModule.forRootAsync({
      useFactory: async () => ({
        Schema: A4NetworkModule.Schema,
      }),
    }),

    A4NetworkModule.forRootAsync({
      inject: [A4Config],
      useFactory: (a4Config: A4Config) => {
        console.log(a4Config.config) // 仅能获取 a4Config.config.A4.network.* 属性
        return A4NetworkModule.getConfig(a4Config)
      },
    }),
  ],
})
export class AppModule {
  // ...
}
```

在上述示例中，我们需要对 `A4NetworkModule.Schema` 进行重写。我们可以创建 `src/network.schema.ts` 文件，并填写以下内容：

``` ts
import { CU, IsOptionalNotNull } from '@hz-9/a4-core'
import { A4NetworkModuleSchema } from '@hz-9/a4-network'

class A4NetworkModuleSchemaB {
  @IsOptionalNotNull()
  @IsObject()
  @ValidateNested()
  @Type(() => A4NetworkModuleSchema)
  public readonly network2: A4NetworkModuleSchema = CU.p2CwD(A4NetworkModuleSchema, {})
}

export class A4NetworkModuleSchemaA {
  @IsObject()
  @ValidateNested()
  @Type(() => A4NetworkModuleSchemaB)
  public readonly A4: A4NetworkModuleSchemaB
}
```

然后，我们需要将 `A4ConfigModule.forRootAsync` 的注册参数改写为：

``` ts
import { Module } from '@nestjs/common'
import { A4Config, A4ConfigModule } from '@hz-9/a4-config'
import { A4NetworkModule } from '@hz-9/a4-network'
import { A4NetworkModuleSchemaA } from './network.schema'

@Module({
  imports: [
    A4ConfigModule.forRootAsync({
      useFactory: async () => ({
        Schema: A4NetworkModuleSchemaA,
      }),
    }),

    A4NetworkModule.forRootAsync({
      inject: [A4Config],
      useFactory: (a4Config: A4Config) => A4NetworkModule.getConfig(a4Config, 'A4.network2'),
    }),
  ],
})
export class AppModule {
  // ...
}
```

这样，我们就可以将 `A4.network2` 的配置信息提供给 `A4NetworkModule` 作为初始化配置了。

::: warning 配置项重写是否过于复杂了？
TODO 当前类型校验是通过 `class-validator` 与 `class-transformer` 完成的，接下来 `A4` 自行提供更便捷方案。
:::

## 为什么使用 `A4.*` 作为前缀？

配置路径全部以 `A4.*` 作为前缀，这样有利于对配置进行管理，甚至可以将配置内容放置于 `package.json`。

例如，`package.json` 文件如下：

``` jsonc
{
  "name": "one-service",
  "version: "0.1.0",

  // ...

  "A4": {
    // ... 配置信息。
  },
  // ...
}
```

在这种情况下，我们可以使用以下方式传入参数：

``` ts
@Module({
  imports: [
    A4ConfigModule.forRoot({
      ignoreSchema: true,
      
      configFile: "package.json"
    }),
  ],
})
export class AnimalModule {
  // ...
}
```
