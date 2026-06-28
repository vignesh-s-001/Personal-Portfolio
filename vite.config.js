import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    watch: {
      // Exclude the root Assets folder and large binary assets from file watching
      // to prevent EBUSY errors on PDFs and large images
      ignored: ['**/Assets/**', '**/*.pdf', '**/developer.jpg'],
    },
  },
})
