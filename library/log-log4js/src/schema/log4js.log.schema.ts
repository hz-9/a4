/**
 * @Author       : Chen Zhen
 * @Date         : 2024-05-10 00:00:00
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-06-01 01:04:17
 */

/* eslint-disable max-classes-per-file */
import { Type } from 'class-transformer'
import { IsBoolean, IsIn, IsNumber, IsObject, IsString, ValidateNested } from 'class-validator'

import { ClassValidatorUtil as CU, IsOptionalNotNull } from '@hz-9/a4-core'

import { LOGGER_MODULE_DEFAULT } from '../const'
import type { LoggerLevel } from '../interface/logger'

/**
 *
 * @public
 *
 *  `A4 Log Log4js Module` 的配置项结构。
 *
 */
export class A4Log4jsLogModuleSchema {
  /**
   *
   * 日志输出级别。
   *
   * 作为 `ConfitSchema` 时，若缺省，则赋值为 [LOGGER_MODULE_DEFAULT.CONSOLE_PATTERN]
   *
   */
  @IsOptionalNotNull()
  @IsIn(['all', 'mark', 'track', 'debug', 'info', 'warn', 'error', 'fatal', 'off'])
  public readonly level: LoggerLevel = LOGGER_MODULE_DEFAULT.LOGGER_LEVEL

  /**
   *
   * 在控制台的默认输出格式。
   *
   * 作为 `ConfitSchema` 时，若缺省，则赋值为 [LOGGER_MODULE_DEFAULT.CONSOLE_PATTERN]
   *
   */
  @IsOptionalNotNull()
  @IsString()
  public readonly consolePattern: string = LOGGER_MODULE_DEFAULT.CONSOLE_PATTERN

  /**
   *
   * 在日志文件的默认输出格式。
   *
   * 作为 `ConfitSchema` 时，若缺省，则赋值为 [LOGGER_MODULE_DEFAULT.FILE_PATTERN]
   *
   */
  @IsOptionalNotNull()
  @IsString()
  public readonly filePattern: string = LOGGER_MODULE_DEFAULT.FILE_PATTERN

  /**
   *
   * 日志文件存放路径。
   *
   * 作为 `ConfitSchema` 时，若缺省，则赋值为 [LOGGER_MODULE_DEFAULT.BASE_DIR]
   *
   */
  @IsOptionalNotNull()
  @IsString()
  public readonly baseDir: string = LOGGER_MODULE_DEFAULT.BASE_DIR

  /**
   *
   * 日志文件最大文件大小（单位：B）。
   *
   * 作为 `ConfitSchema` 时，若缺省，则赋值为 [LOGGER_MODULE_DEFAULT.MAX_LOG_SIZE]
   *
   */
  @IsOptionalNotNull()
  @IsNumber()
  public readonly maxLogSize: number = LOGGER_MODULE_DEFAULT.MAX_LOG_SIZE

  /**
   *
   * 日志文件最长备份天数。
   *
   * 作为 `ConfitSchema` 时，若缺省，则赋值为 作为 `ConfitSchema` 时，若缺省，则赋值为 [LOGGER_MODULE_DEFAULT.BACK_UPS]
   *
   */
  @IsOptionalNotNull()
  @IsNumber()
  public readonly backups: number = LOGGER_MODULE_DEFAULT.BACK_UPS

  /**
   *
   * 是否开启回调栈。
   *
   * 部分日志输出需要开启此功能，但会影响性能。
   *
   * 作为 `ConfitSchema` 时，若缺省，则赋值为 [LOGGER_MODULE_DEFAULT.ENABLE_CALLSTACK]
   *
   * enableCallStack 在 `log4js` 详细解释可 [查看](https://log4js-node.github.io/log4js-node/layouts.html)
   *
   */
  @IsOptionalNotNull()
  @IsBoolean()
  public readonly enableCallStack: boolean = LOGGER_MODULE_DEFAULT.ENABLE_CALLSTACK
}

/**
 *
 * @public
 *
 *  `A4 Log Log4js Module` 用于 Multi Schema 类型判断类（A4）。
 *
 */
export class A4Log4jsLogModuleSchemaB {
  @IsOptionalNotNull()
  @IsObject()
  @ValidateNested()
  @Type(() => A4Log4jsLogModuleSchema)
  public readonly log: A4Log4jsLogModuleSchema = CU.p2CwD(A4Log4jsLogModuleSchema, {})
}

/**
 *
 * @public
 *
 *  `A4 Log Log4js Module` 用于 Multi Schema 类型判断类
 *
 */
export class A4Log4jsLogModuleSchemaA {
  @IsObject()
  @ValidateNested()
  @Type(() => A4Log4jsLogModuleSchemaB)
  public readonly A4: A4Log4jsLogModuleSchemaB
}
