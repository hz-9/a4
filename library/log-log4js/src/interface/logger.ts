/**
 * @Author       : Chen Zhen
 * @Date         : 2024-05-10 00:00:00
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-06-30 22:44:18
 * @Description  : 日志相关接口
 */
import type { Appender, Configuration, DateFileAppender, Levels, StandardOutputAppender } from 'log4js'

import type { A4Log4jsSimpleLogModuleSchema } from '../schema/log4js-simple.log.schema'

// import type { A4Log4jsLogModuleSchema } from '../schema/log4js-simple.log.schema'

/**
 * @public
 *
 *  `log4js` 需求配置项
 *
 */
export interface IA4Log4jsSimpleInitOptions {
  appenders: {
    stdout: StandardOutputAppender
  }

  categories: {
    default: {
      enableCallStack: boolean
      appenders: string[]
      level: LoggerLevel
    }
  }
}

/**
 * @public
 *
 *  `log4js` 需求配置项
 *
 */
export interface IA4Log4jsSimpleOptions {
  appenders: {
    stdout: StandardOutputAppender
    app: DateFileAppender

    [k: string]: Appender
  }

  categories: {
    default: {
      enableCallStack: boolean
      appenders: string[]
      level: LoggerLevel
    }
  }
}

/**
 * @public
 *
 *  `log4js` 需求配置项
 *
 */
export type IA4Log4jsOptions = Configuration

/**
 *
 * @public
 *
 * 日志级别。
 *
 */
export type LoggerLevel = Lowercase<Exclude<keyof Levels, 'levels' | 'getLevel' | 'addLevels'>>

/**
 *
 * @public
 *
 * 服务初始化阶段，日志对象的配置参数。
 *
 * 此阶段，进存在普通输出日志流，不存在文件写入的情况。
 *
 * 无 `filePattern` `maxLogSize` `backups` 属性。
 *
 */
export interface IInitLoggerOptions
  extends Omit<A4Log4jsSimpleLogModuleSchema, 'filePattern' | 'maxLogSize' | 'backups'> {}
