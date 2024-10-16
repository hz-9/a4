import { type Logger as Log4jsLogger, configure } from 'log4js'

import * as upath from '@hz-9/a4-core/upath'
import { CU, IA4Config, IA4LogModule } from '@hz-9/a4-core'

import { IA4Log4jsOptions, IA4Log4jsSimpleInitOptions, IA4Log4jsSimpleOptions, IInitLoggerOptions } from '../interface'
import { A4Log4jsSimpleLogModuleSchema } from '../schema'
import { A4Log4jsLogger } from './log4js'
import {
  A4Log4jsSimpleLogModuleBase,
  A4Log4jsSimpleLogModuleProtectedBase,
} from './log4js-simple.log.module-definition'
import { parseNestModuleCallStack } from './log4js.extentions'

export class A4Log4jsSimpleLogModule extends A4Log4jsSimpleLogModuleBase implements IA4LogModule {
  private static get _this(): A4Log4jsSimpleLogModuleProtectedBase {
    return this as unknown as A4Log4jsSimpleLogModuleProtectedBase
  }

  public static get defaultConfig(): IA4Log4jsOptions {
    const defaultOptions = CU.p2CwD(A4Log4jsSimpleLogModuleSchema, {})
    return this.optionsToConfig(defaultOptions)
  }

  public static getConfig(
    a4Config: IA4Config<(typeof A4Log4jsSimpleLogModuleBase)['RootSchemaType']>,
    configKey?: string
  ): IA4Log4jsOptions {
    type ConfigKeyType = (typeof A4Log4jsSimpleLogModuleBase)['configPath']
    const options = a4Config.getOrThrow((configKey as ConfigKeyType) ?? this.configPath)

    return this.optionsToConfig(options)
  }

  public static optionsToConfig(options: A4Log4jsSimpleLogModuleSchema): IA4Log4jsSimpleOptions {
    const isColorAllowed: boolean = !process.env.NO_COLOR

    const config: IA4Log4jsSimpleOptions = {
      appenders: {
        stdout: {
          type: 'stdout',
          layout: {
            type: 'pattern',
            pattern: isColorAllowed ? options.consolePattern : options.filePattern,
            tokens: {
              name: (logEvent) => (logEvent.context && logEvent.context.name) || '-',
            },
          },
        },

        app: {
          type: 'dateFile',
          pattern: 'yyyy-MM-dd.log',
          filename: upath.resolve(options.baseDir, 'app'),
          // maxLogSize: options.maxLogSize,
          // backups: options.backups,
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

    return config
  }

  protected static async optionsToProvideClassConstructorOptions(options: IA4Log4jsOptions): Promise<Log4jsLogger> {
    const logger: Log4jsLogger = configure(options).getLogger()
    logger.setParseCallStackFunction(parseNestModuleCallStack)
    return logger
  }

  /**
   *
   * @internal
   *
   *  用于在服务初始化阶段构建 `log4js` 配置项。
   *
   *  也可用户获取一个简易的日志位置对象。
   *
   * @param name - 无效占位属性
   * @param options - Logger 配置项
   *
   */
  private static _initOptions(name: string, options: IInitLoggerOptions): IA4Log4jsSimpleInitOptions {
    const config: IA4Log4jsSimpleInitOptions = {
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

    return config
  }

  public static getInitLogger(options?: IInitLoggerOptions): A4Log4jsLogger {
    const defaultOptions = CU.p2CwD(A4Log4jsSimpleLogModuleSchema, {})
    const config = this._initOptions('A4Init', options ?? defaultOptions)

    const logger = configure(config).getLogger()
    logger.setParseCallStackFunction(parseNestModuleCallStack)
    return new A4Log4jsLogger(logger)
  }
}
