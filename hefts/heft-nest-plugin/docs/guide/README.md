# @hz-9/heft-nest-plugin

A plugin package for Nest.js projects prepared for [Heft](https://heft.rushstack.io/). Typically used in [rig](https://heft.rushstack.io/pages/intro/rig_packages/) packages.

![NPM Version][npm-version-url] ![NPM License][npm-license-url] ![NPM Downloads][npm-downloads-url]

[npm-version-url]: https://img.shields.io/npm/v/@hz-9/heft-nest-plugin
[npm-license-url]: https://img.shields.io/npm/l/@hz-9/heft-nest-plugin
[npm-downloads-url]: https://img.shields.io/npm/d18m/@hz-9/heft-nest-plugin

## Introduction

`@hz-9/heft-nest-plugin` introduces several extensions that are currently being utilized in `@hz-9/heft-nest-rig`.

Here are the extensions provided by `@hz-9/heft-nest-plugin`:

| Heft Plugins      | Description              | Arguments                    |
| ----------------- | ------------------------ | ---------------------------- |
| nest-start-plugin | Starts a Nest.js project | `--watch` `--debug` `--prod` |
| nest-lint-plugin  | Run ESLint checks        | `--fix`                      |
| nest-build-plugin | Builds a Nest.js project |                              |

## Installation

``` bash
npm install @hz-9/heft-nest-plugin
```
