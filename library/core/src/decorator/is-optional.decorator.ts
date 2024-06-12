/**
 * @Author       : Chen Zhen
 * @Date         : 2024-05-10 00:00:00
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-05-23 16:17:27
 */
import { ValidationOptions, ValidationTypes, getMetadataStorage } from 'class-validator'
import { ValidationMetadata } from 'class-validator/cjs/metadata/ValidationMetadata'
import type { ValidationMetadataArgs } from 'class-validator/types/metadata/ValidationMetadataArgs'

/* eslint-disable @typescript-eslint/explicit-function-return-type */

/**
 *
 * @public
 *
 *  一个自定义 `class-validator` 的可选装饰器。
 *
 *  `class-validator` 官方提供的 `IsOptional` 对可选值的判断，
 *  与 `class-transformer` 对于可选值的判断，在 `null` 上有所出入。
 *
 *  IsOptionalNotNull 在该值为 null 时，仍然会报错，而 IsOptional 不会。
 *
 *  现创建一个仅允许 undefined 作为可选值的可选装饰器。
 *
 */
export function IsOptionalNotNull(validationOptions?: ValidationOptions): PropertyDecorator {
  return (object: object, propertyName: PropertyKey): void => {
    const args: ValidationMetadataArgs = {
      type: ValidationTypes.CONDITIONAL_VALIDATION,
      target: object.constructor,
      propertyName: propertyName.toString(),
      constraints: [
        // (o: never): boolean => o[propertyName] !== null && o[propertyName] !== undefined,
        (o: never): boolean => o[propertyName] !== undefined,
      ],
      validationOptions,
    }

    getMetadataStorage().addValidationMetadata(new ValidationMetadata(args))
  }
}
