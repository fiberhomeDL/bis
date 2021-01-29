<template>
  <div class="home flex-column hw100-oh">
    <common-header @change-component="changeComponent" :default-component-name="activeComponent"></common-header>
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
      activeComponent: '',
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
    this.$nextTick(()=>{
      let activeComponentName = this.$route.params.componentName
      if(activeComponentName){
        this.activeComponent = activeComponentName;
      }else{
        this.activeComponent = 'HomePage'
      }
    })
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
