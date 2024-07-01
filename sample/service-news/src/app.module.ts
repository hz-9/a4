/**
 * @Author       : Chen Zhen
 * @Date         : 2024-06-19 22:37:00
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-06-27 18:44:00
 */
import { MiddlewareConsumer, Module } from '@nestjs/common'

import { A4Config, A4ConfigModule } from '@hz-9/a4-config'
import { LoggerMiddleware } from '@hz-9/a4-core'
import { A4TypeORMCrudModule } from '@hz-9/a4-crud-typeorm'
import { A4DocsModule } from '@hz-9/a4-docs'
import { A4Log4jsLogModule } from '@hz-9/a4-log-log4js'
import { A4MicroServiceModule } from '@hz-9/a4-micro-service'
import { A4NetworkModule } from '@hz-9/a4-network'
import { A4EurekaRegsitryModule } from '@hz-9/a4-registry-eureka'
import { A4SafeModule } from '@hz-9/a4-safe'

@Module({
  imports: [
    A4ConfigModule.forRootAsync({
      useFactory: async () => ({
        type: 'file',
        Schema: [
          A4TypeORMCrudModule.Schema,
          A4DocsModule.Schema,
          A4Log4jsLogModule.Schema,
          A4MicroServiceModule.Schema,
          A4NetworkModule.Schema,
          A4EurekaRegsitryModule.Schema,
          A4SafeModule.Schema,
        ],
      }),
    }),

    A4TypeORMCrudModule.forRootAsync({
      inject: [A4Config],
      useFactory: (a4Config: A4Config<A4TypeORMCrudModule['Schema']>) => A4TypeORMCrudModule.getConfig(a4Config),
    }),

    A4DocsModule.forRootAsync({
      inject: [A4Config],
      useFactory: (a4Config: A4Config<A4DocsModule['Schema']>) => A4DocsModule.getConfig(a4Config),
    }),

    A4Log4jsLogModule.forRootAsync({
      inject: [A4Config],
      useFactory: (a4Config: A4Config<A4Log4jsLogModule['Schema']>) => A4Log4jsLogModule.simpleOptions(a4Config),
    }),

    A4MicroServiceModule.forRootAsync({
      inject: [A4Config],
      useFactory: (a4Config: A4Config<A4MicroServiceModule['Schema']>) => A4MicroServiceModule.getConfig(a4Config),
    }),

    A4NetworkModule.forRootAsync({
      inject: [A4Config],
      useFactory: (a4Config: A4Config<A4NetworkModule['Schema']>) => A4NetworkModule.getConfig(a4Config),
    }),

    A4EurekaRegsitryModule.forRootAsync({
      inject: [A4Config],
      useFactory: (a4Config: A4Config<A4EurekaRegsitryModule['Schema']>) => A4EurekaRegsitryModule.getConfig(a4Config),
    }),

    A4SafeModule.forRootAsync({
      inject: [A4Config],
      useFactory: (a4Config: A4Config<A4SafeModule['Schema']>) => A4SafeModule.getConfig(a4Config),
    }),

    // Some application modules ...
  ],
})
export class AppModule {
  public configure(consumer: MiddlewareConsumer): void {
    consumer.apply(LoggerMiddleware).forRoutes('*')
  }
}
