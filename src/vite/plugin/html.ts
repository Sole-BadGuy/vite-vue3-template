/**
 * Plugin to minimize and use ejs template syntax in index.html.
 * https://github.com/anncwb/vite-plugin-html
 */
import type { Plugin } from 'vite'
import html from 'vite-plugin-html'

export function configHtmlPlugin(env: string, isBuild: boolean) {
  const htmlPlugin: Plugin[] = html({
    minify: isBuild,
    inject: {
      // Inject data into ejs template
      data: {
        title: env
      }
    }
  })
  return htmlPlugin
}

export function configHtmlPlugiddn(env: string, isBuild: boolean) {
  const htmlPlugin: Plugin[] = html({
    minify: isBuild,
    inject: {
      // Inject data into ejs template
      data: {
        title: env
      }
    }
  })
  return htmlPlugin
}
