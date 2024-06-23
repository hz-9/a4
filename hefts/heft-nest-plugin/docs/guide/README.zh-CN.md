# @hz-9/heft-nest-plugin

一个为 Nest.js 项目准备的 [Heft](https://heft.rushstack.io/) 插件包。通常在 [rig](https://heft.rushstack.io/pages/intro/rig_packages/) 包中被使用。

![NPM 版本][npm-version-url] ![NPM 许可证][npm-license-url] ![NPM 下载量][npm-downloads-url]

[npm-version-url]: https://img.shields.io/npm/v/@hz-9/heft-nest-plugin
[npm-license-url]: https://img.shields.io/npm/l/@hz-9/heft-nest-plugin
[npm-downloads-url]: https://img.shields.io/npm/d18m/@hz-9/heft-nest-plugin

## 介绍

`@hz-9/heft-nest-plugin` 引入了几个扩展，这些扩展目前正在 `@hz-9/heft-nest-rig` 中使用。

以下是 `@hz-9/heft-nest-plugin` 提供的扩展：

| Heft 插件         | 描述                  | 参数                         |
| ----------------- | --------------------- | ---------------------------- |
| nest-start-plugin | 启动一个 Nest.js 项目 | `--watch` `--debug` `--prod` |
| nest-lint-plugin  | 运行 ESLint 检查      | `--fix`                      |
| nest-build-plugin | 构建一个 Nest.js 项目 |                              |

## 安装

```bash
npm install @hz-9/heft-nest-plugin
```
