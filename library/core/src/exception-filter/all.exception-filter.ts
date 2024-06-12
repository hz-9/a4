/**
 * @Author       : Chen Zhen
 * @Date         : 2024-05-10 00:00:00
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-05-31 18:28:09
 */
import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common'
import { HttpAdapterHost } from '@nestjs/core'

/**
 *
 * @public
 *
 *  异常过滤返回信息结构。
 *
 */
export interface IExceptionResponseBody {
  /**
   * 异常状态码。
   */
  status: number

  /**
   * 为与 `ResponseBodyNoPage` 保持相同结构，特添加此属性。
   * 应设置为 null 作为属性。
   */
  data: null // eslint-disable-line @rushstack/no-new-null

  /**
   * 异常信息。
   */
  message: string
}

/**
 *
 * @public
 *
 *  异常过滤，相关信息。（root）
 *
 */
export interface IExceptionResponse {
  /**
   * 异常请求对象
   */
  instance: unknown

  /**
   * 异常状态码。
   */
  status: number

  /**
   * 异常结构信息
   */
  body: IExceptionResponseBody
}

/**
 * @public
 *
 *  异常类型与解析函数组成的元组。
 *
 */
export type IExceptionRule = [
  (exception: Error) => boolean,

  /**
   * FIXME
   *
   *  httpAdapterHost 若采用 HttpAdapterHost 作为接口类型约束，会造成不同环境接口类型冲突问题。
   *
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (exception: Error, host: ArgumentsHost, httpAdapterHost: any) => IExceptionResponse,
]

/* eslint-disable no-case-declarations */

/**
 * @public
 *
 *  在 ExceptionsFilter 便于类型转换的异常接口。
 *
 */
export interface IExceptionsFilterError extends Error {
  error?: string[]
}

/**
 *
 * @public
 *
 *  全途径异常拦截。
 *
 * TODO 对更多场景的识别还不够！！需要进行扩展升级。
 *
 */
@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private _logger: Logger = new Logger('AllExcepFilter')

  private _exceptionRules: IExceptionRule[]

  public constructor(private readonly _httpAdapterHost: HttpAdapterHost) {
    this._exceptionRules = AllExceptionsFilter.parseExceptionRules()
  }

  public addExceptionRule(rule: IExceptionRule): void {
    this._exceptionRules.push(rule)
  }

  public addExceptionRules(rules: IExceptionRule[]): void {
    rules.forEach((rule) => {
      this._exceptionRules.push(rule)
    })
  }

  /**
   *
   * `TypeORM` 异常。TODO 需要其他的集成方案
   *
   */
  // protected parseTypeORMError(exception: TypeORMError, host: ArgumentsHost): ExceptionResponse {
  //   const ctx = host.switchToHttp()
  //   const { httpAdapter } = this._httpAdapterHost

  //   return {
  //     instance: ctx.getResponse(),
  //     status: HttpStatus.BAD_REQUEST,
  //     body: {
  //       status: HttpStatus.BAD_REQUEST,
  //       data: null,
  //       message: [
  //         `TypeORM Error. ${ctx.getRequest().method} ${httpAdapter.getRequestUrl(ctx.getRequest())}`,

  //         exception.message,
  //         `Timestamp: ${new Date().toISOString()}`,
  //       ],
  //     },
  //   }
  // }

  protected parseUnknownError(exception: Error, host: ArgumentsHost): IExceptionResponse {
    const ctx = host.switchToHttp()
    const { httpAdapter } = this._httpAdapterHost

    return {
      instance: ctx.getResponse(),
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      body: {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        data: null,
        message: [
          `Unknown Error. ${ctx.getRequest().method} ${httpAdapter.getRequestUrl(ctx.getRequest())}`,
          `Name:      ${exception.message ?? exception.name}`,
          `Message:   ${((exception as IExceptionsFilterError).error ?? ['Unknown message.']).join(';')}.`,
          `Timestamp: ${new Date().toISOString()}`,
        ].join(' '),
      },
    }
  }

  public catch(exception: Error, host: ArgumentsHost): void {
    const { httpAdapter } = this._httpAdapterHost

    let response: IExceptionResponse = {
      instance: null,
      status: HttpStatus.BAD_REQUEST,
      body: {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        data: null,
        message: 'Unknown error.',
      },
    }

    const f = this._exceptionRules.find((i) => i[0](exception))

    if (f) {
      response = f[1](exception, host, this._httpAdapterHost)
    } else {
      response = this.parseUnknownError(exception, host)
    }

    /**
     *  Request 出现异常时，可以在控制台显示异常信息。
     */
    this._logger.error(exception)

    httpAdapter.reply(response.instance, response.body, response.status)
  }

  /**
   * 进行异常解析的所有规则。
   */
  public static parseExceptionRules(): IExceptionRule[] {
    return [
      [
        (exception: Error) => exception instanceof BadRequestException,

        /**
         *
         * `BadRequest` 异常。
         *
         */
        (exception: Error, host: ArgumentsHost, httpAdapterHost: HttpAdapterHost): IExceptionResponse => {
          const exceptionReal = exception as BadRequestException
          const ctx = host.switchToHttp()
          const { httpAdapter } = httpAdapterHost

          return {
            instance: ctx.getResponse(),
            status: exceptionReal.getStatus(),
            body: {
              status: exceptionReal.getStatus(),
              data: null,
              message: [
                `Bad Request Error. ${ctx.getRequest().method} ${httpAdapter.getRequestUrl(ctx.getRequest())}`,
                `Name:      ${exception.message ?? exception.name}`,
                `Message:   ${((exception as IExceptionsFilterError).error ?? ['Unknown message.']).join(';')}.`,
                `Timestamp: ${new Date().toISOString()}`,
              ].join(' '),
            },
          }
        },
      ],
      [
        (exception: Error) => exception instanceof HttpException,

        (exception: Error, host: ArgumentsHost, httpAdapterHost: HttpAdapterHost): IExceptionResponse => {
          const exceptionReal = exception as HttpException

          const ctx = host.switchToHttp()
          const { httpAdapter } = httpAdapterHost

          return {
            instance: ctx.getResponse(),
            status: exceptionReal.getStatus(),
            body: {
              status: exceptionReal.getStatus(),
              data: null,
              message: [
                `Http Error. ${ctx.getRequest().method} ${httpAdapter.getRequestUrl(ctx.getRequest())}`,
                `Name:      ${exception.message ?? exception.name}`,
                `Message:   ${((exception as IExceptionsFilterError).error ?? ['Unknown message.']).join(';')}.`,
                `Timestamp: ${new Date().toISOString()}`,
              ].join(' '),
            },
          }
        },
      ],
    ]
  }
}
