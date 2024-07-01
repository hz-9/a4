# Custom Loading Scheme

The `A4ConfigModule` provides a custom configuration loading scheme for extending functionality.

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

When `type === 'custom'`, you only need to provide one parameter, `loader`. The `A4ConfigModule` will treat the return value of the function as the unvalidated data for the configuration options. The `loader` supports both synchronous and asynchronous operations.
