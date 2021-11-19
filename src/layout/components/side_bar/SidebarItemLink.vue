<template>
  <a v-if="isExternal(to)" :href="to" target="_blank" rel="noopener">
    <slot />
  </a>
  <div v-else @click="push">
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'
import { isExternal } from '@/utils/validate'

export default defineComponent({
  props: {
    to: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const router = useRouter()
    const push = () => {
      console.log(props.to)
      // 测试是否是以/开头如果是就正常跳转否则就是在最前面加一个/
      if (props.to.split('')[0] === '/') {
        router.push(props.to)
      } else {
        router.push(`/${props.to}`)
      }
    }
    return {
      push,
      isExternal
    }
  }
})
</script>
