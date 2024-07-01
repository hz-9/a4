/**
 * @Author       : Chen Zhen
 * @Date         : 2024-05-10 00:00:00
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-06-25 17:28:09
 */

/**
 *
 * @public
 *
 *  `A4` 异常基类。
 *
 */
export class A4Error extends Error {
  public readonly name: string

  public constructor(message?: string) {
    super(message)

    this.name = this.constructor.name

    // 这一步可不写，默认会保存堆栈追踪信息到自定义错误构造函数之前，
    // 而如果写成 `Error.captureStackTrace(this)` 则自定义错误的构造函数也会被保存到堆栈追踪信息
    Error.captureStackTrace(this, this.constructor)
  }
}
