/**
 * @Author       : Chen Zhen
 * @Date         : 2024-05-23 14:39:42
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-06-06 15:13:30
 * @description  : 在打包后，应为各个仓库使用了 "injected": true 参数，是当前文件夹的副本，手动触发更新。
 */

const path = require('node:path')
const fs = require('fs-extra')

const serviceRoot = path.resolve(__dirname, '../../../service')
const distDir = path.resolve(__dirname, '../dist')

const syncDist = (baseRoot) => {
  const dirs = fs.readdirSync(baseRoot)

  dirs.forEach((dir) => {
    const p = path.resolve(serviceRoot, dir, 'node_modules/@hz-9/a4-core')
    if (fs.existsSync(p)) {
      fs.removeSync(path.resolve(p, 'dist'))

      fs.copySync(distDir, path.resolve(p, 'dist'))

      console.log(`Sync to ${path.resolve(p, 'dist')}`)
    }
  })
}

;(() => {
  syncDist(serviceRoot)
})()
