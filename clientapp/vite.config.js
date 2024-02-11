import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import mkcert from 'vite-plugin-mkcert'
import vitePluginRequire from 'vite-plugin-require'


export default defineConfig({
  plugins: [
        react(),
        vitePluginRequire.default(),
        mkcert(),
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
            '/api': 'http://localhost:44335',
        }
    },
    build: {
        target: ['es2020', 'chrome100']
    }
});
