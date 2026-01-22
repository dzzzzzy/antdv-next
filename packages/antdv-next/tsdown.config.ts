import { defineConfig } from 'tsdown'

export default defineConfig({
  fromVite: true,
  entry: [
    'src/index.ts',
    'src/locale/*.ts',
  ],
  unbundle: true,
  format: 'es',
  // minify: true,
  clean: true,
  copy: [
    { from: 'src/style/reset.css', to: 'dist' },
  ],
  external: [
    'vue',
    '@antdv-next/icons',
  ],
})
