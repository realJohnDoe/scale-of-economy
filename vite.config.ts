import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vitejs.dev/config/
export default defineConfig({
  // Overridden for PR previews, which are served from a subfolder.
  base: process.env.BASE_PATH ?? '/scale-of-economy/',
  plugins: [
    react(),
    tailwindcss(),
  ],
})
