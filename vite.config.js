import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'url';

export default defineConfig({
  plugins: [react()],
  base: './',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          ui: ['framer-motion', 'react-icons'],
          charts: ['echarts', 'echarts-for-react']
        }
      }
    }
  },
  resolve: {
    alias: {
      'framer-motion/dist/es/utils/use-motion-value-event.mjs': fileURLToPath(
        new URL('./src/shims/use-motion-value-event.mjs', import.meta.url)
      )
    }
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom', 'framer-motion']
  }
});