/**
 * @Author       : Chen Zhen
 * @Date         : 2024-05-24 18:24:20
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-05-26 01:48:08
 */
import type { QuestionCollection } from 'inquirer'
import console from 'node:console'

import * as fs from '@hz-9/a4-core/fs-extra'
import * as path from '@hz-9/a4-core/upath'
import _ from '@hz-9/a4-core/lodash'

import { IGenerateRenderOptions, ITemplateInfo } from '../interface/generate'
import { BaseProcess } from '../process/_base'

/**
 * @public
 *
 *  生成类，基类。
 *
 */
export class BaseGenerate extends BaseProcess {
  public get prompts(): QuestionCollection {
    return []
  }

  public toNext(): void {}

  public async start(): Promise<void> {
    // ...
  }

  /**
   * 扫描模版文件夹，并进行渲染。
   */
  protected async render(options: IGenerateRenderOptions, renderInfo: object): Promise<void> {
    const filenames = fs.readdirSync(options.templateDir).filter((i) => !['.DS_Store'].includes(i))

    let i = 0
    while (i < filenames.length) {
      const filepath = path.resolve(options.templateDir, filenames[i])
      const infopath = path.resolve(filepath, '.info.json')
      try {
        if (!fs.existsSync(infopath)) throw new Error(`Not found ${infopath}`)
        const fileInfo: ITemplateInfo = JSON.parse(fs.readFileSync(infopath, { encoding: 'utf8' }))

        const temppath = path.resolve(filepath, fileInfo.temppath)

        if (!fs.existsSync(temppath)) throw new Error(`Not found ${temppath}`)

        let isRender = true
        if (fileInfo.isRender) {
          isRender = _.template(fileInfo.isRender, { interpolate: /{{([\s\S]+?)}}/g })(renderInfo) === 'true'
        }

        if (isRender) {
          const forceFilename = _.template(fileInfo.filename, { interpolate: /{{([\s\S]+?)}}/g })(renderInfo)
          const forceFilepath = _.template(fileInfo.filepath, { interpolate: /{{([\s\S]+?)}}/g })(renderInfo)
          const forceFile = _.template(fs.readFileSync(temppath, { encoding: 'utf8' }), {
            interpolate: /{{([\s\S]+?)}}/g,
          })(renderInfo)

          await fs.mkdirp(path.resolve(options.outputDir, forceFilepath))

          const f = path.resolve(options.outputDir, forceFilepath, forceFilename)
          if (fs.existsSync(f)) {
            console.log(`Finded   ${forceFilename}(${filenames[i]}), skip.`)
          } else {
            await fs.writeFile(path.resolve(options.outputDir, forceFilepath, forceFilename), forceFile, {
              encoding: 'utf8',
            })

            console.log(`Generate ${forceFilename}(${filenames[i]}) complete.`)
          }
        }
      } catch (error: unknown) {
        console.error(`Render ${filenames[i]} error.`, error)
      }

      i += 1
    }
  }
}
