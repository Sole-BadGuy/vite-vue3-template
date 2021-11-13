/*
布局配置
 */
interface LayoutSettings {
  // 控制设置面板显示
  showSettings: boolean
  // 控制tagsview显示
  showTagsView: boolean
  // 控制边栏标志显示
  showSidebarLogo: boolean
  // 如果为true，将修复报头组件
  fixedHeader: boolean
  // 如果为true，将根据主题改变侧边栏的活动文本颜色
  sidebarTextTheme: boolean
}

// 自定义设置
const layoutSettings: LayoutSettings = {
  showSettings: true,
  showTagsView: true,
  fixedHeader: false,
  showSidebarLogo: true,
  sidebarTextTheme: true
}

export default layoutSettings
