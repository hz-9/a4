/**
 * @Author       : Chen Zhen
 * @Date         : 2024-05-26 15:09:00
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-06-19 17:36:26
 */
import { IsNumber, IsString } from 'class-validator'

import { IsId } from '@hz-9/a4-core'
import { Column, Entity, Index, PrimaryGeneratedColumn } from '@hz-9/a4-crud-typeorm/typeorm'

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn('increment')
  @IsId()
  public id: number

  /* A4 Cli 自动创建的 Entity 文件，请按需添加其他数据列。 */

  @Index()
  @Column()
  @IsString()
  public username: string

  @Column({ comment: '昵称', nullable: true })
  @IsString()
  public name?: string

  @Index()
  @Column({ nullable: true })
  @IsString()
  public email?: string

  @Index('INDEX_TELEPHONE')
  @Column({ nullable: true })
  @IsString()
  public telephone?: string

  @Index()
  @Column({})
  @IsString()
  public password: string

  @Column({ type: 'int2', comment: '邮箱验证。（0: 未验证；1: 已验证）', default: 0 })
  @IsNumber()
  public emailVerify: number

  @Column({ type: 'int2', comment: '收集验证。（0: 未验证；1: 已验证）', default: 0 })
  @IsNumber()
  public telephoneVerify: number

  @Column({ type: 'int2', comment: '用户类型。（-1: 超级管理员；0: 普通用户）', default: 0 })
  @IsNumber()
  public accountType: number

  @Column({ comment: '用户头像', nullable: true })
  @IsString()
  public userIcon?: string

  @Column({ comment: '注册时间' })
  @IsNumber()
  public registeTime: number

  @Column({ comment: '密码最后修改时间' })
  @IsNumber()
  public pwdLastModifyTime: number
}
