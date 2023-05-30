import { readFile, writeFile } from 'fs/promises'
import { flatten, map, mapToObj } from 'remeda'
import { formatJS } from '../utils/format-js.js'

/**
 * @param {import('../types/index.js').Language} language
 */
export const simplifyNames = ({ name, ...rest }) =>
  name.split(', ').map(name => ({ name, ...rest }))

/**
 * @param {import('../types/index.js').LanguagesBy} byISO
 */
export const saveByISO = byISO =>
  writeFile('src/by-iso.js', formatJS('byISO', byISO))

export const generateByISO = () =>
  readFile('src/data/languages.json', 'utf-8')
    .then(JSON.parse)
    .then(map(simplifyNames))
    .then(flatten())
    .then(mapToObj(language => [language.iso6391, language.name]))
    .then(saveByISO)
