/**
 * @Author       : Chen Zhen
 * @Date         : 2024-05-11 23:41:27
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-05-23 13:06:04
 */
import { Optional, ValidationError, ValidationPipeOptions } from '@nestjs/common'
import { RpcException } from '@nestjs/microservices'

import { ValidationWithDefaultPipe as ValidationWithDefaultPipe_ } from '@hz-9/a4-core'

/**
 * @public
 *
 * 继承与 `@hz-9/a4-core` 的 ValidationWithDefaultPipe 类。抛出的异常类是 RpcException
 *
 */
export class ValidationWithDefaultPipe extends ValidationWithDefaultPipe_ {
  public constructor(@Optional() options: ValidationPipeOptions = {}) {
    const defaultExceptionFactory = (validationErrors: ValidationError[] = []): RpcException => {
      if (this.isDetailedOutputDisabled) {
        return new RpcException('Validation error.')
      }

      const errors = this.flattenValidationErrors(validationErrors)
      return new RpcException(errors)
    }

    super({
      exceptionFactory: defaultExceptionFactory,
      ...options,
    })
  }
}
