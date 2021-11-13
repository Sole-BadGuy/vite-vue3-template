<!--
  权限主页
-->
<template>
  <div class="dashboard-editor-container">
    <el-row :gutter="8">
      <el-col
        :xs="{ span: 24 }"
        :sm="{ span: 24 }"
        :md="{ span: 24 }"
        :lg="{ span: 16 }"
        :xl="{ span: 16 }"
        style="padding-right: 8px; margin-bottom: 30px"
      >
        <DependsTable />
      </el-col>
    </el-row>

    <el-row>
      <el-col
        :xs="{ span: 24 }"
        :sm="{ span: 24 }"
        :md="{ span: 24 }"
        :lg="{ span: 16 }"
        :xl="{ span: 16 }"
        style="padding-right: 8px; margin-bottom: 30px"
      >
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
// import { ref } from 'vue'
import DependsTable from './components/DependsTable.vue'

export default {
  components: {
    DependsTable
  },
  setup() {}
}
</script>

<style lang="less" scoped>
.dashboard-editor-container {
  padding: 32px;
  position: relative;

  .github-corner {
    position: absolute;
    top: 0px;
    border: 0;
    right: 0;
  }

  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
}

@media (max-width: 1024px) {
  .chart-wrapper {
    padding: 8px;
  }
}
</style>
