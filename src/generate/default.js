import { writeFile } from 'fs/promises'
import { scrape } from '../scrape/index.js'
import { formatJS } from '../utils/format-js.js'

/**
 * @param {import('../types/index.js').Language[]} languages
 */
export const saveDefault = languages =>
  writeFile('src/languages.js', formatJS('languages', languages))

export const generateDefault = () => scrape().then(saveDefault)
