/**
 * @Author       : Chen Zhen
 * @Date         : 2024-05-10 00:00:00
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-06-06 09:27:07
 */
import { DynamicModule, FactoryProvider, Logger, Module } from '@nestjs/common'

import { A4ModuleBase, A4_DOCS, IA4Config, IA4DocsModule } from '@hz-9/a4-core'

import type { IDocsInfo } from '../interface'
import { A4DocsModuleSchema, A4DocsModuleSchemaA } from '../schema'
import { A4Docs } from './docs'

/**
 * @public
 *
 *  `A4 Docs` 核心模块类。
 *
 */
@Module({})
export class A4DocsModule implements A4ModuleBase, IA4DocsModule {
  protected readonly logger: Logger = new Logger('A4 Docs')

  // eslint-disable-next-line @typescript-eslint/typedef
  public static CONFIG_MIDDLE_PATH = 'A4.docs' as const

  // eslint-disable-next-line @typescript-eslint/typedef
  public static Schema = A4DocsModuleSchemaA

  public static forRootAsync(options: Omit<FactoryProvider<IDocsInfo>, 'provide'>): DynamicModule {
    return {
      module: A4DocsModule,

      providers: [
        {
          provide: A4_DOCS,
          inject: options.inject,
          useFactory: async (...args) => {
            const result = await options.useFactory(...args)
            return new A4Docs(result)
          },
        },

        {
          provide: A4Docs,
          useExisting: A4_DOCS,
        },
      ],

      exports: [A4_DOCS, A4Docs],

      global: true,
    }
  }

  public static getConfig(a4Config: IA4Config): IDocsInfo {
    const config = a4Config.getOrThrow<A4DocsModuleSchema>(this.CONFIG_MIDDLE_PATH)

    return {
      ...config,
      statsInfo: a4Config.getA4StatsInfo(),
      pathInfo: a4Config.getA4PathInfo(),
    }
  }
}
