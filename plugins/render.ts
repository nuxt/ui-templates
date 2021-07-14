import { resolve, join } from 'path'
import { promises as fsp } from 'fs'
import type { Plugin } from 'vite'
import Critters from 'critters'
import glob from 'globby'
import template from 'lodash.template'
import htmlMinifier from 'html-minifier'

const r = (...path: string[]) => resolve(join(__dirname, '..', ...path))

export const RenderPlugin = () => {
  return <Plugin>{
    name: 'render',
    enforce: 'post',
    async writeBundle () {
      const distDir = r('dist')
      const critters = new Critters({ path: distDir })
      const htmlFiles = await glob(r('dist/**/*.html'))

      for (const file of htmlFiles) {
        console.log('Processing', file)
        const html = await fsp.readFile(file, 'utf-8')
        let result = await critters.process(html)

        // TODO: allow other scripts (such as petite-vue)
        // Remove the null scripts that are created by `virtual:windi.css`
        if (file.includes('templates')) {
          result = result.replace(/<script [^>]*>[\s\S]*?<\/script>/g, '')
        }

        // We no longer need references to external CSS
        result = result.replace(/<link[^>]*>/g, '')

        await fsp.writeFile(file, result)

        // Other files do not need to be exported as JS
        if (!file.includes('templates')) {
          continue
        }

        result = htmlMinifier.minify(result, {
          collapseWhitespace: true
        })

        const compiled = template(result, {
          interpolate: /{{([\s\S]+?)}}/g,
          variable: 'messages'
        })

        await Promise.all([
          fsp.writeFile(
            file.replace('/index.html', '.cjs'),
            `module.exports.template = ${compiled.toString()}`
          ),
          fsp.writeFile(
            file.replace('/index.html', '.mjs'),
            `export const template = ${compiled.toString()}`
          ),
          fsp.writeFile(
            file.replace('/index.html', '.d.ts'),
            [
              'declare const template: (data: Record<string, any>) => string',
              'export { template }'
            ].join('\n')
          )
        ])
      }
    }
  }
}
