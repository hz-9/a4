/**
 * @Author       : Chen Zhen
 * @Date         : 2024-05-24 15:53:05
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-06-15 23:03:43
 */
import path from 'upath'

import type { IGenerateBase, IGenerateControllerOptions } from '../interface'
import { mergeOptions } from '../util'
import { BaseGenerate } from './_base.generate'

type GenerateControllerUnionOptions = IGenerateControllerOptions & IGenerateBase

/**
 *
 * @public
 *
 *  生成 Controller
 *
 */
export class CreateControllerGenerate extends BaseGenerate {
  public async start(): Promise<void> {
    const options: GenerateControllerUnionOptions = mergeOptions(this.options) as GenerateControllerUnionOptions

    await this.render(
      {
        templateDir: path.resolve(__dirname, '../../.template/create-controller'),
        outputDir: options.root,
      },
      options as object
    )
  }
}
