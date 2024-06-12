/**
 * @Author       : Chen Zhen
 * @Date         : 2024-05-29 15:13:00
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-06-05 17:57:00
 */
import { Module } from '@nestjs/common'

import { A4TypeORMCrudModule } from '@hz-9/a4-crud-typeorm'

import { DicHttpController } from './dic.http.controller'
import { DicRedisController } from './dic.redis.controller'
import { DicService } from './dic.service'
import { DicEntity } from './entity/dic.entity'

/**
 * A4 Cli 自动生成的文件。
 */
@Module({
  imports: [A4TypeORMCrudModule.forFeature([DicEntity])],
  controllers: [DicHttpController, DicRedisController],
  providers: [DicService],
})
export class DicModule {}
