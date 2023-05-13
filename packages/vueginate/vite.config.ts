import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/main.ts'),
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
