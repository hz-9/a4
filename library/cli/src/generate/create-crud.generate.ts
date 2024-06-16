/**
 * @Author       : Chen Zhen
 * @Date         : 2024-05-24 15:53:05
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-05-26 11:25:40
 */
import path from 'upath'

import type { IGenerateBase, IGenerateCRUDOptions } from '../interface'
import { mergeOptions } from '../util'
import { BaseGenerate } from './_base.generate'

type GenerateCRUDUnionOptions = IGenerateCRUDOptions & IGenerateBase

/**
 *
 * @public
 *
 *  生成 CRUD
 *
 */
export class CreateCRUDGenerate extends BaseGenerate {
  public async start(): Promise<void> {
    const options: GenerateCRUDUnionOptions = mergeOptions(this.options) as GenerateCRUDUnionOptions

    await this.render(
      {
        templateDir: path.resolve(__dirname, '../../.template/create-controller'),
        outputDir: options.root,
      },
      options as object
    )

    await this.render(
      {
        templateDir: path.resolve(__dirname, '../../.template/create-service'),
        outputDir: options.root,
      },
      options as object
    )

    await this.render(
      {
        templateDir: path.resolve(__dirname, '../../.template/create-entity'),
        outputDir: options.root,
      },
      options as object
    )

    await this.render(
      {
        templateDir: path.resolve(__dirname, '../../.template/create-dto'),
        outputDir: options.root,
      },
      options as object
    )
  }
}
