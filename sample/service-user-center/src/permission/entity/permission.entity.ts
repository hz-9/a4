/**
 * @Author       : Chen Zhen
 * @Date         : 2024-06-19 23:07:00
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-06-19 23:12:14
 */
import { IsNumber, IsString } from 'class-validator'

import { IsId } from '@hz-9/a4-core'
import { Column, Entity, Index, PrimaryGeneratedColumn } from '@hz-9/a4-crud-typeorm/typeorm'

@Entity()
export class PermissionEntity {
  @PrimaryGeneratedColumn('increment')
  @IsId()
  public id: number

  /* A4 Cli 自动创建的 Entity 文件，请按需添加其他数据列。 */

  @Index()
  @Column({ comment: '所属系统', nullable: true })
  @IsString()
  public sysId?: string

  @Index()
  @Column({ comment: '权限编号' })
  @IsString()
  public code: string

  @Index()
  @Column({ comment: '权限名称' })
  @IsString()
  public name: string

  @Index()
  @Column({ comment: '扩展参数字段', nullable: true })
  @IsString()
  public extInfo?: string
}
