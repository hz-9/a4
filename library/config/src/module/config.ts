/**
 * @Author       : Chen Zhen
 * @Date         : 2024-05-10 00:00:00
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-07-01 19:31:21
 */
import { isUndefined } from '@nestjs/common/utils/shared.utils'

import { A4ConfigBase, A4ConfigGetType, IA4Config, NonUndefined } from '@hz-9/a4-core'
import _ from '@hz-9/a4-core/lodash'

import { A4ConfigUnknownError } from '../errors/index'

/**
 *
 * @public
 *
 *  `A4 Config` class.
 *
 *  `A4 Config` 类。
 *
 */
export class A4Config<T extends object = object> extends A4ConfigBase implements IA4Config<T> {
  public readonly config: T

  public constructor(config: object) {
    super()
    this.config = config as T
  }

  public get<P extends string | readonly string[]>(propertyPath: P): A4ConfigGetType<T, P, false>
  public get<P extends string | readonly string[]>(
    propertyPath: P,
    defaultValue: NonUndefined<A4ConfigGetType<T, P, false>>
  ): A4ConfigGetType<T, P, true>
  public get<P extends string | readonly string[]>(
    propertyPath: P,
    defaultValue?: NonUndefined<A4ConfigGetType<T, P, false>>
  ): A4ConfigGetType<T, P, false> | A4ConfigGetType<T, P, true> {
    return _.get(this.config, propertyPath) ?? defaultValue
  }

  public getOrThrow<P extends string | readonly string[]>(propertyPath: P): A4ConfigGetType<T, P, false> {
    const value = _.get(this.config, propertyPath)

    if (isUndefined(value)) {
      throw new A4ConfigUnknownError(`Configuration key "${propertyPath.toString()}" does not exist`)
    }

    return value
  }
}
