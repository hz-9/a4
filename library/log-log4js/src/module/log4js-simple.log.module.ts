import * as upath from '@hz-9/a4-core/upath'
import { CU, IA4LogModule } from '@hz-9/a4-core'
import { type Logger as Log4jsLogger, configure } from 'log4js'

import { IA4Log4jsOptions, IA4Log4jsSimpleInitOptions, IA4Log4jsSimpleOptions, IInitLoggerOptions } from '../interface'
import { A4Log4jsSimpleLogModuleSchema } from '../schema'
import { A4Log4jsLogger } from './log4js'
import { A4Log4jsSimpleLogModuleBase } from './log4js-simple.log.module-definition'
import { parseNestModuleCallStack } from './log4js.extentions'

/**
 * @public
 *
 *  `A4 Log4js Log (Simple)` 核心模块类。
 *
 */
export class A4Log4jsSimpleLogModule extends A4Log4jsSimpleLogModuleBase implements IA4LogModule {
  /**
   * A4Log4jsSimpleLogModuleSchema 转换为 IA4Log4jsSimpleOptions
   */
  public static configToOptions(options: A4Log4jsSimpleLogModuleSchema): IA4Log4jsSimpleOptions {
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

  /**
   * this.configToOptions(this.DEFAULT_CONFIG) 的语法糖
   */
  public static get defaultOptions(): IA4Log4jsSimpleOptions {
    return this.configToOptions(this.DEFAULT_CONFIG)
  }

  public static async optionsToProvideClassConstructorOptions(options: IA4Log4jsOptions): Promise<Log4jsLogger> {
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
