import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'
import Components from "unplugin-vue-components/vite"
import { VantResolver } from "unplugin-vue-components/resolvers"

import VantComponents from 'unplugin-vue-components/vite'
// https://vite.dev/config/
export default defineConfig({
  base: './',  // 设置资源的相对路径
  plugins: [
    vue(),
    vueJsx(),
    vueDevTools(),
    Components({
      resolvers: [VantResolver()],
    }),
    VantComponents({
      // 处理@vant/auto-import-resolver插件对某些组件的样式无法引入 例如：toast弹窗
      resolvers: [VantResolver({
        importStyle: false,
      })],
    })
  ],

  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    // 修改这里的端口号
    port: 8222,
  },
})
