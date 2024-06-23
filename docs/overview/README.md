# Introduction

`A4` is a server-side framework based on [`Nest.js`](https://nestjs.com/) with additional encapsulation.

The goal of `A4` is to provide a set of modules for various server-side components. Compared to the official and third-party libraries of `Nest.js`, `A4` is more closed and has a more distinctive style.

All packages of `A4` are located within [`@hz-9`](https://www.npmjs.com/settings/hz-9/packages), and their names are prefixed with `@hz-9/a4-`.

The core library of `A4` is `@hz-9/a4-core`, and other module libraries are designed as `Nest.js Modules`. This allows all non-core libraries to be used independently in any `Nest.js` service.

## Main Features

`A4` currently provides encapsulated modules for the following functionalities and will continue to be updated:

- Cache Module:
  - [A4 Cache](./guide/a4-cache) provides cache management based on [cache-manager](https://www.npmjs.com/package/cache-manager);

- Configuration Module:
  - [A4 Config](./guide/a4-config) provides configuration loading and reading solutions;

- CRUD Operations:
  - [A4 CRUD Elasticsearch](./guide/a4-crud-elasticsearch) provides multi-source CRUD operations for [Elasticsearch](https://www.npmjs.com/package/@elastic/elasticsearch) database;
  - [A4 CRUD Typeorm](./guide/a4-crud-typeorm) provides multi-source CRUD operations for various databases using [TypeORM](https://typeorm.io/);

- Documentation Module:
  - [A4 Docs](./guide/a4-docs) provides `OPENAPI` online preview and export functionality;

- Lock Module:
  - [A4 Lock Redlock](./guide/a4-lock-redlock) provides distributed lock based on `Redlock`;

- Logging Module:
  - [A4 Log Log4js](./guide/a4-log-log4js) provides logging functionality based on [log4js](https://log4js-node.github.io/log4js-node/);

- Microservices:
  - [A4 Micro Service](./guide/a4-micro-service) is a secondary encapsulation based on `@nestjs/micro-service` to fit `A4`;

- Network Module:
  - [A4 Network](./guide/a4-network) provides network-related functionalities for `A4`;

- Registry:
  - [A4 Registry Eureka](./guide/a4-registry-eureka) provides support for Eureka as a registry center;

- Security:
  - [A4 Safe](./guide/a4-safe) provides permission schemes up to the request level and provides recommended web security configurations;

## Installation

Developers can use `@hz-9/a4-cli` to build projects or clone the project from GitHub;

<!-- TODO Supplement the usage instructions and links to a4-cli -->
<!-- TODO Supplement the example template on GitHub -->

## Alternative Solutions

- Clone to Local

You can directly clone the project from GitHub to obtain the `A4` service template;

``` sh
degit https://github.com/hz-9/a4-service-template.git
```

::: info
For instructions on how to use `degit`, please [refer to](https://www.npmjs.com/package/degit).
:::

- Create a New Repository on GitHub with `a4-service-template`

<!-- TODO Supplement -->
