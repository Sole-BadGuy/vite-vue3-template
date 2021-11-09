// 封装网络请求
// axios-mapper 对请求以及返回数据的类型转换 防止重复的网络请求
import HttpClient, { HttpClientConfig } from 'axios-mapper'
import { useStore } from '@/store'
import networkConfig from '@/config/default/net.config'

const https = (hasToken: Boolean = true) => {
  const config: HttpClientConfig = {
    baseURL: networkConfig.host,
    headers: {
      token: hasToken ? useStore().state.user.token : ''
    }
  }
  return new HttpClient(config)
}

export default https
