import { resolve } from 'node:path'
import { defineConfig } from 'vite'

export default defineConfig({
  base: './',
  root: 'src/wcc/www',
  publicDir: '../../../public',
  build: {
    outDir: resolve(__dirname, 'release'),
    minify: true,
    rollupOptions: {
      input: {
        // Focus on simple webapp only for embedded wcc_runner
        simple: resolve(__dirname, 'src/wcc/www/simple.html'),
        // Note: Uncomment main entry if you need both, but wcc_runner will be separate
        // main: resolve(__dirname, 'src/wcc/www/index.html'),
      },
      output: {
        entryFileNames: '[name].js',
        assetFileNames: '[name].[ext]',
        inlineDynamicImports: true, // Embeds wcc_runner into simple.js
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
