// 请求登录接口 的类型接口
export interface RootObject<T> {
  code: number
  msg: string
  data: T
}
