// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      external: ['tailwindcss/version.js'], // Exclude tailwindcss/version.js
    },
  },
});