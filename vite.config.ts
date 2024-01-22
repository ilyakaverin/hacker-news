import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
  plugins: [react()],
  root: 'src',
  server: {
    port: 3000,
  },
  build: {
    outDir: '../dist',
  },
  resolve: {
    alias: {
      api: `${path.resolve(__dirname, './src/api/')}`,
      service: `${path.resolve(__dirname, './src/service/')}`,
      components: `${path.resolve(__dirname, './src/components/')}`,
      store: `${path.resolve(__dirname, './src/store/')}`,
      routes: `${path.resolve(__dirname, './src/routes/')}`,
    },
  },
});
