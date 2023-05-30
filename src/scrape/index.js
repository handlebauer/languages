import { writeFile } from 'fs/promises'
import { load } from 'cheerio'
import { prop } from 'remeda'
import { Wikipedia } from './utils/Wikipedia.js'

/**
 * @param {string} html
 */
export const parseLanguages = html => {
  const $ = load(html)

  const tableBody = $('#Table tbody')

  /**
   * @type {import('../types/index.js').Language[]}
   */
  const languages = []

  tableBody.find('tr').each(function () {
    const [name, iso6391, iso6392] = $(this).find('td')

    if (name) {
      languages.push({
        name: $(name).text().normalize('NFKD'),
        iso6391: $(iso6391).text().normalize('NFKD'),
        iso6392: $(iso6392).text().normalize('NFKD'),
      })
    }
  })

  return languages
}

/**
 * @param {import('../types/index.js').Language[]} languages
 */
export const saveLanguages = languages => (
  console.log('Scraped', languages.length, 'languages'),
  writeFile('src/data/languages.json', JSON.stringify(languages, null, 2)),
  languages
)

export const scrape = () =>
  Wikipedia.scrape('List_of_ISO_639-1_codes', { skipCache: true })
    .then(prop('data'))
    .then(parseLanguages)
    .then(saveLanguages)
