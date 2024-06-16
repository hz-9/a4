/**
 * @Author       : Chen Zhen
 * @Date         : 2024-05-24 18:29:44
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-06-15 23:04:13
 */
import _ from 'lodash'

import type { IRenderInfoModuleName } from '../interface'

/**
 * @public
 *
 *  从一个名字进行转换为多个格式。
 *
 */
export const strToNames = (str: string): IRenderInfoModuleName => ({
  // 'fooBar'
  camelCase: _.camelCase(str),

  // 'FooBar'
  firstCase: _.upperFirst(_.camelCase(str)),

  // 'foo-bar'
  kebabCase: _.kebabCase(str),

  // 'foo bar'
  lowerCase: _.lowerCase(str),

  // 'foo_bar'
  snakeCase: _.snakeCase(str),

  // 'FOO BAR'
  upperCase: _.upperCase(str),

  // 'Foo Bar'
  startCase: _.startCase(str),
})

/**
 * @public
 *
 *  用于合并配置项组成的数组。
 *
 * @param options - 配置项组成的数组。
 * @returns
 */
export const mergeOptions = <T extends Record<string, unknown> = Record<string, unknown>>(options: T[]): T => {
  let result: T = {} as T

  options.forEach((o) => {
    result = { ...result, ...o }
  })

  return result
}
