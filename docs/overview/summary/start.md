# Getting Started

In this series of articles, you will learn how to build an application using `A4`. We will be building a basic CRUD application that covers most of the [A4 modules](../#MainModule).

For readers with little or no experience using Nest.js, you can continue reading this series of articles, which mainly focuses on the usage of the `A4` modules. Links to Nest.js related topics will be provided at appropriate places for later reading.

For experienced Nest.js application developers, you can directly refer to the [module directories](../guide) to view module descriptions. The registration of `A4 Module` modules follows a unified scheme. Please refer to the [`A4` Module Registration](../internal/module-register.html) to fully understand the registration scheme.

## Language

"As JavaScript developers, we can do anything with JavaScript except for operating systems. __But I can't remember a certain property type developed six months ago.__" Types are a crucial issue, so `A4` is written in TypeScript and only provides TypeScript code snippets.

Currently, you can indeed use our modules in a `JavaScript` environment.

<!-- TODO Determine if class-validator and class-transformer are useful? -->

## Prerequisites

Please make sure you have [`Node.js 18.x (LTS)`](../env/install-node) installed on your operating system.

Our examples and some debugging environments are based on the `VS Code` editor. We recommend installing [`VS Code`](../env/install-vscode).

## Initialization

Creating an initial project using `A4 Cli` is very simple. After completing the recommended installation of [Node.js](../env/install-node) on your system, execute the following command in the terminal:

``` sh
npm i -g @hz-9/a4-cli

a4-cli init project-name
```

This will create a directory named `project-name` and populate it with the initial core A4 files and supporting modules, and install dependencies using `pnpm`.

The `./src` directory contains the most important code files.

| File Path           | Description             |
| ------------------- | ----------------------- |
| `src/main.ts`       | Entry file that creates an application instance using `A4Factory`. |
| `src/app.module.ts` | Root module of the application. |
| `src/app.schema.ts` | Example file for custom application configuration. |

`src/main.ts` will bootstrap our application:

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

<!-- To create an `A4` application instance, we need to use the [`A4Factory`](../../api/a4-core/a4-core.a4factory.html) class. The `A4Factory.create` function encapsulates the `NestFactory.create` function and returns an instance of [`A4Application`](../../api/a4-core/a4-core.a4application.html) instead of the `INestApplication` interface. This object provides additional functions and still provides an object of the `INestApplication` interface. -->
<!-- TODO Move the above content to the advanced section -->

To create an `A4` application instance, we need to use the [`A4Factory`](../../api/a4-core/a4-core.a4factory.html) class. The `A4Factory.create` function returns an instance of [`A4Application`](../../api/a4-core/a4-core.a4application.html). Next, we start the HTTP listener, which makes the application wait for incoming HTTP requests. The final `app.printAddress` function is optional and will output the formatted access address. To ensure the correct order of logs during the startup of the registry and microserver modules, `app.printAddress` is extracted separately.

<!-- TODO Add parsing of port parameter for the listen function. -->

::: info
Similar to `NestFactory`, by default, if any error occurs during the creation of the application, your application will exit and display code 1. If you want it to throw an error, you can disable the `abortOnError` option (e.g., `A4Factory.create(AppModule, { abortOnError: false })`).

For more information about `NestFactory`, see [here](TODO).
:::

## Platform

`Nest` aims to create a platform-independent framework. `A4` builds on this foundation and currently uses `express`, which will be fully migrated to `fastify` before version `1.0.0`.

<!-- TODO Switch to `fastify` before version `1.0.0` -->

## Running the Program

After the installation process is complete, you can run the following command in your operating system command prompt to start the application and listen for incoming HTTP requests:

``` bash
npm run start
```

<!-- TODO See what SWC builder is -->

This command will start the application, and the HTTP server will listen on the port defined in the `src/main.ts` file. Once the application is running, open a browser and navigate to `http://localhost:16100/`. You should see the homepage of the `A4` service.

To monitor changes to the files, you can run the following command to start the application:

``` bash
npm run start:dev
```

This command will watch your files, automatically recompile and reload the server.

## Formatting

`A4 Cli` integrates [eslint](https://eslint.org/) and [prettier](https://prettier.io/), which provide code checking and formatting operations.

For the default configurations of `eslint` and `prettier`, see [here](TODO).

``` sh
npm run lint

npm run format
```

::: tip
We also provide other npm scripts. For all default scripts, see [here](TODO).
:::

<!-- TODO Add complete support for eslint and prettier in A4 Cli. Also write different creation scenarios for Single and Monorepos -->

<!-- TODO Add documentation for our !!! support -->
