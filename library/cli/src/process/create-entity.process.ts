/**
 * @Author       : Chen Zhen
 * @Date         : 2024-05-24 15:53:05
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-05-26 01:20:16
 */
import type { Answers, QuestionCollection } from 'inquirer'

import { IdType } from '../enum'
import { CreateEntityGenerate } from '../generate/create-entity.generate'
import { IGenerateEntityOptions } from '../interface'
import { strToNames } from '../util'
import { BaseProcess } from './_base'

/**
 *
 * @public
 *
 *  创建 Entity
 *
 */
export class CreateEntityProcess extends BaseProcess {
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
        type: 'list',
        name: 'idType',
        message: 'Please choose id type?',
        choices: [
          { name: 'Id', value: IdType.ID },
          { name: 'UUID', value: IdType.UID },
        ],
      },
    ]
  }

  public toNext(options: Answers): BaseProcess | undefined {
    const newOptions: IGenerateEntityOptions = {
      moduleName: strToNames(options.moduleName),
      entityName: strToNames(options.entityName),
      idType: options.idType,
    }

    return new CreateEntityGenerate([...this.options, newOptions])
  }
}
