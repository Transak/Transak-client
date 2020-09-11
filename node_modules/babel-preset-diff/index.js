/* eslint-disable flowtype/require-valid-file-annotation */
const presetEnv = require('@babel/preset-env').default
const presetFlow = require('@babel/preset-flow').default
const presetReact = require('@babel/preset-react').default
const pluginPackageNameImport = require('babel-plugin-package-name-import')
  .default
const pluginSyntaxDynamicImport = require('@babel/plugin-syntax-dynamic-import')
  .default

const pluginProposalNullishCoalescingOperator = require('@babel/plugin-proposal-nullish-coalescing-operator')
  .default
const pluginProposalOptionalChaining = require('@babel/plugin-proposal-optional-chaining')
  .default

module.exports = function(context, options) {
  return {
    presets: [
      [
        presetEnv,
        Object.assign(
          {
            targets: {
              node: 'current'
            }
          },
          options
        )
      ],
      presetFlow,
      presetReact
    ],
    plugins: [
      pluginPackageNameImport,
      pluginSyntaxDynamicImport,
      pluginProposalNullishCoalescingOperator,
      pluginProposalOptionalChaining
    ]
  }
}
