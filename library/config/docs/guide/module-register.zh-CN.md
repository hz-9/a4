# 模块注册

本文详细体现 `@hz-9/a4-config` 支持的注册方式，及提供的 `InjectToken`。

## 使用 `register` 进行注册

`register` 指定进行局部注册。提供了名为 `SCOPE_PROVIDE_TOKEN_A4_CONFIG` 的 `InjectToken`。

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

`forRoot` 指定进行全局注册。提供了名为 `GLOBAL_PROVIDE_TOKEN_A4_CONFIG` 的 `InjectToken`。还有 `@hz-9/a4-config` 提供的 `A4Config`;；

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

- 1. `@hz-9/a4-core` 提供的 `GLOBAL_PROVIDE_TOKEN_A4_CONFIG`;
- 2. `@hz-9/a4-config` 提供的 `A4Config`;
- 3. 一个可选的 `InjectToken`，通过 `options.name` 属性传入；

若为局部注册，提供了以下 `InjectToken`：

- 1. 通过 `options.name` 属性值作为  `InjectToken`。若缺省使用 `@hz-9/a4-core` 提供的 `SCOPE_PROVIDE_TOKEN_A4_CONFIG`;
- 2. `@hz-9/a4-config` 提供的 `A4Config`;

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

- 1. `@hz-9/a4-core` 提供的 `GLOBAL_PROVIDE_TOKEN_A4_CONFIG`;
- 2. `@hz-9/a4-config` 提供的 `A4Config`;
- 3. 一个可选的 `InjectToken`，通过 `options.name` 属性传入；

若为局部注册，提供了以下 `InjectToken`：

- 1. 通过 `options.name` 属性值作为  `InjectToken`。若缺省使用 `@hz-9/a4-core` 提供的 `SCOPE_PROVIDE_TOKEN_A4_CONFIG`;
- 2. `@hz-9/a4-config` 提供的 `A4Config`;

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
