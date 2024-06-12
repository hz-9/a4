/**
 * @Author       : Chen Zhen
 * @Date         : 2024-05-24 15:53:05
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-05-26 00:59:52
 */
import type { Answers, QuestionCollection } from 'inquirer'

import { CreateDtoGenerate } from '../generate/create-dto.generate'
import { IGenerateDtoOptions } from '../interface'
import { strToNames } from '../util'
import { BaseProcess } from './_base'

/**
 *
 * @public
 *
 *  创建 Dto
 *
 */
export class CreateDtoProcess extends BaseProcess {
  public get prompts(): QuestionCollection {
    return [
      {
        type: 'input',
        name: 'moduleName',
        message: 'Please input module name:',
      },
      {
        type: 'input',
        name: 'entityName',
        message: 'Please input entity name:',
      },
      {
        type: 'checkbox',
        name: 'dtoTypes',
        message: 'Please choose dto files:',
        choices: [
          { value: 'insertReq', checked: true },
          { value: 'insertRes', checked: true },
          { value: 'selectReq', checked: true },
          { value: 'selectRes', checked: true },
          { value: 'updateReq', checked: true },
          { value: 'updateRes', checked: true },
          { value: 'deleteReq', checked: true },
          { value: 'deleteRes', checked: true },
        ],
      },
    ]
  }

  public toNext(options: Answers): BaseProcess | undefined {
    const newOptions: IGenerateDtoOptions = {
      moduleName: strToNames(options.moduleName),
      entityName: strToNames(options.entityName),
      dtoTypes: {
        insertReq: options.dtoTypes.includes('insertReq'),
        insertRes: options.dtoTypes.includes('insertRes'),
        selectReq: options.dtoTypes.includes('selectReq'),
        selectRes: options.dtoTypes.includes('selectRes'),
        updateReq: options.dtoTypes.includes('updateReq'),
        updateRes: options.dtoTypes.includes('updateRes'),
        deleteReq: options.dtoTypes.includes('deleteReq'),
        deleteRes: options.dtoTypes.includes('deleteRes'),
      },
    }

    return new CreateDtoGenerate([...this.options, newOptions])
  }
}
