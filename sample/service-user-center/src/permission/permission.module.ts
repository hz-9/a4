/**
 * @Author       : Chen Zhen
 * @Date         : 2024-06-19 23:07:00
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-06-19 23:08:36
 */
import { Module } from '@nestjs/common'

import { A4TypeORMCrudModule } from '@hz-9/a4-crud-typeorm'

import { PermissionEntity } from './entity/permission.entity'
import { PermissionHttpController } from './permission.http.controller'
import { PermissionRedisController } from './permission.redis.controller'
import { PermissionService } from './permission.service'

/**
 * A4 Cli 自动生成的文件。
 */
@Module({
  imports: [A4TypeORMCrudModule.forFeature([PermissionEntity])],
  controllers: [PermissionHttpController, PermissionRedisController],
  providers: [PermissionService],
})
export class PermissionModule {}
