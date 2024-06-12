/**
 * @Author       : Chen Zhen
 * @Date         : 2024-05-24 15:53:05
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-05-26 11:39:31
 */
import * as path from '@hz-9/a4-core/upath'

import type { IGenerateBase, IGenerateModuleOptions } from '../interface'
import { mergeOptions } from '../util'
import { BaseGenerate } from './_base.generate'

type GenerateModuleUnionOptions = IGenerateModuleOptions & IGenerateBase

/**
 *
 * @public
 *
 *  生成 Module
 *
 */
export class CreateModuleGenerate extends BaseGenerate {
  public async start(): Promise<void> {
    const options: GenerateModuleUnionOptions = mergeOptions(this.options) as GenerateModuleUnionOptions

    await this.render(
      {
        templateDir: path.resolve(__dirname, '../../.template/create-module'),
        outputDir: options.root,
      },
      options as object
    )
  }
}
