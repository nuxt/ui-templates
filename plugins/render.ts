import { promises as fsp } from 'fs'
import { resolve, join, dirname, basename } from 'upath'
import type { Plugin } from 'vite'
import Critters from 'critters'
import glob from 'globby'
import template from 'lodash.template'
import htmlMinifier from 'html-minifier'
import genericMessages from '../templates/messages.json'

const r = (...path: string[]) => resolve(join(__dirname, '..', ...path))

export const RenderPlugin = () => {
  return <Plugin>{
    name: 'render',
    enforce: 'post',
    async writeBundle () {
      const distDir = r('dist')
      const critters = new Critters({ path: distDir })
      const htmlFiles = await glob(r('dist/templates/**/*.html'))

      for (const fileName of htmlFiles) {
        // Infer template name
        const templateName = basename(dirname(fileName))

        // eslint-disable-next-line no-console
        console.log('Processing', templateName)

        // Read source template
        let html = await fsp.readFile(fileName, 'utf-8')

        // Apply criters to inline styles
        html = await critters.process(html)
        // We no longer need references to external CSS
        html = html.replace(/<link[^>]*>/g, '')

        // Remove the null scripts that are created by `virtual:windi.css`
        // TODO: Remove empty assets from dist and keep the rest with CDN import transform
        html = html.replace(/<script [^>]*>[\s\S]*?<\/script>/g, '')

        // Minify HTML
        html = htmlMinifier.minify(html, { collapseWhitespace: true })

        // Load messages
        const messages = JSON.parse(await fsp.readFile(r(`templates/${templateName}/messages.json`), 'utf-8'))

        // Serialize into a js function
        const jsCode = `
const _messages = ${JSON.stringify({ ...genericMessages, ...messages })};
const _render = ${template(html, { interpolate: /{{([\s\S]+?)}}/g }).toString()};
const _template = (messages) => _render({ messages: { ..._messages, ...messages } });
        `.trim()

        // Generate types
        const types = [
          'declare const template: (data: Record<string, any>) => string',
          'export { template }'
        ].join('\n')

        // Write new template
        await Promise.all([
          fsp.writeFile(fileName.replace('/index.html', '.cjs'), `${jsCode}\nmodule.exports.template = _template`),
          fsp.writeFile(fileName.replace('/index.html', '.mjs'), `${jsCode}\nexport const template = _template`),
          fsp.writeFile(fileName.replace('/index.html', '.d.ts'), types)
        ])

        // Remove original html file
        await fsp.unlink(fileName)
        await fsp.rmdir(dirname(fileName))
      }
    }
  }
}
