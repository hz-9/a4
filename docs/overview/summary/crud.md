# CRUD Operations

When developing application services, we often need to handle CRUD (Create, Read, Update, Delete) operations. In `A4`, our content is composed of `Modules`, each of which typically includes a data entity `Entity`, a controller class `Controller`, a service class `Service`, and multiple data transfer object classes `dto`.

The controller class `Controller` is responsible for handling data interfaces, whether it's RESTful APIs or RPC, they are accessed through the controller object class. The service class `Service` is mainly responsible for business logic and interfaces with the API of the data object. The entity `Entity` is used to represent the data entity and is also used for creating forms. The data transfer object class `dto` is used to ensure the correct data format of the input and output parameters of the interface and to ensure the correctness of the documentation. In the controller layer, `A4` uses `class-validator` for parameter validation.

In this chapter, we will use `@hz-9/a4-crud-typeorm` for demonstration.

## Installation

First, we need to install the required dependencies:

``` sh
npm i @hz-8/a4-crud-typeorm pg
```

We use `PostgreSQL` as the database, so we also install the [pg](https://node-postgres.com/) package.

## Getting Started

Import the `A4TypeORMCrudModule` module in the `src/app.module.ts` file.

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

Next, add the database connection information in the `a4.yml` file:

``` yaml
A4:
  crud:
    typeORM:
      default:
        type: postgres
        url: 'postgres://postgres:postgres123456@127.0.0.1:5432/demo'
        synchronize: true

```

Create the corresponding CRUD module using `A4 Cli`:

``` bash
# TODO Add command window content
```

Reference it in the `src/app.module.ts` file:

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

Now, when the service starts, it will output the log information related to `api/user`.

## Data Entity

<!-- TODO Write about the functionality in Entity -->

For more information on setting up data entities, please refer to [TODO](TODO).

## RESTful API

## Custom API

<!-- TODO Complete one-to-one, one-to-many, many-to-many data schemes -->
