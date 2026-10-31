import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { recipeDbProxyPlugin } from './src/server/recipedbProxy.js';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    recipeDbProxyPlugin()
  ],
  server: {
    port: 3000,
    strictPort: true,
    host: 'localhost'
  }
});
