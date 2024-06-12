/**
 * @Author       : Chen Zhen
 * @Date         : 2024-05-24 17:35:07
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-05-27 15:34:08
 */

/**
 *
 * @public
 *
 * 数据实体的 Id 类型
 *
 */
export enum IdType {
  ID = 'id',
  UID = 'uid',
}

/**
 *
 * @public
 *
 * 数据实体的 Id 类型
 *
 */
export enum SelectType {
  SelectByPage = 'SelectByPage',
  SelectNoPage = 'SelectNoPage',
}

/**
 *
 * @public
 *
 *  RPC 链接类型
 *
 */
export enum RPCType {
  Redis = 'Redis',
}

/**
 *
 * @public
 *
 *  数据结构类型。
 *
 */
export enum DataStructureType {
  Rxjs = 'Rxjs',
  Promise = 'Promise',
}
