# Configuration Options

The configuration options for `@hz-9/a4-network` are not only the data format read from the configuration file, but also the data interface of `A4NetworkModule`.

Here is an example of a configuration file:

``` yml
A4:
  network:
    forcePort: 16101
```

This configuration requires `A4Network` to force the use of port `16101` when starting the service. In the configuration path of `A4.network.forcePort`, `A4.network` is the configuration prefix of the `@hz-9/a4-network` library to avoid conflicts with configuration options of other modules. Of course, the default path of the configuration options can be modified. For specific solutions, please refer to the [Namespace](../../guide/a4-config/namespace.html).

For detailed information about the configuration, please see the [A4NetworkModuleSchema](../../api/a4-network/a4-network.a4networkmoduleschema.html) class.
