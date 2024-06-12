/**
 * 拷贝自 \@types\/eureka-js-client\@4.5.9
 */
declare module '@rocketsoftware/eureka-js-client' {
  /**
   * 事件类型。（在 `\@hz9-a4\/register-eureka` 中补充。）
   */
  export type EurekaEvent = 'started' | 'heartbeat' | 'registered' | 'deregistered' | 'registryUpdated'

  export class Eureka {
    constructor(config: EurekaClient.EurekaConfig | EurekaClient.EurekaYmlConfig | EurekaClient.EurekaMiddlewareConfig)
    start(cb?: (err: Error, ...rest: any[]) => void): void
    stop(cb?: (err: Error, ...rest: any[]) => void): void
    getInstancesByAppId(appId: string): EurekaClient.EurekaInstanceConfig[]
    getInstancesByVipAddress(vidAddress: string): EurekaClient.EurekaInstanceConfig[]

    /**
     *
     * 绑定事件。（在 `\@hz9-a4\/register-eureka` 中补充。）
     *
     * @param event - 事件类型
     * @param listener - 事件
     */
    on(event: EurekaEvent, listener: () => void): void
  }

  export namespace EurekaClient {
    type InstanceStatus = 'UP' | 'DOWN' | 'STARTING' | 'OUT_OF_SERVICE' | 'UNKNOWN'
    type ActionType = 'ADDED' | 'MODIFIED' | 'DELETED'
    type DataCenterName = 'Netflix' | 'Amazon' | 'MyOwn'

    interface EurekaConfig {
      requestMiddleware?: ((requestOpts: any, done: (opts: any) => void) => void) | undefined
      instance: EurekaInstanceConfig
      eureka: EurekaClientConfig
      shouldUseDelta?: boolean | undefined
      logger?:
        | {
            warn: (...args: any[]) => void
            info: (...args: any[]) => void
            debug: (...args: any[]) => void
            error: (...args: any[]) => void
          }
        | undefined
    }
    interface EurekaInstanceConfig {
      app: string
      hostName: string
      ipAddr: string
      vipAddress: string
      dataCenterInfo: DataCenterInfo
      port?: number | PortWrapper | LegacyPortWrapper | undefined
      instanceId?: string | undefined
      appGroupName?: string | undefined
      sid?: string | undefined
      securePort?: number | PortWrapper | LegacyPortWrapper | undefined
      homePageUrl?: string | undefined
      statusPageUrl?: string | undefined
      healthCheckUrl?: string | undefined
      secureHealthCheckUrl?: string | undefined
      secureVipAddress?: string | undefined
      countryId?: number | undefined
      status?: InstanceStatus | undefined
      overriddenstatus?: InstanceStatus | undefined
      leaseInfo?: LeaseInfo | undefined
      isCoordinatingDiscoveryServer?: boolean | undefined
      lastUpdatedTimestamp?: number | undefined
      lastDirtyTimestamp?: number | undefined
      actionType?: ActionType | undefined
      metadata?:
        | {
            [index: string]: string
          }
        | undefined
    }
    interface EurekaClientConfig {
      host?: string | undefined
      port?: number | undefined
      heartbeatInterval?: number | undefined
      registryFetchInterval?: number | undefined
      maxRetries?: number | undefined
      requestRetryDelay?: number | undefined
      fetchRegistry?: boolean | undefined
      filterUpInstances?: boolean | undefined
      servicePath?: string | undefined
      ssl?: boolean | undefined
      useDns?: boolean | undefined
      preferSameZone?: boolean | undefined
      clusterRefreshInterval?: number | undefined
      fetchMetadata?: boolean | undefined
      registerWithEureka?: boolean | undefined
      useLocalMetadata?: boolean | undefined
      preferIpAddress?: boolean | undefined
      serviceUrls?:
        | {
            [index: string]: string[]
          }
        | undefined
    }
    interface EurekaYmlConfig {
      cwd: string
      filename?: string | undefined
    }
    interface EurekaMiddlewareConfig {
      requestMiddleware: (requestOpts: any, done: (opts: any) => void) => void
    }
    interface LegacyPortWrapper {
      $: number
      '@enabled': boolean
    }
    interface PortWrapper {
      enabled: boolean
      port: number
    }
    interface LeaseInfo {
      renewalIntervalInSecs?: number | undefined
      durationInSecs?: number | undefined
      registrationTimestamp?: number | undefined
      lastRenewalTimestamp?: number | undefined
      evictionTimestamp?: number | undefined
      serviceUpTimestamp?: number | undefined
    }
    interface DataCenterInfo {
      name: DataCenterName
      '@class'?: string | undefined
    }
  }
}
