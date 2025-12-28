import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Dynamically set base path for GitHub Pages
  base: process.env.GITHUB_ACTIONS ? '/portfolio-full-stack/' : '/',
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
