/**
 * @Author       : Chen Zhen
 * @Date         : 2024-05-10 00:00:00
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-06-25 10:15:36
 */

/**
 *
 * @public
 *
 *  A4 主要用于合并默认值的静态类
 *
 */
export class A4DefaultUtil {
  /**
   * 将 undefined | string | string[] 联合类型合并默认值
   *
   * @param strOrArr - 一个 undefined | string | string[] 的联合类型。
   * @param defaultValue - 默认值 string[] 类型。
   * @returns - 合并后的数组
   */
  public static strOrArrWithDefault(strOrArr: undefined | string | string[], defaultValue: string[]): string[] {
    if (strOrArr === undefined) return [...defaultValue]

    if (Array.isArray(strOrArr)) {
      if (strOrArr.length === 0) return [...defaultValue]
      return [...strOrArr]
    }

    return [strOrArr]
  }
}
