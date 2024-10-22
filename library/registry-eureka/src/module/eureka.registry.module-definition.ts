/**
 * @Author       : Chen Zhen
 * @Date         : 2024-05-10 00:00:00
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-10-20 16:38:10
 */
import {
  A4ModuleBaseClassBuilder,
  GLOBAL_PROVIDE_TOKEN_A4_REGISTRY,
  MODULE_CONFIG_PATH_A4_REGISTRY,
  SCOPE_PROVIDE_TOKEN_A4_REGISTRY,
} from '@hz-9/a4-core'

import { A4RegistryModuleError } from '../errors'
import type { IA4EurekaRegisterConstructorOptions } from '../interface'
import { A4EurekaRegistryModuleSchema, A4EurekaRegistryModuleSchemaA } from '../schema'
import { A4EurekaRegistry } from './eureka.registry'

const buildOptions = {
  Schema: A4EurekaRegistryModuleSchemaA,
  CoreSchema: A4EurekaRegistryModuleSchema,
  ProvideClass: A4EurekaRegistry,
  A4ModuleError: A4RegistryModuleError,

  configPath: MODULE_CONFIG_PATH_A4_REGISTRY('eureka'),
  globalProvideToken: GLOBAL_PROVIDE_TOKEN_A4_REGISTRY,
  scopeProvideToken: SCOPE_PROVIDE_TOKEN_A4_REGISTRY,
} as const

// eslint-disable-next-line @rushstack/typedef-var
export const A4EurekaRegsitryModuleBase = new A4ModuleBaseClassBuilder<
  IA4EurekaRegisterConstructorOptions,
  typeof buildOptions
>(buildOptions).withForRoot()
