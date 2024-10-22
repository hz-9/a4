/**
 * @Author       : Chen Zhen
 * @Date         : 2024-05-10 00:00:00
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-10-19 03:04:45
 */
import {
  A4ModuleBaseClassBuilder,
  GLOBAL_PROVIDE_TOKEN_A4_LOG,
  MODULE_CONFIG_PATH_A4_LOG,
  SCOPE_PROVIDE_TOKEN_A4_LOG,
} from '@hz-9/a4-core'

import { A4LogModuleError } from '../errors'
import { IA4Log4jsSimpleOptions } from '../interface'
import { A4Log4jsSimpleLogModuleSchema, A4Log4jsSimpleLogModuleSchemaA } from '../schema'
import { A4Log4jsLogger } from './log4js'

const buildOptions = {
  Schema: A4Log4jsSimpleLogModuleSchemaA,
  CoreSchema: A4Log4jsSimpleLogModuleSchema,
  ProvideClass: A4Log4jsLogger,
  A4ModuleError: A4LogModuleError,

  configPath: MODULE_CONFIG_PATH_A4_LOG('log4js'),
  globalProvideToken: GLOBAL_PROVIDE_TOKEN_A4_LOG,
  scopeProvideToken: SCOPE_PROVIDE_TOKEN_A4_LOG,
} as const

// eslint-disable-next-line @rushstack/typedef-var
export const A4Log4jsSimpleLogModuleBase = new A4ModuleBaseClassBuilder<IA4Log4jsSimpleOptions, typeof buildOptions>(
  buildOptions
).withForRoot()
