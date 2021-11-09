/*
 * @Description: setting moudle
 * @Author: ZY
 * @Date: 2020-12-23 10:25:37
 * @LastEditors: ZY
 * @LastEditTime: 2021-01-05 15:39:26
 */
import { Store as VuexStore, CommitOptions, DispatchOptions, Module } from 'vuex'

// TODO: How to surpass cyclical dependency linting errors cleanly?
import { RootState } from '@/store'
import { state } from './state'
import { mutations, Mutations } from './mutations'
import { actions, Actions } from './actions'
import type { UserState } from './state'

export { UserState }

// Omit 的意思是接受两个泛型参数 第一个是类型接口 后面是条件 Omit的作用是取出除了条件里的类型
// Parameters 是把后面接口的值变成元组
// extends是限定类型范围
// ReturnType是类型推断
export type UserStore<S = UserState> = Omit<VuexStore<S>, 'getters' | 'commit' | 'dispatch'> & {
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
export const store: Module<UserState, RootState> = {
  state,
  mutations,
  actions
}
