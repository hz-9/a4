/**
 * @Author       : Chen Zhen
 * @Date         : 2024-05-10 00:00:00
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-10-19 16:13:22
 */
import {
  A4ModuleBaseClassBuilder,
  GLOBAL_PROVIDE_TOKEN_A4_SAFE,
  MODULE_CONFIG_PATH_A4_SAFE,
  SCOPE_PROVIDE_TOKEN_A4_SAFE,
} from '@hz-9/a4-core'

import { A4SafeModuleError } from '../errors'
import { A4SafeModuleSchema, A4SafeModuleSchemaA } from '../schema'
import { A4Safe } from './safe'

const buildOptions = {
  Schema: A4SafeModuleSchemaA,
  CoreSchema: A4SafeModuleSchema,
  ProvideClass: A4Safe,
  A4ModuleError: A4SafeModuleError,

  configPath: MODULE_CONFIG_PATH_A4_SAFE,
  globalProvideToken: GLOBAL_PROVIDE_TOKEN_A4_SAFE,
  scopeProvideToken: SCOPE_PROVIDE_TOKEN_A4_SAFE,
} as const

// eslint-disable-next-line @rushstack/typedef-var
export const A4SafeModuleBase = new A4ModuleBaseClassBuilder<A4SafeModuleSchema, typeof buildOptions>(
  buildOptions
).withForRoot()
