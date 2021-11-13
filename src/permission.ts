/*
 权限
 */
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
// import { useI18n } from 'vue-i18n'
import { RouteLocationNormalized } from 'vue-router'
import { ElMessage } from 'element-plus'
import router from '@/router'
import { useStore } from './store'
import { UserActionTypes } from './store/modules/user/action-types'
import { PermissionActionType } from './store/modules/permission/action-types'
import whiteList from './config/default/whitelist'

NProgress.configure({ showSpinner: false })

router.beforeEach(async (to: RouteLocationNormalized, _: RouteLocationNormalized, next: any) => {
  // 进度条开始
  NProgress.start()
  const store = useStore()
  // 判断用户是否登录
  if (useStore().state.user.token) {
    if (to.path === '/login') {
      // 如果已登录，则重定向到主页
      next({ path: '/' })
      NProgress.done()
      // 如果已登录访问的不是主页
    } else if (store.state.user.roles.length === 0) {
      try {
        // 注意:角色必须是一个对象数组! 例如:['admin']或['developer'， 'editor']
        await store.dispatch(UserActionTypes.ACTION_GET_USER_INFO, undefined)
        const { roles } = store.state.user
        // 生成基于角色的可访问路由图
        store.dispatch(PermissionActionType.ACTION_SET_ROUTES, roles)
        // 动态添加可访问路由
        store.state.permission.dynamicRoutes.forEach((route) => {
          router.addRoute(route)
        })
        // Hack:确保addroues已完成
        // 设置replace: true，这样导航就不会留下历史记录
        next({ ...to, replace: true })
      } catch (err: any) {
        // 删除令牌并重定向到登录页面
        store.dispatch(UserActionTypes.ACTION_RESET_TOKEN, undefined)
        ElMessage.error('登录失败')
        next(`/login?redirect=${to.path}`)
        NProgress.done()
      }
    } else {
      next()
    }
  } else if (whiteList.indexOf(to.path) !== -1) {
    // 在免费登录白名单，直接过
    next()
  } else {
    // 其他没有访问权限的页面被重定向到登录页面。
    next(`/login?redirect=${to.path}`)
    NProgress.done()
  }
})

router.afterEach(() => {
  NProgress.done()
})
