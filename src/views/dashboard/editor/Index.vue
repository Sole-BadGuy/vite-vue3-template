<!--
  编辑权限主页
-->

<template>
  <div class="dashboard-editor-container">编辑权限主页</div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
// import PanThumb from '@/components/pan-thumb/Index.vue'
import { useStore } from '@/store'

export default defineComponent({
  components: {
    // PanThumb
  },
  setup() {
    const emptyGif = 'https://wpimg.wallstcn.com/0e03b7da-db9e-4819-ba10-9016ddfdaed3'
    const store = useStore()
    const name = computed(() => {
      return store.state.user.name
    })
    const avatar = computed(() => {
      return store.state.user.avatar
    })
    const roles = computed(() => {
      return store.state.user.roles
    })

    return {
      emptyGif,
      name,
      avatar,
      roles
    }
  }
})
</script>

<style lang="less" scoped>
.emptyGif {
  display: block;
  width: 45%;
  margin: 0 auto;
}

.dashboard-editor-container {
  background-color: #e3e3e3;
  min-height: 100vh;
  padding: 50px 60px 0px;

  .info-roles {
    font-size: 12px;
    font-weight: 700;
    color: #333;
    display: block;
  }

  .info-container {
    position: relative;
    margin-left: 190px;
    height: 150px;
    line-height: 200px;

    .display_name {
      font-size: 48px;
      line-height: 48px;
      color: #212121;
      position: absolute;
      top: 25px;
    }
  }
}
</style>
