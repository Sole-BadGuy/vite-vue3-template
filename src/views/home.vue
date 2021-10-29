<template>
  <div class="loading">
    <el-form :model="formInline">
      <el-form-item
        label="账号"
        :rules="[
          { required: true, message: '账户是必填项' },
          { type: 'number', message: '账号只能是数字' }
        ]"
      >
        <el-input v-model="formInline.account"></el-input>
      </el-form-item>
      <el-form-item label="密码" :rules="[{ required: true, message: '密码是必填项' }]">
        <el-input v-model="formInline.passWord"></el-input>
      </el-form-item>
      <el-form-item class="loadingHandle">
        <div>
          <el-button type="primary" plain>登录</el-button>
          <el-button type="primary" plain>注册</el-button>
        </div>
        <a>忘记密码</a>
      </el-form-item>
    </el-form>
  </div>
</template>
<script lang="ts" setup>
import { ref, Ref } from 'vue'

const formInline: Ref = ref({})
</script>

<style scoped lang="less">
.loading {
  width: 600px;
  height: 400px;
  background-color: rgb(184, 236, 174);
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 20px;
  border-radius: 6px;
  box-shadow: 7px 5px 10px 2px #4bb89fba, -7px -5px 10px 2px #4bb89fba;
  .loadingHandle {
    /deep/ .el-form-item__content {
      display: flex;
      justify-content: space-around;
    }
  }
}
</style>
