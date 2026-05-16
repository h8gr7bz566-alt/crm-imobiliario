import { defineConfig } from 'vite'
import { resolve } from 'path'

const base = '/'

export default defineConfig({
  base,
  optimizeDeps: {
    include: ['@supabase/supabase-js']
  },
  build: {
    rollupOptions: {
      input: {
        main:     resolve(__dirname, 'index.html'),
        admin:    resolve(__dirname, 'admin.html'),
        property: resolve(__dirname, 'property.html'),
      },
      external: []
    }
  }
})
