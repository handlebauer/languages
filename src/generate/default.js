import { writeFile } from 'fs/promises'
import { scrape } from '../scrape/index.js'
import { formatJS } from '../utils/format-js.js'

const path = 'src/languages.js'

/**
 * @param {import('../types/index.js').Language[]} languages
 */
export const save = languages =>
  writeFile(path, formatJS('languages', languages))

export const generateDefault = () => scrape().then(save)
