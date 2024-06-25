/**
 * @Author       : Chen Zhen
 * @Date         : 2024-05-10 00:00:00
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-06-25 10:13:56
 */
import * as path from 'upath'
import { Logger } from '@nestjs/common'
import { Observable, delay, retry, scan } from 'rxjs'

/**
 *
 * @public
 *
 *  通用工具类
 *
 */
export class A4Util {
  /**
   *
   * 睡眠。
   *
   * @param t - 时间。单位：毫秒
   */
  public static async sleep(t: number): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(resolve, t)
    })
  }

  /**
   * @public
   *
   *  如果不是绝对路径，则进行拼接
   *
   * @param sourcePath - 资源路径
   * @param basePath - 基础路径
   *
   * @returns 资源路径的绝对路径。
   */
  public static noAbsoluteWith(sourcePath: string, basePath: string): string {
    return path.isAbsolute(sourcePath) ? path.normalize(sourcePath) : path.resolve(basePath, sourcePath)
  }

  /**
   *
   * @public
   *
   *  数据库初始化多次尝试连接工具函数。
   *
   * @param dataSourceName - 数据库名称。
   * @param retryDelay - 重新连接次数。
   * @param retryAttempts - 是否自动加载 Entities。
   * @param verboseRetryLog - 两次重连的间隔时间
   * @param logger - 日志对象。
   * @returns
   */
  public static handleRetry(
    dataSourceName: string,
    retryDelay: number,
    retryAttempts: number,
    verboseRetryLog: boolean,
    logger: Logger
  ): <T>(source: Observable<T>) => Observable<T> {
    return <T>(source: Observable<T>) =>
      source.pipe(
        retry({
          delay: (e) => {
            if (e instanceof Error) throw e

            return e.pipe(
              scan((errorCount, error: Error) => {
                const verboseMessage = verboseRetryLog ? ` Message: ${error.message}.` : ''

                logger.error(
                  `Unable to connect to the database${dataSourceName}.${verboseMessage} Retrying (${errorCount + 1})...`,
                  error.stack
                )
                if (errorCount + 1 >= retryAttempts) {
                  throw error
                }
                return errorCount + 1
              }, 0),
              delay(retryDelay)
            )
          },
        })
      )
  }
}
