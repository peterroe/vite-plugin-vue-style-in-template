import type { Plugin } from 'vite'
import type { Options } from './type'
import vueStyleInTemplate from './plugin'

export default function vitePluginVueStyleInTemplate(options: Options = {}): Plugin {
  return {
    name: 'vite-plugin-vue-style-in-template',
    enforce: 'pre',
    configResolved(config) {
      // 将当前插件插入到 vite:vue 之前
      const index = config.plugins.findIndex(p => p && p.name === 'vite:vue')
      if (index !== -1) {
        (config.plugins as Plugin[]).splice(index, 0, vueStyleInTemplate(options))
      }
    },
  }
}
