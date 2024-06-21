/**
 * @Author       : Chen Zhen
 * @Date         : 2024-05-27 16:18:00
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-06-20 14:45:34
 */
import { Global, Module } from '@nestjs/common'

import { A4TypeORMCrudModule } from '@hz-9/a4-crud-typeorm'

import { UserEntity } from './entity/user.entity'
import { UserHttpController } from './user.http.controller'
import { UserRedisController } from './user.redis.controller'
import { UserService } from './user.service'

/**
 * A4 Cli 自动生成的文件。
 */
@Global()
@Module({
  imports: [A4TypeORMCrudModule.forFeature([UserEntity])],
  controllers: [UserHttpController, UserRedisController],
  providers: [UserService],

  exports: [UserService],
})
export class UserModule {}
