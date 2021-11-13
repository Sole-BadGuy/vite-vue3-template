<!--
   公共布局入口
 -->
<template>
  <div :class="classObj" class="app-wrapper">
    <div v-if="classObj.mobile && sidebar.opened" class="drawer-bg" @click="handleClickOutside" />
    <!-- 左侧可选菜单 -->
    <Sidebar class="sidebar-container" />
    <div :class="{ hasTagsView: showTagsView }" class="main-container">
      <div :class="{ 'fixed-header': fixedHeader }">
        <!-- 右边顶部内容 -->
        <Navbar />
        <!-- 导航Tag -->
        <TagsView v-if="showTagsView" />
      </div>
      <AppMain />
      <RightPanel v-if="showSettings">
        <Settings />
      </RightPanel>
    </div>
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  onBeforeMount,
  onBeforeUnmount,
  onMounted,
  reactive,
  toRefs
} from 'vue'
// 国际化
import { useI18n } from 'vue-i18n'
import { DeviceType } from '@/store/modules/app/state'
// 创建store实例
import { useStore } from '@/store'
// app store实例类型
import { AppActionTypes } from '@/store/modules/app/action-types'
// 公共页面
import { AppMain, Navbar, Settings, TagsView, Sidebar } from './components'
import RightPanel from '@/components/right_panel/Index.vue'
// 根据大小重新布局
import resize from './resize'

export default defineComponent({
  name: 'Layout',
  components: {
    AppMain,
    Navbar,
    RightPanel,
    Settings,
    Sidebar,
    TagsView
  },
  setup() {
    const { t } = useI18n()
    const store = useStore()
    const {
      sidebar,
      device,
      addEventListenerOnResize,
      resizeMounted,
      removeEventListenerResize,
      watchRouter
    } = resize()
    const state = reactive({
      handleClickOutside: () => {
        store.dispatch(AppActionTypes.ACTION_CLOSE_SIDEBAR, false)
      }
    })

    const classObj = computed(() => {
      return {
        hideSidebar: !sidebar.value.opened,
        openSidebar: sidebar.value.opened,
        withoutAnimation: sidebar.value.withoutAnimation,
        mobile: device.value === DeviceType.Mobile
      }
    })

    const showSettings = computed(() => {
      return store.state.settings.showSettings
    })
    const showTagsView = computed(() => {
      return store.state.settings.showTagsView
    })
    const fixedHeader = computed(() => {
      return store.state.settings.fixedHeader
    })

    watchRouter()
    onBeforeMount(() => {
      addEventListenerOnResize()
    })

    onMounted(() => {
      resizeMounted()
    })

    onBeforeUnmount(() => {
      removeEventListenerResize()
    })
    return {
      t,
      classObj,
      sidebar,
      showSettings,
      showTagsView,
      fixedHeader,
      ...toRefs(state)
    }
  }
})
</script>

<style lang="less" scoped>
.app-wrapper {
  position: relative;
  height: 100%;
  width: 100%;
  background-color: #f2f7ff;
}

.drawer-bg {
  background: #000;
  opacity: 0.3;
  width: 100%;
  top: 0;
  height: 100%;
  position: absolute;
  z-index: 999;
}

.main-container {
  min-height: 100%;
  transition: margin-left 0.28s;
  margin-left: 300px;
  position: relative;
}

.sidebar-container {
  transition: width 0.28s;
  width: 300px !important;
  height: 100%;
  position: fixed;
  font-size: 0px;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 1001;
  overflow: hidden;
}

.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  transition: width 0.28s;
}

.hideSidebar {
  .main-container {
    margin-left: 54px;
  }

  .sidebar-container {
    width: 54px !important;
  }

  .fixed-header {
    width: calc(100% - 54px);
  }
}

/* for mobile response 适配移动端 */
.mobile {
  .main-container {
    margin-left: 0px;
  }

  .sidebar-container {
  }

  &.openSidebar {
    position: fixed;
    top: 0;
  }

  &.hideSidebar {
    .sidebar-container {
      pointer-events: none;
      transition-duration: 0.3s;
    }
  }

  .fixed-header {
    width: 100%;
  }
}

.withoutAnimation {
  .main-container,
  .sidebar-container {
    transition: none;
  }
}
</style>
