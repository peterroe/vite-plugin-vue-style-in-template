import type { Plugin } from 'vite'
import { parse } from '@vue/compiler-sfc'

export default function vitePluginVueStyleInTemplate(): Plugin {
  return {
    name: 'vite-plugin-vue-style-in-template',
    enforce: 'pre',
    transform(code: string, id: string) {
      // 只处理 .vue 文件
      if (!id.endsWith('.vue'))
        return null

      const { descriptor } = parse(code)

      if (!descriptor.template)
        return null

      const templateContent = descriptor.template.content
      const styleRegex = /<style([^>]*)>([\s\S]*?)<\/style>/g
      let noScopedStyles = ''
      let scopedStyles = ''

      const newTemplateContent = templateContent.replace(styleRegex, (_, attributes: string, styleContent: string) => {
        if (attributes.includes('scoped')) {
          scopedStyles += `${styleContent}\n`
        }
        else {
          noScopedStyles += `${styleContent}\n`
        }
        return ''
      })

      if (!noScopedStyles && !scopedStyles)
        return null

      // 构建新的代码
      let newCode = code

      // 更新 template 内容
      if (descriptor.template) {
        newCode = newCode.replace(
          descriptor.template.content,
          newTemplateContent,
        )
      }

      // 如果已经存在 style 标签
      if (descriptor.styles.length > 0) {
        descriptor.styles.forEach((style) => {
          if (style.attrs.scoped && scopedStyles) {
            newCode = newCode.replace(
              style.content,
              `${style.content}\n${scopedStyles}`,
            )
            scopedStyles = ''
          }
          else if (!style.attrs.scoped && noScopedStyles) {
            newCode = newCode.replace(
              style.content,
              `${style.content}\n${noScopedStyles}`,
            )
            noScopedStyles = ''
          }
        })
      }

      if (scopedStyles) {
        newCode += `\n<style scoped>\n${scopedStyles}</style>`
      }
      else if (noScopedStyles) {
        newCode += `\n<style>\n${noScopedStyles}</style>`
      }

      return {
        code: newCode,
        map: null,
      }
    },
  }
}
