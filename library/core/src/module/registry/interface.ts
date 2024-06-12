/**
 * @Author       : Chen Zhen
 * @Date         : 2024-05-21 13:51:49
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-05-31 18:20:10
 */

/* eslint-disable max-classes-per-file */
import type { IA4HostAndPort } from '../network/interface'

/**
 * @public
 *
 * 在注册中心的注册信息（metadata）。
 */
export interface IA4RegistryInstanceMetadata {
  hostname: string
  port: string
  service: string
  urlAlias: string
  version: string
}

/**
 * @public
 *
 * 在注册中心的注册信息（全部信息）。
 */
export type IA4RegistryInstance = object

/**
 *
 * @public
 *
 *  `A4 Register Module` 抽象类。
 *
 */
export abstract class IA4RegistryModule {
  // ...
}

/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 *
 * @public
 *
 *  `A4Registry` 抽象类。
 *
 */
export abstract class IA4Registry {
  /**
   * 在注册中心中，开始注册。
   */
  public start: (options: IA4HostAndPort) => Promise<void>

  /**
   * 在注册中心中，停止注册。
   */
  public stop: () => Promise<void>

  /**
   * @public
   *
   *  获取当前实例metadata信息。
   *
   * @param appId - 应用 ID。由 `${service}-${version}` 组成。
   * @returns 在注册中心的全部信息。
   */
  public getInstanceMeta: () => IA4RegistryInstanceMetadata

  /**
   * @public
   *
   *  获取实例 Id。
   *
   */
  public getInstanceId: () => string

  /**
   * @public
   *
   *  获取 AppId。
   *
   */
  public getAppId: () => string

  /**
   * @public
   *
   *  获取实例 V IP。
   *
   */
  public getVIP: () => string

  /**
   * @public
   *
   *  根据应用 Id 获取所有服务实例。
   *
   * @param appId - 应用 ID。由 `${service}-${version}` 组成。
   * @returns 在注册中心的全部信息。
   */
  public getInstancesByAppId: (appId: string) => IA4RegistryInstance[]

  /**
   * @public
   *
   *  根据应用 Id 随机获取一个服务实例。
   *
   * @param appId - 应用 ID。由 `${service}-${version}` 组成。
   * @returns 在注册中心的全部信息。
   */
  public getInstanceByAppId: (appId: string) => IA4RegistryInstance | undefined

  /**
   * @public
   *
   *  根据应用 Id 获取所有服务实例。
   *
   * @param appId - 应用 ID。由 `${service}-${version}` 组成。
   * @returns 在注册中心的 metadata 信息。
   */
  public getInstancesMetaByAppId: (appId: string) => IA4RegistryInstanceMetadata[]

  /**
   * @public
   *
   *  根据应用 Id 随机获取一个服务实例。
   *
   * @param appId - 应用 ID。由 `${service}-${version}` 组成。
   * @returns 在注册中心的 metadata 信息。
   */
  public getInstanceMetaByAppId: (appId: string) => IA4RegistryInstanceMetadata | undefined

  /**
   * @public
   *
   *  根据虚拟 Id 获取所有服务实例。
   *
   * @param appId - 应用 ID。由 `${urlAlias}-${version}` 组成。
   * @returns 在注册中心的全部信息。
   */
  public getInstancesByVId: (virtualId: string) => IA4RegistryInstance[]

  /**
   * @public
   *
   *  根据虚拟 Id 随机获取一个服务实例。
   *
   * @param appId - 应用 ID。由 `${urlAlias}-${version}` 组成。
   * @returns 在注册中心的全部信息。
   */
  public getInstanceByVId: (virtualId: string) => IA4RegistryInstance | undefined

  /**
   * @public
   *
   *  根据虚拟 Id 获取所有服务实例。
   *
   * @param appId - 应用 ID。由 `${urlAlias}-${version}` 组成。
   * @returns 在注册中心的 metadata 信息。
   */
  public getInstancesMetaByVId: (virtualId: string) => IA4RegistryInstanceMetadata[]

  /**
   * @public
   *
   *  根据虚拟 Id 随机获取一个服务实例。
   *
   * @param appId - 应用 ID。由 `${urlAlias}-${version}` 组成。
   * @returns 在注册中心的 metadata 信息。
   */
  public getInstanceMetaByVId: (virtualId: string) => IA4RegistryInstanceMetadata | undefined
}
