# 模块注册

本文详细体现 `@hz-9/a4-network` 支持的注册方式，及提供的 `InjectToken`。

## 使用 `register` 进行注册

`register` 指定进行局部注册。提供了名为 `SCOPE_PROVIDE_TOKEN_A4_NETWORK` 的 `InjectToken`。

``` ts
@Module({
  imports: [
    A4NetworkModule.register(A4NetworkModule.defaultConfig),
  ],
})
export class AppModule {}

```

## 使用 `forRoot` 进行注册

`forRoot` 指定进行全局注册。提供了名为 `GLOBAL_PROVIDE_TOKEN_A4_NETWORK` 的 `InjectToken`。还有 `@hz-9/a4-network` 提供的 `A4Network`;；

``` ts
@Module({
  imports: [
    A4NetworkModule.forRoot(A4NetworkModule.defaultConfig),
  ],
})
export class AppModule {}

```

## 使用 `registerAsync` 进行注册

默认为局部注册，可以通过 `isGlobal` 设定为全局注册。

若为全局注册，提供了以下 `InjectToken`：

- 1. `@hz-9/a4-core` 提供的 `GLOBAL_PROVIDE_TOKEN_A4_NETWORK`;
- 2. `@hz-9/a4-network` 提供的 `A4Network`;
- 3. 一个可选的 `InjectToken`，通过 `options.name` 属性传入；

若为局部注册，提供了以下 `InjectToken`：

- 1. 通过 `options.name` 属性值作为  `InjectToken`。若缺省使用 `@hz-9/a4-core` 提供的 `SCOPE_PROVIDE_TOKEN_A4_NETWORK`;
- 2. `@hz-9/a4-network` 提供的 `A4Network`;

``` ts
@Module({
  imports: [
    A4NetworkModule.registerAsync({
      inject: [ /* ... */ ]，
      useFactory: () => A4NetworkModule.defaultConfig,
    }),
  ],
})
export class AppModule {}

```

## 使用 `forRootAsync` 进行注册

默认为全局注册，可以通过 `isGlobal` 设定为局部注册。

若为全局注册，提供了以下 `InjectToken`：

- 1. `@hz-9/a4-core` 提供的 `GLOBAL_PROVIDE_TOKEN_A4_NETWORK`;
- 2. `@hz-9/a4-network` 提供的 `A4Network`;
- 3. 一个可选的 `InjectToken`，通过 `options.name` 属性传入；

若为局部注册，提供了以下 `InjectToken`：

- 1. 通过 `options.name` 属性值作为  `InjectToken`。若缺省使用 `@hz-9/a4-core` 提供的 `SCOPE_PROVIDE_TOKEN_A4_NETWORK`;
- 2. `@hz-9/a4-network` 提供的 `A4Network`;

``` ts
@Module({
  imports: [
    A4NetworkModule.forRootAsync({
      inject: [ /* ... */ ]，
      useFactory: () => A4NetworkModule.defaultConfig,
    }),
  ],
})
export class AppModule {}

```
