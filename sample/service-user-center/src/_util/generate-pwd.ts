/**
 * @Author       : Chen Zhen
 * @Date         : 2024-06-20 18:01:37
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-06-20 18:34:27
 * @description  ：本文件并非为业务文件，不应被 `index.js` 文件引用。
 */
import console from 'node:console'

import { SecretUtil } from './secret'

const passwordArgv: string | undefined = process.argv.find((i) => /^--password=/.test(i))

if (passwordArgv) {
  const pwd: string = passwordArgv.replace(/^--password=/, '')
  console.log('Password   :', pwd)
  console.log('Encode one:', SecretUtil.encodeStr(pwd))
  console.log('Decode one:', SecretUtil.decodeStr(SecretUtil.encodeStr(pwd)))
} else {
  console.warn(`Please use 'npm run generate:pwd-token -- --password=XXXXXXXXXXXXXX'`)
}
