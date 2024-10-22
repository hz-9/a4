/**
 * @Author       : Chen Zhen
 * @Date         : 2024-05-10 00:00:00
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-10-20 13:23:05
 */
import {
  A4ModuleBaseClassBuilder,
  GLOBAL_PROVIDE_TOKEN_A4_MICRO_SERVICE,
  MODULE_CONFIG_PATH_A4_MICRO_SERVICE,
  SCOPE_PROVIDE_TOKEN_A4_MICRO_SERVICE,
} from '@hz-9/a4-core'

import { A4MicroServiceModuleError } from '../errors'
import { A4MicroServiceModuleSchema, A4MicroServiceModuleSchemaA } from '../schema'
import { A4MicroService } from './micro-service'

const buildOptions = {
  Schema: A4MicroServiceModuleSchemaA,
  CoreSchema: A4MicroServiceModuleSchema,
  ProvideClass: A4MicroService,
  A4ModuleError: A4MicroServiceModuleError,

  configPath: MODULE_CONFIG_PATH_A4_MICRO_SERVICE,
  globalProvideToken: GLOBAL_PROVIDE_TOKEN_A4_MICRO_SERVICE,
  scopeProvideToken: SCOPE_PROVIDE_TOKEN_A4_MICRO_SERVICE,
} as const

// eslint-disable-next-line @rushstack/typedef-var
export const A4MicroServiceModuleBase = new A4ModuleBaseClassBuilder<A4MicroServiceModuleSchema, typeof buildOptions>(
  buildOptions
).withForRoot()
