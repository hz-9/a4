/**
 * @Author       : Chen Zhen
 * @Date         : 2024-05-10 00:00:00
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-05-31 23:44:03
 */
import type { A4EurekaRegistryModuleSchema } from '../schema/eureka.registry.schema'

/**
 *
 * @public
 *
 *  `EurekaRegistry` 构造函数参数。
 *
 */
export interface IA4EurekaRegisterConstructorOptions extends A4EurekaRegistryModuleSchema {
  instanceId?: string
}

/**
 *
 * @public
 *
 *  `EurekaRegistry` 启动时，需要的参数。
 *
 */
export interface IA4EurekaRegisterStartOptions {
  host: string
  port: number
}
