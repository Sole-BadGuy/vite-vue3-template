<!-- 登录页面 -->
<template>
  <div class="login-container">
    <!-- 登录背景 -->
    <video poster="../assets/video-cover.jpeg" loop autoplay muted>
      <source src="../assets/night.mp4" />
    </video>
    <el-form class="login-form" :model="loginForm" ref="loginFormRef">
      <div class="title-container">
        <h3 class="title">{{ t('login.title') }}</h3>
        <LangSelect :isWhite="true" class="set-language" />
      </div>
      <el-form-item
        prop="username"
        :rules="[
          {
            required: true,
            message: '请输入账号',
            trigger: 'blur'
          }
        ]"
      >
        <span class="svg-container">
          <i class="el-icon-user" />
        </span>
        <el-input
          name="username"
          type="text"
          v-model="loginForm.username"
          :placeholder="t('login.username')"
          tabindex="1"
          autocomplete="on"
        />
      </el-form-item>
      <el-form-item
        prop="password"
        :rules="[
          {
            required: true,
            message: '请输入密码',
            trigger: 'blur'
          },
          {
            validator: validateUsername,
            trigger: 'blur'
          }
        ]"
      >
        <span class="svg-container">
          <i class="el-icon-lock" />
        </span>
        <el-input
          name="password"
          type="password"
          v-model="loginForm.password"
          :placeholder="t('login.username')"
        />
      </el-form-item>
      <el-button class="loginBtn" type="primary" :loading="loading" @click.prevent="handleLogin">
        {{ t('login.logIn') }}
      </el-button>
      <div class="registerBtn">
        <a @click.prevent="handleRegister">
          {{ t('login.register') }}
        </a>
      </div>
    </el-form>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs, ref, watch, onMounted, watchEffect } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter, LocationQuery, useRoute } from 'vue-router'
import { useStore } from '@/store'
import LangSelect from '@/components/lang_select/Index.vue'
import { UserActionTypes } from '@/store/modules/user/action-types'

export default defineComponent({
  components: {
    LangSelect
  },
  setup() {
    const { t } = useI18n()
    const loginFormRef = ref(null)
    const store = useStore()
    const router = useRouter()
    const route = useRoute()
    // 账号密码
    const state = reactive({
      loginForm: {
        username: 'admin',
        password: '8888888888888'
      },
      loading: false,
      redirect: '',
      otherQuery: {}
    })
    const methods = reactive({
      // 登录验证
      validateUsername: (rule: any, value: string, callback: Function) => {
        // 不为空
        if (value.trim().length < 11) {
          callback(new Error('账号长度为11位'))
        } else {
          callback()
        }
      },
      // 登录事件
      handleLogin: () => {
        ;(loginFormRef.value as any).validate(async (valid: Boolean) => {
          if (valid) {
            state.loading = true
            // 请求后台拿到登录态
            await store.dispatch(UserActionTypes.ACTION_LOGIN, state.loginForm)
            state.loading = false
            console.log(state.redirect)
            // 跳转到首页
            router
              .push({
                path: state.redirect || '/',
                query: state.otherQuery
              })
              .catch((err: any) => {
                console.warn(err)
              })
            return true
          }
          return false
        })
      },
      // 去注册
      handleRegister: () => {}
    })
    function getOtherQuery(query: LocationQuery) {
      return Object.keys(query).reduce((acc, cur) => {
        const newacc = acc
        if (cur !== 'redirect') {
          newacc[cur] = query[cur]
        }
        return newacc
      }, {} as LocationQuery)
    }
    watch(
      () => route.query,
      (query) => {
        if (query) {
          state.redirect = query.redirect?.toString() ?? ''
          state.otherQuery = getOtherQuery(query)
        }
      },
      {
        deep: true
      }
    )

    console.log('我白泥湖', state.redirect)

    // 挂载
    onMounted(() => {
      console.log('onMounted')
    })
    // 类似与react的useEffect
    const stop = watchEffect(() => {}, {})
    stop()
    return {
      t,
      ...toRefs(state),
      ...toRefs(methods),
      loginFormRef
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
  :deep(.el-form-item__content) {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background-color: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
    .el-input {
      display: inline-block;
      width: 85%;
      height: 47px;
      input {
        height: 47px;
        background-color: transparent;
        color: rgb(255, 255, 255);
        border: 0px;
        border-radius: 0px;
        padding: 12px 5px 12px 15px;
        -webkit-appearance: none;
      }
      // 设置输入框自动填充的延迟属性
      input:-webkit-autofill,
      input:-webkit-autofill:hover,
      input:-webkit-autofill:focus,
      input:-webkit-autofill:active {
        -webkit-transition-delay: 99999s;
        -webkit-transition: color 99999s ease-out, background-color 99999s ease-out;
      }
      // 设置填充色为透明
      input:-webkit-autofill {
        box-shadow: 0 0 0 1000px transparent inset !important;
      }
    }
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
    .set-language {
      color: #fff;
      position: absolute;
      top: 16px;
      font-size: 18px;
      right: 0px;
      cursor: pointer;
    }
  }
}
.svg-container {
  padding: 6px 5px 6px 15px;
  vertical-align: middle;
  color: #889aa4;
  width: 15px;
  display: inline-block;
}
.loginBtn {
  width: 100%;
}
.registerBtn {
  font-size: 16px;
  color: rgb(224, 248, 6);
  text-align: right;
  margin-top: 15px;
}
</style>
