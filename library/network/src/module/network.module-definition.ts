/**
 * @Author       : Chen Zhen
 * @Date         : 2024-05-10 00:00:00
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-10-19 00:56:46
 */
import {
  A4ModuleBaseClassBuilder,
  GLOBAL_PROVIDE_TOKEN_A4_NETWORK,
  MODULE_CONFIG_PATH_A4_NETWORK,
  SCOPE_PROVIDE_TOKEN_A4_NETWORK,
} from '@hz-9/a4-core'

import { A4NetworkModuleError } from '../errors'
import { A4NetworkModuleSchema, A4NetworkModuleSchemaA } from '../schema'
import { A4Network } from './network'

const buildOptions = {
  Schema: A4NetworkModuleSchemaA,
  CoreSchema: A4NetworkModuleSchema,
  ProvideClass: A4Network,
  A4ModuleError: A4NetworkModuleError,

  configPath: MODULE_CONFIG_PATH_A4_NETWORK,
  globalProvideToken: GLOBAL_PROVIDE_TOKEN_A4_NETWORK,
  scopeProvideToken: SCOPE_PROVIDE_TOKEN_A4_NETWORK,

  // scoped: 'public',
  // registerType: 'registerAndForRoot',
  // withDefault: true,
} as const

// eslint-disable-next-line @rushstack/typedef-var
export const A4NetworkModuleBase = new A4ModuleBaseClassBuilder<A4NetworkModuleSchema, typeof buildOptions>(
  buildOptions
).withRegisterAndForRoot()
