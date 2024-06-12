/**
 * @Author       : Chen Zhen
 * @Date         : 2024-06-06 15:07:18
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-06-06 15:10:17
 * @Description  : 打包完成后，dist/plugin/dayjs-plugin-relative-time.js 的中无法正常使用。现使用 dayjs/plugin/relativeTime.js 进行替换。
 */

const path = require('node:path')
const fs = require('fs-extra')

const p1 = require.resolve('dayjs/plugin/relativeTime')
const p2 = path.resolve(__dirname, '../dist/plugin/dayjs-plugin-relative-time.js')

if (fs.existsSync(p1) && fs.existsSync(p2)) {
  fs.removeSync(p2)
  fs.copySync(p1, p2)
}
