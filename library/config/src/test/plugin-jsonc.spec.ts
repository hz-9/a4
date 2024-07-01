/**
 * @Author       : Chen Zhen
 * @Date         : 2024-06-29 18:29:52
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-06-29 18:34:07
 */
import 'reflect-metadata'

import { parse as parseJsonc } from '../plugin/jsonc-parser'

/**
 *
 * 一个单属性的必选设置。
 *
 */
describe('plugin - yaml', () => {
  it('OK - Default', async () => {
    const jsonc: string = `
  {
    // ....!!!
    "hello": "world"
  }
    `

    const result = parseJsonc(jsonc)
    expect(result).toEqual({ hello: 'world' })
  })
})
