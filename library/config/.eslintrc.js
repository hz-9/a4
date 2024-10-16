/**
 * @Author       : Chen Zhen
 * @Date         : 2024-05-10 00:00:00
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-06-29 17:15:34
 */

// eslint-disable-next-line import/no-unresolved
require('@hz-9/eslint-config-airbnb-ts/modern-module-resolution')

module.exports = {
  extends: ['@hz-9/eslint-config-airbnb-ts/node-rushstack'],
  parserOptions: { tsconfigRootDir: __dirname },

  rules: {},

  overrides: [
    {
      files: ['src/test/**/*.ts'],

      rules: {
        'max-classes-per-file': 'off',
        '@rushstack/security/no-unsafe-regexp': 'off',
        'import/no-extraneous-dependencies': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
      },
    },
  ],
}
