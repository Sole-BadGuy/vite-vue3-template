import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
import { store } from './store'
import loadAllPlugins from './plugins'
import './style/basic.less'
import '@/assets/iconfont/iconfont.css'
import styleImport from '@/utils/style-import'
import 'element-plus/dist/index.css'
import '@/permission'

const app = createApp(App)
// 加载所有插件
loadAllPlugins(app)
styleImport(app).use(router).use(store).mount('#app')
