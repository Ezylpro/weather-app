import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@src': '/src',
      '@api': '/src/api',
      '@components': '/src/components',
      '@helpers': '/src/helpers',
      '@pages': '/src/pages',
      '@assets': '/public/assets',
      '@includes': '/src/includes',
    },
  },
})
