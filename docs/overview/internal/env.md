# `A4` Internal Environment Variables

Both `Nest.js` and `A4` have some built-in environment variables. They mainly refer to configurations that are lower-level than `Config`. For business configurations, please refer to [Application Configuration](../summary/config.html).

| Environment Variable | Convention | Effect                                                                                                                |
| -------------------- | ---------- | --------------------------------------------------------------------------------------------------------------------- |
| NODE_ENV             | General    | Identifies the current configuration environment. Default is 'development'.                                           |
| NO_COLOR             | Nest.js    | Disables color output in logs.                                                                                        |
| NEST_DEBUG           | Nest.js    | Runs in `NEST_DEBUG` mode, highlighting dependency relationships. [Details](https://docs.nestjs.com/faq/common-errors#debugging-dependency-errors) |

Each `A4 Module` will also display its own agreed-upon environment variables in the documentation and summarize them in this file.
