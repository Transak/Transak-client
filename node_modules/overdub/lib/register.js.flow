/* @flow */
import type { Options } from '@babel/register'
import defaultBabelConfig from 'overdub/babel'

export default function(getBabelConfig: Options => Options = config => config) {
  require('@babel/register')(getBabelConfig(defaultBabelConfig))
}
