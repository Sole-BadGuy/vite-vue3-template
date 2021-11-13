<template>
  <div class="dashboard-container">
    <component :is="currentRole" />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onBeforeMount, ref } from 'vue'
import { useStore } from '@/store'
import AdminDashboard from './admin/Index.vue'
import EditorDashboard from './editor/Index.vue'

export default defineComponent({
  components: {
    AdminDashboard,
    EditorDashboard
  },
  setup() {
    const store = useStore()
    const currentRole = ref('AdminDashboard')
    const roles = computed(() => {
      return store.state.user.roles
    })
    onBeforeMount(() => {
      if (!roles.value.includes('admin')) {
        currentRole.value = 'EditorDashboard'
      }
    })
    return {
      currentRole
    }
  }
})
</script>
