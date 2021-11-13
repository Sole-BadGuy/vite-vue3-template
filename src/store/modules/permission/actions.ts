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

// 所有路由中是否含有用户路由规则中的路由
const hasPermission = (roles: string[], route: RouteRecordRaw) => {
  if (route.meta && route.meta.roles) {
    return roles.some((role) => {
      if (route.meta?.roles !== undefined) {
        return (route.meta.roles as String).includes(role)
      }
      return false
    })
  }
  return false
}

// 根据用户路由规则生成路由权限
export const filterAsyncRoutes = (routes: RouteRecordRaw[], roles: string[]) => {
  const res: RouteRecordRaw[] = []
  routes.forEach((route) => {
    const r = { ...route }
    if (hasPermission(roles, r)) {
      if (r.children) {
        r.children = filterAsyncRoutes(r.children, roles)
      }
      res.push(r)
    }
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
