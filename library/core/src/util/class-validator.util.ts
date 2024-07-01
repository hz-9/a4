/**
 * @Author       : Chen Zhen
 * @Date         : 2024-05-10 00:00:00
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-07-01 00:52:01
 */
import { ClassConstructor, plainToClass } from 'class-transformer'
import { ValidationError, validateSync } from 'class-validator'

import { A4Color } from './color.util'

/**
 * @public
 *
 * ` ClassValidatorUtil.parse` 解析额外配置项
 */
export interface IClassValidatorUtilParseOptions {
  /**
   * 报错信息是否使用颜色高亮
   *
   * 可选。默认为 true
   *
   */
  errorColer?: boolean
}

/**
 * @internal
 *
 *  为日志打印而扩展的 ValidationError。
 *
 */
interface IValidationErrorPlus {
  property: string
  constraints: ValidationError['constraints']
  value: ValidationError['value']
}

/**
 *
 * @public
 *
 *  `Class validator` 工具函数
 *
 */
export class ClassValidatorUtil {
  /**
   *
   * @public
   *
   * 合并类，并返回合并完默认值的数据。
   *
   * 若嫌函数名过长，可使用 `ClassValidatorUtil.p2CwD`
   */
  public static plainToClassWithDefault<T, V>(cls: ClassConstructor<T>, plain: V): T {
    return plainToClass(cls, plain, { exposeDefaultValues: true })
  }

  /**
   *
   * @public
   *
   * 合并类，并返回合并完默认值的数据。
   *
   * 完全等价 `ClassValidatorUtil.plainToClassWithDefault`
   *
   */
  public static p2CwD<T, V>(cls: ClassConstructor<T>, plain: V): T {
    return this.plainToClassWithDefault<T, V>(cls, plain)
  }

  /**
   * @public
   *
   *  对配置信息，基于模版进行解析。在此过程中，会剔除冗余的字段，也会对默认配置进行赋值。
   *
   * @param Schema - 数据模版。
   * @param config - 待解析信息。
   * @param options - 额外配置项。
   * @returns 解析后信息。
   */
  public static parse<T extends object>(
    schema: ClassConstructor<T>,
    config: object,
    options?: IClassValidatorUtilParseOptions
  ): T {
    const optionsWithDefault: Required<IClassValidatorUtilParseOptions> = { errorColer: true, ...options }

    const validatedConfig = this.p2CwD(schema, config)

    const errors = validateSync(validatedConfig, {
      forbidUnknownValues: true,
      whitelist: true,
    })

    if (errors.length > 0) {
      throw new Error(this.mergeErrorsToOneMsg(errors, optionsWithDefault))
    }

    return JSON.parse(JSON.stringify(validatedConfig))
  }

  // public static parse<T extends object>(
  //   schema: ClassConstructor<T>,
  //   config: object,
  //   options?: IClassValidatorUtilParseOptions
  // ): T {
  //   const optionsWithDefault: Required<IClassValidatorUtilParseOptions> = { errorColer: true, ...options }

  //   const validatedConfig = this.p2CwD(schema, config)

  //   /**
  //    *
  //    * FIXME
  //    *
  //    *  在 `validateSync` 执行完成后，`validatedConfig` 会被修改，
  //    *  此处实际需求为被修改前内容。所以直接克隆内容返回。
  //    *
  //    */
  //   const resutlConfig = JSON.parse(JSON.stringify(validatedConfig))

  //   const errors = validateSync(validatedConfig, {
  //     forbidUnknownValues: true,
  //     whitelist: true,
  //   })

  //   if (errors.length > 0) {
  //     throw new Error(this.mergeErrorsToOneMsg(errors, optionsWithDefault))
  //   }

  //   return resutlConfig
  // }

  /**
   *
   * @public
   *
   *  合并多个 `ValidationError` 为一个报错信息。
   *
   *  复制于 [`nest-typed-config`](https://github.com/Nikaple/nest-typed-config) 中。
   *
   */
  public static mergeErrorsToOneMsg(errors: ValidationError[], options: IClassValidatorUtilParseOptions): string {
    const errorPlus: IValidationErrorPlus[] = this._formatValidationError(errors)

    const titleMsg: string = `Configuration is not valid:`

    const showErrorColor = options.errorColer

    const messages: string[] = errorPlus.map(({ property, value, constraints }) => {
      const propertyMsg: string = showErrorColor ? A4Color.cyan(property) : property

      const constraintMessage: string[] = Object.entries(constraints || /* istanbul ignore next */ {}).map(
        ([key, val]) =>
          showErrorColor
            ? `    - ${key}: ${A4Color.yellow(val)}, current config is \`${A4Color.blue(JSON.stringify(value))}\``
            : `    - ${key}: ${val}, current config is \`${JSON.stringify(value)}\``
      )

      return [`  - config ${propertyMsg} does not match the following rules:`, ...constraintMessage].join(`\n`)
    })

    return [showErrorColor ? A4Color.red(titleMsg) : titleMsg, ...messages].join(`\n`)
  }

  /**
   *
   * @public
   *
   * `ValidationError` 异常信息解析函数。复制于 [`nest-typed-config`](https://github.com/Nikaple/nest-typed-config) 中。
   *
   */
  private static _formatValidationError(errors: ValidationError[]): IValidationErrorPlus[] {
    const result: IValidationErrorPlus[] = []

    const helper = ({ property, constraints, children, value }: ValidationError, prefix: string): void => {
      const keyPath = prefix ? `${prefix}.${property}` : property
      if (constraints) {
        result.push({
          property: keyPath,
          constraints,
          value,
        })
      }
      if (children && children.length) {
        children.forEach((child) => helper(child, keyPath))
      }
    }

    errors.forEach((error) => helper(error, ``))
    return result
  }
}

/**
 * @public
 *
 *  `ClassValidatorUtil` 类名较长，ClassValidatorUtil 的别名。
 *
 */
export const CU: typeof ClassValidatorUtil = ClassValidatorUtil
