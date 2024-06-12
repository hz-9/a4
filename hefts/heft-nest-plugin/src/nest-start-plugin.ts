/**
 * @Author       : Chen Zhen
 * @Date         : 2024-05-10 00:00:00
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-05-10 00:29:53
 */
import type { HeftConfiguration, IHeftTaskPlugin, IHeftTaskRunHookOptions, IHeftTaskSession } from '@rushstack/heft'
import execa from 'execa'
import path from 'path'

const PLUGIN_NAME: 'nest-start-plugin' = 'nest-start-plugin'

/**
 * @public
 *
 * 使用 `Nest` 启动应用服务。
 *
 * Command:
 *
 *  "nest start"
 *
 */
export default class NestStartPlugin implements IHeftTaskPlugin {
  public apply(taskSession: IHeftTaskSession, heftConfiguration: HeftConfiguration): void {
    taskSession.hooks.run.tapPromise(PLUGIN_NAME, async (runOptions: IHeftTaskRunHookOptions) => {
      const { logger } = taskSession

      const hasProdFlag: boolean = taskSession.parameters.getFlagParameter('--prod').value

      const hasWatchFlag: boolean = taskSession.parameters.getFlagParameter('--watch').value
      const hasDebugFlag: boolean = taskSession.parameters.getFlagParameter('--debug').value

      try {
        if (hasProdFlag) {
          await execa('node', ['dist/main'], {
            cwd: heftConfiguration.rigConfig.projectFolderPath,
            stderr: process.stderr,
            stdout: process.stdout,
          })
        } else {
          const nestCli: string = path.resolve(
            heftConfiguration.rigConfig.projectFolderPath,
            './node_modules',
            './@nestjs/cli/bin/nest.js'
          )

          const params: string[] = ['start']

          if (hasDebugFlag) params.push('--debug')
          if (hasWatchFlag) params.push('--watch')

          // eslint-disable-next-line @typescript-eslint/typedef
          await execa(nestCli, params, {
            cwd: heftConfiguration.rigConfig.projectFolderPath,
            stderr: process.stderr,
            stdout: process.stdout,
          })
        }

        logger.terminal.writeLine('Nest start completed successfully')
      } catch (err) {
        logger.emitError(new Error(`Nest start completed with error. Error: ${err}`))
      }
    })
  }
}
