<!-- 设置 -->
<template>
  <div class="handle-button" @click="show = true">
    <el-icon style="color: #fff" fontSize="20px"><Setting /></el-icon>
  </div>
  <el-drawer title="设置" v-model="show" size="300px" destroy-on-close>
    <slot />
  </el-drawer>
</template>

<script lang="ts">
// import { useStore } from '@/store'
import { Setting } from '@element-plus/icons'
import { computed, defineComponent, ref } from 'vue'

export default defineComponent({
  components: {
    Setting
  },
  props: {
    buttonTop: {
      type: Number,
      default: 250
    }
  },
  setup() {
    const show = ref(false)
    // const store = useStore()
    const theme = computed(() => {
      return true
    })
    return {
      show,
      theme
    }
  }
})
</script>

<style lang="less" scoped>
.handle-button {
  width: 48px;
  height: 48px;
  position: absolute;
  top: 200px;
  right: 0px;
  text-align: center;
  font-size: 24px;
  border-radius: 6px 0 0 6px !important;
  z-index: 0;
  cursor: pointer;
  pointer-events: auto;
  color: #fff;
  background-color: rgb(24, 144, 255);
  display: flex;
  align-items: center;
  justify-content: center;
  i {
    font-size: 24px;
  }
}
</style>
