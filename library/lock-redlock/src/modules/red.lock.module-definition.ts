/**
 * @Author       : Chen Zhen
 * @Date         : 2024-05-10 00:00:00
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-10-22 16:45:30
 */
import {
  A4ModuleBaseClassBuilder,
  GLOBAL_PROVIDE_TOKEN_A4_LOCK,
  MODULE_CONFIG_PATH_A4_LOCK,
  SCOPE_PROVIDE_TOKEN_A4_LOCK,
} from '@hz-9/a4-core'

import { A4LockModuleError } from '../errors'
import { Redlock } from '../plugin/redlock_'
import { A4RedLockModuleSchema, A4RedLockModuleSchemaA } from '../schema'

const buildOptions = {
  Schema: A4RedLockModuleSchemaA,
  CoreSchema: A4RedLockModuleSchema,
  ProvideClass: Redlock,
  A4ModuleError: A4LockModuleError,

  configPath: MODULE_CONFIG_PATH_A4_LOCK('log4js'),
  globalProvideToken: GLOBAL_PROVIDE_TOKEN_A4_LOCK,
  scopeProvideToken: SCOPE_PROVIDE_TOKEN_A4_LOCK,
} as const

// eslint-disable-next-line @rushstack/typedef-var
export const A4RedLockModuleBase = new A4ModuleBaseClassBuilder<A4RedLockModuleSchema, typeof buildOptions>(
  buildOptions
).withForRoot()
