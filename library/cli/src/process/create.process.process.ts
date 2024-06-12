/**
 * @Author       : Chen Zhen
 * @Date         : 2024-05-24 15:53:05
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-05-27 13:58:53
 */
import type { Answers, QuestionCollection } from 'inquirer'

import { BaseProcess } from './_base'
import { CreateControllerProcess } from './create-controller.process'
import { CreateCRUDProcess } from './create-crud.process'
import { CreateDtoProcess } from './create-dto.process'
import { CreateEntityProcess } from './create-entity.process'
import { CreateModuleWithCRUDProcess } from './create-module-with-crud.process'
import { CreateModuleProcess } from './create-module.process'
import { CreateProjectProcess } from './create-project.process'
import { CreateServiceProcess } from './create-service.process'

interface ITask {
  name: string
  Process: typeof BaseProcess
}

const tasks: ITask[] = [
  { name: 'Init project?', Process: CreateProjectProcess },
  { name: 'Init module with crud?', Process: CreateModuleWithCRUDProcess },
  { name: 'Init module?', Process: CreateModuleProcess },
  { name: 'Init crud?', Process: CreateCRUDProcess },
  { name: 'Init constroller?', Process: CreateControllerProcess },
  { name: 'Init service?', Process: CreateServiceProcess },
  { name: 'Init entity?', Process: CreateEntityProcess },
  { name: 'Init dto?', Process: CreateDtoProcess },
]

/**
 *
 * @public
 *
 *  开始创建选择。
 *
 */
export class CreateProcess extends BaseProcess {
  public get prompts(): QuestionCollection {
    return [
      {
        type: 'list',
        name: 'task',
        message: 'What do you want to do?',
        // choices: [
        //   { name: 'Init project?', value: 1 },
        // ],
        choices: tasks.map(({ name }, index) => ({
          name,
          value: index,
        })),
      },
    ]
  }

  public toNext(options: Answers): BaseProcess | undefined {
    const P = tasks[options.task]?.Process
    // @ts-ignore
    return P ? new P([...this.options, options]) : undefined
  }
}
