/**
 * @Author       : Chen Zhen
 * @Date         : 2024-05-24 15:53:05
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-05-29 15:11:54
 */
import type { Answers, QuestionCollection } from 'inquirer'

import { IdType, RPCType, SelectType } from '../enum'
import { CreateCRUDGenerate } from '../generate/create-crud.generate'
import { IGenerateCRUDOptions } from '../interface'
import { strToNames } from '../util'
import { BaseProcess } from './_base'

/**
 *
 * @public
 *
 *  创建 CRUD
 *
 */
export class CreateCRUDProcess extends BaseProcess {
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
      {
        type: 'list',
        name: 'idType',
        message: 'Please choose id type?',
        choices: [
          { name: 'Id', value: IdType.ID },
          { name: 'UUID', value: IdType.UID },
        ],
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
    const getSelectValue = (): SelectType | false => {
      if (options.actions.includes('selectByPage')) return SelectType.SelectByPage
      if (options.actions.includes('selectNoPage')) return SelectType.SelectNoPage
      return false
    }

    const newOptions: IGenerateCRUDOptions = {
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
      idType: options.idType,
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

    return new CreateCRUDGenerate([...this.options, newOptions])
  }
}
