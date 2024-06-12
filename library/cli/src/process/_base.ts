/**
 * @Author       : Chen Zhen
 * @Date         : 2024-05-24 15:55:00
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-05-25 15:58:06
 */
import inquirer, { type Answers, type QuestionCollection } from 'inquirer'
import console from 'node:console'

/**
 * @public
 *
 *  A4 Cli 中的基类。
 *
 */
export abstract class BaseProcess {
  public readonly options: Answers[]

  /**
   * 该步骤的问题
   */
  public abstract prompts: QuestionCollection

  public constructor(options: Answers[] = []) {
    this.options = options
  }

  /**
   * 选择下一个问题。
   */
  public abstract toNext(options: Answers): BaseProcess | void | Promise<BaseProcess | void>

  public start(): void {
    inquirer
      .prompt(this.prompts)
      .then(async (answers) => {
        const n = await this.toNext(answers)
        if (n) n.start()
      })
      .catch((error) => {
        console.error('Error.', error)
      })
  }
}
