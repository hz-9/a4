/**
 * @Author       : Chen Zhen
 * @Date         : 2024-05-10 00:00:00
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-07-01 23:13:43
 */
import {
  A4ModuleBaseBuilder,
  GLOBAL_PROVIDE_TOKEN_A4_SAFE,
  IA4ModuleBaseSubType,
  MODULE_CONFIG_PATH_A4_SAFE,
  SCOPE_PROVIDE_TOKEN_A4_SAFE,
} from '@hz-9/a4-core'

import { A4SafeModuleError } from '../errors'
import { A4SafeModuleSchema, A4SafeModuleSchemaA } from '../schema'
import { A4Safe } from './safe'

const buildOptions = {
  ProvideClass: A4Safe,
  A4ModuleError: A4SafeModuleError,
  RootSchema: A4SafeModuleSchemaA,
  Schema: A4SafeModuleSchema,
  configPath: MODULE_CONFIG_PATH_A4_SAFE,
  globalProvideToken: GLOBAL_PROVIDE_TOKEN_A4_SAFE,
  scopeProvideToken: SCOPE_PROVIDE_TOKEN_A4_SAFE,
  scoped: 'public',
  registerType: 'forRoot',
  withDefault: true,
} as const

type ITypeOptionsCustom = typeof buildOptions & {
  RootSchemaType: A4SafeModuleSchemaA
  SchemaType: A4SafeModuleSchema
}

interface ITypeOptionsCustomP extends Omit<ITypeOptionsCustom, 'scoped'> {
  scoped: 'protected'
}

export type A4SafeModuleProtectedBase = IA4ModuleBaseSubType<A4SafeModuleSchema, ITypeOptionsCustomP>

// eslint-disable-next-line @rushstack/typedef-var
export const A4SafeModuleBase = new A4ModuleBaseBuilder<A4SafeModuleSchema, ITypeOptionsCustom>(buildOptions).build()
