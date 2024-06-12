/**
 * @Author       : Chen Zhen
 * @Date         : 2024-05-10 00:00:00
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-06-01 02:03:30
 */
import { ClientProxy, Closeable } from '@nestjs/microservices'

import type { A4MicroServiceModuleSchema } from '../schema/micro-service.schema'

/**
 *
 * @public
 *
 *  `A4MicroService` 构造函数参数。
 *
 */
export interface IA4MicroServiceContrustorOptions extends A4MicroServiceModuleSchema {
  // ...
}

/**
 *
 * @public
 *
 *  微服务客户端。
 *
 */
export type MicroServiceClient = ClientProxy & Closeable
