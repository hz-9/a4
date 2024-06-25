/**
 * @Author       : Chen Zhen
 * @Date         : 2024-05-10 00:00:00
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-06-25 10:43:12
 */
import { isObject } from '@nestjs/common/utils/shared.utils'
import fs from 'node:fs'
import path from 'node:path'
import { parse as parseYml } from 'yaml'

import { A4DefaultUtil } from '@hz-9/a4-core'

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
  type: 'file' | undefined

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
  configFile?: string | string[]
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
  configFile: string[]
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
    return {
      type: options.type,
      rootDir: A4DefaultUtil.strOrArrWithDefault(options.rootDir, [process.cwd()]),
      configFile: A4DefaultUtil.strOrArrWithDefault(options.configFile, [A4_CONFIG_FILE]),
    }
  }

  public async asyncLoad(): Promise<object> {
    const { rootDir, configFile } = this.options

    const tryFiles: string[] = []
    rootDir.forEach((i) => {
      configFile.forEach((j) => {
        tryFiles.push(path.resolve(process.cwd(), i, j))
      })
    })

    const f = tryFiles.find((i) => fs.existsSync(i))
    if (!f) throw new ConfigModuleError('Not found config file.')

    try {
      const fileInfo = fs.readFileSync(f, { encoding: 'utf8' })
      const configInfo = parseYml(fileInfo)

      /**
       * FIXME 在读取配置时，直接将当前环境添加至配置信息中。
       */
      if (isObject(configInfo.a4)) configInfo.A4.NODE_ENV = process.env.NODE_ENV
      return configInfo
    } catch (error: unknown) {
      throw new ConfigModuleError(`Parse config file error. ${(error as Error).message}`)
    }
  }

  public getSuccessLoggerMsg(): string {
    return `Loaded configFile from '${this.options.configFile}'.`
  }
}
