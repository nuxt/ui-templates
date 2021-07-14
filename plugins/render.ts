import { promises as fsp } from 'fs'
import { resolve, join, dirname } from 'upath'
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
      const htmlFiles = await glob(r('dist/templates/**/*.html'))

      for (const file of htmlFiles) {
        // eslint-disable-next-line no-console
        console.log('Processing', file)

        // Read source template
        let html = await fsp.readFile(file, 'utf-8')

        // Apply criters to inline styles
        html = await critters.process(html)
        // We no longer need references to external CSS
        html = html.replace(/<link[^>]*>/g, '')

        // Remove the null scripts that are created by `virtual:windi.css`
        // TODO: Remove empty assets from dist and keep the rest with CDN import transform
        if (file.includes('templates')) {
          html = html.replace(/<script [^>]*>[\s\S]*?<\/script>/g, '')
        }

        // Minify HTML
        html = htmlMinifier.minify(html, { collapseWhitespace: true })

        // Serialize into a js function
        const jsTemplate = template(html, {
          interpolate: /{{([\s\S]+?)}}/g,
          variable: 'messages'
        }).toString()

        // Generate types
        const types = [
          'declare const template: (data: Record<string, any>) => string',
          'export { template }'
        ].join('\n')

        // Write new template
        await Promise.all([
          fsp.writeFile(file.replace('/index.html', '.cjs'), `module.exports.template = ${jsTemplate}`),
          fsp.writeFile(file.replace('/index.html', '.mjs'), `export const template = ${jsTemplate}`),
          fsp.writeFile(file.replace('/index.html', '.d.ts'), types)
        ])

        // Remove original html file
        await fsp.rm(file)
        await fsp.rmdir(dirname(file))
      }
    }
  }
}
