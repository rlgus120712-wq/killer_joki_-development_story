import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { fileURLToPath, URL } from 'node:url';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      'src': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        // SCSS @use 문법 사용 (더 이상 @import 사용하지 않음)
        additionalData: `@use "./src/css/vuetify.variables.scss" as *;`,
      },
    },
  },
  server: {
    port: 8080,
    open: true,
  },
  build: {
    target: 'esnext',
    outDir: 'dist',
  },
});
