import { inspect } from 'util'

inspect.defaultOptions.maxArrayLength = Infinity

/**
 * @param {string} name
 */
const _export = name => 'export const' + ' ' + name + ' ' + '=' + ' '

/**
 * @param {string} _var
 * @param {any} data
 */
export const formatJS = (_var, data) =>
  _export(_var) + inspect(data, false, Infinity, false)
