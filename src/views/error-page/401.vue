<template>
  <div class="errPage-container">
    <el-button icon="el-icon-arrow-left" class="back-btn" @click="back"> 返回 </el-button>
    <el-row>
      <el-col :span="12">
        <h1 class="text-jumbo text-ginormous">Oops!</h1>
        <h2>你没有权限去该页面</h2>
        <h6>如有不满请联系你领导</h6>
        <ul class="list-unstyled">
          <li>或者你可以去:</li>
          <li class="link-type">
            <router-link to="/dashboard"> 回首页 </router-link>
          </li>
          <li class="link-type">
            <a href="https://github.com/rcyj-FED">随便看看</a>
          </li>
        </ul>
      </el-col>
      <el-col :span="12">
        <img
          :src="errGif"
          class="some-gif"
          width="313"
          height="428"
          alt="Girl has dropped her ice cream."
        />
      </el-col>
    </el-row>
    <el-dialog :visible="dialogVisible" title="随便看">
      <img :src="ewizardClap" class="some-img" />
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import errGif from '@/assets/401-images/401.gif'

export default defineComponent({
  setup() {
    const route = useRoute()
    const router = useRouter()

    const data = reactive({
      errGif: `${errGif}?${+new Date()}`,
      ewizardClap: 'https://wpimg.wallstcn.com/007ef517-bafd-4066-aae4-6883632d9646',
      dialogVisible: false,
      back() {
        if (route.query.noGoBack) {
          router.push({ path: '/dashboard' }).catch((err) => {
            console.warn(err)
          })
        } else {
          router.go(-1)
        }
      }
    })

    return { ...toRefs(data) }
  }
})
</script>

<style lang="less" scoped>
.errPage-container {
  width: 800px;
  max-width: 100%;
  margin: 100px auto;

  .back-btn {
    background: #008489;
    color: #fff;
    border: none !important;
  }

  .some-gif {
    margin: 0 auto;
    display: block;
  }

  .some-img {
    display: block;
    margin: 0 auto;
    width: 100%;
  }

  .text-jumbo {
    font-size: 60px;
    font-weight: 700;
    color: #484848;
  }

  .list-unstyled {
    font-size: 14px;

    li {
      padding-bottom: 5px;
    }

    a {
      color: #008489;
      text-decoration: none;

      &:hover {
        text-decoration: underline;
      }
    }
  }
}
</style>
