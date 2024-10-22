/**
 * @Author       : Chen Zhen
 * @Date         : 2024-06-05 15:41:47
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-10-22 17:39:21
 */
import { Inject } from '@nestjs/common'

import { A4_DEFAULT_DATA_SOURCE_NAME } from '../const'
import type { EntityClassOrSchema } from '../interface'
import { getRepositoryToken } from '../util'

/**
 * @public
 *
 *  获取 TypeORM 的 Repository 对象。
 *
 */
export const InjectRepository = (
  entity: EntityClassOrSchema,
  dataSource: string = A4_DEFAULT_DATA_SOURCE_NAME
): ReturnType<typeof Inject> => Inject(getRepositoryToken(entity, dataSource))
