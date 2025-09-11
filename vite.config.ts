import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Set base dynamically for GitHub Pages if building in Actions
  base: process.env.GITHUB_REPOSITORY
    ? `/${process.env.GITHUB_REPOSITORY.split('/')[1]}/`
    : '/',
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
