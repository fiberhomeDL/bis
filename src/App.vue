<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<script>
import httpRequest from '@js/home';
export default {
  created() {
    //进入应用获取所有应用列表（默认获取近两个月）
    httpRequest.getAllService().then(data => {
      //提交vuex
      this.$store.commit('setServices', data.services);
    });
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
