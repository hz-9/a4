/**
 * @Author       : Chen Zhen
 * @Date         : 2024-05-24 15:53:05
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-05-26 00:46:41
 */
import type { Answers, QuestionCollection } from 'inquirer'

import { CreateProjectGenerate } from '../generate/create-project.generate'
import { IGenerateProjectOptions } from '../interface'
import { strToNames } from '../util'
import { BaseProcess } from './_base'

/**
 *
 * @public
 *
 *  创建 Project
 *
 */
export class CreateProjectProcess extends BaseProcess {
  public get prompts(): QuestionCollection {
    return [
      {
        type: 'input',
        name: 'projectName',
        message: 'Please input A4 project name:',
        default: 'A4Project',
      },
    ]
  }

  public toNext(options: Answers): BaseProcess | undefined {
    const newOptions: IGenerateProjectOptions = {
      projectName: strToNames(options.projectName),
    }

    return new CreateProjectGenerate([...this.options, newOptions])
  }
}
