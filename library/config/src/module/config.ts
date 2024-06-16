/**
 * @Author       : Chen Zhen
 * @Date         : 2024-05-10 00:00:00
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-06-16 16:29:13
 */
import { isUndefined } from '@nestjs/common/utils/shared.utils'

import * as fs from '@hz-9/a4-core/fs-extra'
import * as path from '@hz-9/a4-core/upath'
import { IA4Config, IA4EnvInfo, IA4Info, IA4LibrariesInfo, IA4PathInfo, IA4StatsInfo, RunEnv } from '@hz-9/a4-core'
import dayjs from '@hz-9/a4-core/dayjs'
import dayjsPluginRelativeTime from '@hz-9/a4-core/dayjs-plugin-relative-time'
import _ from '@hz-9/a4-core/lodash'
import type { PackageJson } from '@hz-9/a4-core/type-fest'

dayjs.extend(dayjsPluginRelativeTime)

/**
 *
 * @public
 *
 *  `A4 Config` 类。
 *
 */
export class A4Config implements IA4Config {
  public readonly config: object

  public constructor(config: object) {
    this.config = config
  }

  /**
   *
   * 项目主文件所在路径：
   *
   *  `${workspaceFolder}/src/index.ts`
   *
   * 编译后为：
   *
   *  `${workspaceFolder}/dist/index.js`
   *
   * `pkg` 打包后：
   *
   *   `${snapshot}/dist/index.js` (`pkg` 内部虚拟路径)
   *
   */
  public get mainFilepath(): string {
    // @ts-ignore
    return path.normalize(require.main.filename)
  }

  /**
   *
   * 项目主文件所在路径：
   *
   *  `${workspaceFolder}`
   *
   * 编译后为：
   *
   *  `${workspaceFolder}`
   *
   * `pkg` 打包后：
   *
   *   `${snapshot}` (`pkg` 内部虚拟路径)
   *
   */
  public get mainRoot(): string {
    return path.resolve(path.dirname(this.mainFilepath), '../')
  }

  /**
   *
   * 项目主文件所在路径：
   *
   *  `${workspaceFolder}/src/index.ts`
   *
   * 编译后为：
   *
   *  `${workspaceFolder}/dist/index.js`
   *
   * `pkg` 打包后：
   *
   *  `${deploy}` 外部路径。
   *
   */
  public get mainNormalRoot(): string {
    if (RunEnv.inPKG) return path.dirname(process.execPath)

    // @ts-ignore
    return this.mainRoot
  }

  /**
   *
   * 主文件所在文件夹。
   *
   *  `${workspaceFolder}` 路径
   *
   * 若经过 `pkg` 打包后，指 `pkg` 可执行文件所在文件夹
   *
   */
  public get cwd(): string {
    return path.normalize(process.cwd())
  }

  public allConfig(): object {
    return this.config
  }

  public get<CT = unknown>(propertyPath: string, defaultValueOrOptions?: CT): CT | undefined {
    const value = _.get(this.config, propertyPath) as CT | undefined

    return value ?? defaultValueOrOptions
  }

  public getOrThrow<CT = unknown>(propertyPath: string): CT {
    const value = _.get(this.config, propertyPath) as CT | undefined

    if (isUndefined(value)) {
      throw new TypeError(`Configuration key "${propertyPath.toString()}" does not exist`)
    }

    return value
  }

  public getA4StatsInfo(librariesInfo: IA4LibrariesInfo = this.getA4LibrariesInfo()): IA4StatsInfo {
    const name: string = librariesInfo.packageJson.name ?? 'a4-service'
    const version: string = librariesInfo.packageJson.version ?? '0.0.0'
    const normalName: string = _.upperCase((name.match(/[^/]+$/g) ?? [name])[0])
    const initTime: number = +(process.env.A4_INIT_TIME as string)

    return {
      name,
      normalName,
      version,
      description: librariesInfo.packageJson.description,
      upTime: Date.now() - initTime,
      upTimeStr: dayjs(initTime).fromNow(),
      initTime,
      initTimeStr: dayjs(initTime).format('YYYY-MM-DD HH:mm:ss.SSS ZZ'),
      currentTime: Date.now(),
      currentTimeStr: dayjs().format('YYYY-MM-DD HH:mm:ss.SSS ZZ'),
    }
  }

  public getA4EnvInfo(): IA4EnvInfo {
    return {
      env: process.env,
      pid: process.pid,
      platform: process.platform,
      arch: process.arch,
      nodeVersion: process.versions,
    }
  }

  public getA4PathInfo(): IA4PathInfo {
    return {
      mainFilepath: this.mainFilepath,
      mainRoot: this.mainRoot,
      mainNormalRoot: this.mainNormalRoot,
      cwd: this.cwd,
    }
  }

  public getA4LibrariesInfo(): IA4LibrariesInfo {
    const packageJsonPath: string | undefined = [
      path.resolve(this.mainNormalRoot, 'package.json'),
      path.resolve(this.mainRoot, 'package.json'),
    ].find((i) => fs.existsSync(i))

    let packageJson: PackageJson = {}
    if (packageJsonPath) packageJson = JSON.parse(fs.readFileSync(packageJsonPath, { encoding: 'utf8' }))

    return {
      packageJson,
    }
  }

  public getA4Info(): IA4Info {
    const c = this.getA4LibrariesInfo()

    return {
      ...this.getA4StatsInfo(c),
      ...this.getA4EnvInfo(),
      ...this.getA4PathInfo(),
      ...c,
    }
  }
}
