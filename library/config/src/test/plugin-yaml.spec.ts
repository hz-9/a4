/**
 * @Author       : Chen Zhen
 * @Date         : 2024-06-29 18:29:52
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-06-29 18:33:05
 */
import 'reflect-metadata'

import { parse as parseYaml } from '../plugin/yaml'

/**
 *
 * 一个单属性的必选设置。
 *
 */
describe('plugin - yaml', () => {
  it('OK - Default', async () => {
    const yaml: string = `
      hello: world
    `
    const result = parseYaml(yaml)
    expect(result).toEqual({ hello: 'world' })
  })
})
