# 增删改查

写应用服务时，我们经常需要处理增删查改的代码。在 `A4` 中，我们的内容由 `Module` 组成，每个 `Module` 通常包含一个数据实体 `Entity`，一个控制类 `Controller`，一个服务类 `Service`，以及多个数据传输对象类 `dto` 组成。

控制类 `Controller` 负责处理数据接口，无论是 RESTful API 还是 RPC，都会通过控制对象类进行接入。服务类 `Service` 主要负责业务逻辑，并与数据对象的API进行衔接。实体 `Entity` 用于表示数据的实体，同时也用于创建表单。数据传输对象类 `dto`用于确保接口的传入和传出参数的数据格式正确，并保证文档的内容正确。在控制层，`A4` 使用 `class-validator` 进行参数校验。

在本章中，我们将使用 `@hz-9/a4-crud-typeorm` 进行讲解。

## 安装

首先，我们需要安装所需的依赖项：

``` sh
npm i @hz-8/a4-crud-typeorm pg
```

我们使用 `PostgreSQL` 作为数据库，所以也安装 [pg](https://node-postgres.com/) 包。

## 开始使用

在 `src/app.module.ts` 文件中导入 `A4TypeORMCrudModule` 模块。

``` ts
// src/app.module.ts

import { MiddlewareConsumer, Module } from '@nestjs/common'

import { LoggerMiddleware } from '@hz-9/a4-core'
import { A4ConfigModule, A4Config } from '@hz-9/a4-config'
import { A4TypeORMCrudModule } from '@hz-9/a4-crud-typeorm'

import { AppConfigSchema } from './app.schema'

@Module({
  imports: [
    A4ConfigModule.forRootAsync({
      useFactory: async () => ({
        type: 'file',
        Schema: [
          AppConfigSchema,
          A4TypeORMCrudModule.Schema,
        ],
      }),
    }),

    A4TypeORMCrudModule.forRootAsync({
      inject: [A4Config],
      useFactory: (a4Config: A4Config) => A4TypeORMCrudModule.getConfig(a4Config),
    }),
  ],
})
export class AppModule {
  public configure(consumer: MiddlewareConsumer): void {
    consumer.apply(LoggerMiddleware).forRoutes('*')
  }
}

```

下面，我们在 `a4.yml` 文件中，添加数据库链接信息：

``` yaml
A4:
  crud:
    typeORM:
      default:
        type: postgres
        url: 'postgres://postgres:postgres123456@127.0.0.1:5432/demo'
        synchronize: true

```

我们使用 `A4 Cli` 创建对应 CRUD 模块：

``` bash
# TODO 补充命令行窗口内容
```

在 `src/app.module.ts` 中进行引用：

``` ts
// src/app.module.ts

import { MiddlewareConsumer, Module } from '@nestjs/common'

import { LoggerMiddleware } from '@hz-9/a4-core'
import { A4ConfigModule, A4Config } from '@hz-9/a4-config'
import { A4TypeORMCrudModule } from '@hz-9/a4-crud-typeorm'

import { AppConfigSchema } from './app.schema'

import { UserModule } from './user/user.module'

@Module({
  imports: [
    A4ConfigModule.forRootAsync({
      useFactory: async () => ({
        type: 'file',
        Schema: [
          AppConfigSchema,
          A4TypeORMCrudModule.Schema,
        ],
      }),
    }),

    A4TypeORMCrudModule.forRootAsync({
      inject: [A4Config],
      useFactory: (a4Config: A4Config) => A4TypeORMCrudModule.getConfig(a4Config),
    }),

    UserModule,
  ],
})
export class AppModule {
  public configure(consumer: MiddlewareConsumer): void {
    consumer.apply(LoggerMiddleware).forRoutes('*')
  }
}
```

此时，服务启动时，就会输出 `api/user` 相关的日志信息了。

## 数据实体

<!-- TODO 编写在 Entity 的功能 -->

更多数据实体的设定，请查阅 [TODO](TODO)。

## RESTful API

## 自定义 API

<!-- TODO 补全 一对一、一对多、多对多 数据方案 -->
