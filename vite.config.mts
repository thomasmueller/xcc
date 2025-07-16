import { resolve } from 'node:path'
import { defineConfig } from 'vite'

export default defineConfig({
  base: './',
  root: 'src/wcc/www',
  publicDir: '../../../public',
  build: {
    outDir: resolve(__dirname, 'release'),
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'src/wcc/www/index.html'),
        simple: resolve(__dirname, 'src/wcc/www/simple.html'),
      },
      output: {
        entryFileNames: '[name].js',
        assetFileNames: '[name].[ext]',
      },
    },
    assetsInlineLimit: 8192,
  },
  worker: {
    rollupOptions: {
      output: {
        entryFileNames: '[name].js',
        assetFileNames: '[name].[ext]',
      },
    },
  },
})
