/**
 * @Author       : Chen Zhen
 * @Date         : 2024-05-10 00:00:00
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-05-10 00:29:50
 */
import type { HeftConfiguration, IHeftTaskPlugin, IHeftTaskRunHookOptions, IHeftTaskSession } from '@rushstack/heft'
import execa from 'execa'
import path from 'path'

const PLUGIN_NAME: 'nest-lint-plugin' = 'nest-lint-plugin'

/**
 * @public
 *
 * 进行 eslint 规则检查
 *
 */
export default class NestLintPlugin implements IHeftTaskPlugin {
  public apply(taskSession: IHeftTaskSession, heftConfiguration: HeftConfiguration): void {
    taskSession.hooks.run.tapPromise(PLUGIN_NAME, async (runOptions: IHeftTaskRunHookOptions) => {
      const { logger } = taskSession
      const hasFixFlag: boolean = taskSession.parameters.getFlagParameter('--fix').value

      try {
        const eslintCli: string = path.resolve(
          heftConfiguration.rigConfig.projectFolderPath,
          './node_modules',
          './eslint/bin/eslint.js'
        )

        const params: string[] = ['src']
        if (hasFixFlag) params.push('--fix')

        // eslint-disable-next-line @typescript-eslint/typedef
        await execa(eslintCli, params, {
          cwd: heftConfiguration.rigConfig.projectFolderPath,

          stderr: process.stderr,
          stdout: process.stdout,
        })

        logger.terminal.writeLine('Eslint run completed successfully')
      } catch (err) {
        logger.emitError(new Error(`Eslint run completed with error. Error: ${err}`))
      }
    })
  }
}
