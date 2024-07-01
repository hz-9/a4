/**
 * @Author       : Chen Zhen
 * @Date         : 2024-05-10 00:00:00
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-06-30 20:38:41
 */
import {
  A4ModuleBaseBuilder,
  GLOBAL_PROVIDE_TOKEN_A4_CONFIG,
  IA4ModuleBaseSubType,
  MODULE_CONFIG_PATH_A4_CONFIG,
  SCOPE_PROVIDE_TOKEN_A4_CONFIG,
} from '@hz-9/a4-core'

import { A4ConfigModuleError } from '../errors'
import { IA4ConfigModuleOptions } from '../interface'
import { A4ConfigModuleSchema, A4ConfigModuleSchemaA } from '../schema'
import { A4Config } from './config'

const buildOptions = {
  ProvideClass: A4Config,
  A4ModuleError: A4ConfigModuleError,
  Schema: A4ConfigModuleSchema,
  RootSchema: A4ConfigModuleSchemaA,
  configPath: MODULE_CONFIG_PATH_A4_CONFIG,
  globalProvideToken: GLOBAL_PROVIDE_TOKEN_A4_CONFIG,
  scopeProvideToken: SCOPE_PROVIDE_TOKEN_A4_CONFIG,

  scoped: 'public',
  registerType: 'registerAndForRoot',
  withDefault: false,
} as const

type ITypeOptionsCustom = typeof buildOptions & {
  RootSchemaType: A4ConfigModuleSchemaA
  SchemaType: A4ConfigModuleSchema
}

interface ITypeOptionsCustomP extends Omit<ITypeOptionsCustom, 'scoped'> {
  scoped: 'protected'
}

export type A4ConfigModuleProtectedBase = IA4ModuleBaseSubType<IA4ConfigModuleOptions, ITypeOptionsCustomP>

// eslint-disable-next-line @rushstack/typedef-var
export const A4ConfigModuleBase = new A4ModuleBaseBuilder<IA4ConfigModuleOptions, ITypeOptionsCustom>(
  buildOptions
).build()
