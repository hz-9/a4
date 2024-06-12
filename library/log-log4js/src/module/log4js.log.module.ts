/**
 * @Author       : Chen Zhen
 * @Date         : 2024-05-10 00:00:00
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-06-06 09:42:56
 */
import { DynamicModule, Logger } from '@nestjs/common'
import { Configuration } from 'log4js'

import * as upath from '@hz-9/a4-core/upath'
import { A4ModuleBase, ClassValidatorUtil, IA4Config, IA4LogModule } from '@hz-9/a4-core'

import { IInitLoggerOptions } from '../interface'
import {
  Log4jsAsyncOptions,
  Log4jsLogger,
  Log4jsModule,
  Log4jsOptions,
  createLog4jsLogger,
} from '../plugins/nestx-log4js/index'
import { A4Log4jsLogModuleSchema, A4Log4jsLogModuleSchemaA } from '../schema'

/**
 * @public
 *
 *  `A4Log4jsModule`
 *
 */
export class A4Log4jsLogModule extends Log4jsModule implements A4ModuleBase, IA4LogModule {
  public static logger: Logger = new Logger('A4 Log')

  // eslint-disable-next-line @typescript-eslint/typedef
  public static CONFIG_MIDDLE_PATH = 'A4.log' as const

  // eslint-disable-next-line @typescript-eslint/typedef
  public static Schema = A4Log4jsLogModuleSchemaA

  public static forRootAsync(options: Log4jsAsyncOptions): DynamicModule {
    return {
      ...super.forRootAsync({
        ...options,

        useFactory: async (...args) => {
          const loggerOptions = options.useFactory
            ? await options.useFactory(...args)
            : this.simpleOptions(this._getDefaultOptions())

          return loggerOptions
        },
      }),

      module: A4Log4jsLogModule,

      global: true,
    }
  }

  public static async getInitLogger(options?: IInitLoggerOptions): Promise<Log4jsLogger> {
    const log4jsOptions = this._initOptions(options ?? this._getDefaultOptions())

    /**
     * TODO 存在常量，后续思考是否修改。
     */
    const logger = await createLog4jsLogger('default').useFactory(log4jsOptions)
    return logger
  }

  /**
   *
   * @public
   *
   *  用于服务正式运行阶段构建的 `log4js` 配置项，
   *  但此配置仍为一个简单的配置，仅会输出一个日志文件。。
   *
   *  详细配置项，请查看 [log4js配置信息](https://log4js-node.github.io/log4js-node/index.html)。
   *
   * @param options - Logger 配置项
   * @param name - TODO 不明确的属性
   *
   */
  public static simpleOptions(
    optionsOrConfig: A4Log4jsLogModuleSchema | IA4Config,
    name: string = 'main'
  ): Log4jsOptions {
    const options = this._parseOptionsOrConfig(optionsOrConfig, this.CONFIG_MIDDLE_PATH)

    const config: Configuration = {
      appenders: {
        stdout: {
          type: 'stdout',
          layout: {
            type: 'pattern',
            pattern: options.consolePattern,
            tokens: {
              name: (logEvent) => (logEvent.context && logEvent.context.name) || '-',
            },
          },
        },

        app: {
          type: 'file',
          pattern: 'yyyy-MM-dd.log',
          filename: upath.resolve(options.baseDir, 'app'),
          maxLogSize: options.maxLogSize,
          backups: options.backups,
          alwaysIncludePattern: true,
          layout: {
            type: 'pattern',
            pattern: options.filePattern,
            tokens: {
              name: (logEvent) => (logEvent.context && logEvent.context.name) || '-',
            },
          },
        },
      },

      categories: {
        default: {
          enableCallStack: options.enableCallStack,
          appenders: ['stdout', 'app'],
          level: options.level,
        },
      },
    }

    return { config, name }
  }

  private static _parseOptionsOrConfig<T>(optionsOrConfig: T | IA4Config, configPath: string): T {
    const isConfig = (optionsOrConfig as IA4Config).get instanceof Function

    return isConfig
      ? (() => {
          const config: IA4Config = optionsOrConfig as IA4Config
          return config.getOrThrow<T>(configPath)
        })()
      : (optionsOrConfig as T)
  }

  private static _getDefaultOptions(): A4Log4jsLogModuleSchema {
    const options: A4Log4jsLogModuleSchema = ClassValidatorUtil.p2CwD(A4Log4jsLogModuleSchema, {})
    return options
  }

  /**
   *
   * @internal
   *
   *  用于在服务初始化阶段构建 `log4js` 配置项。
   *
   *  也可用户获取一个简易的日志位置对象。
   *
   * @param options - Logger 配置项
   * @param name - TODO 不明确的属性
   *
   */
  private static _initOptions(options: IInitLoggerOptions, name: string = 'init'): Log4jsOptions {
    const config: Configuration = {
      appenders: {
        stdout: {
          type: 'stdout',
          layout: {
            type: 'pattern',
            pattern: options.consolePattern,
            tokens: {
              name: (logEvent) => (logEvent.context && logEvent.context.name) || '-',
            },
          },
        },
      },

      categories: {
        default: {
          enableCallStack: options.enableCallStack,
          appenders: ['stdout'],
          level: options.level,
        },
      },
    }

    return { config, name }
  }
}
