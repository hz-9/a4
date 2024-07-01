# 自定义加载方案

`A4ConfigModule` 提供了一个自定义配置加载方案，用于扩展功能。

``` ts

@Module({
  imports: [
    A4ConfigModule.forRoot({
      type: 'custom',

      loader: async () => {

        return {
          // options.
        }
      }
    }),
  ],
})
export class AnimalModule { /* ... */ }

```

当 `type === 'custom'` 时，只需提供一个参数 `loader`。`A4ConfigModule` 会将函数返回值作为配置项的未校验数据。`loader` 支持同步和异步操作。
