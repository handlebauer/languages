import { readFile, writeFile } from 'fs/promises'
import { flatten, map, mapToObj } from 'remeda'
import { formatJS } from '../utils/format-js.js'

const path = 'src/by-iso.js'

/**
 * @param {import('../types/index.js').Language} language
 */
export const simplifyNames = ({ name, ...rest }) =>
  name.split(', ').map(name => ({ name, ...rest }))

/**
 * @param {import('../types/index.js').LanguagesBy} byISO
 */
export const save = byISO => writeFile(path, formatJS('byISO', byISO))

export const generateByISO = () =>
  readFile('src/data/languages.json', 'utf-8')
    .then(JSON.parse)
    .then(map(simplifyNames))
    .then(flatten())
    .then(mapToObj(language => [language.iso6391, language.name]))
    .then(save)
