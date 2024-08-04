import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
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
  // server: {
  //   proxy: {
  //     '/api': {
  //       target: 'http://3.34.132.3:8080',
  //       changeOrigin: true,
  //       rewrite: (path) => path.replace(/^\/api/, ''),
  //       secure: false,
  //       configure: (proxy) => {
  //         proxy.on('proxyReq', (proxyReq) => {
  //           // 여기에서 추가 헤더를 설정할 수 있습니다.
  //           proxyReq.setHeader('Origin', 'http://localhost:5173');
  //         });
  //       },
  //     },
  //   },
  // },
});
