/**
 * @Author       : Chen Zhen
 * @Date         : 2024-05-10 00:00:00
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-05-10 14:26:04
 */

// eslint-disable-next-line import/no-unresolved
require('@hz-9/eslint-config-airbnb-ts/modern-module-resolution')

module.exports = {
  extends: ['@hz-9/eslint-config-airbnb-ts/node-rushstack'],
  parserOptions: { tsconfigRootDir: __dirname },

  rules: {},
}
