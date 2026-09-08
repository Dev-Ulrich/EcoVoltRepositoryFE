import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { createApi } from './server/api.ts'

export default defineConfig({
  server: {
    fs: {
      deny: ['.env', '.env.*', '*.{crt,pem}', '**/.git/**', '**/data/**', '**/server/**'],
    },
  },
  plugins: [react(), tailwindcss(), {
    name: 'ecovolt-local-api',
    configureServer(server) {
      const api = createApi()
      server.middlewares.use(api.handle)
      server.httpServer?.once('close', api.close)
    },
    configurePreviewServer(server) {
      const api = createApi()
      server.middlewares.use(api.handle)
      server.httpServer.once('close', api.close)
    },
  }],
})
