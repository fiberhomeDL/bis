<template>
  <div id="app"
       v-loading="loading"
       element-loading-text="拼命加载中"
       element-loading-spinner="el-icon-loading"
       element-loading-background="rgba(0, 0, 0, 0.8)">
    <router-view v-if="!loading"/>
  </div>
</template>
<script>
import httpRequest from '@js/home';
export default {
  created() {
    //进入应用获取所有应用列表（默认获取近两个月）
    this.loading = true;
    // 查询全部应用
    httpRequest.getAllService().then(data => {
      //提交vuex
      this.$store.commit('setServices', data.services);
      this.loading = false;
    }).catch(error => {
      // 取消loading
      this.loading = false;
      // 错误信息提示
      this.$message({
        type: 'error',
        message: '后台服务异常!',
        // 持续时间为0，不自动关闭
        duration: 0,
        // 显示关闭按钮
        showClose: true
      });
    });
  },
  data(){
    return {
      // 加载标识
      loading: false
    };
  }
};


</script>
<style lang="scss">
@import '@css/style.scss';


#app {
  width: 100%;
  height: 100%;
}
</style>
