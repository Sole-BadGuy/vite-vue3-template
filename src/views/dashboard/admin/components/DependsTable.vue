<!--
  依赖包表格
-->
<template>
  <el-card class="card" shadow="never">
    <div>
      <span>依赖信息</span>
      <div style="float: right">部署时间:{{ updateTime }}</div>
    </div>

    <div class="bottom-btn">
      <a target="_blank" href="https://github.com/vuejs/vue-next">
        <el-button type="success"> vue3.x </el-button>
      </a>
      <a target="_blank" href="https://element-plus.gitee.io/#/zh-CN">
        <el-button type="primary"> element-plus </el-button>
      </a>
      <a target="_blank" href="https://github.com/intlify/vue-i18n-next">
        <el-button type="warning">vue-i18n-next</el-button>
      </a>
      <a target="_blank" href="https://www.tslang.cn/docs/home.html">
        <el-button type="primary">ts-3.9.3</el-button>
      </a>
    </div>
  </el-card>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'

export default defineComponent({
  setup() {
    const state = reactive({
      updateTime: 12.66
    })
    return {
      ...toRefs(state)
    }
  }
})
</script>

<style lang="less" scoped>
.table {
  width: 100%;
  color: #666;
  border-collapse: collapse;
  background-color: #fff;

  td {
    position: relative;
    min-height: 20px;
    padding: 9px 15px;
    font-size: 14px;
    line-height: 20px;
    border: 1px solid #e6e6e6;

    &:nth-child(odd) {
      width: 20%;
      text-align: right;
      background-color: #f7f7f7;
    }
  }
}

.bottom-btn {
  button {
    margin: 16px 10px 15px 0;
  }
}
</style>
