/**
 * @Author       : Chen Zhen
 * @Date         : 2024-05-24 15:53:05
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-05-29 15:11:33
 */
import type { Answers, QuestionCollection } from 'inquirer'

import { RPCType, SelectType } from '../enum'
import { CreateControllerGenerate } from '../generate/create-controller.generate'
import { IGenerateControllerOptions } from '../interface'
import { strToNames } from '../util'
import { BaseProcess } from './_base'

/**
 *
 * @public
 *
 *  创建 Controller
 *
 */
export class CreateControllerProcess extends BaseProcess {
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
        name: 'rpcs',
        message: 'Please choose RPC type:',
        choices: [{ value: RPCType.Redis, checked: false }],
      },
      {
        type: 'checkbox',
        name: 'actions',
        message: 'Please choose router:',
        choices: [
          { value: 'insert', checked: true },
          { value: 'insertMulti', checked: true },
          { value: 'selectByPage', checked: true },
          { value: 'selectNoPage', checked: false },
          { value: 'selectById', checked: true },
          { value: 'selectByIds', checked: true },
          { value: 'updateById', checked: true },
          { value: 'updateByIds', checked: true },
          { value: 'deleteById', checked: true },
          { value: 'deleteByIds', checked: true },
        ],
      },
    ]
  }

  public toNext(options: Answers): BaseProcess | undefined {
    const getSelectValue = (): SelectType | false => {
      if (options.actions.includes('selectByPage')) return SelectType.SelectByPage
      if (options.actions.includes('selectNoPage')) return SelectType.SelectNoPage
      return false
    }

    const newOptions: IGenerateControllerOptions = {
      moduleName: strToNames(options.moduleName),
      entityName: strToNames(options.entityName),
      rpcs: options.rpcs,
      actions: {
        insert: options.actions.includes('insert'),
        insertMulti: options.actions.includes('insertMulti'),
        select: getSelectValue(),
        selectById: options.actions.includes('selectById'),
        selectByIds: options.actions.includes('selectByIds'),
        updateById: options.actions.includes('updateById'),
        updateByIds: options.actions.includes('updateByIds'),
        deleteById: options.actions.includes('deleteById'),
        deleteByIds: options.actions.includes('deleteByIds'),
      },
    }

    return new CreateControllerGenerate([...this.options, newOptions])
  }
}
