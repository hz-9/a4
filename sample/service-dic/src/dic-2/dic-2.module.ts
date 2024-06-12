/**
 * @Author       : Chen Zhen
 * @Date         : 2024-05-29 15:13:00
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-06-05 20:21:43
 */
import { Module } from '@nestjs/common'

import { A4ElasticSearchCrudModule } from '@hz-9/a4-crud-elasticsearch'

import { Dic2HttpController } from './dic-2.http.controller'
import { Dic2Service } from './dic-2.service'
import { Dic2Entity } from './entity/dic-2.entity'

/**
 * A4 Cli 自动生成的文件。
 */
@Module({
  imports: [A4ElasticSearchCrudModule.forFeature([Dic2Entity], 'default')],

  controllers: [
    Dic2HttpController,
    // DicRedisController
  ],

  providers: [Dic2Service],
})
export class Dic2Module {}
