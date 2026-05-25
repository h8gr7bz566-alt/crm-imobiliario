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
        imoveis:  resolve(__dirname, 'imoveis.html'),
        admin:    resolve(__dirname, 'admin.html'),
        property: resolve(__dirname, 'property.html'),
        servicos: resolve(__dirname, 'servicos.html'),
        demo:     resolve(__dirname, 'demo.html'),
      },
      external: []
    }
  }
})
