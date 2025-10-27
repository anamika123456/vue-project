import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import { viteCommonjs } from '@originjs/vite-plugin-commonjs'
import { esbuildCommonjs } from '@originjs/vite-plugin-commonjs'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import fs from 'fs'

// ana https://vitejs.dev/config/
export default defineConfig({
  optimizeDeps:{
    esbuildOptions:{
      plugins:[
        esbuildCommonjs(['buffer','react-zlib-js']) 
      ]
    }
  },
  server: {
    host: '0.0.0.0',
    port: 2012,
    liveReload: false,
    hmr: { overlay: false },
    fs: {
      allow: ['.']
    }
    /*https: {
      key: fs.readFileSync('/etc/letsencrypt/live/dev.finvasia.com/privkey.pem'),
      cert: fs.readFileSync('/etc/letsencrypt/live/dev.finvasia.com/fullchain.pem'),
    },*/
  },
  plugins: [vue(), vueJsx(),viteCommonjs()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
