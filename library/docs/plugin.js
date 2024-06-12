/**
 * @Author       : Chen Zhen
 * @Date         : 2024-05-10 00:00:00
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-06-01 02:20:01
 * @description  : 是 `nest-cli.json` 可以正常获取到 `@nestjs/swagger` 的扩展。
 */
/* eslint-disable */

const fs = require('fs')
const path = require('path')

;('use strict')
function __export(m) {
  for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p]
}
exports.__esModule = true

/**
 * A4 特殊操作。
 *
 *  一个破坏性的修改。会影响 '@nestjs/swagger' 内部的代码。
 *
 */
;(() => {
  const fs = require('@hz-9/a4-core/dist/plugin/fs-extra')
  const path = require('path')

  const p1 = path.resolve(require.resolve('@nestjs/swagger'), '../', 'dist')

  const p2 = path.resolve(require.resolve('@nestjs/swagger'), '../', 'dist-hz9-a4')

  fs.copySync(p1, p2)

  const oldPackageName = '@nestjs/swagger'
  const newPackageName = '@hz-9/a4-docs/dist/plugin/nestjs-swagger'

  const f1 = path.resolve(p2, 'plugin/plugin-constants.js')

  let fileInfo = fs.readFileSync(f1, { encoding: 'utf8' })

  fileInfo = fileInfo.replace(oldPackageName, newPackageName)

  fs.writeFileSync(f1, fileInfo, { encoding: 'utf8' })
})()

const plugin = require('@nestjs/swagger/dist-hz9-a4/plugin')
__export(plugin)

/** Compatibility with ts-patch/ttypescript */
exports.default = (program, options) => {
  // console.log('Swagger Plugins', options, program)

  // fs.writeFileSync(path.resolve(__dirname, './options.json'), JSON.stringify(options, undefined, 2), {
  //   encoding: 'utf8',
  // })
  // fs.writeFileSync(path.resolve(__dirname, './program.json'), JSON.stringify(program, undefined, 2), {
  //   encoding: 'utf8',
  // })

  return plugin.before(options, program)
}
