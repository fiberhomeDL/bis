<template>
  <div class="home flex-column hw100-oh">
<!--    顶栏-->
    <common-header @change-component="changeComponent" :default-component-name="activeComponent"></common-header>
    <div class="home-component">
<!--    keep-alive避免重复下发数据请求  -->
      <keep-alive>
        <component :is="activeComponent"></component>
      </keep-alive>
    </div>
  </div>
</template>

<script>
import CommonHeader from "@/components/common/CommonHeader";
import httpRequest from '@js/home';
export default {
  name: 'Home',
  data(){
    return {
      //取值从created函数中取
      activeComponent: '',
    }
  },
  components: {
    CommonHeader,
    //异步引用组件 避免不必要开销
    HomePage: ()=> import('@/components/home/HomePage.vue'),
    Probe: ()=> import('@/components/home/Probe.vue'),
  },
  methods:{
    //切换展示组件的方法
    changeComponent(componentName){
      this.activeComponent = componentName;
    }
  },
  //一开始就执行
  created() {
    //接受路由传递信息
    let activeComponentName = this.$route.params.componentName
    //路由有无传递信息的两种赋值
    activeComponentName ? this.activeComponent = activeComponentName : this.activeComponent = 'HomePage';


    //进入首页获取应用列表
    httpRequest.getAllService().then(data => {
      //提交vuex
      this.$store.commit('setServices', data.services);
    });
  }
}
</script>
<style lang="scss" scoped>
@import '@css/style.scss';
.home{
  font-size: 14px;
  background: #e9e9f3;

  &-component{
    height: 100%;
    overflow: hidden;
  }

}
</style>
