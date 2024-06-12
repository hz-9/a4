/**
 * @Author       : Chen Zhen
 * @Date         : 2024-05-10 00:00:00
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-05-21 12:15:49
 */
import { HttpStatus, Optional, PipeTransform } from '@nestjs/common'
import type { ParseIntPipeOptions, ValidationPipeOptions } from '@nestjs/common'
import { HttpErrorByCode } from '@nestjs/common/utils/http-error-by-code.util'

import type { IObjectLiteral } from '../interface'

/**
 * @public
 *
 *  `A4` 基础管道构造函数配置项
 *
 */
export interface IBasePipeConstructorOptions extends ParseIntPipeOptions {}

/**
 * @public
 *
 *  A4 ValidationPipe 构造函数参 A4Controller 数。
 *
 */
export interface IA4ValidationPipeOptions extends ValidationPipeOptions {}

/**
 * @public
 *
 * 流水线，基础实现类
 *
 */
export abstract class BasePipe implements PipeTransform {
  protected exceptionFactory: (error: string) => Error

  /**
   * 是否为可选操作。默认为 true
   */
  protected readonly optional: boolean

  public constructor(@Optional() options?: IBasePipeConstructorOptions) {
    const o: Required<IBasePipeConstructorOptions> = {
      errorHttpStatusCode: HttpStatus.BAD_REQUEST,

      /**
       * 默认值，应该为 true
       */
      optional: true,

      exceptionFactory: () => {},
    }

    /**
     * FIXME `options` 类型安全，并未起到作用
     */
    o.optional = options?.optional ?? o.optional
    if (options?.errorHttpStatusCode) o.errorHttpStatusCode = options.errorHttpStatusCode
    o.exceptionFactory = options?.exceptionFactory ?? ((error) => new HttpErrorByCode[o.errorHttpStatusCode](error))

    this.optional = o.optional

    this.exceptionFactory = o.exceptionFactory
  }

  /**
   * 数据转换
   */
  public abstract transform(value: IObjectLiteral): IObjectLiteral | Promise<IObjectLiteral>
}
