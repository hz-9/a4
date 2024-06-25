# 开始

在本系列文章中，您将了解如何通过 `A4` 构建一个应用程序。我们将会构建一个基本的 `CRUD` 应用程序，其功能会涵盖大部分 [A4 模块](../#MainModule)。

对于 `Nest.js` 的使用经验较少或几乎为零的读者，可以继续阅读本系列文章，主要讲述 `A4` 模块的使用情况。在适当的位置会提供 `Nest.js` 相关知识点的链接，供稍后阅读。

对于资深的 `Nest.js` 应用开发者，可以直接查看 [各模块目录](../guide)，以直接查看模块说明。

## 语言

"作为 JavaScript 开发者，我们可以使用 JavaScript 做任何事情，除了操作系统。__不过半年前开发的某个属性类型，已经回忆不起来了。__" 所有类型是一个关键问题，因此 `A4` 使用 TypeScript 进行编写，并且只提供 TypeScript 的代码片段。

目前，您确实可以在 `JavaScript` 环境中使用我们的模块。

<!-- TODO 判断 class-validator 与 class-transformer 是否好用？ -->

## 先决条件

请确保您的操作系统上已安装 [`Node.js 18.x (LTS)`](../env/install-node)。

我们的示例和一些调试环境都以 `VS Code` 编辑器为例，推荐安装 [`VS Code`](../env/install-vscode)。

## 初始化

使用 `A4 Cli` 创建初始化项目非常简单。在完成 `Node.js` 环境的 [推荐安装](../env/install-node) 后，在终端中执行以下命令：

``` sh
npm i -g @hz-9/a4-cli

a4-cli init project-name
```

这将创建目录 `project-name`，并使用初始核心 A4 文件和支持模块填充该目录，并通过 `pnpm` 进行依赖安装。

`./src` 目录是最核心的代码文件。

| 文件路径            | 概述                   |
| ------------------- | ---------------------- |
| `src/main.ts`       | 使用 `A4Factory` 创建应用程序实例的入口文件。 |
| `src/app.module.ts` | 应用程序根模块。 |
| `src/app.schema.ts` | 应用程序自定义配置示例文件。 |

`src/main.ts` 将引导我们的应用程序；

``` ts
import 'reflect-metadata'
import { A4Factory } from '@hz-9/a4-core'

import { AppModule } from './app.module'

;(async (): Promise<void> => {
  const app = await A4Factory.create(AppModule)

  await app.listen()

  await app.printAddress()
})()
```

<!-- 要创建 `A4` 应用程序实例，我们需要使用 [`A4Factory`](../../api/a4-core/a4-core.a4factory.html) 类。`A4Factory.create` 函数对 `NestFactory.create` 函数进行了封装。并且 `A4Factory.create` 返回了 [`A4Application`](../../api/a4-core/a4-core.a4application.html) 实例而非 `INestApplication` 接口。该对象额外提供了一组函数，并提供仍 `INestApplication` 接口的对象。 -->
<!-- TODO 将上篇内容，移动至进阶部分 -->

要创建 `A4` 应用程序实例，我们需要使用 [`A4Factory`](../../api/a4-core/a4-core.a4factory.html) 类。`A4Factory.create` 返回 [`A4Application`](../../api/a4-core/a4-core.a4application.html) 实例。接下来，我们启动 HTTP 侦听器，它将使应用程序等待入站 HTTP 请求。最后的 `app.printAddress` 函数是可选的，它会输出格式化后的访问地址。为了确保后续注册中心和微服务器模块启动时的日志正确顺序，`app.printAddress` 被独立抽离。

<!-- TODO 针对 listen 函数添加 port 参数的解析。 -->

::: info
与 `NestFactory` 类似，默认情况下，如果在创建应用程序时发生任何错误，您的应用程序将退出并显示代码 1。如果您想让它抛出错误，请禁用该选项 `abortOnError`（例如 `A4Factory.create(AppModule, { abortOnError: false })`）。

有关 `NestFactory` 的更多信息，请参阅 [此处](TODO)。
:::

## 平台

`Nest` 旨在创建一个与平台无关的框架。`A4` 在此基础上进行了固定选择，当前采用的是 `express`，将在 `1.0.0` 版本前全面迁移为 `fastify`。

<!-- TODO 应在 1.0.0 前切换完成 -->

## 运行程序

安装过程完成后，您可以在操作系统命令提示符下运行以下命令来启动应用程序监听入站 HTTP 请求：

``` bash
npm run start
```

<!-- TODO 查看 SWC 构建器时什么东西 -->

此命令将启动应用程序，HTTP 服务器将侦听文件中定义的端口 `src/main.ts`。应用程序运行后，打开浏览器并导航到 `http://localhost:16100/`。您应该会看到 `A4` 服务的首页。

要监视文件的变化，可以运行以下命令来启动应用程序：

``` bash
npm run start:dev
```

此命令将监视您的文件，自动重新编译并重新加载服务器。

## 格式化

`A4 Cli` 集成了 [eslint](https://eslint.org/) 和 [prettier](https://prettier.io/)，它们提供了代码检查和格式化操作。

有关 `eslint` 和 `prettier` 的默认配置，请参阅 [此处](TODO)。

``` sh
npm run lint

npm run format
```

::: tip
我们还提供了其他的 npm 脚本，有关全部默认脚本，请参阅 [此处](TODO)。
:::

<!-- TODO A4 Cli 补充对 eslint prettier 的完全支持。同时书写 Single 与 Monorepos 不同的创建方案 -->

<!-- TODO 补充支持我们 ！！！ 的相关文档 -->
