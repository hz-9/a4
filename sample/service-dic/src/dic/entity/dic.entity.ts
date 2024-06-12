/**
 * @Author       : Chen Zhen
 * @Date         : 2024-05-10 17:05:30
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-06-03 17:44:40
 */
import { IsString } from 'class-validator'

import { IsId } from '@hz-9/a4-core'
import { Column, Entity, PrimaryGeneratedColumn } from '@hz-9/a4-crud-typeorm/typeorm'

@Entity()
export class DicEntity {
  @PrimaryGeneratedColumn()
  @IsId()
  public id: number

  @Column()
  @IsString()
  public label: string

  @Column()
  @IsString()
  public code: string

  @Column({ nullable: true })
  @IsString()
  public description?: string

  @Column({ nullable: true })
  @IsString()
  public remark?: string
}
