/**
 * @Author       : Chen Zhen
 * @Date         : 2024-05-10 00:00:00
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-10-22 22:14:37
 */
import {
  A4ModuleBaseClassBuilder,
  GLOBAL_PROVIDE_TOKEN_A4_CRUD,
  MODULE_CONFIG_PATH_A4_CRUD,
  SCOPE_PROVIDE_TOKEN_A4_CRUD,
} from '@hz-9/a4-core'

import { A4CRUDModuleError } from '../errors'
import { A4ElasticSearchCrudModuleOptions } from '../interface'
import { A4ElasticSearchCrudModuleSchema, A4ElasticSearchCrudModuleSchemaA } from '../schema'
import { ElasticSearchDataSourceGroup } from './elastic-search.datasource-group'

const buildOptions = {
  Schema: A4ElasticSearchCrudModuleSchemaA,
  CoreSchema: A4ElasticSearchCrudModuleSchema,
  ProvideClass: ElasticSearchDataSourceGroup,
  A4ModuleError: A4CRUDModuleError,

  configPath: MODULE_CONFIG_PATH_A4_CRUD('elasticSearch'),
  globalProvideToken: GLOBAL_PROVIDE_TOKEN_A4_CRUD,
  scopeProvideToken: SCOPE_PROVIDE_TOKEN_A4_CRUD,
} as const

// eslint-disable-next-line @rushstack/typedef-var
export const A4ElasticSearchCrudModuleBase = new A4ModuleBaseClassBuilder<
  A4ElasticSearchCrudModuleOptions,
  typeof buildOptions
>(buildOptions).withForRoot()
