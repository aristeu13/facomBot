import { config } from 'dotenv'
import { resolve } from 'path'

console.log(__dirname)
config({
  path: resolve(__dirname, '../../.env')
})
