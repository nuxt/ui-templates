import { resolve } from 'path'
import { readdirSync } from 'fs'

import { defineConfig } from 'vite'
import WindiCSS from 'vite-plugin-windicss'

import { DevRenderingPlugin } from './plugins/dev'
import { CrittersPlugin } from './plugins/render'

const r = (...path: string[]) => resolve(__dirname, ...path)

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        ...Object.fromEntries(
          readdirSync(r('templates')).map(dir => [
            dir,
            r('templates', dir, 'index.html')
          ])
        ),
        index: r('index.html')
      }
    }
  },
  plugins: [
    WindiCSS({
      scan: {
        dirs: ['templates'],
        fileExtensions: ['html']
      }
    }),
    DevRenderingPlugin(),
    CrittersPlugin()
  ],
  server: {
    fs: {
      allow: ['./templates']
    }
  }
})
