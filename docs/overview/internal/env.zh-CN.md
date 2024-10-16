# `A4` 内部环境变量

`Nest.js` 与 `A4` 都会内置部分环境变量。它主要引用与比 `Config` 更底层的配置项。业务配置，仍请使用 [应用程序配置](../summary/config.html)。

| 环境变量   | 约定方  | 效果                                                                                                                  |
| ---------- | ------- | --------------------------------------------------------------------------------------------------------------------- |
| NODE_ENV   | 通用    | 识别当前配置环境。默认为 'development' |
| NO_COLOR   | Nest.js | 日志不输出颜色。                                                                                                      |
| NEST_DEBUG | Nest.js | 以 `NEST_DEBUG` 模式运行，提现依赖关系。[详情](https://docs.nestjs.com/faq/common-errors#debugging-dependency-errors) |

各个 `A4 Module` 在说明文档中，也会显现自行约定的环境变量，并汇总在此文件中。
