/**
 * @Author       : Chen Zhen
 * @Date         : 2024-05-24 15:53:05
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-05-26 01:27:20
 */
import * as path from '@hz-9/a4-core/upath'

import type { IGenerateBase, IGenerateEntityOptions } from '../interface'
import { mergeOptions } from '../util'
import { BaseGenerate } from './_base.generate'

type GenerateEntityUnionOptions = IGenerateEntityOptions & IGenerateBase

/**
 *
 * @public
 *
 *  生成 Entity
 *
 */
export class CreateEntityGenerate extends BaseGenerate {
  public async start(): Promise<void> {
    const options: GenerateEntityUnionOptions = mergeOptions(this.options) as GenerateEntityUnionOptions

    await this.render(
      {
        templateDir: path.resolve(__dirname, '../../.template/create-entity'),
        outputDir: options.root,
      },
      options as object
    )
  }
}
