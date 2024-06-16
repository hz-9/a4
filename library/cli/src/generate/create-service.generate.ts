/**
 * @Author       : Chen Zhen
 * @Date         : 2024-05-24 15:53:05
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-05-26 01:27:38
 */
import path from 'upath'

import type { IGenerateBase, IGenerateServiceOptions } from '../interface'
import { mergeOptions } from '../util'
import { BaseGenerate } from './_base.generate'

type GenerateServiceUnionOptions = IGenerateServiceOptions & IGenerateBase

/**
 *
 * @public
 *
 *  生成 Service
 *
 */
export class CreateServiceGenerate extends BaseGenerate {
  public async start(): Promise<void> {
    const options: GenerateServiceUnionOptions = mergeOptions(this.options) as GenerateServiceUnionOptions

    await this.render(
      {
        templateDir: path.resolve(__dirname, '../../.template/create-service'),
        outputDir: options.root,
      },
      options as object
    )
  }
}
