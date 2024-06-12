/**
 * @Author       : Chen Zhen
 * @Date         : 2024-05-21 13:51:49
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-06-01 01:55:38
 */

/* eslint-disable max-classes-per-file */
import type { A4Application } from '../../core/a4-application'

/**
 *
 * @public
 *
 *  `A4 MicroService Module` 抽象类。
 *
 */
export abstract class IA4MicroServiceModule {}

/**
 *
 * @public
 *
 *  `A4MicroService` 抽象类。
 *
 */
export abstract class IA4MicroService {
  /**
   * 初始化所有微服务链接。
   */
  public abstract connectMicroservices(app: A4Application): Promise<void>

  /**
   * 开启所有微服务链接。
   */
  public abstract startMicroservices(app: A4Application): Promise<void>

  /**
   * 关闭所有微服务链接。
   */
  public abstract stopMicroservices(app: A4Application): Promise<void>

  /**
   * 初始化所有微服务客户端。
   */
  public abstract initClients(): Promise<void>

  /**
   * 链接所有微服务客户端。
   */
  public abstract connectClients(): Promise<void>

  /**
   * 关闭所有微服务客户端。
   */
  public abstract closeClients(): Promise<void>
}
