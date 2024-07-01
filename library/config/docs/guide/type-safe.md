# Type Safety

## Single Data Interface

In previous documentation, we used the following approach to retrieve configuration items:

``` ts
const isOpen = a4Config.get('A4.app.isOpen')
```

At this point, the type of `isOpen` is `unknown`. If we want to assert the type of `isOpen` as `boolean`, we can use a type assertion:

``` ts
const isOpen = a4Config.get('A4.app.isOpen') as boolean
```

However, using type assertions directly still carries the risk of type inference. If we use type inference, we can maintain type safety and consistency with the `Schema`. Let's take `A4NetworkModule` as an example:

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
      useFactory: (a4Config: A4Config) => {
        const options = a4Config.get(A4NetworkModule.CONFIG_MIDDLE_PATH)
        return A4NetworkModule.getConfig(a4Config)
      },
    }),
  ],
})
export class AppModule {
  // ...
}
```

In this example, the data type of `options` is still `unknown`. To solve this problem, we can pass `A4NetworkModule['Schema']` into `A4Config`:

``` ts
A4NetworkModule.forRootAsync({
  inject: [A4Config],
  useFactory: (a4Config: A4Config<A4NetworkModule['Schema']>) => {
    const options = a4Config.get(A4NetworkModule.CONFIG_MIDDLE_PATH)
    return A4NetworkModule.getConfig(a4Config)
  },
}),
```

This way, we can obtain the appropriate type through type inference. However, we can only correctly read the properties in `A4NetworkModule.Schema`.

## Union Interface

If we want to use multiple classes at the same time, how should we handle it?

We can use the `MergeDeep` type provided by `type-fest`, which can be directly referenced from `A4`:

``` ts
// src/app.module.ts

import { MiddlewareConsumer, Module } from '@nestjs/common'
import type { MergeDeep } from '@hz-9/a4-core/type-fest'
import { A4NetworkModule } from '@hz-9/a4-network'
import { A4DocsModule } from '@hz-9/a4-docs'
import { AppConfigSchema } from './app.schema'

@Module({
  // ...
})
export class AppModule {
  // ...

  public constructor(protected readonly a4Config: A4Config<MergeDeep<A4NetworkModule['Schema'], A4DocsModule['Schema']>>) {
    this._init()
  }

  private _init(): void {
    const isOpen = this.a4Config.get('A4.network.bindIPv4') // is of type boolean
    console.log('A4.app.isOpen', isOpen)
  }
}
```
