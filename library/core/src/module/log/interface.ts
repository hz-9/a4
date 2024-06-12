/**
 * @Author       : Chen Zhen
 * @Date         : 2024-05-21 13:51:49
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-05-21 16:07:33
 */
import { LoggerService } from '@nestjs/common'

/**
 *
 * @public
 *
 *  `A4 Log Module` 抽象类。
 *
 */
export abstract class IA4LogModule {
  /**
   *  获取服务初始化阶段日志对象。
   *
   *  此阶段初始化日志配置，不允许从 `ConfigModule` 中获取信息。
   */
  public static getInitLogger: () => Promise<LoggerService>
}
