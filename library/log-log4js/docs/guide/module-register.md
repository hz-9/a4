# Module Registration

This document details the registration methods supported by `@hz-9/a4-log-log4js` and the `InjectToken` it provides.

`@hz-9/a4-log-log4js` provides multiple module classes, but all core module classes have the same registration scheme, using `A4Log4jsSimpleLogModule` as an example.

## Registration using `register`

No local registration is provided, and the `register` function is not available.

## Registration using `forRoot`

`forRoot` is used for global registration. It provides an `InjectToken` named `GLOBAL_PROVIDE_TOKEN_A4_LOG`. It also provides `A4Log4jsLogger` from `@hz-9/a4-log-log4js`.

``` ts
@Module({
  imports: [
    A4NetworkModule.forRoot(A4NetworkModule.defaultConfig),
  ],
})
export class AppModule {}

```

## Registration using `registerAsync`

No local registration is provided, and the `register` function is not available.

## Registration using `forRootAsync`

Only global registration is supported, and the following `InjectTokens` are provided:

- 1. `GLOBAL_PROVIDE_TOKEN_A4_LOG` provided by `@hz-9/a4-core`;
- 2. `A4Log4jsLogger` provided by `@hz-9/a4-log-log4js`;
- 3. An optional `InjectToken` passed through the `options.name` property;

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
