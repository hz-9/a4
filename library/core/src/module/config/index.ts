/**
 * @Author       : Chen Zhen
 * @Date         : 2024-05-20 23:20:32
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-07-01 19:29:28
 */
import type { Logger } from '@nestjs/common'
import type { ModuleRef } from '@nestjs/core'

import type { A4GlobalProvideToken, A4ScopeProvideToken } from '../../interface'
import { A4ConfigBase } from './a4-base.config'
import type { IA4Config } from './interface'

export * from './interface'

export * from './a4-base.config'

/**
 *
 * @public
 *
 *   `A4 Config Module` Config Path
 *
 */
export const MODULE_CONFIG_PATH_A4_CONFIG = 'A4.config' as const

/**
 *
 * @public
 *
 *   `A4 Config Module` Global Provide Token
 *
 */
export const GLOBAL_PROVIDE_TOKEN_A4_CONFIG: A4GlobalProvideToken = 'Global.A4.Config'

/**
 *
 * @public
 *
 *   `A4 Config Module` Scope Provide Token
 *
 */
export const SCOPE_PROVIDE_TOKEN_A4_CONFIG: A4ScopeProvideToken = 'Scope.A4.Config'

/**
 * @public
 */
export const getA4Config = (moduleRef: ModuleRef, logger?: Logger): IA4Config => {
  try {
    const a4Config: IA4Config = moduleRef.get(GLOBAL_PROVIDE_TOKEN_A4_CONFIG, { strict: false })
    return a4Config
  } catch (error) {
    if (logger) logger.debug(`Not Found Global A4 Config, use 'A4ConfigBase'.`)
    return new A4ConfigBase()
  }
}
