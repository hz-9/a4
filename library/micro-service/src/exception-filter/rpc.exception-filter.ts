/**
 * @Author       : Chen Zhen
 * @Date         : 2024-05-22 11:15:09
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-05-23 20:11:40
 */
import { ArgumentsHost, Catch, Logger } from '@nestjs/common'
import { BaseRpcExceptionFilter, RpcException } from '@nestjs/microservices'
import { Observable, throwError } from 'rxjs'

/**
 * @public
 *
 *  对 RPCException 拦截类
 *
 */
@Catch(RpcException)
export class RPCExceptionFilter extends BaseRpcExceptionFilter<RpcException, unknown> {
  private _logger: Logger = new Logger('RpcExcepFilter')

  public catch(exception: RpcException, host: ArgumentsHost): Observable<unknown> {
    const status = 'error'

    this._logger.error(exception)

    if (exception instanceof RpcException) {
      return throwError(() => exception)
    }

    return this.handleUnknownError(exception, status)
  }
}
