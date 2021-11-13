import { Store as VuexStore, CommitOptions, DispatchOptions, Module } from 'vuex'
// 根状态池
import { RootState } from '@/store'
// 设置 的公共状态
import { state } from './state'
import { mutations, Mutations } from './mutations'
import { actions, Actions } from './actions'
import type { SettingsState } from './state'

export { SettingsState }

export type SettingStore<S = SettingsState> = Omit<
  VuexStore<S>,
  'getters' | 'commit' | 'dispatch'
> & {
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
export const store: Module<SettingsState, RootState> = {
  state,
  mutations,
  actions
}
