import { GenerateSW } from '@aaroon/workbox-rspack-plugin';
import { defineConfig } from '@rsbuild/core';
import { RsdoctorRspackPlugin } from '@rsdoctor/rspack-plugin';
import { pluginHtmlMinifierTerser } from 'rsbuild-plugin-html-minifier-terser';

export default defineConfig({
  plugins: [pluginHtmlMinifierTerser()],
  html: {
    template: './public/index.html',
  },
  output: {
    cleanDistPath: true,
    distPath: {
      root: '../../dist',
    },
  },
  tools: {
    rspack: {
      plugins: [
        new GenerateSW({
          swDest: 'sw.js',
          clientsClaim: true,
          skipWaiting: true,
          maximumFileSizeToCacheInBytes: 5 * 1024 * 1024, // 5MB
          navigateFallback: '/index.html',
          runtimeCaching: [
            {
              urlPattern:
                /^https:\/\/api-game\.bloque\.app\/game\/leaderboard$/,
              handler: 'NetworkFirst',
              options: {
                cacheName: 'leaderboard-cache',
                expiration: {
                  maxEntries: 10,
                  maxAgeSeconds: 60 * 10, // 5 minutos
                },
              },
            },
            {
              urlPattern: /^https:\/\/api-game\.bloque\.app\/game\/market$/,
              handler: 'NetworkFirst',
              options: {
                cacheName: 'market-cache',
                expiration: {
                  maxEntries: 10,
                  maxAgeSeconds: 60 * 10, // 10 minutos
                },
              },
            },
          ],
        }),
        // @ts-expect-error
        import.meta.env.RSDOCTOR && new RsdoctorRspackPlugin(),
      ].filter(Boolean),
    },
  },
});
