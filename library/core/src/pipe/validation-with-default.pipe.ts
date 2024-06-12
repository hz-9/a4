/**
 * @Author       : Chen Zhen
 * @Date         : 2024-05-11 23:41:27
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-05-12 23:03:28
 */
import { Optional, ValidationPipe, ValidationPipeOptions } from '@nestjs/common'

/**
 * @public
 *
 *  `ValidationPipe` 的继承类。
 *
 *   包含了 transform 的相关参数，在执行格式化校验时，会补全默认值。
 *
 *   会对 transform 与 transformOptions 属性提供默认值，
 *   若 ValidationWithDefaultPipe 的构造函数传参了 transform 与 transformOptions，
 *   则会以传入参数为准，并不会覆盖传入参数。
 *
 */
export class ValidationWithDefaultPipe extends ValidationPipe {
  public constructor(@Optional() options: ValidationPipeOptions = {}) {
    /* eslint-disable no-param-reassign */
    // 开发者非常清楚此处不遵守 no-param-reassign 规则，但坚持此操作。
    options.transform = options.transform ?? true
    options.transformOptions = options.transformOptions ?? { exposeDefaultValues: true }

    /* eslint-enable no-param-reassign */
    super(options)
  }
}
