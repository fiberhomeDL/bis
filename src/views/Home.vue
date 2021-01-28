<template>
  <div class="home">
    <common-header @change-component="changeComponent"></common-header>
    <div class="home-component">
      <keep-alive>
        <component :is="activeComponent"></component>
      </keep-alive>
    </div>
  </div>
</template>

<script>
import CommonHeader from "@/components/common/CommonHeader";
export default {
  name: 'Home',
  data(){
    return {
      activeComponent: 'HomePage',
    }
  },
  components: {
    CommonHeader,
    HomePage: ()=> import('@c/home/HomePage.vue'),
    Probe: ()=> import('@c/home/Probe.vue'),
  },
  methods:{
    changeComponent(componentName){
      this.activeComponent = componentName;
    }
  },
  created() {
  }
}
</script>
<style lang="scss" scoped>
@import '@css/style.scss';
.home{
  font-size: 14px;
  background: #e9e9f3;
  height: 100%;
  width: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;


  &-component{
    height: 100%;
    overflow: hidden;
  }

}
</style>
