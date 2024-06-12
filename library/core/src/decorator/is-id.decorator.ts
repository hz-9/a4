/**
 * @Author       : Chen Zhen
 * @Date         : 2024-05-10 00:00:00
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-06-05 22:38:42
 */
import { IsUUID, ValidateBy, ValidationOptions, buildMessage, isUUID } from 'class-validator'
import 'uuid'

import type { UUIDVersion } from '../interface'

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
 * @public
 *
 *  判断该值为 UUID。
 *
 */
export const isUId: typeof isUUID = isUUID

/**
 *
 * @public
 *
 *  一个自定义 `class-validator` 的可选装饰器。
 *
 *  判断该属性为 UUID。
 *
 */
export const IsUId: typeof IsUUID = IsUUID

/**
 * @public
 *
 *  判断该值为 UUID 数组
 *
 */
export const isUIdArray = (value: unknown, uuidVersion?: UUIDVersion): boolean =>
  Array.isArray(value) ? value.every((v) => isUUID(v, uuidVersion)) : false

/**
 *
 * @public
 *
 *  一个自定义 `class-validator` 装饰器。
 *
 *  判断该属性为 UUID 组成的数组。
 *
 */
export function IsUIdArray(uuidVersion?: UUIDVersion, validationOptions?: ValidationOptions): PropertyDecorator {
  return ValidateBy(
    {
      name: 'isUUIdArray',
      validator: {
        validate: (value, args) => isUIdArray(value, uuidVersion),
        defaultMessage: buildMessage(
          (eachPrefix) => `${eachPrefix} $property must a ${uuidVersion ? `${uuidVersion} ` : ''}UUID array`,
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
 *  判断该值为 id 或 UUId。
 *
 */
const isIdorSId = (value: unknown): boolean => isId(value) || isSId(value)

/**
 *
 * @public
 *
 *  一个自定义 `class-validator` 的可选装饰器。
 *
 *  判断该属性为 id 或 UUId。
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
 *  判断该值为 id 组成的数组或 UUID 组成的数组。
 *
 */
const isIdorSIdArray = (value: unknown): boolean => isIdArray(value) || isSIdArray(value)

/**
 *
 * @public
 *
 *  一个自定义 `class-validator` 的可选装饰器。
 *
 *  判断该属性为 id 组成的数组或 UUID 组成的数组。
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
