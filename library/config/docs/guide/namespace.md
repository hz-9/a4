# Namespace

`A4` has defined conventions for configuring each module, specifying the configuration paths for each module, and providing a default configuration retrieval function `getConfig`.

## Conventional Paths

| Module                           | Path                      |
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

## Custom Paths

In the example of `A4`, the `getConfig` function is usually used to retrieve configuration items. Here is an example using `A4Network`:

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

In the above example, we use `A4NetworkModule.getConfig(a4Config)` to retrieve configuration information from the conventional path. If, for some reason, the configuration content is located under the `A4.network2.*` path (the default namespace for `A4NetworkModule` is `A4.network.*`), we can pass the custom path as the second parameter.

``` ts
A4NetworkModule.forRootAsync({
  inject: [A4Config],
  useFactory: (a4Config: A4Config) => A4NetworkModule.getConfig(a4Config, `A4.network2`),
})
```

However, when `ignoreSchema: true`, the `A4ConfigModule` class does not perform property validation and can retrieve the raw configuration information. But when we pass the `Schema` class, only the default values for the conventional namespace configurations will be assigned.

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
        console.log(a4Config.config) // can only retrieve a4Config.config.A4.network.* properties
        return A4NetworkModule.getConfig(a4Config)
      },
    }),
  ],
})
export class AppModule {
  // ...
}
```

In the above example, we need to override `A4NetworkModule.Schema`. We can create a `src/network.schema.ts` file and fill it with the following content:

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

Then, we need to modify the registration parameters of `A4ConfigModule.forRootAsync` to:

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

This way, we can provide the configuration information of `A4.network2` to `A4NetworkModule` as the initialization configuration.

::: warning Is the configuration override too complex?
TODO The current type validation is done using `class-validator` and `class-transformer`. Next, `A4` will provide a more convenient solution.
:::

## Why use `A4.*` as a prefix?

All configuration paths are prefixed with `A4.*`, which facilitates configuration management and even allows placing configuration content in `package.json`.

For example, the `package.json` file looks like this:

``` jsonc
{
  "name": "one-service",
  "version: "0.1.0",

  // ...

  "A4": {
    // ... configuration information.
  },
  // ...
}
```

In this case, we can pass the parameters using the following method:

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
