import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// GitHub Pages: сайт живёт по подпути /aj-demo-app/
export default defineConfig({
  plugins: [react()],
  base: '/aj-demo-app/',
})
