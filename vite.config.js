import { defineConfig } from 'vite';
import { resolve } from 'node:path';

const root = resolve(process.cwd(), 'dist');

export default defineConfig({
  root,
  build: {
    outDir: resolve(process.cwd(), '.vite-dist'),
    emptyOutDir: true,
    rollupOptions: {
      input: {
        home: resolve(root, 'index.html'),
        cases: resolve(root, 'cases/index.html'),
        mtsId: resolve(root, 'cases/mts-id.html'),
        mtsProfile: resolve(root, 'cases/mts-id-profile.html'),
        megafonShop: resolve(root, 'cases/megafon-shop.html'),
        internalServices: resolve(root, 'cases/internal-services.html')
      }
    }
  }
});
