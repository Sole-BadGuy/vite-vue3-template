<!--
  侧边栏item 目前有问题 就是 不支持如果有两级路由 末级路由只有一个
-->
<template>
  <div v-if="!item.meta || !item.meta.hidden" :class="[isCollapse ? 'simple-mode' : 'full-mode']">
    <template v-if="!alwaysShowRootMenu && theOnlyOneChild && !theOnlyOneChild.children">
      <!-- 一级菜单 -->
      <SidebarItemLink
        v-if="theOnlyOneChild.meta && theOnlyOneChild.meta.title"
        :to="resolvePath(theOnlyOneChild.path)"
      >
        <el-menu-item :index="resolvePath(theOnlyOneChild.path)">
          <svg v-if="theOnlyOneChild.meta.icon" class="icon" aria-hidden="true" font-size="17px">
            <use :xlink:href="theOnlyOneChild.meta.icon" />
          </svg>
          <span v-if="theOnlyOneChild.meta.title">{{
            t('route.' + theOnlyOneChild.meta.title)
          }}</span>
        </el-menu-item>
      </SidebarItemLink>
    </template>
    <!-- 二级菜单 -->
    <el-sub-menu v-else :index="resolvePath(item.path)" popper-append-to-body>
      <template #title>
        <svg v-if="item.meta && item.meta.icon" class="icon" aria-hidden="true" font-size="16px">
          <use :xlink:href="item.meta.icon" />
        </svg>
        <span v-if="item.meta && item.meta.title">{{ t('route.' + item.meta.title) }}</span>
      </template>
      <template v-if="item.children">
        <!-- 回调了自己 -->
        <sidebar-item
          v-for="child in item.children"
          :key="child.path"
          :item="child"
          :is-collapse="isCollapse"
          :is-first-level="false"
          :base-path="resolvePath(child.path)"
          class="nest-menu"
        />
      </template>
    </el-sub-menu>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue'
import { RouteRecordRaw } from 'vue-router'
// import { isExternal } from '@/utils/validate'
import { useI18n } from 'vue-i18n'
import SidebarItemLink from './SidebarItemLink.vue'

export default defineComponent({
  props: {
    item: {
      type: Object as PropType<RouteRecordRaw>,
      required: true
    },
    isCollapse: {
      type: Boolean,
      required: false
    },
    // isFirstLevel: {
    //   type: Boolean,
    //   required: true
    // },
    basePath: {
      type: String,
      required: true
    }
  },
  components: {
    SidebarItemLink
  },
  setup(props) {
    // 如果存在meta并且alwaysShow属性存在就表示是二级菜单
    const alwaysShowRootMenu = computed(() => {
      if (props.item.meta && props.item.meta.alwaysShow) {
        return true
      }
      return false
    })
    // 是否有子菜单 返回子菜单数量
    const showingChildNumber = computed(() => {
      if (props.item.children) {
        const showingChildren = props.item.children.filter((item) => {
          // item.meta.hidden 表示隐藏不显示
          if (item.meta && item.meta.hidden) {
            return false
          }
          return true
        })
        return showingChildren.length
      }
      return 0
    })

    const theOnlyOneChild = computed(() => {
      if (showingChildNumber.value > 1) {
        return null
      }
      // 如果有子项 并且子项不隐藏
      if (props.item.children) {
        let theOnlyOneChildObj = Object as unknown as RouteRecordRaw
        props.item.children.some((child) => {
          // 这里暂时没有想到好的方法 用于规避路由是一级页面时 地址栏中路径为 '/path'
          // 菜单的index为'path'它俩不相等导致选中时不能渲染菜单选中后的样式
          // 这里为了解决它 在path不是以/开头时为它添加/
          if (!child.meta || !child.meta.hidden) {
            theOnlyOneChildObj = child
            return true
          }
          theOnlyOneChildObj = { ...child, path: `/${child.path}` }
          return true
        })
        return { ...theOnlyOneChildObj }
      }
      return { ...props.item, path: '' }
    })
    const resolvePath = (routePath: string) => {
      if (props.basePath && props.basePath !== '/') {
        if (routePath) {
          return `${props.basePath}/${routePath}`
        }
        return `${props.basePath}`
      }
      // 确保地址栏跟可点击菜单地址相同
      if (routePath.split('')[0] !== '/') {
        return `/${routePath}`
      }
      return `${routePath}`
    }
    const { t } = useI18n()
    return {
      t,
      alwaysShowRootMenu,
      showingChildNumber,
      theOnlyOneChild,
      resolvePath
    }
  }
})
</script>

<style lang="less" scoped>
svg {
  margin-right: 20px;
}
:deep(.el-sub-menu:hover) {
  background-color: red;
}

.simple-mode {
  svg {
    margin-left: 20px;
  }
}
</style>
