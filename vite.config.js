import { defineConfig } from 'vite';
import dsv from '@rollup/plugin-dsv';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => ({
  base: '/me/',
  plugins: [react(), dsv()],
  build: {
    outDir: 'build',
  },
  ...mode === "development" && {
    optimizeDeps: {
      exclude: ["543fc9bac1bd4e19", "fb5ed6161a8a33b8"],
    }
  }
}));