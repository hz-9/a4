/**
 * @Author       : Chen Zhen
 * @Date         : 2024-05-10 00:00:00
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-06-30 20:45:27
 */
import { Module } from '@nestjs/common'
import type { ClassConstructor } from 'class-transformer'

import { ClassValidatorUtil, IA4ConfigModule } from '@hz-9/a4-core'
import { merge as mergeOptions } from '@hz-9/a4-core/lodash'

import { IA4ConfigModuleOptions, IConfigClassValidatorUtilParseOptions } from '../interface'
import { IAllConfigLoader, getLoader } from '../loader'
import { A4ConfigModuleBase, A4ConfigModuleProtectedBase } from './config.module-definition'

export {
  GLOBAL_PROVIDE_TOKEN_A4_CONFIG,
  SCOPE_PROVIDE_TOKEN_A4_CONFIG,
  MODULE_CONFIG_PATH_A4_CONFIG,
} from '@hz-9/a4-core'

/**
 * @public
 *
 *  `A4 Config` 核心模块类。
 *
 */
@Module({})
export class A4ConfigModule extends A4ConfigModuleBase implements IA4ConfigModule {
  private static get _this(): A4ConfigModuleProtectedBase {
    return this as unknown as A4ConfigModuleProtectedBase
  }

  /**
   * @internal
   */
  protected static async optionsToProvideClassConstructorOptions(options: IA4ConfigModuleOptions): Promise<object> {
    const loader: IAllConfigLoader = getLoader(options)

    const loadedConfig = await loader.asyncLoad()
    this._this.logger.log(loader.getSuccessLoggerMsg())

    if (options.ignoreSchema === true) return loadedConfig

    const parseOptions: IConfigClassValidatorUtilParseOptions = { errorColer: options.errorColer }
    if (!Array.isArray(options.Schema)) return ClassValidatorUtil.parse(options.Schema, loadedConfig, parseOptions)

    let result: object = {}
    options.Schema.forEach((s: ClassConstructor<object>) => {
      const c = ClassValidatorUtil.parse(s, loadedConfig, parseOptions)
      result = mergeOptions(result, c)
    })

    return result
  }
}
