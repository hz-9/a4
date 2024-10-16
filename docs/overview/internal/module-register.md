# `A4` Module Registration

`Nest.js` recommends four registration functions: `register`, `forRoot`, `registerAsync`, and `forRootAsync`. Not all `A4 Modules` require these four registration functions.

When a `A4 Module` is globally registered, the `GLOBAL_PROVIDE_TOKEN_*` provided by `@hz-9/a4-core` will be used as `InjectToken`. The `name` attribute passed in will be set as an alias using `useExisting`. The corresponding `class` will also be set as an alias.

When a `A4 Module` is locally registered, the `SCOPE_PROVIDE_TOKEN_*` provided by `@hz-9/a4-core` will be used as `InjectToken`. If the `name` attribute is passed in, it will replace the `*_SCOPE_PROVIDE_TOKEN` as `InjectToken`.

The following sections detail the usage and provided `InjectToken` for each of the four registration functions in `A4 Module`.

> Each `A4 Module` has different implementation logic for the four registration functions, which will be reflected in the "Module Registration" of each `A4 Module`.

## Register using `register`

`register` specifies local registration. It provides an `InjectToken` named `SCOPE_PROVIDE_TOKEN_*`.

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

## Register using `forRoot`

`forRoot` specifies global registration. It provides an `InjectToken` named `GLOBAL_PROVIDE_TOKEN_*`. It also provides the corresponding `class` (of type `Class`).

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

## Register using `registerAsync`

By default, it is locally registered, but it can be set as globally registered by setting `isGlobal`.

If globally registered, it provides the following `InjectToken`:

- 1. `GLOBAL_PROVIDE_TOKEN_*` provided by `@hz-9/a4-core`;
- 2. The corresponding `class` (of type `Class`);
- 3. An optional `InjectToken` passed through the `options.name` attribute.

If locally registered, it provides the following `InjectToken`:

- 1. The `options.name` attribute value as the `InjectToken`. If omitted, it uses the `SCOPE_PROVIDE_TOKEN_*` provided by `@hz-9/a4-core`;
- 2. The corresponding `class` (of type `Class`);

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

## Register using `forRootAsync`

By default, it is globally registered, but it can be set as locally registered by setting `isGlobal`.

If globally registered, it provides the following `InjectToken`:

- 1. `GLOBAL_PROVIDE_TOKEN_*` provided by `@hz-9/a4-core`;
- 2. The corresponding `class` (of type `Class`);
- 3. An optional `InjectToken` passed through the `options.name` attribute.

If locally registered, it provides the following `InjectToken`:

- 1. The `options.name` attribute value as the `InjectToken`. If omitted, it uses the `SCOPE_PROVIDE_TOKEN_*` provided by `@hz-9/a4-core`;
- 2. The corresponding `class` (of type `Class`);

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
