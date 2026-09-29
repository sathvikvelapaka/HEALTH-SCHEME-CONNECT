
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  define: {
    // This ensures process.env exists in the browser context
    'process.env': {
      API_KEY: JSON.stringify(process.env.API_KEY || '')
    },
    // Sometimes libraries look for global process
    'process.platform': JSON.stringify('browser'),
  },
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: process.env.GATEWAY_URL || 'http://localhost:8000',
        changeOrigin: true,
      }
    }
  }
});
