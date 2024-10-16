/**
 * @Author       : Chen Zhen
 * @Date         : 2024-05-10 00:00:00
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-07-01 17:08:12
 */
import {
  A4ModuleBaseBuilder,
  GLOBAL_PROVIDE_TOKEN_A4_DOCS,
  IA4ModuleBaseSubType,
  MODULE_CONFIG_PATH_A4_DOCS,
  SCOPE_PROVIDE_TOKEN_A4_DOCS,
} from '@hz-9/a4-core'

import { A4DocsModuleError } from '../errors'
import type { IDocsInfo } from '../interface'
import { A4DocsModuleSchema, A4DocsModuleSchemaA } from '../schema'
import { A4Docs } from './docs'

const buildOptions = {
  ProvideClass: A4Docs,
  A4ModuleError: A4DocsModuleError,
  RootSchema: A4DocsModuleSchemaA,
  Schema: A4DocsModuleSchema,
  configPath: MODULE_CONFIG_PATH_A4_DOCS,
  globalProvideToken: GLOBAL_PROVIDE_TOKEN_A4_DOCS,
  scopeProvideToken: SCOPE_PROVIDE_TOKEN_A4_DOCS,
  scoped: 'public',
  registerType: 'forRoot',
  withDefault: true,
} as const

type ITypeOptionsCustom = typeof buildOptions & {
  RootSchemaType: A4DocsModuleSchemaA
  SchemaType: A4DocsModuleSchema
}

interface ITypeOptionsCustomP extends Omit<ITypeOptionsCustom, 'scoped'> {
  scoped: 'protected'
}

export type A4DocsModuleProtectedBase = IA4ModuleBaseSubType<IDocsInfo, ITypeOptionsCustomP>

// eslint-disable-next-line @rushstack/typedef-var
export const A4DocsModuleBase = new A4ModuleBaseBuilder<IDocsInfo, ITypeOptionsCustom>(buildOptions).build()
