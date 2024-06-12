/**
 * @Author       : Chen Zhen
 * @Date         : 2024-05-12 13:08:04
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-06-11 22:18:26
 */

/**
 * @public
 *
 * `string | number` 转换为 `string[] | number[]`
 *
 */
export type UnionToUnionArray<T, P = T> = P extends T ? Array<P> : never

/**
 * @public
 *
 *  ['a', 'b', 'c'] 拾取出 'a'
 *
 */
export type ArrayNoFirst<T extends unknown[]> = T extends [unknown, ...args: infer O] ? O : []

/**
 * @public
 *
 *  进行 TypeScript 的 Record 的转换。(单层)
 *
 */
export type Debug<T> = {
  [K in keyof T]: T[K]
}

/**
 *
 * @public
 *
 * 进行 TypeScript 的 Record 的转换。(递归)
 *
 */
export type DebugDeep<T extends object> = {
  [K in keyof T]: T[K] extends object ? DebugDeep<T[K]> : T[K]
}

/**
 *
 * @public
 *
 *  与 Partial 相同，
 *
 */
export type DeepPartial<T> =
  | T
  | (T extends Array<infer U>
      ? DeepPartial<U>[]
      : T extends Map<infer K, infer V>
        ? Map<DeepPartial<K>, DeepPartial<V>>
        : T extends Set<infer M>
          ? Set<DeepPartial<M>>
          : T extends object
            ? { [K in keyof T]?: DeepPartial<T[K]> }
            : T)
