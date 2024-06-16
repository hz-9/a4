/**
 * @Author       : Chen Zhen
 * @Date         : 2024-05-24 15:53:05
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-05-27 13:58:07
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
 *  生成 Module & CRUD
 *
 */
export class CreateModuleWithCRUDGenerate extends BaseGenerate {
  public async start(): Promise<void> {
    const options: GenerateCRUDUnionOptions = mergeOptions(this.options) as GenerateCRUDUnionOptions

    await this.render(
      {
        templateDir: path.resolve(__dirname, '../../.template/create-module'),
        outputDir: options.root,
      },
      options as object
    )

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
