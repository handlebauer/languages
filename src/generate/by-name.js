import { readFile, writeFile } from 'fs/promises'
import { flatten, map, mapToObj } from 'remeda'
import { formatJS } from '../utils/format-js.js'

const path = 'src/by-name.js'

/**
 * @param {import('../types/index.js').Language} language
 */
export const simplifyNames = ({ name, ...rest }) =>
  name.split(', ').map(name => ({ name, ...rest }))

/**
 * @param {import('../types/index.js').LanguagesBy} byName
 */
export const save = byName => writeFile(path, formatJS('byName', byName))

export const generateByName = () =>
  readFile('src/data/languages.json', 'utf-8')
    .then(JSON.parse)
    .then(map(simplifyNames))
    .then(flatten())
    .then(mapToObj(language => [language.name, language.iso6391]))
    .then(save)
