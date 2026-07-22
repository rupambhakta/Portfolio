import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteSingleFile } from 'vite-plugin-singlefile'

// SINGLEFILE=1 inlines all JS/CSS into one index.html (used for the instant preview artifact).
const singleFile = process.env.SINGLEFILE === '1'

export default defineConfig({
  plugins: [react(), ...(singleFile ? [viteSingleFile()] : [])],
  base: './',
  build: {
    target: 'es2018',
    cssCodeSplit: !singleFile,
    assetsInlineLimit: singleFile ? 100000000 : 4096,
  },
})
