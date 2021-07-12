import { resolve, join } from 'path'
import { promises as fsp } from 'fs'
import mockData from '../data/messages.json'

const r = (...path) => resolve(join(__dirname, '..', ...path))

async function main () {
  const htmlFiles = await fsp.readdir(r('dist/templates'))
  for (const file of htmlFiles) {
    console.log('Processing', file)
    const { default: template } = await import(
      `./dist/templates/${file}/index.html`
    )
    const updated = template({
      messages: mockData,
      name: '{{ name }}' // TODO
    })
    await fsp.writeFile(r('dist/templates', file, 'index.html'), updated)
  }
}

main().catch(console.error)
