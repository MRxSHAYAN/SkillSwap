import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  // In production (hosted frontend), VITE_API_URL points to your live backend.
  // In development, it falls back to localhost:3000.
  const apiTarget = env.VITE_API_URL || 'http://localhost:3000';

  return {
    plugins: [
      react(),
      tailwindcss(),
    ],
    server: {
      // Dev server proxy — only used when running `vite` locally
      proxy: {
        '/api': {
          target: apiTarget,
          changeOrigin: true,
          secure: false,
        },
      },
    },
    // When building for production, if VITE_API_URL is set all fetch('/api/...')
    // calls in the app will be relative and served by whatever host serves index.html.
    // If you're serving frontend from a CDN/static host and backend is separate,
    // set VITE_API_BASE_URL so the app prefixes every request with the backend URL.
    define: {
      __API_BASE__: JSON.stringify(
        mode === 'production' && env.VITE_API_URL ? env.VITE_API_URL : ''
      ),
    },
  };
});
