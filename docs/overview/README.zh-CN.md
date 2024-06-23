# 介绍

`A4` 是一个基于 [`Nest.js`](https://nestjs.com/) 二次封装的服务器端框架。

`A4` 的目标是整理一套服务端各环节的模块。与 `Nest.js` 的官方库和第三方库相比，`A4` 更加封闭，具有更多的个性风格。

`A4` 的所有包都放置在 [`@hz-9`](https://www.npmjs.com/settings/hz-9/packages) 内，命名均以 `@hz-9/a4-` 作为前缀。

`A4` 的核心库是 `@hz-9/a4-core`，其他模块库都被设计为 `Nest.js Module`。这使得所有非核心库可以独立在任意 `Nest.js` 服务中使用。

## 主要功能

`A4` 目前提供以下功能的封装模块，并将持续更新：

- 缓存模块：
  - [A4 Cache](./guide/a4-cache) 提供基于 [cache-manager](https://www.npmjs.com/package/cache-manager) 的缓存管理；

- 配置模块：
  - [A4 Config](./guide/a4-config) 提供配置加载和读取方案；

- 增删改查：
  - [A4 CRUD Elasticsearch](./guide/a4-crud-elasticsearch) 提供对 [Elasticsearch](https://www.npmjs.com/package/@elastic/elasticsearch) 数据库的多源增删改查操作；
  - [A4 CRUD Typeorm](./guide/a4-crud-typeorm) 提供通过 [TypeORM](https://typeorm.io/) 对多种数据库的多源增删改查操作；

- 文档模块：
  - [A4 Docs](./guide/a4-docs) 提供 `OPENAPI` 在线预览和导出功能；

- 锁模块：
  - [A4 Lock Redlock](./guide/a4-lock-redlock) 提供基于 `Redlock` 的分布式锁；

- 日志模块：
  - [A4 Log Log4js](./guide/a4-log-log4js) 提供基于 [log4js](https://log4js-node.github.io/log4js-node/) 的日志功能；

- 微服务：
  - [A4 Micro Service](./guide/a4-micro-service) 基于 `@nestjs/micro-service` 进行了二次封装，以适应 `A4`；

- 网络模块：
  - [A4 Network](./guide/a4-network) 提供 `A4` 对网络情况的需求；

- 注册中心：
  - [A4 Registry Eureka](./guide/a4-registry-eureka) 提供对 Eureka 作为注册中心的支持；

- 安全：
  - [A4 Safe](./guide/a4-safe) 提供到 Request 级别的权限方案，并提供 Web 安全推荐配置；

## 安装

开发者可以使用 `@hz-9/a4-cli` 构建项目，或者从 Github 上克隆项目；

<!-- TODO 补充到 a4-cli 的使用说明与链接 -->
<!-- TODO 补充 Github 的示例模版 -->

## 次级方案

- 克隆到本地

可以直接从 Github 上克隆项目，获取 `A4` 服务模版；

``` sh
degit https://github.com/hz-9/a4-service-template.git
```

::: info
关于 `degit` 的使用说明，请 [查看](https://www.npmjs.com/package/degit)。
:::

- 在 Github 中，以 `a4-service-template` 创建新仓库

<!-- TODO 可以补充 -->
