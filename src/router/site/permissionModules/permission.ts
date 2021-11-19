// 权限页面
import { RouteRecordRaw } from 'vue-router'
import Layout from '@/layout/Index.vue'

const permissionRouter: Array<RouteRecordRaw> = [
  {
    path: '/permission',
    component: Layout,
    redirect: '/permission/role',
    meta: {
      title: 'permission',
      icon: '#icon-buju',
      roles: ['admin', 'editor'],
      alwaysShow: true
    },
    children: [
      {
        path: 'page',
        component: () => import('@/views/permission/Page.vue'),
        name: 'PagePermission',
        meta: {
          title: 'pagePermission',
          roles: ['admin']
        }
      },
      {
        path: 'role',
        component: () => import('@/views/permission/role/Role.vue'),
        name: 'RolePermission',
        meta: {
          title: 'rolePermission',
          roles: ['admin'],
          other: [
            {
              key: '张三',
              label: '李四'
            }
          ]
        }
      }
    ]
  }
]
export default permissionRouter
