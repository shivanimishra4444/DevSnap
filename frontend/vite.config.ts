import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  const env = loadEnv(mode, process.cwd(), '');
  
  return {
    plugins: [react()],

    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },

    define: {
      'import.meta.env.VITE_GITHUB_CLIENT_ID': JSON.stringify(env['VITE_GITHUB_CLIENT_ID']),
      'import.meta.env.VITE_GITHUB_CALLBACK_URL': JSON.stringify(env['VITE_GITHUB_CALLBACK_URL']),
      'import.meta.env.VITE_API_URL': JSON.stringify(env['VITE_API_URL']),
    },

    server: {
      port: 3000,
      host: true,
      hmr: {
        overlay: true,
      },
      watch: {
        usePolling: true,
      },
    },
    build: {
      outDir: 'dist',
      rollupOptions: {
        input: {
          main: './index.html',
        },
      },
    },
  };
});
