# Loading via HTTP

In addition to local files, `A4ConfigModule` also supports loading configuration information via the HTTP protocol.

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

The configuration information must provide a `url` address for retrieving the configuration. `A4ConfigModule` internally uses [axios](https://axios-http.com/) to perform the request operations.

```typescript
{
  url: string,
  axiosRequestConfig?: AxiosRequestConfig,
  axiosInstance?: AxiosInstance,
  responseParse?: (response: AxiosResponse) => object | Promise<object>
}
```

`A4ConfigModule` also provides three parameters for adjusting the request operations of `axios` and parsing the response information.

If you need to customize the `axiosInstance`, you can import `axios` from `@hz-9/core/axios`:

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
