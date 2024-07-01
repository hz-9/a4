/**
 * @Author       : Chen Zhen
 * @Date         : 2024-05-10 00:00:00
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-06-29 17:18:32
 */
// export * from './config'
import type { ClassConstructor } from 'class-transformer'

import type { IClassValidatorUtilParseOptions } from '@hz-9/a4-core'

import type { IA4ConfigLoadOptions } from '../loader'

/**
 * @public
 */
export interface IA4ConfigCheckOptions1 {
  ignoreSchema: true
  Schema?: ClassConstructor<object> | ClassConstructor<object>[]
}

/**
 * @public
 */
export interface IA4ConfigCheckOptions2 {
  ignoreSchema?: false
  Schema: ClassConstructor<object> | ClassConstructor<object>[]
}

/**
 * @public
 */
export type IA4ConfigCheckOptions = IA4ConfigCheckOptions1 | IA4ConfigCheckOptions2

/**
 * @public
 *
 *  用以控制 `ClassValidatorUtil` 异常信息是否包含颜色信息。
 *
 */
export type IConfigClassValidatorUtilParseOptions = Pick<IClassValidatorUtilParseOptions, 'errorColer'>

/**
 *
 * @public
 *
 *  配置信息加载配置项。
 *
 */
export type IA4ConfigModuleOptions = IA4ConfigLoadOptions &
  IA4ConfigCheckOptions &
  IConfigClassValidatorUtilParseOptions
