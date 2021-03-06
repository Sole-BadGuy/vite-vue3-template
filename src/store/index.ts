// createLogger 是一个日志快照的创建函数 仅限于开发环境使用
import { createStore, createLogger } from 'vuex'
import { store as app, AppStore, AppState } from '@/store/modules/app'
import { store as user, UserStore, UserState } from '@/store/modules/user'
import { store as tagViews, TagsStore, TagsViewState } from '@/store/modules/tagsview'
import { store as permission, PermissionStore, PermissionState } from '@/store/modules/permission'
import { store as settings, SettingStore, SettingsState } from '@/store/modules/settings'

export interface RootState {
  app: AppState
  user: UserState
  tagViews: TagsViewState
  permission: PermissionState
  settings: SettingsState
}

// &的意思就是类型合并
// Pick 的意思是从类型接口里取出第二个参数的值 Pick<RootState, 'app'> 就是取出RootState里的app的值
export type Store = AppStore<Pick<RootState, 'app'>> &
  UserStore<Pick<RootState, 'user'>> &
  TagsStore<Pick<RootState, 'tagViews'>> &
  PermissionStore<Pick<RootState, 'permission'>> &
  SettingStore<Pick<RootState, 'settings'>>

// 判断环境 开发环境
const debug = process.env.NODE_ENV !== 'production'
const plugins = debug ? [createLogger({})] : []
// 这里createStore为模块上添加等属性
/**
  dispatch: Dispatch;
  commit: Commit;
  state: S;
  getters: any;
  rootState: R;
  rootGetters: any;
 */
export const store = createStore({
  plugins,
  modules: {
    app,
    user,
    tagViews,
    permission,
    settings
  }
})
// 使你使用的组件得到一个store
export function useStore(): Store {
  return store as Store
}
