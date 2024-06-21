/**
 * @Author       : Chen Zhen
 * @Date         : 2024-05-27 16:18:00
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-06-20 20:36:00
 */
import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common'
import { Observable, concatMap, map, of } from 'rxjs'

import { A4Config } from '@hz-9/a4-config'
import {
  A4SimpleServiceRxjs,
  IDeleteResult,
  ISelectByPageOptions,
  ISelectByPageReturn,
  ISelectNoPageOptions,
  ISelectNoPageReturn,
  IUpdateResult,
} from '@hz-9/a4-core'
import { nanoid } from '@hz-9/a4-core/nanoid'
import { A4TypeORMCrud, InjectA4TypeORMCrud } from '@hz-9/a4-crud-typeorm'
import { DeepPartial } from '@hz-9/a4-crud-typeorm/typeorm'
import { Redlock } from '@hz-9/a4-lock-redlock'

import { JWTToken, RootPWD, SecretUtil } from '../_util'
import type { AppConfigSchema } from '../app.schema'
import { UserInsertResDto } from './dto/user.insert-res.dto'
import { UserSelectResDto } from './dto/user.select-res.dto'
import { UserEntity } from './entity/user.entity'

@Injectable()
export class UserService implements A4SimpleServiceRxjs {
  protected readonly setDefault: boolean

  protected readonly logger: Logger = new Logger('UserService')

  protected readonly tokenExpiresIn: string

  protected readonly defaultPassword: string

  public constructor(
    @InjectA4TypeORMCrud(UserEntity)
    protected readonly crud: A4TypeORMCrud<UserEntity>,

    protected readonly redlock: Redlock,

    protected readonly aAConfig: A4Config
  ) {
    this.tokenExpiresIn = aAConfig.getOrThrow<AppConfigSchema['A4']['app']['tokenExpiresIn']>('A4.app.tokenExpiresIn')

    this.defaultPassword =
      aAConfig.getOrThrow<AppConfigSchema['A4']['app']['defaultPassword']>('A4.app.defaultPassword')
  }

  public async onApplicationBootstrap(): Promise<void> {
    JWTToken.initSecretFiles()
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
          delete i.password
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
    const result = this.crud.deleteByIdsToObservable(ids)

    return result
  }

  public async initDefault(): Promise<void> {
    const count = await this.crud.instance.count()
    if (count === 0) {
      const username: string = 'admin'
      const password: string = nanoid()

      await this.crud.insertToPromise({
        username: 'admin',
        password: SecretUtil.decodeStr(SecretUtil.encodeStr(password)),
        registeTime: Math.floor(Date.now() / 1000),
        pwdLastModifyTime: Math.floor(Date.now() / 1000),
        emailVerify: 1,
        telephoneVerify: 1,
        accountType: -1,
      })

      RootPWD.writeLocal(username, password)
    }
  }

  public loginByDefault(username: string, password: string): Observable<string> {
    /**
     * FIXME 可以根据具体业务后续优化
     */
    const result = this.crud.selectNoPageToObservable({ username, password: SecretUtil.decodeStr(password) }).pipe(
      map((i) => {
        if (i.data.length === 0) throw new Error('用户名或密码错误！')
        return i.data[0] as UserEntity
      }),
      map((i) =>
        JWTToken.encodeToken(
          {
            userId: `${i.id}`,
            username: i.username,
          },
          this.tokenExpiresIn
        )
      )
    )

    return result
  }

  protected getDetailInfo(id: number): Observable<UserInsertResDto> {
    const result = this.selectById(id).pipe(
      map((i) => {
        if (!i) throw new HttpException('Invalid user', HttpStatus.UNAUTHORIZED)

        return i
      })
    )

    return result
  }

  public getDetail(token: string): Observable<UserInsertResDto> {
    const result = of(JWTToken.decodeTokenWithError(token)).pipe(
      concatMap((payload) => this.getDetailInfo(+payload.userId))
    )

    return result
  }

  public resetDefaultPwd(id: number): Observable<boolean> {
    const result = this.updateById(id, {
      password: SecretUtil.decodeStr(SecretUtil.encodeStr(this.defaultPassword)),
    }).pipe(map((i) => typeof i.affected === 'number' && i.affected > 0))

    return result
  }
}
