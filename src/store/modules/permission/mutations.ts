import { MutationTree } from 'vuex'
import { RouteRecordRaw } from 'vue-router'
import { PermissionState } from './state'
import { PermissionMutationType } from './mutation-types'
import { routes as constantRoutes } from '@/router'

export type Mutations<S = PermissionState> = {
  [PermissionMutationType.SET_ROUTES](state: S, routes: RouteRecordRaw[]): void
}

export const mutations: MutationTree<PermissionState> & Mutations = {
  [PermissionMutationType.SET_ROUTES](state: PermissionState, routes: RouteRecordRaw[]) {
    state.routes = constantRoutes.concat(routes)
    state.dynamicRoutes = routes
  }
}
