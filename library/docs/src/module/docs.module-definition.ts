/**
 * @Author       : Chen Zhen
 * @Date         : 2024-05-10 00:00:00
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-10-19 15:54:33
 */
import {
  A4ModuleBaseClassBuilder,
  GLOBAL_PROVIDE_TOKEN_A4_DOCS,
  MODULE_CONFIG_PATH_A4_DOCS,
  SCOPE_PROVIDE_TOKEN_A4_DOCS,
} from '@hz-9/a4-core'

import { A4DocsModuleError } from '../errors'
import type { IDocsInfo } from '../interface'
import { A4DocsModuleSchema, A4DocsModuleSchemaA } from '../schema'
import { A4Docs } from './docs'

const buildOptions = {
  Schema: A4DocsModuleSchemaA,
  CoreSchema: A4DocsModuleSchema,
  ProvideClass: A4Docs,
  A4ModuleError: A4DocsModuleError,

  configPath: MODULE_CONFIG_PATH_A4_DOCS,
  globalProvideToken: GLOBAL_PROVIDE_TOKEN_A4_DOCS,
  scopeProvideToken: SCOPE_PROVIDE_TOKEN_A4_DOCS,
} as const

// eslint-disable-next-line @rushstack/typedef-var
export const A4DocsModuleBase = new A4ModuleBaseClassBuilder<IDocsInfo, typeof buildOptions>(buildOptions).withForRoot()
