/**
 * action 异步修改Vuex里的状态值 还是要调用mutations的方法修改值
 */
import { ActionTree, ActionContext } from 'vuex'
import { RootState } from '@/store'
import { UserState } from './state'
import { Mutations } from './mutations'
import { UserMutationTypes } from './mutation-types'
import { UserActionTypes } from './action-types'
import { loginRequest } from '@/apis/user'
import { setToken } from '@/utils/cookies'

type AugmentedActionContext = {
  commit<K extends keyof Mutations>(
    key: K,
    payload: Parameters<Mutations[K]>[1]
  ): ReturnType<Mutations[K]>
} & Omit<ActionContext<UserState, RootState>, 'commit'>

export interface Actions {
  [UserActionTypes.ACTION_LOGIN](
    { commit }: AugmentedActionContext,
    userInfo: { username: string; password: string }
  ): void
}

export const actions: ActionTree<UserState, RootState> & Actions = {
  // 登录请求
  async [UserActionTypes.ACTION_LOGIN](
    { commit }: AugmentedActionContext,
    userInfo: { username: string; password: string }
  ) {
    const { password } = userInfo
    let { username } = userInfo
    username = username.trim()
    await loginRequest({ username, password })
      .then(async (res: any) => {
        console.log(res)
        if (res?.code === '0000' && res.data.accessToken) {
          // 把获取的token存到cookie里
          setToken(res.data.accessToken)
          commit(UserMutationTypes.SET_TOKEN, res.data.accessToken)
        }
      })
      .catch((err: any) => {
        console.log(err)
      })
  }
}
