/**
 * @Author       : Chen Zhen
 * @Date         : 2024-05-24 15:53:05
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-05-26 01:27:31
 */
import path from 'upath'

import type { IGenerateBase, IGenerateDtoOptions } from '../interface'
import { mergeOptions } from '../util'
import { BaseGenerate } from './_base.generate'

type GenerateDtoUnionOptions = IGenerateDtoOptions & IGenerateBase

/**
 *
 * @public
 *
 *  生成 Dto
 *
 */
export class CreateDtoGenerate extends BaseGenerate {
  public async start(): Promise<void> {
    const options: GenerateDtoUnionOptions = mergeOptions(this.options) as GenerateDtoUnionOptions

    await this.render(
      {
        templateDir: path.resolve(__dirname, '../../.template/create-dto'),
        outputDir: options.root,
      },
      options as object
    )
  }
}
