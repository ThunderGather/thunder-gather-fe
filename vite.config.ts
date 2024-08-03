import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { ViteFaviconsPlugin } from "vite-plugin-favicon";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    ViteFaviconsPlugin({
      logo: "public/favicon.png",
    }),
  ],
  build: {
    outDir: 'dist', // 빌드 아웃풋 디렉토리 설정
    sourcemap: true // 소스맵 생성 (필요시)
  },
  define: {
    'process.env': {}
  }
})
