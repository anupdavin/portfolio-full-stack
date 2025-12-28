import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Always use /portfolio-full-stack/ for GitHub Pages deployment
  base: '/portfolio-full-stack/',
  build: {
    outDir: 'docs'
  },
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  server: { host: true, port: 5173 },
})
