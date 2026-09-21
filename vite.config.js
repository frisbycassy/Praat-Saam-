import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig(({ command }) => ({
  // GitHub Pages serves this repo from /Praat-Saam-/, not the domain root.
  // Keep the dev server at / so `npm run dev` is unaffected.
  base: command === 'build' ? '/Praat-Saam-/' : '/',
  plugins: [react()],
}))
