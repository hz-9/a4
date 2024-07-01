/**
 * @Author       : Chen Zhen
 * @Date         : 2024-06-30 23:33:49
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-07-01 00:05:40
 */
import { ConsoleLogger, Injectable } from '@nestjs/common'

@Injectable()
export class A4ConsoleLogger extends ConsoleLogger {
  protected formatPid(pid: number): string {
    // return `[Nest] ${pid}  - `
    return `[A4] ${pid}  - `
  }
}
