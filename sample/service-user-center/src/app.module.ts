/**
 * @Author       : Chen Zhen
 * @Date         : 2024-05-10 17:05:30
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-06-06 09:51:02
 */
import { MiddlewareConsumer, Module } from '@nestjs/common'

import { A4CacheModule } from '@hz-9/a4-cache'
import { A4Config, A4ConfigModule } from '@hz-9/a4-config'
import { LoggerMiddleware } from '@hz-9/a4-core'
import { A4TypeORMCrudModule } from '@hz-9/a4-crud-typeorm'
import { A4DocsModule } from '@hz-9/a4-docs'
import { A4RedlockLockModule } from '@hz-9/a4-lock-redlock'
import { A4Log4jsLogModule } from '@hz-9/a4-log-log4js'
import { A4MicroServiceModule } from '@hz-9/a4-micro-service'
import { A4NetworkModule } from '@hz-9/a4-network'
import { A4EurekaRegsitryModule } from '@hz-9/a4-registry-eureka'
import { A4SafeModule } from '@hz-9/a4-safe'

// import { AppConfigSchema } from './app.schema'
// import { PermissionModule } from './permission/permission.module'
// import { RoleModule } from './role/role.module'
import { UserModule } from './user/user.module'

@Module({
  imports: [
    A4ConfigModule.forRootAsync({
      useFactory: async () => ({
        type: 'file',
        Schema: [
          A4CacheModule.Schema,
          A4TypeORMCrudModule.Schema,
          A4DocsModule.Schema,
          A4RedlockLockModule.Schema,
          A4Log4jsLogModule.Schema,
          A4MicroServiceModule.Schema,
          A4NetworkModule.Schema,
          A4EurekaRegsitryModule.Schema,
          A4SafeModule.Schema,
        ],
      }),
    }),

    A4CacheModule.forRootAsync({
      inject: [A4Config],
      useFactory: (a4Config: A4Config) => A4CacheModule.getConfig(a4Config),
    }),

    A4TypeORMCrudModule.forRootAsync({
      inject: [A4Config],
      useFactory: (a4Config: A4Config) => A4TypeORMCrudModule.getConfig(a4Config),
    }),

    A4DocsModule.forRootAsync({
      inject: [A4Config],
      useFactory: (a4Config: A4Config) => A4DocsModule.getConfig(a4Config),
    }),

    A4RedlockLockModule.forRootAsync({
      inject: [A4Config],
      useFactory: (a4Config: A4Config) => A4RedlockLockModule.getConfig(a4Config),
    }),

    A4Log4jsLogModule.forRootAsync({
      inject: [A4Config],
      useFactory: (a4Config: A4Config) => A4Log4jsLogModule.simpleOptions(a4Config),
    }),

    A4MicroServiceModule.forRootAsync({
      inject: [A4Config],
      useFactory: (a4Config: A4Config) => A4MicroServiceModule.getConfig(a4Config),
    }),

    A4NetworkModule.forRootAsync({
      inject: [A4Config],
      useFactory: (a4Config: A4Config) => A4NetworkModule.getConfig(a4Config),
    }),

    A4EurekaRegsitryModule.forRootAsync({
      inject: [A4Config],
      useFactory: (a4Config: A4Config) => A4EurekaRegsitryModule.getConfig(a4Config),
    }),

    A4SafeModule.forRootAsync({
      inject: [A4Config],
      useFactory: (a4Config: A4Config) => A4SafeModule.getConfig(a4Config),
    }),

    // PermissionModule,
    // RoleModule,
    UserModule,
  ],
})
export class AppModule {
  public configure(consumer: MiddlewareConsumer): void {
    consumer.apply(LoggerMiddleware).forRoutes('*')
  }
}
