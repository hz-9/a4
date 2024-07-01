/**
 * @Author       : Chen Zhen
 * @Date         : 2024-07-01 19:12:42
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-07-01 19:32:29
 */
import * as fs from 'fs-extra'
import * as path from 'upath'
import dayjs from 'dayjs'
import dayjsPluginRelativeTime from 'dayjs/plugin/relativeTime'
import _ from 'lodash'
import type { PackageJson } from 'type-fest'

import type { NonUndefined } from '../../interface/util'
import { RunEnv } from '../../util/run-env.util'
import type {
  A4ConfigGetType,
  IA4Config,
  IA4EnvInfo,
  IA4Info,
  IA4LibrariesInfo,
  IA4PathInfo,
  IA4StatusInfo,
} from './interface'

dayjs.extend(dayjsPluginRelativeTime)

/**
 * @public
 *
 *  `A4 Config` 基础版本。
 *
 */
export class A4ConfigBase<T extends object = object> implements IA4Config<T> {
  public get<P extends string | readonly string[]>(propertyPath: P): A4ConfigGetType<T, P, false>
  public get<P extends string | readonly string[]>(
    propertyPath: P,
    defaultValue: NonUndefined<A4ConfigGetType<T, P, false>>
  ): A4ConfigGetType<T, P, true>
  public get<P extends string | readonly string[]>(
    propertyPath: P,
    defaultValue?: NonUndefined<A4ConfigGetType<T, P, false>>
  ): A4ConfigGetType<T, P, false> | A4ConfigGetType<T, P, true> {
    throw new Error('Method not implemented.')
  }

  public getOrThrow<P extends string | readonly string[]>(propertyPath: P): A4ConfigGetType<T, P, false> {
    throw new Error('Method not implemented.')
  }

  /**
   *
   *  Path of the main file of the project:
   *
   *  `${workspaceFolder}/src/index.ts`
   *
   *  After compilation:
   *
   *  `${workspaceFolder}/dist/index.js`
   *
   *  After `pkg` packaging:
   *
   *  `${snapshot}/dist/index.js` (internal virtual path of `pkg`)
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
   *  Path of the directory containing the main file of the project:
   *
   *  `${workspaceFolder}`
   *
   *  After compilation:
   *
   *  `${workspaceFolder}`
   *
   *  After `pkg` packaging:
   *
   *  `${snapshot}` (internal virtual path of `pkg`)
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
   *  Path of the directory containing the main file of the project:
   *
   *  `${workspaceFolder}/src/index.ts`
   *
   *  After compilation:
   *
   *  `${workspaceFolder}/dist/index.js`
   *
   *  After `pkg` packaging:
   *
   *  `${deploy}` (external path)
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
   *  Directory of the main file.
   *
   *  `${workspaceFolder}` path
   *
   *  If packaged by `pkg`, it refers to the directory where the `pkg` executable file is located.
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

  public getA4StatsInfo(librariesInfoBase?: IA4LibrariesInfo): IA4StatusInfo {
    const librariesInfo = librariesInfoBase ?? this.getA4LibrariesInfo()

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
    if (packageJsonPath) {
      packageJson = JSON.parse(fs.readFileSync(packageJsonPath, { encoding: 'utf8' }))
      delete packageJson.jest
      delete packageJson.scripts
    }

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
