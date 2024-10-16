# 类型安全

## 单数据接口

在之前的文档中，我们使用以下方式来获取配置项：

``` ts
const isOpen = a4Config.get('A4.app.isOpen')
```

此时 `isOpen` 的类型是 `unknown`。如果想要将 `isOpen` 的类型断言为 `boolean`，可以直接使用类型断言：

``` ts
const isOpen = a4Config.get('A4.app.isOpen') as boolean
```

然而，直接使用类型断言仍然存在类型判断的隐患。如果我们使用类型推导，就可以保持类型安全与 `Schema` 的一致性。让我们以 `A4NetworkModule` 为例：

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

在这个示例中，`options` 的数据类型仍然是 `unknown`。为了解决这个问题，我们可以将 `A4NetworkModule['Schema']` 传入 `A4Config` 中：

``` ts
A4NetworkModule.forRootAsync({
  inject: [A4Config],
  useFactory: (a4Config: A4Config<A4NetworkModule['Schema']>) => {
    const options = a4Config.get(A4NetworkModule.CONFIG_MIDDLE_PATH)
    return A4NetworkModule.getConfig(a4Config)
  },
}),
```

通过这种方式，我们可以通过类型推导来获取合理的类型。当然，我们只能正确读取 `A4NetworkModule.Schema` 中的属性。

## 联合接口

如果我们想要同时使用多个类，应该如何处理呢？

我们可以使用 `type-fest` 提供的 `MergeDeep` 类型，`type-fest` 可以直接从 `A4` 进行引用：

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
    const isOpen = this.a4Config.get('A4.network.bindIPv4') // 是 boolean 类型
    console.log('A4.app.isOpen', isOpen)
  }
}
```
