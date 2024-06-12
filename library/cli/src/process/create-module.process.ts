/**
 * @Author       : Chen Zhen
 * @Date         : 2024-05-24 15:53:05
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-05-27 13:55:29
 */
import type { Answers, QuestionCollection } from 'inquirer'

import { CreateModuleGenerate } from '../generate/create-module.generate'
import { IGenerateModuleOptions } from '../interface'
import { strToNames } from '../util'
import { BaseProcess } from './_base'

/**
 *
 * @public
 *
 *  创建 Module
 *
 */
export class CreateModuleProcess extends BaseProcess {
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
    ]
  }

  public toNext(options: Answers): BaseProcess | undefined {
    const newOptions: IGenerateModuleOptions = {
      moduleName: strToNames(options.moduleName),
      entityName: strToNames(options.entityName),
    }

    return new CreateModuleGenerate([...this.options, newOptions])
  }
}
