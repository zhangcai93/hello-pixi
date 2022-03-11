import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
const path = require('path');

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue()],
    server: {
        host: '0.0.0.0'
    },
    resolve: {
        alias: {
            '@assets': path.resolve(__dirname, './src/assets'),
            '@css': path.resolve(__dirname, './src/common/css'),
            '@common': path.resolve(__dirname, './src/common'),
            '@components': path.resolve(__dirname, './src/components'),
        },
    },
})
