/**
 * @Author       : Chen Zhen
 * @Date         : 2024-05-24 17:09:49
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-05-29 15:11:45
 */
import type { DataStructureType, IdType, RPCType, SelectType } from '../enum'
import { IRenderInfoModuleName } from './_base'

/**
 * @public
 *
 *  生成文件，基础配置。
 *
 */
export interface IGenerateBase {
  root: string
  inMonorepo: boolean
  dataStructure: DataStructureType
  fileHeaders: IGenerateFileHeaderOptions
}

/**
 * @public
 *
 *  生成文件头的配置信息。
 *
 */
export interface IGenerateFileHeaderOptions {
  /**
   * 编辑人，从 git config 中进行获取。
   */
  author: string

  /**
   * 创建时间，选择当前时间。
   */
  createTime: string
}

/**
 * @public
 *
 *  生成 Controller 文件的配置。
 *
 */
export interface IGenerateModuleOptions {
  /**
   * 模块名称
   */
  moduleName: IRenderInfoModuleName

  /**
   * 实体名称
   */
  entityName: IRenderInfoModuleName
}

/**
 * @public
 *
 *  生成 Controller 文件的配置。
 *
 */
export interface IGenerateProjectOptions {
  projectName: IRenderInfoModuleName
}

/**
 * @public
 *
 *  生成 Controller 文件的配置。
 *
 */
export type IGenerateCRUDOptions = IGenerateControllerOptions &
  IGenerateServiceOptions &
  IGenerateEntityOptions &
  IGenerateDtoOptions

/**
 * @public
 *
 *  生成 Controller 文件的配置。
 *
 */
export interface IGenerateControllerOptions extends IGenerateServiceOptions {
  rpcs: RPCType[]

  /**
   * CRUD 支持的动作。
   */
  actions: IGenerateCRUDActionOptions
}

/**
 * @public
 *
 *  生成 Service 文件的配置。
 *
 */
export interface IGenerateServiceOptions extends IGenerateModuleOptions {}

/**
 * @public
 *
 *  CRUD 支持的动作。
 *
 */
export interface IGenerateCRUDActionOptions {
  insert: boolean
  insertMulti: boolean
  select: SelectType | false
  selectById: boolean
  selectByIds: boolean
  updateById: boolean
  updateByIds: boolean
  deleteById: boolean
  deleteByIds: boolean
}

/**
 * @public
 *
 *  生成 Dto 文件的配置。
 *
 */
export interface IGenerateEntityOptions extends Omit<IGenerateDtoOptions, 'dtoTypes'> {
  /**
   * Id 类型。自增序列 还是 UUID
   */
  idType: IdType
}

/**
 * @public
 *
 *  生成 Dto 文件的配置。
 *
 */
export interface IGenerateDtoOptions extends IGenerateModuleOptions {
  /**
   * Dto 文件是否进行渲染。
   */
  dtoTypes: IGenerateDtoFilesOptions
}

/**
 * @public
 *
 *  生成 Dto 文件的配置。(多个文件是否生成。)
 *
 */
export interface IGenerateDtoFilesOptions {
  insertReq: boolean
  insertRes: boolean
  selectReq: boolean
  selectRes: boolean
  updateReq: boolean
  updateRes: boolean
  deleteReq: boolean
  deleteRes: boolean
}
