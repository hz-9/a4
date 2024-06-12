/**
 * @Author       : Chen Zhen
 * @Date         : 2024-05-10 17:05:30
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-06-05 21:56:57
 */
import { IsString } from 'class-validator'

import { RegisterIndex } from '@hz-9/a4-crud-elasticsearch'
import { OpenSearchField } from '@hz-9/a4-crud-elasticsearch/opensearch-mapping-ts'

@RegisterIndex()
export class Dic2Entity {
  @IsString()
  public id: string

  @OpenSearchField({ type: 'text' })
  @IsString()
  public label: string

  @OpenSearchField({ type: 'text' })
  @IsString()
  public code: string

  @OpenSearchField({ type: 'text' })
  @IsString()
  public description?: string

  @OpenSearchField({ type: 'text' })
  @IsString()
  public remark?: string
}
