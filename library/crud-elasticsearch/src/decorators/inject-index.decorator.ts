/**
 * @Author       : Chen Zhen
 * @Date         : 2024-06-05 15:41:47
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-06-05 19:54:24
 */

/**
 * @Author       : Chen Zhen
 * @Date         : 2024-06-04 16:54:18
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-06-05 15:42:52
 */
import { Inject } from '@nestjs/common'

import { A4_DEFAULT_DATA_SOURCE_NAME } from '../const'
import { Index } from '../interface'
import { getIndexToken } from '../util'

/**
 * @public
 *
 *  获取 ElasticSearch 的 Index 对象。
 *
 */
export const InjectIndex = (index: Index, dbName: string = A4_DEFAULT_DATA_SOURCE_NAME): ReturnType<typeof Inject> =>
  Inject(getIndexToken(index, dbName))
