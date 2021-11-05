import { Store as VuexStore, CommitOptions, DispatchOptions, Module } from 'vuex'
// 根状态池
import { RootState } from '@/store'
import { state } from './state'
import { mutations, Mutations } from './mutations'
import { actions, Actions } from './actions'
// 声明导入的是类型 如ts的interface
import type { AppState } from './state'

export { AppState }
// <S = AppState> 是泛型的意思 代表可以是任意类型
export type AppStore<S = AppState> = Omit<VuexStore<S>, 'getters' | 'commit' | 'dispatch'> & {
  commit<K extends keyof Mutations, P extends Parameters<Mutations[K]>[1]>(
    key: K,
    payload: P,
    options?: CommitOptions
  ): ReturnType<Mutations[K]>
} & {
  dispatch<K extends keyof Actions>(
    key: K,
    payload: Parameters<Actions[K]>[1],
    options?: DispatchOptions
  ): ReturnType<Actions[K]>
}
export const store: Module<AppState, RootState> = {
  state,
  mutations,
  actions
}
