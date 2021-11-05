// createLogger 是一个日志快照的创建函数 仅限于开发环境使用
import { createStore, createLogger } from 'vuex'
import { store as app, AppStore, AppState } from '@/store/modules/app'

export interface RootState {
  app: AppState
}

export type Store = AppStore<Pick<RootState, 'app'>>
// 判断环境 开发环境
const debug = process.env.NODE_ENV !== 'production'
const plugins = debug ? [createLogger({})] : []
export const store = createStore({
  plugins,
  modules: {
    app
  }
})

export function useStore(): Store {
  return store as Store
}
