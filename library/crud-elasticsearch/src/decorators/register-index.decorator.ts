/**
 * @Author       : Chen Zhen
 * @Date         : 2024-06-04 16:54:18
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-06-05 20:12:51
 */

/* eslint-disable no-param-reassign, @typescript-eslint/ban-types */
import { OpenSearchEntity, OpenSearchEntityArgs } from '@scalenc/opensearch-mapping-ts'

import _ from '@hz-9/a4-core/lodash'

import { A4_ELASTICSEARCH_INDEX_NAME_IN_METADATA } from '../const'

/**
 * @public
 *
 * 注册索引。
 *
 */
export const RegisterIndex =
  (args: OpenSearchEntityArgs = {}): ClassDecorator =>
  <TFunction extends Function>(constructor: TFunction): TFunction | void => {
    if (!args.index) args.index = _.kebabCase(constructor.name)

    Reflect.defineMetadata(A4_ELASTICSEARCH_INDEX_NAME_IN_METADATA, args.index, constructor)

    return OpenSearchEntity(args)(constructor)
  }
