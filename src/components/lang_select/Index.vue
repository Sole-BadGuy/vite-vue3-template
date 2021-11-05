<!--
 * @Description: 语言选择
 * @Author: ZY
 * @Date: 2020-12-23 20:06:29
 * @LastEditors: ZY
 * @LastEditTime: 2021-01-25 20:05:16
-->
<template>
  <div>
    <el-dropdown>
      <svg class="icon" aria-hidden="true" font-size="20px" :class="{ 'svg-color': isWhite }">
        <use xlink:href="#iconlanguage" />
      </svg>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item
            v-for="item in languages"
            :key="item.value"
            :disabled="language === item.value"
          >
            <span @click="handleSetLanguage(item.value)">{{ item.name }}</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, toRefs } from 'vue'
// import { AppActionTypes } from '@/store/modules/app/action-types'
import { useI18n } from 'vue-i18n'
import { ElMessage } from 'element-plus'
import { useStore } from '@/store'

type Language = {
  name: string
  value: string
}

export default defineComponent({
  props: {
    isWhite: {
      type: Boolean,
      default: false
    }
  },
  setup() {
    const store = useStore()
    const { locale } = useI18n()
    const state = reactive({
      languages: [
        { name: 'en', value: 'en' },
        { name: '中文', value: 'zh-cn' }
      ] as Array<Language>,
      // 改变语言
      handleSetLanguage: (lang: string) => {
        console.log(lang)
        locale.value = lang
        // store.dispatch(AppActionTypes.ACTION_SET_LANGUAGE, lang)
        ElMessage({
          message: '恭喜您已经更新语言成功',
          type: 'success'
        })
      }
    })
    const language = computed(() => {
      return store.state.app.language
    })
    return {
      // state是一个响应式的数据 toRefs的作用是 改变这个数据不会引起UI界面的更新
      ...toRefs(state),
      language
    }
  }
})
</script>

<style lang="less" scoped>
.svg-color {
  fill: white;
}
</style>
