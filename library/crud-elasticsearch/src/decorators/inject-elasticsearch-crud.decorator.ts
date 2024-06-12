/**
 * @Author       : Chen Zhen
 * @Date         : 2024-06-04 16:54:18
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-06-05 19:53:11
 */
import { Inject } from '@nestjs/common'

import { A4_DEFAULT_DATA_SOURCE_NAME } from '../const'
import { Index } from '../interface'
import { getElasticSearchCrudToken } from '../util'

/**
 * @public
 *
 *  获取 A4 的 A4ElasticSearchCrud 对象。
 *
 */
export const InjectA4ElasticSearchCrud = (
  index: Index,
  dbName: string = A4_DEFAULT_DATA_SOURCE_NAME
): ReturnType<typeof Inject> => Inject(getElasticSearchCrudToken(index, dbName))
