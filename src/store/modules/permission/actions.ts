import { ActionTree, ActionContext } from 'vuex'
import { RouteRecordRaw } from 'vue-router'
import { RootState } from '@/store'
import { PermissionState } from './state'
import { Mutations } from './mutations'
import { PermissionMutationType } from './mutation-types'
import { PermissionActionType } from './action-types'
import { asyncRoutes } from '@/router'

type AugmentedActionContext = {
  commit<K extends keyof Mutations>(
    key: K,
    payload: Parameters<Mutations[K]>[1]
  ): ReturnType<Mutations[K]>
} & Omit<ActionContext<PermissionState, RootState>, 'commit'>
// 所有路由中是否含有用户路由规则中的路由 把含有的返回出去
const hasPermission = (roles: string[], route: RouteRecordRaw, path?: string) => {
  // 如果children存在继续往下找
  if (route.children) {
    route.children.forEach((element, index) => {
      // 路径拼接 并避免形成//
      const newPath = `${route.path}/${element.path}`.replace('//', '/')
      // 匹配不到就删除 这里用了改变函数参数的值后会影响这个值最开始传递的值的捷径
      // 这种做法是不好的  但是还没想到如何在一个对象链上删除某节点的某个元素后返回的方法
      if (!hasPermission(roles, element, newPath)) {
        route.children?.splice(index, 1)
      }
    })
  }
  return roles.some((role) => {
    // 如果规则中path在所有权限路由中能匹配到
    return path === role
  })
}

// 根据用户路由规则生成路由权限
export const filterAsyncRoutes = (routes: RouteRecordRaw[], roles: string[]) => {
  const res: RouteRecordRaw[] = []
  routes.forEach((route) => {
    const r = { ...route }
    hasPermission(roles, r)
    res.push(r)
  })
  return res
}

export interface Actions {
  [PermissionActionType.ACTION_SET_ROUTES](
    { commit }: AugmentedActionContext,
    roles: string[]
  ): void
}

export const actions: ActionTree<PermissionState, RootState> & Actions = {
  // 生成基于角色可访问的路由图
  [PermissionActionType.ACTION_SET_ROUTES]({ commit }: AugmentedActionContext, roles: string[]) {
    let accessedRoutes
    // 如果是管理员可以访问所有的路由
    if (roles.includes('admin')) {
      accessedRoutes = asyncRoutes
    } else {
      // 根据路由规则生成可访问路由
      accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
    }
    commit(PermissionMutationType.SET_ROUTES, accessedRoutes)
  }
}
