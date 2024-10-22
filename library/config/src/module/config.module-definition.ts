/**
 * @Author       : Chen Zhen
 * @Date         : 2024-05-10 00:00:00
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-10-19 00:55:56
 */
import {
  A4ModuleBaseClassBuilder,
  GLOBAL_PROVIDE_TOKEN_A4_CONFIG,
  MODULE_CONFIG_PATH_A4_CONFIG,
  SCOPE_PROVIDE_TOKEN_A4_CONFIG,
} from '@hz-9/a4-core'

import { A4ConfigModuleError } from '../errors'
import { IA4ConfigModuleOptions } from '../interface'
import { A4ConfigModuleSchema, A4ConfigModuleSchemaA } from '../schema'
import { A4Config } from './config'

const buildOptions = {
  Schema: A4ConfigModuleSchemaA,
  CoreSchema: A4ConfigModuleSchema,
  ProvideClass: A4Config,
  A4ModuleError: A4ConfigModuleError,

  configPath: MODULE_CONFIG_PATH_A4_CONFIG,
  globalProvideToken: GLOBAL_PROVIDE_TOKEN_A4_CONFIG,
  scopeProvideToken: SCOPE_PROVIDE_TOKEN_A4_CONFIG,
} as const

// eslint-disable-next-line @rushstack/typedef-var
export const A4ConfigModuleBase = new A4ModuleBaseClassBuilder<IA4ConfigModuleOptions, typeof buildOptions>(
  buildOptions
).withRegisterAndForRoot()
