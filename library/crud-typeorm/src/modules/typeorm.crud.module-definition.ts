/**
 * @Author       : Chen Zhen
 * @Date         : 2024-05-10 00:00:00
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-10-22 18:00:20
 */
import {
  A4ModuleBaseClassBuilder,
  GLOBAL_PROVIDE_TOKEN_A4_CRUD,
  MODULE_CONFIG_PATH_A4_CRUD,
  SCOPE_PROVIDE_TOKEN_A4_CRUD,
} from '@hz-9/a4-core'

import { A4CRUDModuleError } from '../errors'
import { A4TypeORMCrudModuleOptions } from '../interface'
import { A4TypeORMCrudModuleSchema, A4TypeORMCrudModuleSchemaA } from '../schema'
import { TyprORMDataSourceGroup } from './typeorm.datasource-group'

const buildOptions = {
  Schema: A4TypeORMCrudModuleSchemaA,
  CoreSchema: A4TypeORMCrudModuleSchema,
  ProvideClass: TyprORMDataSourceGroup,
  A4ModuleError: A4CRUDModuleError,

  configPath: MODULE_CONFIG_PATH_A4_CRUD('typeORM'),
  globalProvideToken: GLOBAL_PROVIDE_TOKEN_A4_CRUD,
  scopeProvideToken: SCOPE_PROVIDE_TOKEN_A4_CRUD,
} as const

// eslint-disable-next-line @rushstack/typedef-var
export const A4TypeORMCrudModuleBase = new A4ModuleBaseClassBuilder<A4TypeORMCrudModuleOptions, typeof buildOptions>(
  buildOptions
).withForRoot()
