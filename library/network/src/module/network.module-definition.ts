/**
 * @Author       : Chen Zhen
 * @Date         : 2024-05-10 00:00:00
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-06-30 20:29:17
 */
import {
  A4ModuleBaseBuilder,
  GLOBAL_PROVIDE_TOKEN_A4_NETWORK,
  IA4ModuleBaseSubType,
  MODULE_CONFIG_PATH_A4_NETWORK,
  SCOPE_PROVIDE_TOKEN_A4_NETWORK,
} from '@hz-9/a4-core'

import { A4NetworkModuleError } from '../errors'
import { A4NetworkModuleSchema, A4NetworkModuleSchemaA } from '../schema'
import { A4Network } from './network'

const buildOptions = {
  ProvideClass: A4Network,
  A4ModuleError: A4NetworkModuleError,
  RootSchema: A4NetworkModuleSchemaA,
  Schema: A4NetworkModuleSchema,
  configPath: MODULE_CONFIG_PATH_A4_NETWORK,
  globalProvideToken: GLOBAL_PROVIDE_TOKEN_A4_NETWORK,
  scopeProvideToken: SCOPE_PROVIDE_TOKEN_A4_NETWORK,
  scoped: 'public',
  registerType: 'registerAndForRoot',
  withDefault: true,
} as const

type ITypeOptionsCustom = typeof buildOptions & {
  RootSchemaType: A4NetworkModuleSchemaA
  SchemaType: A4NetworkModuleSchema
}

interface ITypeOptionsCustomP extends Omit<ITypeOptionsCustom, 'scoped'> {
  scoped: 'protected'
}

export type A4NetworkModuleProtectedBase = IA4ModuleBaseSubType<A4NetworkModuleSchema, ITypeOptionsCustomP>

// eslint-disable-next-line @rushstack/typedef-var
export const A4NetworkModuleBase = new A4ModuleBaseBuilder<A4NetworkModuleSchema, ITypeOptionsCustom>(
  buildOptions
).build()
