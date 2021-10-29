import { createApp } from 'vue'
// import ElementPlus from 'element-plus'
import App from './App.vue'
import router from './router/index'
import store from './store/index'
import styleImport from '@/utils/style-import'
// 你好
const app = createApp(App)
styleImport(app).use(router).use(store).mount('#app')
