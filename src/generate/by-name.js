import { readFile, writeFile } from 'fs/promises'
import { flatten, map, mapToObj } from 'remeda'
import { formatJS } from '../utils/format-js.js'

/**
 * @param {import('../types/index.js').Language} language
 */
export const simplifyNames = ({ name, ...rest }) =>
  name.split(', ').map(name => ({ name, ...rest }))

/**
 * @param {import('../types/index.js').LanguagesBy} byName
 */
export const saveByName = byName =>
  writeFile('src/by-name.js', formatJS('byName', byName))

export const generateByName = () =>
  readFile('src/data/languages.json', 'utf-8')
    .then(JSON.parse)
    .then(map(simplifyNames))
    .then(flatten())
    .then(mapToObj(language => [language.name, language.iso6391]))
    .then(saveByName)
