# 配置项

`@hz-9/a4-network` 的配置项不仅仅是从配置文件中读取的数据格式，也是 `A4NetworkModule` 的数据接口。

下面是一个配置项文件示例：

``` yml
A4:
  network:
    forcePort: 16101
```

这个配置要求 `A4Network` 在启动服务时强制使用 `16101` 端口。`A4.network.forcePort` 的配置路径中，`A4.network` 是 `@hz-9/a4-network` 库的配置项前缀，以避免与其他模块的配置项冲突。当然，配置项的默认路径是可以修改的，具体方案请参考[命名空间](../../guide/a4-config/namespace.html)。

有关配置信息的详细说明，请查看[A4NetworkModuleSchema](../../api/a4-network/a4-network.a4networkmoduleschema.html)类。
