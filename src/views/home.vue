<!-- 登录页面 -->
<template>
  <div class="login-container">
    <!-- 登录背景 -->
    <video poster="../assets/video-cover.jpeg" loop autoplay muted>
      <source src="../assets/night.mp4" />
    </video>
    <el-form class="login-form">
      <div class="title-container">
        <h3 class="title">{{ t('login.title') }}</h3>
        <LangSelect :isWhite="true" class="set-language" />
      </div>
    </el-form>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import LangSelect from '@/components/lang_select/Index.vue'

export default defineComponent({
  components: {
    LangSelect
  },
  setup() {
    const { t } = useI18n()
    console.log(t('login.title'))
    return {
      t
    }
  }
})
</script>

<style scoped lang="less">
.login-container {
  width: 100%;
  height: 100%;
  overflow: hidden;
  video {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    z-index: -1;
  }
  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
    .title-container {
      position: relative;
      .title {
        color: antiquewhite;
        font-size: 26px;
        margin: 0px auto 40px auto;
        text-align: center;
        font-weight: bold;
      }
    }
  }
}
</style>
