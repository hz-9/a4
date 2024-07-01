/**
 * @Author       : Chen Zhen
 * @Date         : 2024-06-30 16:42:58
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-06-30 22:37:18
 */

/**
 * @Author       : Chen Zhen
 * @Date         : 2024-05-10 00:00:00
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-06-30 17:11:41
 */
import {
  A4ModuleBaseBuilder,
  GLOBAL_PROVIDE_TOKEN_A4_LOG,
  type IA4ModuleBaseSubType,
  MODULE_CONFIG_PATH_A4_LOG,
  SCOPE_PROVIDE_TOKEN_A4_LOG,
} from '@hz-9/a4-core'

import { A4LogModuleError } from '../errors'
import { IA4Log4jsOptions } from '../interface'
import { A4Log4jsSimpleLogModuleSchema, A4Log4jsSimpleLogModuleSchemaA } from '../schema'
import { A4Log4jsLogger } from './log4js'

// export interface ITypeOptionsCustom {
//   scoped: 'public'
//   // registerType: 'forRoot'
//   registerType: 'forRoot'
//   withDefault: true
// }

// export interface ITypeOptionsCustomP {
//   scoped: 'protected'
//   // registerType: 'forRoot'
//   registerType: 'forRoot'
//   withDefault: true
// }

const buildOptions = {
  ProvideClass: A4Log4jsLogger,
  A4ModuleError: A4LogModuleError,
  RootSchema: A4Log4jsSimpleLogModuleSchemaA,
  Schema: A4Log4jsSimpleLogModuleSchema,
  configPath: MODULE_CONFIG_PATH_A4_LOG('log4js'),
  globalProvideToken: GLOBAL_PROVIDE_TOKEN_A4_LOG,
  scopeProvideToken: SCOPE_PROVIDE_TOKEN_A4_LOG,
  scoped: 'public',
  registerType: 'forRoot',
  withDefault: true,
} as const

type ITypeOptionsCustom = typeof buildOptions & {
  RootSchemaType: A4Log4jsSimpleLogModuleSchemaA
  SchemaType: A4Log4jsSimpleLogModuleSchema
}

interface ITypeOptionsCustomP extends Omit<ITypeOptionsCustom, 'scoped'> {
  scoped: 'protected'
}

export type A4Log4jsSimpleLogModuleProtectedBase = IA4ModuleBaseSubType<IA4Log4jsOptions, ITypeOptionsCustomP>

// eslint-disable-next-line @rushstack/typedef-var
export const A4Log4jsSimpleLogModuleBase = new A4ModuleBaseBuilder<IA4Log4jsOptions, ITypeOptionsCustom>(
  buildOptions
).build()
