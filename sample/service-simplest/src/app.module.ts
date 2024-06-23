/**
 * @Author       : Chen Zhen
 * @Date         : 2024-05-10 17:05:30
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-06-21 20:36:53
 */
import { MiddlewareConsumer, Module } from '@nestjs/common'

import { LoggerMiddleware } from '@hz-9/a4-core'

@Module({
  imports: [],
})
export class AppModule {
  public configure(consumer: MiddlewareConsumer): void {
    consumer.apply(LoggerMiddleware).forRoutes('*')
  }
}
