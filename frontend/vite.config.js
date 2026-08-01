import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  // 1. Point to port 5000 for local backend (or VITE_API_URL if defined)
  const apiTarget = env.VITE_API_URL || 'http://localhost:5000';

  return {
    plugins: [
      react(),
      tailwindcss(),
    ],
    server: {
      // Local dev proxy: redirects frontend calls to /api over to your backend
      proxy: {
        '/api': {
          target: apiTarget,
          changeOrigin: true,
          secure: false,
        },
      },
    },
  };
});