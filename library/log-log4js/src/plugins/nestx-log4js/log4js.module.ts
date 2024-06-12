import { DynamicModule, Global, Module } from '@nestjs/common'

import { Log4jsLogger } from './log4js.classes'
import {
  // DEFAULT_LOG4JS_OPTIONS,
  Log4jsAsyncOptions, // Log4jsOptions,
  getLog4jsLoggerToken, // getLog4jsOptionsToken,
} from './log4js.options'
import { createAsyncLog4jsOptions, createLog4jsLogger } from './log4js.providers'

@Global()
@Module({})
export class Log4jsModule {
  // public static forRoot(options: Log4jsOptions = DEFAULT_LOG4JS_OPTIONS): DynamicModule {
  //   return {
  //     module: Log4jsModule,
  //     providers: [
  //       {
  //         provide: getLog4jsOptionsToken(options.name),
  //         useValue: options,
  //       },
  //       // @ts-ignore
  //       createLog4jsLogger(options.name),
  //       {
  //         provide: Log4jsLogger,
  //         useExisting: getLog4jsLoggerToken(options.name),
  //       },
  //     ],
  //     exports: [
  //       getLog4jsLoggerToken(options.name),
  //       {
  //         provide: Log4jsLogger,
  //         useExisting: getLog4jsLoggerToken(options.name),
  //       },
  //     ],
  //   }
  // }

  public static forRootAsync(options: Log4jsAsyncOptions): DynamicModule {
    return {
      module: Log4jsModule,
      imports: options.imports,
      providers: [
        createAsyncLog4jsOptions(options),
        // @ts-ignore
        createLog4jsLogger(options.name),
        {
          provide: Log4jsLogger,
          useExisting: getLog4jsLoggerToken(options.name),
        },
      ],
      exports: [
        getLog4jsLoggerToken(options.name),
        {
          provide: Log4jsLogger,
          useExisting: getLog4jsLoggerToken(options.name),
        },
      ],
    }
  }
}
