/**
 * @Author       : Chen Zhen
 * @Date         : 2024-05-10 00:00:00
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-10-19 21:53:47
 */
import {
  A4ModuleBaseClassBuilder,
  GLOBAL_PROVIDE_TOKEN_A4_CACHE,
  MODULE_CONFIG_PATH_A4_CACHE,
  SCOPE_PROVIDE_TOKEN_A4_CACHE,
} from '@hz-9/a4-core'

import { A4CacheModuleError } from '../errors'
import { ICacheInfo } from '../interface'
import { A4CacheModuleSchema, A4CacheModuleSchemaA } from '../schema'
import { A4Cache } from './cache'

const buildOptions = {
  Schema: A4CacheModuleSchemaA,
  CoreSchema: A4CacheModuleSchema,
  ProvideClass: A4Cache,
  A4ModuleError: A4CacheModuleError,

  configPath: MODULE_CONFIG_PATH_A4_CACHE,
  globalProvideToken: GLOBAL_PROVIDE_TOKEN_A4_CACHE,
  scopeProvideToken: SCOPE_PROVIDE_TOKEN_A4_CACHE,
} as const

// eslint-disable-next-line @rushstack/typedef-var
export const A4CacheModuleBase = new A4ModuleBaseClassBuilder<ICacheInfo, typeof buildOptions>(
  buildOptions
).withForRoot()
