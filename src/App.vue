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
    httpRequest.getAllService().then(data => {
      //提交vuex
      this.$store.commit('setServices', data.services);
      this.loading = false;
    }).catch(error => {
      this.loading = false;
      this.$message({
        type: 'error',
        message: '后台服务异常!',
        duration: 0,
        showClose: true
      })
    });
  },
  data(){
    return {
      loading: false,
    }
  }
}


</script>
<style lang="scss">
@import '@css/style.scss';


#app {
  width: 100%;
  height: 100%;
}
</style>
