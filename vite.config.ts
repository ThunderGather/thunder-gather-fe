import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { VitePWA } from 'vite-plugin-pwa';
// import mkcert from 'vite-plugin-mkcert'
// import basicSsl from '@vitejs/plugin-basic-ssl'

export default defineConfig({
  // server: { https: true },
  plugins: [
    react(),
    // basicSsl(),
    // mkcert(),
    VitePWA({
      injectRegister: 'auto',
      includeAssets: ['favicon.png'],
      manifest: {
        name: 'thunder_gather',
        short_name: 'App',
        description: 'Your App Description',
        icons: [
          {
            src: 'favicon.png',
            sizes: '64x64 32x32 24x24 16x16',
            type: 'image/png',
          },
        ],
      },

    }),


  ],
  build: {
    outDir: 'dist',
    sourcemap: true,
  },
  define: {
    'process.env': {},
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://3.34.132.3:8080', // Your Spring Boot server URL
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },

});
