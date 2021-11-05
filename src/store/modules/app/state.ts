// 状态
import { getLocale } from '@/locales'

export enum DeviceType {
  Mobile,
  Desktop
}

export interface AppState {
  device: DeviceType
  sidebar: {
    opened: boolean
    withoutAnimation: boolean
  }
  language: string
  size: string
}

// 初始状态
export const state: AppState = {
  device: DeviceType.Desktop,
  sidebar: {
    opened: true,
    withoutAnimation: false
  },
  language: getLocale(),
  size: 'medium'
}
