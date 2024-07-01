# 配置项

`@hz-9/a4-log-log4js` 的配置项将存在多个版本。当前介绍 `A4Log4jsSimpleLogModule` 对应的配置结构。

下面是一个配置项文件示例：

``` yml
A4:
  log:
    log4js:
      backups: 7
```

这个配置要求 `A4Log4jsSimpleLogModule` 在保留日志文件时，只保留最近 7天的日志。`A4.log.log4js` 的配置路径中，`A4.log` 是 `A4 Module` 关于日志模块的统一前缀，也会添加其他日志模块实现，所以增加了 `log4js` 段路径。当然，配置项的默认路径是可以修改的，具体方案请参考[命名空间](../../guide/a4-config/namespace.html)。

有关配置信息的详细说明，请查看[A4NetworkModuleSchema](../../api/a4-log-log4js/a4-log-log4js.a4log4jssimplelogmoduleschema.html)类。
