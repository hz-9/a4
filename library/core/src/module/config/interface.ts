/**
 * @Author       : Chen Zhen
 * @Date         : 2024-05-21 13:51:49
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-06-19 17:30:00
 */

/* eslint-disable max-classes-per-file */
import type { PackageJson } from 'type-fest'

/**
 *
 * @public
 *
 *  A4 服务 - 状态信息
 *
 */
export interface IA4StatusInfo {
  /**
   * 服务名称。
   *
   * `package.json` 中读取 `name` 属性。
   */
  name: string

  /**
   *
   * 更安全的名称。
   *
   * `package.json` 中读取 `name` 属性，去除 scope 不分，转码成 `FOO BAR` 格式进行显示。
   *
   */
  normalName: string

  /**
   *
   * 服务版本号。
   *
   * `package.json` 中读取 `version` 属性。
   *
   */
  version: string

  /**
   *
   * 服务版本号。
   *
   * `package.json` 中读取 `description` 属性。
   *
   */
  description?: string

  /**
   * 上线时间（毫秒数）
   */
  upTime: number

  /**
   * 上线时间（时间区间名称）
   */
  upTimeStr: string

  /**
   * 初始化时间（毫秒数）
   */
  initTime: number

  /**
   * 初始化时间（时间区间名称）
   */
  initTimeStr: string

  /**
   * 当前时间（毫秒数）
   */
  currentTime: number

  /**
   * 当前时间（毫秒数）
   */
  currentTimeStr: string
}

/**
 *
 * @public
 *
 *  A4 服务 - 状态信息
 *
 */
export interface IA4EnvInfo {
  pid: number

  platform: NodeJS.Platform

  arch: NodeJS.Architecture

  nodeVersion: NodeJS.ProcessVersions

  env: NodeJS.ProcessEnv
}

/**
 *
 * @public
 *
 *  A4 服务 - 路径信息信息
 *
 */
export interface IA4PathInfo {
  mainFilepath: string

  mainRoot: string

  mainNormalRoot: string

  cwd: string
}

/**
 *
 * @public
 *
 *  A4 服务 - 依赖信息。
 *
 */
export interface IA4LibrariesInfo {
  packageJson: PackageJson

  // a4Packages:
}

/**
 *
 * @public
 *
 *  A4 服务 - 相关信息
 *
 */
export type IA4Info = IA4StatusInfo & IA4EnvInfo & IA4PathInfo & IA4LibrariesInfo

// export type IA4Info = Debug<
//   {
//     [K in keyof IA4StatusInfo]: IA4StatusInfo[K]
//   } & {
//     [K in keyof IA4EnvInfo]: IA4EnvInfo[K]
//   } & {
//     [K in keyof IA4LibrariesInfo]: IA4LibrariesInfo[K]
//   }
// >

/**
 *
 * @public
 *
 *  `A4 Config Module` 抽象类。
 *
 */
export abstract class IA4ConfigModule {
  // ...
}

/**
 *
 * @public
 *
 *  `A4Config` 抽象类。
 *
 */
export abstract class IA4Config {
  public mainFilepath: string

  public mainRoot: string

  public mainNormalRoot: string

  public cwd: string

  public allConfig: () => object

  public abstract get<CT = unknown>(propertyPath: string, defaultValueOrOptions?: CT): CT | undefined

  public abstract getOrThrow<CT = unknown>(propertyPath: string, defaultValueOrOptions?: CT): CT

  public abstract getA4StatsInfo(): IA4StatusInfo

  public abstract getA4EnvInfo(): IA4EnvInfo

  public abstract getA4LibrariesInfo(): IA4LibrariesInfo

  public abstract getA4PathInfo(): IA4PathInfo

  public abstract getA4Info(): IA4Info
}
