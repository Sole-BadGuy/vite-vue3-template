import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import App from './App.vue'
import router from './router/index'
import store from './store/index'
import 'element-plus/lib/theme-chalk/index'

createApp(App).use(ElementPlus).mount('#app')
createApp(App).use(router).mount('#app')
createApp(App).mount('#app')
createApp(App).use(store).mount('#app')
