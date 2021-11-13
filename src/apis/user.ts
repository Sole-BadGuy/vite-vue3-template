// 返回参数类型
import { RequestParams, ContentType, Method } from 'axios-mapper'
import { RootObject } from '@/model/rootObject'
import { UserInfoModel } from '@/model/userModel'
import https from '@/utils/https'

interface LoginModel {
  accessToken: string
}

// 登录请求
export const loginRequest = (userInfo: RequestParams) => {
  return https(false).request<RootObject<LoginModel>>(
    'user/login',
    Method.POST,
    userInfo,
    ContentType.json
  )
}
// 获取用户信息请求
export const userInfoRequest = () => {
  return https().request<RootObject<UserInfoModel>>(
    'user/userInfo',
    Method.GET,
    undefined,
    ContentType.form
  )
}
