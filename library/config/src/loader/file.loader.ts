/**
 * @Author       : Chen Zhen
 * @Date         : 2024-05-10 00:00:00
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-06-30 20:44:02
 */
import { isObject } from '@nestjs/common/utils/shared.utils'
import { parse as parseJsonc } from 'jsonc-parser'
import fs from 'node:fs'
import path from 'node:path'
import { parse as parseYaml } from 'yaml'

import { A4DefaultUtil } from '@hz-9/a4-core'

import { A4ConfigModuleError, A4ConfigNotFoundError, A4ConfigParseError } from '../errors'
import { BaseConfigLoader, IBaseConfigOptions } from './base.loader'

/**
 * @public
 *
 * Default file name when reading configuration files for `A4 Config`.
 *
 * `A4 Config` 读取配置文件时的默认文件名。
 *
 */
export const A4_CONFIG_FILES: string[] = ['a4.yml', 'a4.yaml', 'a4.json', 'a4.jsonc']

/**
 *
 * @public
 *
 * `FileConfigLoad` 配置参数（补全参数前）。
 *
 */
export interface IFileConfigLoadOptions extends IBaseConfigOptions {
  type?: 'file'

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
 * @internal
 *
 * `FileConfigLoad` 配置参数（补全参数后）。
 *
 */
export interface IFileConfigOptions extends Required<IFileConfigLoadOptions> {
  rootDir: string[]
  configFile: string[]
}

/**
 *
 * @internal
 *
 *  从文件中加载配置类
 *
 */
export class FileConfigLoader extends BaseConfigLoader<IFileConfigLoadOptions, IFileConfigOptions> {
  private _loadedFileName: string = ''

  protected withDefaultOptions(options: IFileConfigLoadOptions): IFileConfigOptions {
    return {
      type: options.type ?? 'file',
      rootDir: A4DefaultUtil.strOrArrWithDefault(options.rootDir, [process.cwd()]),
      configFile: A4DefaultUtil.strOrArrWithDefault(options.configFile, [...A4_CONFIG_FILES]),
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

    try {
      const f = tryFiles.find((i) => fs.existsSync(i))
      if (!f) throw new A4ConfigNotFoundError('Not found config file.')

      this._loadedFileName = path.basename(f)
      return this._parseFile(f)
    } catch (error: unknown) {
      if (error instanceof A4ConfigModuleError) throw error
      throw new A4ConfigParseError((error as Error).message)
    }
  }

  private _parseFile(filepath: string): object {
    const fileInfo = fs.readFileSync(filepath, { encoding: 'utf8' })

    if (/.json$|.jsonc$/.test(filepath)) {
      try {
        const o = parseJsonc(fileInfo)
        return isObject(o) ? o : {}
      } catch (error) {
        throw new A4ConfigParseError('Jsonc file parse error.')
      }
    }

    if (/.yml$|.yaml$/.test(filepath)) {
      try {
        const o = parseYaml(fileInfo)
        return isObject(o) ? o : {}
      } catch (error) {
        throw new A4ConfigParseError('Yaml file parse error.')
      }
    }

    throw new A4ConfigParseError('Unsupported file type.')
  }

  public getSuccessLoggerMsg(): string {
    return `Loaded config from file '${this._loadedFileName}'.`
  }
}
