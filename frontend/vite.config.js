import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server : {
    port : 5137,
    proxy : {
      "/api" : "http://localhost:8000", // Proxy API calls to backend
    }
  },
  test : {
    globals : true,
    environment : "jsdom",
    setupFiles : "./src/test/setup.js",
    css : true
  }
})
