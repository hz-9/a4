/**
 * @Author       : Chen Zhen
 * @Date         : 2024-05-10 17:05:30
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-10-22 19:33:07
 */
import { A4CacheModule } from '@hz-9/a4-cache'
import { A4Config, A4ConfigModule } from '@hz-9/a4-config'
import { LoggerMiddleware } from '@hz-9/a4-core'
// import { A4ElasticSearchCrudModule } from '@hz-9/a4-crud-elasticsearch'
import { A4TypeORMCrudModule } from '@hz-9/a4-crud-typeorm'
import { A4DocsModule } from '@hz-9/a4-docs'
import { A4Log4jsSimpleLogModule } from '@hz-9/a4-log-log4js'
import { A4MicroServiceModule } from '@hz-9/a4-micro-service'
import { A4NetworkModule } from '@hz-9/a4-network'
import { A4EurekaRegsitryModule } from '@hz-9/a4-registry-eureka'
import { A4SafeModule } from '@hz-9/a4-safe'
import { MiddlewareConsumer, Module } from '@nestjs/common'

// import { Dic2Module } from './dic-2/dic-2.module'
import { DicModule } from './dic/dic.module'

@Module({
  imports: [
    A4ConfigModule.forRootAsync({
      useFactory: async () => ({
        type: 'file',
        Schema: [
          A4CacheModule.Schema,
          A4TypeORMCrudModule.Schema,
          A4DocsModule.Schema,
          A4Log4jsSimpleLogModule.Schema,
          A4MicroServiceModule.Schema,
          A4NetworkModule.Schema,
          A4EurekaRegsitryModule.Schema,
          A4SafeModule.Schema,
          // A4ElasticSearchCrudModule.Schema,
        ],
      }),
    }),

    A4CacheModule.forRootAsync({
      inject: [A4Config],
      useFactory: (a4Config: A4Config<InstanceType<(typeof A4CacheModule)['Schema']>>) =>
        A4CacheModule.getOptions(a4Config),
    }),

    // A4ElasticSearchCrudModule.forRootAsync({
    //   inject: [A4Config],
    //   useFactory: (a4Config: A4Config<A4ElasticSearchCrudModule['Schema']>) =>
    //     A4ElasticSearchCrudModule.getConfig(a4Config),
    // }),

    A4TypeORMCrudModule.forRootAsync({
      inject: [A4Config],
      useFactory: (a4Config: A4Config<InstanceType<(typeof A4TypeORMCrudModule)['Schema']>>) =>
        A4TypeORMCrudModule.getOptions(a4Config),
    }),

    A4DocsModule.forRootAsync({
      inject: [A4Config],
      useFactory: (a4Config: A4Config<InstanceType<(typeof A4DocsModule)['Schema']>>) =>
        A4DocsModule.getOptions(a4Config),
    }),

    A4Log4jsSimpleLogModule.forRootAsync({
      inject: [A4Config],
      useFactory: (a4Config: A4Config<InstanceType<(typeof A4Log4jsSimpleLogModule)['Schema']>>) =>
        A4Log4jsSimpleLogModule.getOptions(a4Config),
    }),

    A4MicroServiceModule.forRootAsync({
      inject: [A4Config],
      useFactory: (a4Config: A4Config<InstanceType<(typeof A4MicroServiceModule)['Schema']>>) =>
        A4MicroServiceModule.getOptions(a4Config),
    }),

    A4NetworkModule.forRootAsync({
      inject: [A4Config],
      useFactory: (a4Config: A4Config<InstanceType<(typeof A4NetworkModule)['Schema']>>) =>
        A4NetworkModule.getOptions(a4Config),
    }),

    A4EurekaRegsitryModule.forRootAsync({
      inject: [A4Config],
      useFactory: (a4Config: A4Config<InstanceType<(typeof A4EurekaRegsitryModule)['Schema']>>) =>
        A4EurekaRegsitryModule.getOptions(a4Config),
    }),

    A4SafeModule.forRootAsync({
      inject: [A4Config],
      useFactory: (a4Config: A4Config<InstanceType<(typeof A4SafeModule)['Schema']>>) =>
        A4SafeModule.getOptions(a4Config),
    }),

    DicModule,
    // Dic2Module,
  ],
})
export class AppModule {
  public configure(consumer: MiddlewareConsumer): void {
    consumer.apply(LoggerMiddleware).forRoutes('*')
  }
}
