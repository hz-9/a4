/**
 * @Author       : Chen Zhen
 * @Date         : 2024-06-05 15:41:47
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-06-05 18:13:45
 */

/**
 * @Author       : Chen Zhen
 * @Date         : 2024-06-04 16:54:18
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-06-05 15:42:52
 */
import { Inject } from '@nestjs/common'

import { A4_DEFAULT_DATA_SOURCE_NAME } from '../const'
import type { EntityClassOrSchema } from '../interface'
import { getTypeORMCrudToken } from '../util'

/**
 * @public
 *
 *  获取 TypeORM 的 A4TypeORMCrud 对象。
 *
 */
export const InjectA4TypeORMCrud = (
  entity: EntityClassOrSchema,
  dataSource: string = A4_DEFAULT_DATA_SOURCE_NAME
): ReturnType<typeof Inject> => Inject(getTypeORMCrudToken(entity, dataSource))
