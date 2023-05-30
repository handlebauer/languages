import { generateDefault } from './default.js'
import { generateByISO } from './by-iso.js'
import { generateByName } from './by-name.js'

export const generate = () =>
  generateDefault().then(generateByISO).then(generateByName)

await generate()
