import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Layout from '@/layout/Index.vue'
import Home from '@/views/home.vue'

// 获取文件得到普通路由图
const constantFiles = import.meta.globEager('./constantModules/*.ts')
let constantModules: Array<RouteRecordRaw> = []
Object.keys(constantFiles).forEach((key) => {
  if (key === './index.ts') return
  constantModules = constantModules.concat(constantFiles[key].default)
})
// 权限路由图
const asyncFiles = import.meta.globEager('./permissionModules/*.ts')
let permissionModules: Array<RouteRecordRaw> = []
Object.keys(asyncFiles).forEach((key) => {
  if (key === './index.ts') return
  permissionModules = permissionModules.concat(asyncFiles[key].default)
})
export const routes: Array<RouteRecordRaw> = [
  {
    path: '/redirect',
    component: Home,
    meta: { hidden: true },
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/Index.vue')
      }
    ]
  },
  // 首页
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/Index.vue'),
        name: 'Dashboard',
        meta: {
          title: 'dashboard',
          icon: '#icon-fullscreen',
          affix: true
        }
      }
    ]
  },
  ...constantModules
]

export const asyncRoutes: Array<RouteRecordRaw> = [...permissionModules]
const router = createRouter({
  history: createWebHashHistory(),
  routes
})
export function resetRouter() {
  const newRouter = router
  ;(router as any).matcher = (newRouter as any).matcher // reset router
}

export default router
