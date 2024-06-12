import { Injectable, LoggerService } from '@nestjs/common'
import { Logger } from 'log4js'

@Injectable()
export class Log4jsLogger implements LoggerService {
  public constructor(private readonly _logger: Logger) {}

  public updateContext(context?: string): void {
    if (context && context.length > 0) {
      this._logger.addContext('name', context)
    } else {
      this._logger.addContext('name', '')
    }
  }

  public verbose(message: unknown, context?: string): void {
    this.updateContext(context)
    this._logger.trace(message)
  }

  public debug(message: unknown, context?: string): void {
    this.updateContext(context)
    this._logger.debug(message)
  }

  public log(message: unknown, context?: string): void {
    this.updateContext(context)
    this._logger.info(message)
  }

  public warn(message: unknown, context?: string): void {
    this.updateContext(context)
    this._logger.warn(message)
  }

  public error(message: unknown, trace?: string, context?: string): void {
    this.updateContext(context)
    this._logger.error(message, trace)
  }

  public static getTimestamp(): string {
    const localeStringOptions = {
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      day: '2-digit',
      month: '2-digit',
    } as const
    return new Date(Date.now()).toLocaleString(undefined, localeStringOptions)
  }

  public getTimestamp(): string {
    return Log4jsLogger.getTimestamp()
  }
}
