import type { UserConfig, ConfigEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { loadEnv } from 'vite'
import vueI18n from '@intlify/vite-plugin-vue-i18n'
// 如果编辑器提示 path 模块找不到，则可以安装一下 @types/node -> npm i @types/node -D
import { resolve } from 'path'
import compressPlugin from 'vite-plugin-compression'
import generateZip from './src/utils/zip'

export default ({ mode }: ConfigEnv): UserConfig => {
  const root = process.cwd()
  const { VITE_APP_PORT = 'boss' } = loadEnv(mode, root)
  return {
    plugins: [
      vue(),
      vueI18n({
        include: resolve(__dirname, './path/to/src/locales/**')
      }),
      compressPlugin({
        ext: '.gz',
        deleteOriginFile: false,
        threshold: 500,
        success: () => {
          generateZip(VITE_APP_PORT)
        }
      })
    ],
    resolve: {
      alias: [
        {
          find: '@',
          replacement: resolve(__dirname, 'src')
        }
      ]
    },
    base: './', // 设置打包路径
    server: {
      port: 4000, // 设置服务启动端口号
      open: true, // 设置服务启动时是否自动打开浏览器
      cors: true // 允许跨域

      // 设置代理，根据我们项目实际情况配置
      // proxy: {
      //   '/api': {
      //     target: 'http://xxx.xxx.xxx.xxx:8000',
      //     changeOrigin: true,
      //     secure: false,
      //     rewrite: (path) => path.replace('/api/', '/')
      //   }
      // }
    }
    // 生产环境移除console
    // build: {
    //   terserOptions: {
    //     compress: {
    //       drop_console: true
    //     }
    //   },
    //   outDir: 'zip' // 指定输出路径
    // }
  }
}
