import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const localSandbox = process.env.LOCAL_SANDBOX === 'true'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Keep production aligned with GitHub Pages while making local verification
  // behave like a normal root-mounted application.
  base: localSandbox ? '/' : '/portfolio-full-stack/',
  build: {
    outDir: localSandbox ? '.local-sandbox/dist' : 'docs'
  },
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  server: { host: true, port: 5173 },
})
