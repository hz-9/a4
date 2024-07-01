# 模块注册

本文详细体现 `@hz-9/a4-log-log4js` 支持的注册方式，及提供的 `InjectToken`。

`@hz-9/a4-log-log4js` 会提供多个和兴模块类，但多有的核心模块类注册方案全部相同，以 `A4Log4jsSimpleLogModule` 为例。

## 使用 `register` 进行注册

不提供局部注册，不提供 `register` 函数。

## 使用 `forRoot` 进行注册

`forRoot` 指定进行全局注册。提供了名为 `GLOBAL_PROVIDE_TOKEN_A4_LOG` 的 `InjectToken`。还有 `@hz-9/a4-log-log4js` 提供的 `A4Log4jsLogger`;；

``` ts
@Module({
  imports: [
    A4NetworkModule.forRoot(A4NetworkModule.defaultConfig),
  ],
})
export class AppModule {}

```

## 使用 `registerAsync` 进行注册

不提供局部注册，不提供 `register` 函数。

## 使用 `forRootAsync` 进行注册

仅支持全局注册，提供了以下 `InjectToken`：

- 1. `@hz-9/a4-core` 提供的 `GLOBAL_PROVIDE_TOKEN_A4_LOG`;
- 2. `@hz-9/a4-log-log4js` 提供的 `A4Log4jsLogger`;
- 3. 一个可选的 `InjectToken`，通过 `options.name` 属性传入；

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
