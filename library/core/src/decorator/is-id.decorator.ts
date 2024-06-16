/**
 * @Author       : Chen Zhen
 * @Date         : 2024-05-10 00:00:00
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-06-15 23:22:41
 */
import { ValidateBy, ValidationOptions, buildMessage } from 'class-validator'

/**
 * @public
 *
 *  判断该值为 正整数。
 *
 */
export const isId = (value: unknown): boolean => typeof value === 'number' && Number.isInteger(value) && value > 0

/**
 *
 * @public
 *
 *  一个自定义 `class-validator` 装饰器。
 *
 *  判断该属性为 正整数。
 *
 */
export function IsId(validationOptions?: ValidationOptions): PropertyDecorator {
  return ValidateBy(
    {
      name: 'isId',
      validator: {
        validate: (value, args) => isId(value),
        defaultMessage: buildMessage(
          (eachPrefix) => `${eachPrefix} $property must be a positive integer`,
          validationOptions
        ),
      },
    },
    validationOptions
  )
}

/**
 * @public
 *
 *  判断该值为 正整数组成的数组。
 *
 */
export const isIdArray = (value: unknown): boolean => (Array.isArray(value) ? value.every(isId) : false)

/**
 *
 * @public
 *
 *  一个自定义 `class-validator` 装饰器。
 *
 *  判断该属性为 正整数组成的数组。
 *
 */
export function IsIdArray(validationOptions?: ValidationOptions): PropertyDecorator {
  return ValidateBy(
    {
      name: 'isIdArray',
      validator: {
        validate: (value, args) => isIdArray(value),
        defaultMessage: buildMessage(
          (eachPrefix) => `${eachPrefix} $property must be a positive integer array`,
          validationOptions
        ),
      },
    },
    validationOptions
  )
}

/**
 * @public
 *
 *  判断该值为 长度大于0的字符串。
 *
 */
export const isSId = (value: unknown): boolean => typeof value === 'string' && value.length > 0

/**
 *
 * @public
 *
 *  一个自定义 `class-validator` 装饰器。
 *
 *  判断该属性为 长度大于0的字符串。
 *
 */
export function IsSId(validationOptions?: ValidationOptions): PropertyDecorator {
  return ValidateBy(
    {
      name: 'isSId',
      validator: {
        validate: (value, args) => isSId(value),
        defaultMessage: buildMessage(
          (eachPrefix) => `${eachPrefix} $property must be a not empty string`,
          validationOptions
        ),
      },
    },
    validationOptions
  )
}

/**
 * @public
 *
 *  判断该值为 正整数组成的数组。
 *
 */
export const isSIdArray = (value: unknown): boolean => (Array.isArray(value) ? value.every(isSId) : false)

/**
 *
 * @public
 *
 *  一个自定义 `class-validator` 装饰器。
 *
 *  判断该属性为 长度大于0的字符串组成的数组。
 *
 */
export function IsSIdArray(validationOptions?: ValidationOptions): PropertyDecorator {
  return ValidateBy(
    {
      name: 'isSIdArray',
      validator: {
        validate: (value, args) => isSIdArray(value),
        defaultMessage: buildMessage(
          (eachPrefix) => `${eachPrefix} $property must be a not empty string array`,
          validationOptions
        ),
      },
    },
    validationOptions
  )
}

/**
 *
 * @public
 *
 *  一个自定义 `class-validator` 的可选装饰器。
 *
 *  判断该值为 id 或 SId。
 *
 */
const isIdorSId = (value: unknown): boolean => isId(value) || isSId(value)

/**
 *
 * @public
 *
 *  一个自定义 `class-validator` 的可选装饰器。
 *
 *  判断该属性为 id 或 SId。
 *
 */
export function IsIdorSId(validationOptions?: ValidationOptions): PropertyDecorator {
  return ValidateBy(
    {
      name: 'isIdorSId',
      validator: {
        validate: (value, args) => isIdorSId(value),
        defaultMessage: buildMessage(
          (eachPrefix) => `${eachPrefix} $property must be a positive integer or not empty string`,
          validationOptions
        ),
      },
    },
    validationOptions
  )
}

/**
 * @public
 *
 *  判断该值为 id 组成的数组或 SID 组成的数组。
 *
 */
const isIdorSIdArray = (value: unknown): boolean => isIdArray(value) || isSIdArray(value)

/**
 *
 * @public
 *
 *  一个自定义 `class-validator` 的可选装饰器。
 *
 *  判断该属性为 id 组成的数组或 SID 组成的数组。
 *
 */
export function IsIdorSIdArray(validationOptions?: ValidationOptions): PropertyDecorator {
  return ValidateBy(
    {
      name: 'isIdorSIdArray',
      validator: {
        validate: (value, args) => isIdorSIdArray(value),
        defaultMessage: buildMessage(
          (eachPrefix) => `${eachPrefix} $property must be a positive integer array or a not empty string array`,
          validationOptions
        ),
      },
    },
    validationOptions
  )
}
