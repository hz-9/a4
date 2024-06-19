/**
 * @Author       : Chen Zhen
 * @Date         : 2024-06-19 23:00:00
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-06-19 23:00:59
 */
import { Module } from '@nestjs/common'

import { A4TypeORMCrudModule } from '@hz-9/a4-crud-typeorm'

import { RoleEntity } from './entity/role.entity'
import { RoleHttpController } from './role.http.controller'
import { RoleRedisController } from './role.redis.controller'
import { RoleService } from './role.service'

/**
 * A4 Cli 自动生成的文件。
 */
@Module({
  imports: [A4TypeORMCrudModule.forFeature([RoleEntity])],
  controllers: [RoleHttpController, RoleRedisController],
  providers: [RoleService],
})
export class RoleModule {}
