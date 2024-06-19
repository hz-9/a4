/**
 * @Author       : Chen Zhen
 * @Date         : 2024-06-19 23:00:00
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-06-19 23:13:42
 */
import { IsNumber, IsString } from 'class-validator'

import { IsId } from '@hz-9/a4-core'
import { Column, Entity, Index, PrimaryGeneratedColumn } from '@hz-9/a4-crud-typeorm/typeorm'

@Entity()
export class RoleEntity {
  @PrimaryGeneratedColumn('increment')
  @IsId()
  public id: number

  /* A4 Cli 自动创建的 Entity 文件，请按需添加其他数据列。 */

  @Index()
  @Column({ comment: '角色名称' })
  @IsString()
  public name: string

  @Column({ type: 'int2', comment: '是否为默认角色。（0: 不是；1: 是）', default: 0 })
  @IsNumber()
  public isDefault: number
}
