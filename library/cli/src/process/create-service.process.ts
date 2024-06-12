/**
 * @Author       : Chen Zhen
 * @Date         : 2024-05-24 15:53:05
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-05-26 14:29:25
 */
import type { Answers, QuestionCollection } from 'inquirer'

import { CreateServiceGenerate } from '../generate/create-service.generate'
import { IGenerateServiceOptions } from '../interface'
import { strToNames } from '../util'
import { BaseProcess } from './_base'

/**
 *
 * @public
 *
 *  创建 Service
 *
 */
export class CreateServiceProcess extends BaseProcess {
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
    const newOptions: IGenerateServiceOptions = {
      moduleName: strToNames(options.moduleName),
      entityName: strToNames(options.entityName),
    }

    return new CreateServiceGenerate([...this.options, newOptions])
  }
}
