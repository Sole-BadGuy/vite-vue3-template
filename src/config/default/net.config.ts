// 请求头设置
import { ContentType, Device } from '@/constant/headers'
import { InfoShowType } from '@/constant/network'
import settings from './setting.config'

interface Headers {
  token: string
  contentType: string
  version: string
  device: Device
}

// 请求头设置
// eslint-disable-next-line no-underscore-dangle
const _header: Headers = {
  token: '',
  contentType: ContentType.JSON,
  version: settings.version ?? '1.0',
  device: Device.PC
}

export interface NetworkConfig {
  host?: string
  timeout?: number
  loading?: false
  errorShowType?: InfoShowType
  header?: {}
}

const networkConfig: NetworkConfig = {
  host: import.meta.env.VITE_APP_BASE_URL as string | undefined,
  timeout: 10000,
  loading: false,
  errorShowType: InfoShowType.LOG,
  header: _header
}

export default networkConfig
