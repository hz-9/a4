/**
 * @Author       : Chen Zhen
 * @Date         : 2024-07-01 00:40:00
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-07-01 00:50:05
 */

const isColorAllowed = (): boolean => !process.env.NO_COLOR

/**
 * @public
 */
export class A4Color {
  public static bold(text: string): string {
    return isColorAllowed() ? `\x1B[1m${text}\x1B[0m` : text
  }

  public static red(text: string): string {
    return isColorAllowed() ? `\x1B[31m${text}\x1B[39m` : text
  }

  public static green(text: string): string {
    return isColorAllowed() ? `\x1B[32m${text}\x1B[39m` : text
  }

  public static yellow(text: string): string {
    return isColorAllowed() ? `\x1B[33m${text}\x1B[39m` : text
  }

  public static blue(text: string): string {
    return isColorAllowed() ? `\x1B[34m${text}\x1B[39m` : text
  }

  public static magenta(text: string): string {
    return isColorAllowed() ? `\x1B[35m${text}\x1B[39m` : text
  }

  public static cyan(text: string): string {
    return isColorAllowed() ? `\x1B[36m${text}\x1B[39m` : text
  }

  public static redBright(text: string): string {
    return isColorAllowed() ? `\x1B[91m${text}\x1B[39m` : text
  }

  public static greenBright(text: string): string {
    return isColorAllowed() ? `\x1B[92m${text}\x1B[39m` : text
  }

  public static yellowBright(text: string): string {
    return isColorAllowed() ? `\x1B[93m${text}\x1B[39m` : text
  }

  public static blueBright(text: string): string {
    return isColorAllowed() ? `\x1B[94m${text}\x1B[39m` : text
  }

  public static magentaBright(text: string): string {
    return isColorAllowed() ? `\x1B[95m${text}\x1B[39m` : text
  }

  public static cyanBright(text: string): string {
    return isColorAllowed() ? `\x1B[96m${text}\x1B[39m` : text
  }
}
