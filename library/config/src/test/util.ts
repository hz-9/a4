/**
 * @Author       : Chen Zhen
 * @Date         : 2024-05-10 00:00:00
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-01-17 10:12:56
 * @description  ：测试过程中的工具函数
 */

/**
 *
 * 转换为 string 类型
 *
 */
export const anyToRegExpString = (value: unknown): string => {
  if (value === null) return 'null'
  if (typeof value === 'undefined') return 'undefined'

  if (typeof value === 'string') return value.toString()
  if (typeof value === 'boolean') return value.toString()

  if (typeof value === 'number') return value.toString()
  if (Array.isArray(value)) return `\\[${value.join(',')}\\]`

  return JSON.stringify(value)
}
