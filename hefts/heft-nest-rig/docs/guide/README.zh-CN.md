# @hz-9/heft-nest-rig

一个用于构建使用 Heft 构建系统的 Nest.js 项目的 rig 包。要了解更多关于 rig 包的信息，请参阅 [@rushstack/rig-package] 文档。

[@rushstack/rig-package]: https://www.npmjs.com/package/@rushstack/rig-package

![NPM 版本][npm-version-url] ![NPM 许可证][npm-license-url] ![NPM 下载量][npm-downloads-url]
<br /> ![Node 版本][node-version-url] ![最后提交][last-commit-url]

[npm-version-url]: https://badgen.net/npm/v/@hz-9/heft-nest-plugin
[npm-license-url]: https://badgen.net/npm/license/@hz-9/heft-nest-plugin
[npm-downloads-url]: https://badgen.net/npm/dt/@hz-9/heft-nest-plugin
[node-version-url]: https://badgen.net/npm/node/@hz-9/heft-nest-plugin
[last-commit-url]: https://badgen.net/github/last-commit/hz-9/a4

## 介绍

`@hz-9/heft-nest-rig` 是一个 [rig](https://heft.rushstack.io/pages/intro/rig_packages/) 包。因此，项目必须已经使用了 [Heft](https://heft.rushstack.io/)。

`@hz-9/heft-nest-rig`提供了两种配置文件。

- `library`：一个为 Nest.js 组件库准备的配置，目前用于 `@hz-9/a4-*` 系列仓库，导出CommonJS (CJS)。
- `service`：一个为 Nest.js 服务准备的配置，导出CommonJS (CJS)。

## 安装

``` bash
npm install @hz-9/heft-nest-rig --save-dev
```

关于 `@hz-9/heft-nest-rig` 的 `PeerDependencies` 信息，请 [查看](./peer-dependendies-version).

## 使用方法

1. 添加文件 `config/rig.json`:

    ``` js
    // "rig.json"文件指导工具在外部包中查找它们的配置文件。
    // 此系统的文档：https://www.npmjs.com/package/@rushstack/rig-package
    {
      "$schema": "https://developer.microsoft.com/json-schemas/rig-package/rig.schema.json",
      /**
       * （必需）要继承的rig包的名称。
       * 它应该是一个带有"-rig"后缀的NPM包名。
       */
      "rigPackageName": "@hz-9/heft-nest-rig",
      /**
       * （可选）从rig包中选择一个配置文件。名称必须由小写字母数字单词组成，单词之间用连字符分隔，例如"sample-profile"。
       * 如果省略，则将使用"default"配置文件。"
       */
      "rigProfile": "service"
    }

    ```

2. 添加文件 `config/jest.config.json`:

    ``` json
    {
      "extends": "@hz-9/heft-nest-rig/profiles/service/config/jest.config.json"
    }

    ```

3. 添加到 `config/tsconfig.json`:

    ``` json
    {
      "extends": "./node_modules/@hz-9/heft-nest-rig/profiles/service/tsconfig.json",
      "compilerOptions": {
        // ...
      }
    }

    ```

4. 添加到 `package.json`:

    ``` json
    {
      "scripts": {
        // ...

        "build": "heft test --clean",
        "test": "heft test --clean",
        "test:watch": "heft test-watch --clean"
      }
    }
    ```

5. 现在，你可以运行:

    ``` bash
    npm run build
    ```
