import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/postcss';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('.', import.meta.url));
const base = '/Portfolio/';

export default defineConfig({
  root: `${root}github-pages`,
  base,
  publicDir: `${root}public`,
  resolve: { alias: { '@': root } },
  css: { postcss: { plugins: [tailwindcss()] } },
  plugins: [
    {
      name: 'portfolio-pages-asset-paths',
      enforce: 'pre',
      transform(code, id) {
        if (!id.startsWith(root) || id.includes('/node_modules/')) return;
        if (!/\.(tsx?|css)$/.test(id)) return;
        // The same components run at / locally and under /Portfolio/ on Pages.
        return code.replace(
          /(["'])\/(art|media|sounds|documents)\//g,
          `$1${base}$2/`,
        );
      },
    },
    react(),
  ],
  build: { outDir: `${root}dist-github`, emptyOutDir: true },
});
