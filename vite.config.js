import { defineConfig } from 'vite'
import { resolve } from 'path'

// Em GitHub Actions, GITHUB_ACTIONS="true" — usa o subdiretório correto.
// Localmente fica em localhost:5173/ sem subdiretório.
const base = process.env.GITHUB_ACTIONS ? '/crm-imobiliario/' : '/'

export default defineConfig({
  base,
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        admin: resolve(__dirname, 'admin.html'),
      }
    }
  }
})
