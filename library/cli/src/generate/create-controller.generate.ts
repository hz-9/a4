/**
 * @Author       : Chen Zhen
 * @Date         : 2024-05-24 15:53:05
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-05-26 02:16:35
 */
import * as path from '@hz-9/a4-core/upath'

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
