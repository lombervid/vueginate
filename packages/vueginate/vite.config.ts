import { fileURLToPath, URL } from 'node:url'

import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./lib', import.meta.url)),
      '@dist': fileURLToPath(new URL('./dist', import.meta.url)),
    },
  },
  build: {
    lib: {
      entry: resolve(__dirname, 'lib/main.ts'),
      name: 'Vueginate',
      fileName: 'vueginate',
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        assetFileNames: (assetInfo) => {
          return assetInfo.name === 'style.css' ? 'css/vueginate.css' : assetInfo.name ?? ''
        },
        globals: {
          vue: 'Vue',
        },
      },
    },
  },
})
