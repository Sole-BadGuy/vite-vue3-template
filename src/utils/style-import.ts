import { App } from 'vue'
import {
  ElIcon,
  ElLoading,
  ElCard,
  ElButton,
  ElForm,
  ElFormItem,
  ElInput,
  ElDropdown,
  ElDropdownItem
} from 'element-plus'

/**
 * 按需导入 Element Plus 组件
 * Vite 插件 https://github.com/element-plus/vite-plugin-element-plus
 * @param app {App}
 */
export default function styleImport(app: App) {
  ;[
    ElButton,
    ElCard,
    ElLoading,
    ElIcon,
    ElForm,
    ElFormItem,
    ElInput,
    ElDropdown,
    ElDropdownItem
  ].forEach((v) => {
    app.use(v)
  })
  return app
}
