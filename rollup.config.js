import pkg from './package.json' assert { type: 'json' }

const main = './src/index.js'
const utils = './src/utils/index.js'

const external = Object.keys(pkg.dependencies).concat('util')

// eslint-disable-next-line import/no-default-export
export default [
  {
    input: main,
    external,
    output: [
      { file: pkg.exports['.'].require, format: 'cjs' },
      { file: pkg.exports['.'].import, format: 'esm' },
    ],
  },
  {
    input: utils,
    external,
    output: [
      { file: pkg.exports['./utils.js'].require, format: 'cjs' },
      { file: pkg.exports['./utils.js'].import, format: 'esm' },
    ],
  },
]
