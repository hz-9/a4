# Module Registration

This document details the registration methods supported by `@hz-9/a4-network` and the provided `InjectToken`.

## Registering with `register`

`register` is used for local registration. It provides an `InjectToken` named `SCOPE_PROVIDE_TOKEN_A4_NETWORK`.

``` ts
@Module({
  imports: [
    A4NetworkModule.register(A4NetworkModule.defaultConfig),
  ],
})
export class AppModule {}

```

## Registering with `forRoot`

`forRoot` is used for global registration. It provides an `InjectToken` named `GLOBAL_PROVIDE_TOKEN_A4_NETWORK`. It also provides `A4Network` provided by `@hz-9/a4-network`.

``` ts
@Module({
  imports: [
    A4NetworkModule.forRoot(A4NetworkModule.defaultConfig),
  ],
})
export class AppModule {}

```

## Registering with `registerAsync`

By default, it is used for local registration, but it can be set to global registration by setting `isGlobal` to `true`.

If it is globally registered, the following `InjectToken` is provided:

- 1. `GLOBAL_PROVIDE_TOKEN_A4_NETWORK` provided by `@hz-9/a4-core`;
- 2. `A4Network` provided by `@hz-9/a4-network`;
- 3. An optional `InjectToken` passed through the `options.name` property;

If it is locally registered, the following `InjectToken` is provided:

- 1. The `options.name` property value is used as the `InjectToken`. If omitted, `SCOPE_PROVIDE_TOKEN_A4_NETWORK` provided by `@hz-9/a4-core` is used;
- 2. `A4Network` provided by `@hz-9/a4-network`;

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

## Registering with `forRootAsync`

By default, it is globally registered, but it can be set to local registration by setting `isGlobal` to `false`.

If it is globally registered, the following `InjectToken` is provided:

- 1. `GLOBAL_PROVIDE_TOKEN_A4_NETWORK` provided by `@hz-9/a4-core`;
- 2. `A4Network` provided by `@hz-9/a4-network`;
- 3. An optional `InjectToken` passed through the `options.name` property;

If it is locally registered, the following `InjectToken` is provided:

- 1. The `options.name` property value is used as the `InjectToken`. If omitted, `SCOPE_PROVIDE_TOKEN_A4_NETWORK` provided by `@hz-9/a4-core` is used;
- 2. `A4Network` provided by `@hz-9/a4-network`;

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
