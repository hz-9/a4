# 通过 HTTP 加载

除了本地文件外，`A4ConfigModule` 还支持通过 HTTP 协议获取配置信息。

```typescript
@Module({
  imports: [
    A4ConfigModule.forRoot({
      type: 'http',
      url: 'http://127.0.0.1/a4-config.json',
    }),
  ],
})
export class AnimalModule { /* ... */ }
```

配置信息必须提供一个 `url` 地址，用于获取配置信息。`A4ConfigModule` 内部使用 [axios](https://axios-http.com/) 实现请求操作。

```typescript
{
  url: string,
  axiosRequestConfig?: AxiosRequestConfig,
  axiosInstance?: AxiosInstance,
  responseParse?: (response: AxiosResponse) => object | Promise<object>
}
```

`A4ConfigModule` 还提供了三个参数，用于调整 `axios` 的请求操作，并对返回信息进行解析。

如果需要自定义 `axiosInstance`，可以从 `@hz-9/core/axios` 导入 `axios`:

```typescript
import axios from '@hz-9/a4-core/axios'

@Module({
  imports: [
    A4ConfigModule.forRoot({
      type: 'http',
      url: 'http://127.0.0.1/a4-config',
      axiosInstance: axios.create({
        // some options
      })
    }),
  ],
})
export class AnimalModule { /* ... */ }
```
