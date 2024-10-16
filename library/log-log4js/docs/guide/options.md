# Configuration Options

The `@hz-9/a4-log-log4js` has multiple versions of configuration options. This document describes the configuration structure for `A4Log4jsSimpleLogModule`.

Here is an example of a configuration file:

``` yml
A4:
  log:
    log4js:
      backups: 7
```

This configuration requires `A4Log4jsSimpleLogModule` to retain only the logs from the past 7 days. In the configuration path of `A4.log.log4js`, `A4.log` is the unified prefix for the logging module in the `A4 Module`. Other logging module implementations can also be added, hence the inclusion of the `log4js` segment in the path. However, the default path for configuration options can be modified. For more details, please refer to the [Namespace](../../guide/a4-config/namespace.html) section.

For detailed information about the configuration, please see the [A4NetworkModuleSchema](../../api/a4-log-log4js/a4-log-log4js.a4log4jssimplelogmoduleschema.html) class.
