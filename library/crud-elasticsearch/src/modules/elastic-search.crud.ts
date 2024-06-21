/**
 * @Author       : Chen Zhen
 * @Date         : 2024-06-04 17:58:40
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-06-21 10:44:06
 */
import { GetGetResult, SearchRequest } from '@elastic/elasticsearch/lib/api/types'
import { Observable, from } from 'rxjs'

import {
  DeepPartial,
  IA4SimpleDao,
  IDeleteResult,
  IObjectLiteral,
  ISelectByPageOptions,
  ISelectByPageReturn,
  ISelectNoPageOptions,
  ISelectNoPageReturn,
  IUpdateResult,
} from '@hz-9/a4-core'

import { ElasticsearchClient } from '../plugin/elasticsearch_'

/**
 * @public
 *
 *  对 ElasticSearch 进行 CRUD 操作的工具类。
 *
 *  API: https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/getting-started-js.html#_indexing_documents
 *
 */
export class A4ElasticSearchCrud<E extends IObjectLiteral> extends IA4SimpleDao {
  public readonly instance: ElasticsearchClient

  public readonly indexName: string

  public constructor(instance: ElasticsearchClient, indexName: string) {
    super()

    this.instance = instance
    this.indexName = indexName
  }

  public async insertToPromise(model: DeepPartial<E>): Promise<E> {
    const result = await this.instance.index({
      index: this.indexName,
      document: model,
    })

    return {
      ...model,
      id: result._id,
    } as E
  }

  public async insertMultiToPromise(modelList: DeepPartial<E>[]): Promise<E[]> {
    if (!modelList.length) return []

    const operations = modelList.flatMap((model) => [{ index: { _index: this.indexName } }, model])

    const result = await this.instance.bulk({ refresh: true, operations })

    const list: E[] = modelList.map(
      (model: DeepPartial<E>, index: number) =>
        ({
          ...model,
          id: result.items[index].index?._id,
        }) as E
    )

    return list
  }

  public async selectByPageToPromise(
    model: DeepPartial<E>,
    options: ISelectByPageOptions<E> = {}
  ): Promise<ISelectByPageReturn<E>> {
    const page = options.page ?? { pageNum: 1, pageSize: 20 }

    const params: SearchRequest = {
      index: this.indexName,

      from: (page.pageNum - 1) * page.pageSize,
      size: page.pageSize,
    }

    const modelNames = Object.getOwnPropertyNames(model)
    if (modelNames.length) {
      params.query = {
        bool: {
          must: modelNames.map((k) => ({
            match: {
              [k]: (model as E)[k],
            },
          })),
        },
      }
    }
    if (options.sort) {
      params.sort = Object.getOwnPropertyNames(options.sort).map((k) => ({
        [k]: {
          order: (options.sort as E)[k],
        },
      }))
    }

    const result = await this.instance.search(params)
    const r = {
      data: [] as E[],

      page: {
        ...page,

        total: 0,
      },
    }

    result.hits.hits.forEach((i) => {
      if (i._source) {
        r.data.push({
          id: i._id,
          ...i._source,
        } as unknown as E)
      }
    })

    if (typeof result.hits.total === 'number') {
      r.page.total = result.hits.total
    } else if (result.hits.total === undefined) {
      // ...
    } else {
      r.page.total = result.hits.total.value
    }

    return r
  }

  public async selectNoPageToPromise(
    model: DeepPartial<E>,
    options: ISelectNoPageOptions<E> = {}
  ): Promise<ISelectNoPageReturn<E>> {
    const { sort } = options

    const params: SearchRequest = {
      index: this.indexName,
    }

    const modelNames = Object.getOwnPropertyNames(model)
    if (modelNames.length) {
      params.query = {
        bool: {
          must: modelNames.map((k) => ({
            match: {
              [k]: (model as E)[k],
            },
          })),
        },
      }
    }

    if (options.sort) {
      params.sort = Object.getOwnPropertyNames(options.sort).map((k) => ({
        [k]: {
          order: (options.sort as E)[k],
        },
      }))
    }

    const result = await this.instance.search(params)
    const r = {
      data: [] as E[],
    }

    result.hits.hits.forEach((i) => {
      if (i._source) {
        r.data.push({
          id: i._id,
          ...i._source,
        } as unknown as E)
      }
    })

    return r
  }

  public async selectByIdToPromise(id: string): Promise<E | null> {
    try {
      const result = await this.instance.get({
        id,
        index: this.indexName,
      })

      return {
        ...(result._source ?? {}),
        id: result._id,
      } as unknown as E
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      // 如果是 未找到对应信息，直接返回为 null
      if (error.name === 'ResponseError' && error.statusCode === 404) return null
      throw error
    }
  }

  public async selectByIdsToPromise(ids: string[]): Promise<E[]> {
    const result = await this.instance.mget({
      index: this.indexName,
      ids,
    })

    const list: E[] = []
    result.docs.forEach((i) => {
      const s = (i as GetGetResult)._source
      if (s) {
        list.push({
          ...s,
          id: i._id,
        } as unknown as E)
      }
    })
    return list
  }

  public async updateByIdToPromise(id: string, model: DeepPartial<Omit<E, 'id'>>): Promise<IUpdateResult> {
    try {
      await this.instance.update({
        index: this.indexName,
        id,
        doc: model,
      })

      return {
        affected: 1,
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      // 如果是 未找到对应信息，直接返回为 null
      if (error.name === 'ResponseError' && error.statusCode === 404) {
        return {
          affected: 0,
        }
      }
      throw error
    }
  }

  public async updateByIdsToPromise(ids: string[], model: DeepPartial<Omit<E, 'id'>>): Promise<IUpdateResult> {
    if (!ids.length) return { affected: 0 }

    const operations = ids.flatMap((id) => [{ update: { _index: this.indexName, _id: id } }, { doc: model }])

    const result = await this.instance.bulk({ refresh: true, operations })

    let affected = 0
    result.items.forEach((i) => {
      if (i.update?.result === 'updated') affected += 1
    })

    return { affected }
  }

  public async deleteByIdToPromise(id: string): Promise<IDeleteResult> {
    try {
      await this.instance.delete({
        index: this.indexName,
        id,
      })

      return {
        affected: 1,
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      // 如果是 未找到对应信息，直接返回为 null
      if (error.name === 'ResponseError' && error.statusCode === 404) {
        return {
          affected: 0,
        }
      }
      throw error
    }
  }

  public async deleteByIdsToPromise(ids: string[]): Promise<IDeleteResult> {
    if (!ids.length) return { affected: 0 }

    const operations = ids.map((id) => ({ delete: { _index: this.indexName, _id: id } }))

    const result = await this.instance.bulk({ refresh: true, operations })

    let affected = 0
    result.items.forEach((i) => {
      if (i.delete?.result === 'deleted') affected += 1
    })

    return { affected }
  }
}
