# Module Registration

This document demonstrates the registration methods supported by `@hz-9/a4-config` and the provided `InjectToken`.

## Registering with `register`

`register` is used for local registration. It provides an `InjectToken` named `SCOPE_PROVIDE_TOKEN_A4_CONFIG`.

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

## Registering with `forRoot`

`forRoot` is used for global registration. It provides an `InjectToken` named `GLOBAL_PROVIDE_TOKEN_A4_CONFIG`. It also provides `A4Config` provided by `@hz-9/a4-config`.

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

## Registering with `registerAsync`

By default, it is used for local registration, but it can be set to global registration by setting `isGlobal` to `true`.

If it is globally registered, the following `InjectToken` are provided:

- 1. `GLOBAL_PROVIDE_TOKEN_A4_CONFIG` provided by `@hz-9/a4-core`;
- 2. `A4Config` provided by `@hz-9/a4-config`;
- 3. An optional `InjectToken` passed through the `options.name` property;

If it is locally registered, the following `InjectToken` are provided:

- 1. The `options.name` property value is used as the `InjectToken`. If omitted, `SCOPE_PROVIDE_TOKEN_A4_CONFIG` provided by `@hz-9/a4-core` is used;
- 2. `A4Config` provided by `@hz-9/a4-config`;

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

## Registering with `forRootAsync`

By default, it is used for global registration, but it can be set to local registration by setting `isGlobal` to `false`.

If it is globally registered, the following `InjectToken` are provided:

- 1. `GLOBAL_PROVIDE_TOKEN_A4_CONFIG` provided by `@hz-9/a4-core`;
- 2. `A4Config` provided by `@hz-9/a4-config`;
- 3. An optional `InjectToken` passed through the `options.name` property;

If it is locally registered, the following `InjectToken` are provided:

- 1. The `options.name` property value is used as the `InjectToken`. If omitted, `SCOPE_PROVIDE_TOKEN_A4_CONFIG` provided by `@hz-9/a4-core` is used;
- 2. `A4Config` provided by `@hz-9/a4-config`;

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
