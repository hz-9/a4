/**
 * @Author       : Chen Zhen
 * @Date         : 2024-05-27 16:18:00
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-06-15 22:53:10
 */
import { Injectable, Logger } from '@nestjs/common'
import { Observable, map } from 'rxjs'

import {
  A4SimpleServiceRxjs,
  IDeleteResult,
  ISelectByPageOptions,
  ISelectByPageReturn,
  ISelectNoPageOptions,
  ISelectNoPageReturn,
  IUpdateResult,
} from '@hz-9/a4-core'
import { A4TypeORMCrud, InjectA4TypeORMCrud } from '@hz-9/a4-crud-typeorm'
import { DeepPartial } from '@hz-9/a4-crud-typeorm/typeorm'
import { Redlock } from '@hz-9/a4-lock-redlock'

import { UserInsertResDto } from './dto/user.insert-res.dto'
import { UserSelectResDto } from './dto/user.select-res.dto'
import { UserEntity } from './entity/user.entity'

@Injectable()
export class UserService implements A4SimpleServiceRxjs {
  protected readonly Logger: Logger = new Logger('UserService')

  public constructor(
    @InjectA4TypeORMCrud(UserEntity)
    protected readonly crud: A4TypeORMCrud<UserEntity>,

    protected readonly redlock: Redlock
  ) {
    // ...
  }

  public insert(model: DeepPartial<UserEntity>): Observable<UserInsertResDto> {
    const result = this.crud.insertToObservable(model)

    return result.pipe(
      map((i) => {
        // @ts-ignore 返回值中，不应返回 password 属性，UserInsertResDto 已经移除了 password 属性。
        // eslint-disable-next-line no-param-reassign
        delete i.password
        return i
      })
    )
  }

  public insertMulti(modelList: DeepPartial<UserEntity>[]): Observable<UserInsertResDto[]> {
    const result = this.crud.insertMultiToObservable(modelList).pipe(
      map((i) => {
        i.forEach((f) => {
          // @ts-ignore 返回值中，不应返回 password 属性，UserInsertResDto 已经移除了 password 属性。
          // eslint-disable-next-line no-param-reassign
          delete f.password
        })
        return i
      })
    )

    return result
  }

  public selectByPage(
    model: DeepPartial<UserEntity>,
    options: ISelectByPageOptions<UserEntity>
  ): Observable<ISelectByPageReturn<UserSelectResDto>> {
    const result = this.crud.selectByPageToObservable(model, options).pipe(
      map((i) => {
        i.data.forEach((f) => {
          // @ts-ignore 返回值中，不应返回 password 属性，UserInsertResDto 已经移除了 password 属性。
          // eslint-disable-next-line no-param-reassign
          delete f.password
        })
        return i
      })
    )

    return result
  }

  public selectNoPage(
    model: DeepPartial<UserEntity>,
    options: ISelectNoPageOptions<UserEntity>
  ): Observable<ISelectNoPageReturn<UserSelectResDto>> {
    const result = this.crud.selectNoPageToObservable(model, options).pipe(
      map((i) => {
        i.data.forEach((f) => {
          // @ts-ignore 返回值中，不应返回 password 属性，UserInsertResDto 已经移除了 password 属性。
          // eslint-disable-next-line no-param-reassign
          delete f.password
        })
        return i
      })
    )

    return result
  }

  public selectById(id: UserEntity['id']): Observable<UserSelectResDto | null> {
    const result = this.crud.selectByIdToObservable(id).pipe(
      map((i) => {
        if (i) {
          // @ts-ignore 返回值中，不应返回 password 属性，UserInsertResDto 已经移除了 password 属性。
          // eslint-disable-next-line no-param-reassign
          delete f.password
        }

        return i
      })
    )

    return result
  }

  public selectByIds(ids: Array<UserEntity['id']>): Observable<UserSelectResDto[]> {
    const result = this.crud.selectByIdsToObservable(ids).pipe(
      map((i) => {
        i.forEach((f) => {
          // @ts-ignore 返回值中，不应返回 password 属性，UserInsertResDto 已经移除了 password 属性。
          // eslint-disable-next-line no-param-reassign
          delete f.password
        })
        return i
      })
    )

    return result
  }

  public updateById(id: UserEntity['id'], model: DeepPartial<UserEntity>): Observable<IUpdateResult> {
    const result = this.crud.updateByIdToObservable(id, model)

    return result
  }

  public updateByIds(ids: Array<UserEntity['id']>, model: DeepPartial<UserEntity>): Observable<IUpdateResult> {
    const result = this.crud.updateByIdsToObservable(ids, model)

    return result
  }

  public deleteById(id: UserEntity['id']): Observable<IDeleteResult> {
    const result = this.crud.deleteByIdToObservable(id)

    return result
  }

  public deleteByIds(ids: Array<UserEntity['id']>): Observable<IDeleteResult> {
    const result = this.crud.deleteByIdToObservable(ids)

    return result
  }
}
