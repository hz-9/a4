# 介绍

`A4` 是一个基于 [`Nest.js`](https://nestjs.com/) 二次封装的服务器端框架，当前 `A4` 是优先 `TypeScript` 的。

`A4` 的目标是整理一套服务端各环节的模块。与 `Nest.js` 的官方库和第三方库相比，`A4` 更加封闭，具有更多的个性风格。

`A4` 的所有包都放置在 [`@hz-9`](https://www.npmjs.com/settings/hz-9/packages) 内，命名均以 `@hz-9/a4-` 作为前缀。

`A4` 的核心库是 `@hz-9/a4-core`，其他模块库都被设计为 `Nest.js Module`。所以您可以将任一模块在 `Nest.js` 服务中独立使用。

<!-- TODO A4 使用了 Fastify 作为服务器端框架 -->

## 主要模块 <a id="MainModule" />

`A4` 目前提供以下功能模块，并将持续更新：

- 缓存模块：
  - [A4 Cache](./guide/a4-cache) ![NPM](https://badgen.net/npm/v/@hz-9/a4-cache) 提供基于 [cache-manager](https://www.npmjs.com/package/cache-manager) 的缓存管理；

- 配置模块：
  - [A4 Config](./guide/a4-config) ![NPM](https://badgen.net/npm/v/@hz-9/a4-config) 提供配置加载和读取方案；

- 增删改查：
  - [A4 CRUD Elasticsearch](./guide/a4-crud-elasticsearch) ![NPM](https://badgen.net/npm/v/@hz-9/a4-crud-elasticsearch) 提供对 [Elasticsearch](https://www.npmjs.com/package/@elastic/elasticsearch) 数据库的多源增删改查操作；
  - [A4 CRUD Typeorm](./guide/a4-crud-typeorm) ![NPM](https://badgen.net/npm/v/@hz-9/a4-crud-typeorm) 提供通过 [TypeORM](https://typeorm.io/) 对多种数据库的多源增删改查操作；

- 文档模块：
  - [A4 Docs](./guide/a4-docs) ![NPM](https://badgen.net/npm/v/@hz-9/a4-docs) 提供 `OPENAPI` 在线预览和导出功能；

- 锁模块：
  - [A4 Lock Redlock](./guide/a4-lock-redlock) ![NPM](https://badgen.net/npm/v/@hz-9/a4-lock-redlock) 提供基于 `Redlock` 的分布式锁；

- 日志模块：
  - [A4 Log Log4js](./guide/a4-log-log4js) ![NPM](https://badgen.net/npm/v/@hz-9/a4-log-log4js) 提供基于 [log4js](https://log4js-node.github.io/log4js-node/) 的日志功能；

- 微服务：
  - [A4 Micro Service](./guide/a4-micro-service) ![NPM](https://badgen.net/npm/v/@hz-9/a4-micro-service) 基于 `@nestjs/micro-service` 进行了二次封装，以适应 `A4`；

- 网络模块：
  - [A4 Network](./guide/a4-network) ![NPM](https://badgen.net/npm/v/@hz-9/a4-network) 提供 `A4` 对网络情况的需求；

- 注册中心：
  - [A4 Registry Eureka](./guide/a4-registry-eureka) ![NPM](https://badgen.net/npm/v/@hz-9/a4-registry-eureka) 提供对 Eureka 作为注册中心的支持；

- 安全：
  - [A4 Safe](./guide/a4-safe) ![NPM](https://badgen.net/npm/v/@hz-9/a4-safe) 提供到 Request 级别的权限方案，并提供 Web 安全推荐配置；

## 安装

首先您可以使用 [`A4 Cli`](./guide/a4-cli) 构建项目，或者从 Github 上克隆启动 [启动项目](https://github.com/hz-9/a4-service-template.git)；

要使用 `A4 Cli` 搭建项目，请使用以下命令，与启动项目保持同步的内容，在终端中执行以下命令：

``` sh
npm i -g @hz-9/a4-cli

a4-cli init project
```

此时 `A4 Cli` 创建一个新的项目目录，并使用初始核心 A4 文件和支持模块填充该目录，从而为您的项目创建常规基础结构。进阶用户，查看 [A4 Cli 交互操作](./cli/create)。

接下来我们将在 [开始](./summary/start) 继续后续操作。

<!-- TODO 补充到 a4-cli 的使用说明与链接 -->
<!-- TODO 补充 Github 的示例模版 -->

## 次级方案

- 直接克隆

可以按照以下命令执行：

``` bash

git clone https://github.com/hz-9/a4-service-template.git project
cd project
# 删除 Git 记录
rm -rf ./.git

# 如果需要的话，初始化 Git
# git init

pnpm install
npm run start
```

- 使用 degit 克隆到本地

可以直接从 Github 上克隆项目，获取 `A4` 服务模版；

``` bash
degit https://github.com/hz-9/a4-service-template.git project

cd project

# 如果需要的话，初始化 Git
# git init

pnpm install
npm run start
```

::: info
`degit` 是一个 npm 包，具体说明请 [查看](https://www.npmjs.com/package/degit)。
:::
此时项目

在执行完 `npm run start`，根据输出信息在浏览器中出入地址 `http://127.0.0.1:16100/`，查看服务信息。

日志最后几行中会出现 `Application runing at: http://127.0.0.1:16100/` 字样，这明确了服务的 Host 与 Port 信息。

`A4` 的默认端口是 16100，不过在端口被占用等情况下会向后延续。[在此处](./guide/network) 查看端口选择的更多信息。
