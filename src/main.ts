import { createApp } from 'vue'
// import ElementPlus from 'element-plus'
import App from './App.vue'
import router from './router/index'
import store from './store/index'
import './style/basic.less'
import styleImport from '@/utils/style-import'
import 'element-plus/dist/index.css'

const app = createApp(App)
styleImport(app).use(router).use(store).mount('#app')
