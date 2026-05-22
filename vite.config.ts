import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  base: '/ielts-copy-pwa/',
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: 'auto',
      includeAssets: ['icons/icon-192.png', 'icons/icon-512.png', 'manifest.webmanifest'],
      manifest: false,
      workbox: {
        navigateFallback: '/ielts-copy-pwa/index.html',
        globPatterns: ['**/*.{js,css,html,json,png,svg,ico,webmanifest}'],
        runtimeCaching: [
          {
            urlPattern: /^https?:\/\/.*\/icons\/.*\.png$/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'icon-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365,
              },
            },
          },
        ],
      },
    }),
  ],
});
