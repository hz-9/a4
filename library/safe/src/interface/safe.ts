/**
 * @Author       : Chen Zhen
 * @Date         : 2024-05-10 00:00:00
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-05-31 23:47:21
 */
import type { A4SafeModuleSchema } from '../schema/safe.schema'

/**
 *
 * @public
 *
 *  `SafeModule` 在运行时，需要的数据结构。
 *
 */
export interface IA4SafeConstructorOptions extends A4SafeModuleSchema {
  // ...
}
