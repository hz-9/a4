/**
 * @Author       : Chen Zhen
 * @Date         : 2024-05-10 17:05:30
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-07-06 17:24:14
 */
import { MiddlewareConsumer, Module } from '@nestjs/common'

import { A4Config, A4ConfigModule } from '@hz-9/a4-config'
import { LoggerMiddleware } from '@hz-9/a4-core'
import { A4DocsModule } from '@hz-9/a4-docs'
import { A4Log4jsSimpleLogModule } from '@hz-9/a4-log-log4js'
import { A4MicroServiceModule } from '@hz-9/a4-micro-service'
import { A4NetworkModule } from '@hz-9/a4-network'
import { A4EurekaRegsitryModule } from '@hz-9/a4-registry-eureka'
import { A4SafeModule } from '@hz-9/a4-safe'

import { AppConfigSchema } from './app.schema'
import { ProxyMode } from './enum'
import { ProxyHttpMiddleware } from './middleware/proxy.http.middleware'
import { ProxyRpcMiddleware } from './middleware/proxy.rpc.middleware'

@Module({
  imports: [
    A4ConfigModule.forRootAsync({
      useFactory: async () => ({
        type: 'file',
        Schema: [
          AppConfigSchema,
          A4DocsModule.RootSchema,
          A4Log4jsSimpleLogModule.RootSchema,
          A4MicroServiceModule.Schema,
          A4NetworkModule.RootSchema,
          A4EurekaRegsitryModule.Schema,
          A4SafeModule.RootSchema,
        ],
      }),
    }),

    A4DocsModule.forRootAsync({
      inject: [A4Config],
      useFactory: (a4Config) => A4DocsModule.getConfig(a4Config),
    }),

    A4Log4jsSimpleLogModule.forRootAsync({
      inject: [A4Config],
      useFactory: (a4Config) => A4Log4jsSimpleLogModule.getConfig(a4Config),
    }),

    A4MicroServiceModule.forRootAsync({
      inject: [A4Config],
      useFactory: (a4Config) => A4MicroServiceModule.getConfig(a4Config),
    }),

    A4NetworkModule.forRootAsync({
      inject: [A4Config],
      useFactory: (a4Config) => A4NetworkModule.getConfig(a4Config),
    }),

    A4EurekaRegsitryModule.forRootAsync({
      inject: [A4Config],
      useFactory: (a4Config) => A4EurekaRegsitryModule.getConfig(a4Config),
    }),

    A4SafeModule.forRootAsync({
      inject: [A4Config],
      useFactory: (a4Config) => A4SafeModule.getConfig(a4Config),
    }),
  ],
})
export class AppModule {
  private _proxyMode: ProxyMode

  public constructor(protected a4Config: A4Config<AppConfigSchema>) {
    this._proxyMode = a4Config.getOrThrow('A4.app.proxyMode')
  }

  public configure(consumer: MiddlewareConsumer): void {
    consumer.apply(LoggerMiddleware).forRoutes('*')

    switch (this._proxyMode) {
      case ProxyMode.Eureka:
        /**
         * 注册中心，使用 HTTP 协议进行代理。
         */
        consumer.apply(ProxyHttpMiddleware).forRoutes('/api')
        break
      case ProxyMode.RPC:
        /**
         * 使用 RPC 协议进行通讯。
         */
        consumer.apply(ProxyRpcMiddleware).forRoutes('/rpc')
        break
      case ProxyMode.UNION:
        /**
         * 注册中心，使用 HTTP 协议进行代理。
         */
        consumer.apply(ProxyHttpMiddleware).forRoutes('/api')
        /**
         * 使用 RPC 协议进行通讯。
         */
        consumer.apply(ProxyRpcMiddleware).forRoutes('/rpc')
        break
      default:
        break
    }
  }
}
