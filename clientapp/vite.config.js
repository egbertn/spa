import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import viteTsconfigPaths from 'vite-tsconfig-paths';
import svgr from 'vite-plugin-svgr';
import mkcert from 'vite-plugin-mkcert'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
        react(),
        mkcert(),
        viteTsconfigPaths(),
        svgr({
        include: '**/*.svg?react',
        }),
    ],

    server: {
        https: true,
        envPrefix: 'REACT_APP_',
        ...(process.env.NODE_ENV === 'development' && {
            define: {
            global: {}
            }
        }),
        port: 5173,
        proxy: {
            '/': 'http://localhost:44335',
        }
    },
    build: {
        target: ['es2020', 'chrome100']
    }
});
