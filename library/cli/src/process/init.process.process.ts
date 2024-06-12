/**
 * @Author       : Chen Zhen
 * @Date         : 2024-05-24 15:53:05
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-05-27 15:34:59
 */
import dayjs from 'dayjs'
import type { QuestionCollection } from 'inquirer'
import SimpleGit, { type ConfigValues } from 'simple-git'

import * as upath from '@hz-9/a4-core/upath'

import { DataStructureType } from '../enum'
import { IGenerateBase } from '../interface'
import { BaseProcess } from './_base'
import { CreateProcess } from './create.process.process'

/**
 *
 * @public
 *
 *  A4 Cli 第一个操作进程。
 *
 */
export class InitProcess extends BaseProcess {
  private _auth: string = 'NOT_SET'

  public get prompts(): QuestionCollection {
    return [
      {
        type: 'input',
        name: 'root',
        message: 'Generate root dir is?',
        default: process.cwd(),
      },
      {
        type: 'confirm',
        name: 'inMonorepo',
        message: 'Is in monorepos environment?',
        default: false,
      },
      {
        type: 'list',
        name: 'dataStructure',
        message: 'Data structure?',
        choices: [
          { name: 'Rxjs', value: DataStructureType.Rxjs },
          { name: 'Promise', value: DataStructureType.Promise },
        ],
        default: false,
      },
    ]
  }

  public async toNext(options: IGenerateBase): Promise<BaseProcess> {
    const newOptions: IGenerateBase = {
      ...options,
      root: upath.isAbsolute(options.root) ? options.root : upath.resolve(process.cwd(), options.root),
      fileHeaders: {
        author: 'NOT_SET',
        createTime: dayjs().format('YYYY-MM-DD HH:mm:00'),
      },
    }

    const gitConfig = await this._getGitConfigs(newOptions.root)
    newOptions.fileHeaders.author = (gitConfig['user.name'] ?? 'UNKNOWN').toString()

    return new CreateProcess([...this.options, newOptions])
  }

  private async _getGitConfigs(rootDir: string): Promise<ConfigValues> {
    const git = SimpleGit(rootDir)
    const gitConfigs = await git.listConfig()

    let configs: ConfigValues = {}

    gitConfigs.files.forEach((p) => {
      const config = gitConfigs.values[p]
      configs = { ...configs, ...config }
    })

    return configs
  }
}
