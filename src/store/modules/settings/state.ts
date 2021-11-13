// layoutSettings的公共设置
import { layutCss } from '@/style/layut'
import layoutSettings from '@/config/default/layout'

export interface SettingsState {
  theme: String
  fixedHeader: boolean
  showSettings: boolean
  showTagsView: boolean
  showSidebarLogo: boolean
  sidebarTextTheme: boolean
}

export const state: SettingsState = {
  theme: layutCss.primary,
  fixedHeader: layoutSettings.fixedHeader,
  showSettings: layoutSettings.showSettings,
  showTagsView: layoutSettings.showTagsView,
  showSidebarLogo: layoutSettings.showSidebarLogo,
  sidebarTextTheme: layoutSettings.sidebarTextTheme
}
