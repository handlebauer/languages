import { Scrape } from '@hbauer/scrape'

export const Wikipedia = await Scrape.init('https://en.wikipedia.org/wiki', {
  contentType: 'html',
})

Wikipedia.addHandler('response', response => {
  console.log('Fetched:', response.url)
})
