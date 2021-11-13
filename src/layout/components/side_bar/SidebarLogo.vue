<!--侧边栏logo(需要跟随侧边栏折叠)-->
<template>
  <div class="sidebar-logo-container" :class="{ collapse: collapse }">
    <transition name="sidebarLogoFade">
      <router-link v-if="false" key="collapse" class="sidebar-logo-link" to="/">
        <img src="favicon.ico" class="sidebar-logo" />
      </router-link>
      <router-link v-else key="expand" class="sidebar-logo-link" to="/">
        <img src="favicon.ico" class="sidebar-logo" />
        <h1 class="sidebar-title">
          {{ title }}
        </h1>
      </router-link>
    </transition>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import settings from '@/config/default/setting.config'

export default defineComponent({
  props: {
    collapse: {
      type: Boolean,
      default: true
    }
  },
  setup() {
    const { title } = settings
    return {
      title
    }
  }
})
</script>

<style lang="less" scoped>
.sidebarLogoFade-enter-active {
  transition: opacity 1.5s;
}

.sidebarLogoFade-enter,
.sidebarLogoFade-leave-to {
  opacity: 0;
}

.sidebar-logo-container {
  position: relative;
  width: 100%;
  height: 50px;
  line-height: 50px;
  background: rgb(255, 255, 255);
  text-align: center;
  overflow: hidden;

  & .sidebar-logo-link {
    height: 100%;
    width: 100%;

    & .sidebar-logo {
      width: 32px;
      height: 32px;
      vertical-align: middle;
      margin-right: 0px;
    }

    & .sidebar-title {
      display: inline-block;
      margin: 0;
      color: rgb(87, 202, 235);
      font-weight: 600;
      line-height: 50px;
      font-size: 24px;
      font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
      vertical-align: middle;
    }
  }

  &.collapse {
    .sidebar-logo {
      margin-right: 12px;
    }
  }
}
</style>
