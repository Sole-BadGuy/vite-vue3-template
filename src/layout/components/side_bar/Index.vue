<template>
  <div :class="{ 'has-logo': showLogo }">
    <SidebarLogo v-if="showLogo" :collapse="isCollapse" />
    <!-- 侧边栏 -->
    <!-- el-scrollbar 滚动条组件 -->
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <!-- 导航功能的菜单 -->
      <el-menu
        :collapse="!isCollapse"
        :unique-opened="false"
        :default-active="activeMenu"
        text-color="#000"
        :active-text-color="menuActiveTextColor"
        mode="vertical"
        router
      >
        <SidebarItem
          v-for="route in routes"
          :key="route.path"
          :item="route"
          :base-path="route.path"
          :is-collapse="isCollapse"
        />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useRoute } from 'vue-router'
import SidebarItem from './SidebarItem.vue'
import SidebarLogo from './SidebarLogo.vue'
import { layutCss } from '@/style/layut'
import { useStore } from '@/store'

export default defineComponent({
  components: {
    SidebarItem,
    SidebarLogo
  },
  setup() {
    const store = useStore()
    const route = useRoute()
    const sidebar = computed(() => {
      return store.state.app.sidebar
    })

    const routes = computed(() => {
      return store.state.permission.routes
    })
    // 是否显示logo
    const showLogo = computed(() => {
      return store.state.settings.showSidebarLogo
    })
    console.log(showLogo.value)
    const menuActiveTextColor = computed(() => {
      if (store.state.settings.sidebarTextTheme) {
        return store.state.settings.theme
      }
      return layutCss.primary
    })

    const activeMenu = computed(() => {
      const { meta, path } = route
      if (meta !== null || meta !== undefined) {
        if (meta.activeMenu) {
          return meta.activeMenu
        }
      }
      return path
    })

    const isCollapse = computed(() => {
      return sidebar.value.opened
    })
    return {
      sidebar,
      routes: routes.value,
      menuActiveTextColor,
      showLogo,
      activeMenu,
      isCollapse
    }
  }
})
</script>

<style lang="less">
.sidebar-container {
  .horizontal-collapse-transition {
    transition: 0s width ease-in-out, 0s padding-left ease-in-out, 0s padding-right ease-in-out;
  }

  .scrollbar-wrapper {
    overflow-x: hidden !important;
  }

  .el-scrollbar__view {
    height: 100%;
  }

  .el-scrollbar__bar {
    &.is-vertical {
      right: 0px;
    }

    &.is-horizontal {
      display: none;
    }
  }
}
</style>

<style lang="less" scoped>
.el-scrollbar {
  height: 100%;
}

.has-logo {
  .el-scrollbar {
    // height: calc(100% - 50px);
  }
}

.el-menu {
  border: none;
  height: 100%;
  width: 100% !important;
  background-color: #fff;
  :deep(.el-menu-item:hover) {
    background-color: #8a9bdb;
  }
  :deep(.el-sub-menu__title) {
    background-color: #fff;
  }
  :deep(.el-sub-menu__title:hover) {
    background-color: #8a9bdb;
  }
}
</style>
