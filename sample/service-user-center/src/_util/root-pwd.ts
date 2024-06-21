/**
 * @Author       : Chen Zhen
 * @Date         : 2024-06-20 17:16:08
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-06-20 17:57:56
 */
import { Logger } from '@nestjs/common'
import EnvPaths from 'env-paths'

import * as fs from '@hz-9/a4-core/fs-extra'
import * as path from '@hz-9/a4-core/upath'
import dayjs from '@hz-9/a4-core/dayjs'

const logger: Logger = new Logger('Root PWD')

/**
 * @public
 *
 *  ROOT 账号密码的本地记录。
 *
 */
export class RootPWD {
  public static writeLocal(username: string, password: string): void {
    const filepath = path.resolve(EnvPaths('A4/service-user-center').data, '.user-info')

    fs.mkdirpSync(path.dirname(filepath))

    const message: string[] = [
      `Root username  : ${username}`,
      `Root password  : ${password}`,
      `Add time       : ${dayjs().format('TTTT-MM-DD HH:mm:ss.SSSZ')}`,
      ' ',
      '',
    ]

    fs.appendFileSync(filepath, message.join('\n'), 'utf8')
    logger.log(`Add root password to '${filepath}'`)
  }
}
