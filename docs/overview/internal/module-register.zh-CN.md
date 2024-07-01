# `A4` 模块注册

`Nest.js` 推荐了四个注册函数 `register` `forRoot` `registerAsync` `forRootAsync`。虽然不是所有 `A4 Module` 都需要这四个注册函数。

当 `A4 Module` 进行全局注册时,对于 `@hz-9/a4-core` 提供的 `GLOBAL_PROVIDE_TOKEN_*` 都会作为 `InjdectToken`. 传入的 `name` 属性会通过 `useExisting` 设置为别名.同时被设置为别名的还是有对应的 `class`.

当 `A4 Module` 进行局部注册时,会默认使用 `@hz-9/a4-core` 提供的 `SCOPE_PROVIDE_TOKEN_*` 都会作为 `InjdectToken`. 如果传入的 `name` 属性,则会替代 `*_SCOPE_PROVIDE_TOKEN` 都会作为 `InjdectToken`.

接下来详细列举四个注册函数中 `A4 Module` 的使用方式及提供的 `InjectToken`。

> 各个 `A4 Module` 中对四个注册函数的实现逻辑有所出入，会在各 `A4 MOdule` 的 "模块注册" 中体现。

## 使用 `register` 进行注册

`register` 指定进行局部注册。提供了名为 `SCOPE_PROVIDE_TOKEN_*` 的 `InjectToken`。

``` ts
@Module({
  imports: [
    A4ConfigModule.register({
      ignoreSchema: true,
    }),
  ],
})
export class AppModule {}

```

## 使用 `forRoot` 进行注册

`forRoot` 指定进行全局注册。提供了名为 `GLOBAL_PROVIDE_TOKEN_*` 的 `InjectToken`。还会提供对应的 `class`（`Class` 类型）；

``` ts
@Module({
  imports: [
    A4ConfigModule.forRoot({
      ignoreSchema: true,
    }),
  ],
})
export class AppModule {}

```

## 使用 `registerAsync` 进行注册

默认为局部注册，可以通过 `isGlobal` 设定为全局注册。

若为全局注册，提供了以下 `InjectToken`：

- 1. `@hz-9/a4-core` 提供的 `GLOBAL_PROVIDE_TOKEN_*`;
- 2. 对应的 `class`（`Class` 类型）；
- 3. 一个可选的 `InjectToken`，通过 `options.name` 属性传入；

若为局部注册，提供了以下 `InjectToken`：

- 1. 通过 `options.name` 属性值作为  `InjectToken`。若缺省使用 `@hz-9/a4-core` 提供的 `SCOPE_PROVIDE_TOKEN_*`;
- 2. 对应的 `class`（`Class` 类型）；

``` ts
@Module({
  imports: [
    A4ConfigModule.registerAsync({
      inject: [ /* ... */ ]，
      useFactory: async () => ({
        ignoreSchema: true,
      }),
    }),
  ],
})
export class AppModule {}

```

## 使用 `forRootAsync` 进行注册

默认为全局注册，可以通过 `isGlobal` 设定为局部注册。

若为全局注册，提供了以下 `InjectToken`：

- 1. `@hz-9/a4-core` 提供的 `GLOBAL_PROVIDE_TOKEN_*`;
- 2. 对应的 `class`（`Class` 类型）；
- 3. 一个可选的 `InjectToken`，通过 `options.name` 属性传入；

若为局部注册，提供了以下 `InjectToken`：

- 1. 通过 `options.name` 属性值作为  `InjectToken`。若缺省使用 `@hz-9/a4-core` 提供的 `SCOPE_PROVIDE_TOKEN_*`;
- 2. 对应的 `class`（`Class` 类型）；

``` ts
@Module({
  imports: [
    A4ConfigModule.forRootAsync({
      inject: [ /* ... */ ]，
      useFactory: async () => ({
        ignoreSchema: true,
      }),
    }),
  ],
})
export class AppModule {}

```
