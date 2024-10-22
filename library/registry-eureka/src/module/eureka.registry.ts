/**
 * @Author       : Chen Zhen
 * @Date         : 2024-05-10 00:00:00
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-10-22 23:32:35
 */
import { IA4Registry, IA4RegistryInstanceMetadata } from '@hz-9/a4-core'
import _ from '@hz-9/a4-core/lodash'
import { Logger } from '@nestjs/common'
import { Eureka, type EurekaClient } from '@rocketsoftware/eureka-js-client'

import { IA4EurekaRegisterConstructorOptions, IA4EurekaRegisterStartOptions } from '../interface'

/**
 * @internal
 */
export interface IEurekaConfigOptions {
  instance: EurekaClient.EurekaInstanceConfig
  eureka: EurekaClient.EurekaClientConfig
}

/**
 *
 * @public
 *
 *  `A4 Register Eureka` 核心服务类。
 *
 */
export class A4EurekaRegistry implements IA4Registry {
  protected logger: Logger = new Logger('A4 Registry')

  protected readonly options: IA4EurekaRegisterConstructorOptions

  protected startOptions: IA4EurekaRegisterStartOptions

  protected client: Eureka

  public constructor(options: IA4EurekaRegisterConstructorOptions) {
    this.options = options
  }

  public async start(options: IA4EurekaRegisterStartOptions): Promise<void> {
    this.startOptions = options
    this.client = this._initEurekaClient()

    return new Promise((resolve, reject) => {
      this.client.start((error: Error) => {
        if (error) {
          reject(error)
        } else {
          resolve()
        }
      })
    })
  }

  public async stop(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.client.stop((error: Error) => {
        if (error) {
          reject(error)
        } else {
          resolve()
        }
      })
    })
  }

  public getInstanceId(): string {
    return this.options.instanceId ?? `${this.startOptions.host}:${this.startOptions.port}`
  }

  public getAppId(): string {
    return `${this.options.instance.service}-${this.options.instance.version}`
  }

  public getVIP(): string {
    return `${this.options.instance.urlAlias}:${this.options.instance.version}`
  }

  public getInstancesByAppId(appId: string): EurekaClient.EurekaInstanceConfig[] {
    return this.client.getInstancesByAppId(appId)
  }

  public getInstanceByAppId(appId: string): EurekaClient.EurekaInstanceConfig | undefined {
    const instances = this.getInstancesByAppId(appId)
    if (!instances.length) return undefined
    return instances[_.random(0, instances.length - 1)]
  }

  public getInstancesMetaByAppId(appId: string): IA4RegistryInstanceMetadata[] {
    const result: IA4RegistryInstanceMetadata[] = []

    this.client.getInstancesByAppId(appId).forEach(({ metadata }) => {
      if (typeof metadata === 'object') {
        if (
          typeof metadata.host === 'string' &&
          typeof metadata.port === 'string' &&
          typeof metadata.service === 'string' &&
          typeof metadata.version === 'string'
        ) {
          result.push(metadata as unknown as IA4RegistryInstanceMetadata)
        }
      }
    })

    return result
  }

  public getInstanceMetaByAppId(appId: string): IA4RegistryInstanceMetadata | undefined {
    const instance = this.getInstanceByAppId(appId)
    if (!instance) return undefined

    return instance.metadata as unknown as IA4RegistryInstanceMetadata
  }

  public getInstancesByVId(vipAddress: string): EurekaClient.EurekaInstanceConfig[] {
    return this.client.getInstancesByVipAddress(vipAddress)
  }

  public getInstanceByVId(vipAddress: string): EurekaClient.EurekaInstanceConfig | undefined {
    const instances = this.getInstancesByVId(vipAddress)
    if (!instances.length) return undefined
    return instances[_.random(0, instances.length - 1)]
  }

  public getInstancesMetaByVId(vipAddress: string): IA4RegistryInstanceMetadata[] {
    const result: IA4RegistryInstanceMetadata[] = []
    this.client.getInstancesByVipAddress(vipAddress).forEach(({ metadata }) => {
      if (typeof metadata === 'object') {
        if (
          typeof metadata.host === 'string' &&
          typeof metadata.port === 'string' &&
          typeof metadata.service === 'string' &&
          typeof metadata.version === 'string'
        ) {
          result.push(metadata as unknown as IA4RegistryInstanceMetadata)
        }
      }
    })

    return result
  }

  public getInstanceMetaByVId(vipAddress: string): IA4RegistryInstanceMetadata | undefined {
    const instance = this.getInstanceByVId(vipAddress)
    if (!instance) return undefined
    return instance.metadata as unknown as IA4RegistryInstanceMetadata
  }

  public getInstanceMeta(): IA4RegistryInstanceMetadata {
    return {
      hostname: this.startOptions.host,
      port: `${this.startOptions.port}`,
      service: this.options.instance.service,
      urlAlias: this.options.instance.urlAlias,
      version: this.options.instance.version,
    }
  }

  private _getEurekaConfigOptions(): IEurekaConfigOptions {
    return {
      instance: {
        instanceId: this.getInstanceId(),
        app: this.getAppId(),
        hostName: this.startOptions.host,
        ipAddr: this.startOptions.host,

        // preferIpAddress: true, // default is false and host will be used.
        // homePageUrl: 'http://localhost:3001/info',
        // statusPageUrl: 'http://localhost:3001/info',
        // healthCheckUrl: 'http://localhost:3001/info',

        port: {
          $: this.startOptions.port,
          '@enabled': true,
        },

        // 明确知道 metadata 的类型正确。！！
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        metadata: this.getInstanceMeta() as any,

        vipAddress: this.getVIP(),

        dataCenterInfo: {
          '@class': 'com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo',
          name: 'MyOwn',
        },
      },

      eureka: this.options.service,
    }
  }

  private _initEurekaClient(): Eureka {
    const client = new Eureka({
      logger: {
        error: (...args: unknown[]) => {
          this.logger.error(args.join(''))
        },
        info: (...args: unknown[]) => {
          this.logger.log(args.join(''))
        },
        warn: (...args: unknown[]) => {
          this.logger.warn(args.join(''))
        },

        // debug: (...args: unknown[]) => { this.logger.warn(args.join('')) },
        debug: () => {},
      },

      ...this._getEurekaConfigOptions(),
    })

    client.on('started', () => {
      this.logger.log(`Service '${this.getAppId()}' registered success.`)
    })

    client.on('heartbeat', () => {
      this.logger.debug(`Ping or Pong`)
    })

    client.on('registered', () => {
      this.logger.log(`registered.`)
    })

    client.on('deregistered', () => {
      this.logger.log(`deregistered.`)
    })

    // 会直接显示 retrieved full registry successfully 的日志。
    // client.on('registryUpdated', () => {
    //   this.logger.debug(`registryUpdated.`)
    // })

    return client
  }
}
