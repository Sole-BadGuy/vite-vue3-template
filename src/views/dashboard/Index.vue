<template>
  <div class="dashboard-container">
    <component :is="currentRole" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import AdminDashboard from './admin/Index.vue'
import EditorDashboard from './editor/Index.vue'

export default defineComponent({
  components: {
    AdminDashboard,
    EditorDashboard
  },
  setup() {
    const currentRole = ref('AdminDashboard')
    // const roles = computed(() => {
    //   return store.state.user.roles
    // })
    // onBeforeMount(() => {
    //   if (!roles.value.includes('admin')) {
    //     currentRole.value = 'EditorDashboard'
    //   }
    // })
    return {
      currentRole
    }
  }
})
</script>
