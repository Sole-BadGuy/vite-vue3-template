/**
 * action 异步修改Vuex里的状态值 还是要调用mutations的方法修改值
 */
import { ActionTree, ActionContext } from 'vuex'
import { RootState } from '@/store'
import { UserState, state } from './state'
import { Mutations } from './mutations'
import { UserMutationTypes } from './mutation-types'
import { UserActionTypes } from './action-types'
import { loginRequest, userInfoRequest } from '@/apis/user'
import { setToken, removeToken } from '@/utils/cookies'
import { resetRouter } from '@/router'

type AugmentedActionContext = {
  commit<K extends keyof Mutations>(
    key: K,
    payload: Parameters<Mutations[K]>[1]
  ): ReturnType<Mutations[K]>
} & Omit<ActionContext<UserState, RootState>, 'commit'>

export interface Actions {
  // 登录
  [UserActionTypes.ACTION_LOGIN](
    { commit }: AugmentedActionContext,
    userInfo: { username: string; password: string }
  ): void
  // 获取用户信息
  [UserActionTypes.ACTION_GET_USER_INFO]({ commit }: AugmentedActionContext): void
  // 重置用户Token
  [UserActionTypes.ACTION_RESET_TOKEN]({ commit }: AugmentedActionContext): void
  // 退出
  [UserActionTypes.ACTION_LOGIN_OUT]({ commit }: AugmentedActionContext): void
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
        if (res?.code === '0000' && res.data.accessToken) {
          // 把获取的token存到cookie里
          setToken(res.data.accessToken)
          commit(UserMutationTypes.SET_TOKEN, res.data.accessToken)
        }
      })
      .catch((err: any) => {
        console.log(err)
      })
  },
  // 获取用户信息
  async [UserActionTypes.ACTION_GET_USER_INFO]({ commit }: AugmentedActionContext) {
    if (state.token === '') {
      throw Error('您未登录无权访问用户信息')
    }
    await userInfoRequest().then((res) => {
      if (res?.code === 0) {
        commit(UserMutationTypes.SET_ROLES, res.data.roles)
        commit(UserMutationTypes.SET_NAME, res.data.name)
        commit(UserMutationTypes.SET_AVATAR, res.data.avatar)
        commit(UserMutationTypes.SET_INTRODUCTION, res.data.introduction)
        commit(UserMutationTypes.SET_EMAIL, res.data.email)
        return res
      }
      throw Error('验证失败，请重新登录! 如果重新登录还是验证失败请联系管理员')
    })
  },
  // 重置token
  [UserActionTypes.ACTION_RESET_TOKEN]({ commit }: AugmentedActionContext) {
    removeToken()
    commit(UserMutationTypes.SET_TOKEN, '')
    commit(UserMutationTypes.SET_ROLES, [])
  },
  // 退出登录
  [UserActionTypes.ACTION_LOGIN_OUT]({ commit }: AugmentedActionContext) {
    // 清空token
    removeToken()
    commit(UserMutationTypes.SET_TOKEN, '')
    // 清空用户规则
    commit(UserMutationTypes.SET_ROLES, [])
    // 重置路由
    resetRouter()
  }
}
