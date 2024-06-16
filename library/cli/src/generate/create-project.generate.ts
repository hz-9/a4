/**
 * @Author       : Chen Zhen
 * @Date         : 2024-05-24 15:53:05
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-05-26 00:38:34
 */
import path from 'upath'

import type { IGenerateBase, IGenerateProjectOptions } from '../interface'
import { mergeOptions } from '../util'
import { BaseGenerate } from './_base.generate'

type GenerateProjectUnionOptions = IGenerateProjectOptions & IGenerateBase

/**
 *
 * @public
 *
 *  生成 Project
 *
 */
export class CreateProjectGenerate extends BaseGenerate {
  public async start(): Promise<void> {
    const options: GenerateProjectUnionOptions = mergeOptions(this.options) as GenerateProjectUnionOptions

    await this.render(
      {
        templateDir: path.resolve(__dirname, '../../.template/create-project'),
        outputDir: options.root,
      },
      options as object
    )
  }
}
