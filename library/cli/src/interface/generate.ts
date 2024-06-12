/**
 * @Author       : Chen Zhen
 * @Date         : 2024-05-25 14:07:47
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-05-26 01:46:46
 */

/**
 * @public
 *
 *  渲染配置项。
 *
 */
export interface IGenerateRenderOptions {
  /**
   * 模版所在文件夹。（绝对路径）
   */
  templateDir: string

  /**
   * 输出文件夹。（绝对路径）
   */
  outputDir: string
}

/**
 * @public
 *
 *  模版信息
 *
 */
export interface ITemplateInfo {
  /**
   * 模版文件名
   */
  filename: string
  /**
   * 对标目录
   */
  filepath: string
  /**
   * 模版路径
   */
  temppath: string

  /**
   * 是否渲染。默认为 true
   */
  isRender?: string
}
