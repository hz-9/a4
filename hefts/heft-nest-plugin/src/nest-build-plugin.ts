/**
 * @Author       : Chen Zhen
 * @Date         : 2024-05-10 00:00:00
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-05-10 00:29:47
 */
import type { HeftConfiguration, IHeftTaskPlugin, IHeftTaskRunHookOptions, IHeftTaskSession } from '@rushstack/heft'
import execa from 'execa'
import path from 'path'

const PLUGIN_NAME: 'nest-build-plugin' = 'nest-build-plugin'

/**
 * @public
 *
 * 使用 `PKG` 打包编译后结果。
 *
 */
export default class NestBuildPlugin implements IHeftTaskPlugin {
  public apply(taskSession: IHeftTaskSession, heftConfiguration: HeftConfiguration): void {
    taskSession.hooks.run.tapPromise(PLUGIN_NAME, async (runOptions: IHeftTaskRunHookOptions) => {
      const { logger } = taskSession

      try {
        const nestCli: string = path.resolve(
          heftConfiguration.rigConfig.projectFolderPath,
          './node_modules',
          './@nestjs/cli/bin/nest.js'
        )

        // eslint-disable-next-line @typescript-eslint/typedef
        await execa(nestCli, ['build'], {
          cwd: heftConfiguration.rigConfig.projectFolderPath,
          stderr: process.stderr,
          stdout: process.stdout,
        })

        logger.terminal.writeLine('Nest build completed successfully')
      } catch (err) {
        logger.emitError(new Error(`Nest build completed with error. Error: ${err}`))
      }
    })
  }
}
