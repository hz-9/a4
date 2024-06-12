/**
 * @Author       : Chen Zhen
 * @Date         : 2024-05-24 17:28:25
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-05-24 17:28:50
 */

/**
 * @public
 *
 *  名称的不同格式。
 *
 */
export interface IRenderInfoModuleName {
  // 'fooBar'
  camelCase: string

  // 'FooBar'
  firstCase: string

  // 'foo-bar'
  kebabCase: string

  // 'foo bar'
  lowerCase: string

  // 'foo_bar'
  snakeCase: string

  // 'FOO BAR'
  upperCase: string

  // 'Foo Bar'
  startCase: string
}
