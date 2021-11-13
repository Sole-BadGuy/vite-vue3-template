/* eslint-disable guard-for-in */
import { createApp } from 'vue'

/**
 * @description 加载所有 Plugins
 * @param  {ReturnType<typeofcreateApp>} app 整个应用的实例
 */
export default function loadAllPlugins(app: ReturnType<typeof createApp>) {
  // viti 批量导入文件
  const files: any = import.meta.globEager('./*.ts')
  Object.keys(files).forEach((key: string | number | symbol) => {
    if (typeof files[key].default === 'function') {
      if (key !== './index.ts') files[key].default(app)
    }
  })
}
