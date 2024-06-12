/**
 * @Author       : Chen Zhen
 * @Date         : 2024-05-10 00:00:00
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-05-12 14:52:07
 */
import chalk from 'chalk'
import console from 'node:console'
import fs from 'node:fs'
import path from 'node:path'

/**
 * 因 `logo` 字符串特殊字符过多，不应直接存放当前文件。
 *
 * 进行 base64 编码并存放。
 */

/**
 *
 * @public
 *
 *  打印 Logo。
 *
 * logo 是在 http://patorjk.com/software/taag/#p=display&f=Big&t=a4 进行制作的。
 *
 */
export class LogoUtil {
  private static _content: string | undefined = undefined

  /**
   * Logo 的文本信息。
   */
  public static get content(): string {
    if (!LogoUtil._content) {
      LogoUtil._content = fs.readFileSync(path.resolve(__dirname, '../../logo'), { encoding: 'utf8' })
    }

    return LogoUtil._content
  }

  /**
   *
   * 打印 A4 的 Logo 及版本信息。
   *
   * 使用 `console.log` 输出信息，不会写入到日志文件中。
   *
   * @param onlyLogo - 仅打印 Logo，不包含版本信息。可选。默认为 false
   *
   */
  public static print(onlyLogo: boolean = false): void {
    const logoLines: string[] = this.content.split('\n')

    const packageInfo = fs.readFileSync(path.resolve(__dirname, '../../package.json'), { encoding: 'utf8' })
    const version = JSON.parse(packageInfo).version ?? 'Unknown'

    if (!onlyLogo) {
      logoLines[1] = `${logoLines[1]} A4`
      logoLines[logoLines.length - 2] = `${logoLines[logoLines.length - 2]} ${version}`
    }

    console.log('')
    console.log(chalk.magenta(logoLines.join('\n')))
    console.log('')
  }
}
