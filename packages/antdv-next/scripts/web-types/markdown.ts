import MarkdownIt from 'markdown-it'
import { frontmatterPlugin } from '@mdit-vue/plugin-frontmatter'

export function createMarkdownParser() {
  const md = MarkdownIt({ html: true })
  md.use(frontmatterPlugin, {
    grayMatterOptions: {
      excerpt: false,
      format: 'yaml',
    },
  })
  return md
}
