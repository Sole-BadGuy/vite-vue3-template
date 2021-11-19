/*
  用户管理相关路由管理
 */
import { RouteRecordRaw } from 'vue-router'

const UserManagerRouter: Array<RouteRecordRaw> = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/home.vue')
  }
]
export default UserManagerRouter
