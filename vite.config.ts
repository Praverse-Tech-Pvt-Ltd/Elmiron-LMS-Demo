import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: './',
  // the screens are inline-styled copies of the design; ~115 kB gzipped in total
  build: { chunkSizeWarningLimit: 700 },
});
