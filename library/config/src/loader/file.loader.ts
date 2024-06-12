/**
 * @Author       : Chen Zhen
 * @Date         : 2024-05-10 00:00:00
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-05-31 23:52:49
 */
import { isObject } from '@nestjs/common/utils/shared.utils'

import * as fs from '@hz-9/a4-core/fs-extra'
import * as path from '@hz-9/a4-core/upath'
import { parse as parseYml } from '@hz-9/a4-core/yaml'

import { A4_CONFIG_FILE } from '../const/index'
import { ConfigModuleError } from '../errors'
import { BaseConfigLoader, IBaseConfigOptions } from './base.loader'

/**
 *
 * @public
 *
 * `FileConfigLoad` 配置参数（补全参数前）。
 *
 */
export interface IFileConfigPreOptions extends IBaseConfigOptions {
  type: 'file'

  /**
   *
   * 配置文件加载路径。可以传入多个路径依次尝试。
   * 可选。默认为 [process.cwd()]
   *
   */
  rootDir?: string | string[]

  /**
   *
   * 配置文件文件名。可选。默认为 [A4_CONFIG_FILE]
   *
   */
  configFile?: string
}

/**
 *
 * @public
 *
 * `FileConfigLoad` 配置参数（补全参数后）。
 *
 */
export interface IFileConfigOptions extends Required<IFileConfigPreOptions> {
  rootDir: string[]
}

/**
 *
 * @public
 *
 *  从文件中加载配置类
 *
 */
export class FileConfigLoader extends BaseConfigLoader<IFileConfigPreOptions, IFileConfigOptions> {
  protected withDefaultOptions(options: IFileConfigPreOptions): IFileConfigOptions {
    const withCwd = (p: string): string => (path.isAbsolute(p) ? path.normalize(p) : path.resolve(process.cwd(), p))

    let rootDir: string[] = []
    if (typeof options.rootDir === 'string') {
      rootDir = [withCwd(options.rootDir)]
    } else if (Array.isArray(options.rootDir) && options.rootDir.length) {
      rootDir = options.rootDir.map((i) => withCwd(i))
    } else {
      rootDir = [process.cwd()]
    }

    return {
      type: options.type,
      rootDir,
      configFile: options.configFile ?? A4_CONFIG_FILE,
    }
  }

  public async asyncLoad(): Promise<object> {
    const { rootDir, configFile } = this.options
    const configPath = rootDir.map((i) => path.resolve(i, configFile)).find((i) => fs.existsSync(i))

    if (!configPath) throw new ConfigModuleError('Not found config file.')

    const fileInfo = await fs.readFile(configPath, { encoding: 'utf8' })
    const configInfo = parseYml(fileInfo)

    /**
     * FIXME 在读取配置时，直接将当前环境添加至配置信息中。
     */
    if (isObject(configInfo.a4)) configInfo.A4.NODE_ENV = process.env.NODE_ENV
    return configInfo
  }

  public getSuccessLoggerMsg(): string {
    return `Loaded configFile from '${this.options.configFile}'.`
  }
}
