<template>
  <div class="common-header">
      <div class="common-header-img"></div>
      <div class="common-header-title">THEMIS APM</div>
      <div v-for="(value,index) in tabData"
           :key="index"
           :class="[{'active':value.isActive}, 'common-header-tab']"
           @click="tabClick(value)"
           >{{ value.title }}</div>
  </div>
</template>

<script>
export default {
  name: "CommonHeader",
  props: ['defaultComponentName'],
  data(){
    return {
      tabData: [
        {
          title: '首页',
          componentName: 'HomePage',
          isActive: 'HomePage' == this.activeComponentName
        },
        {
          title: '探针部署',
          componentName: 'Probe',
          isActive: 'Probe' == this.activeComponentName
        },
      ]
    }
  },
    computed: {
        activeComponentName(){
            return this.defaultComponentName;
        }
    },
  methods: {
    tabClick(value){
      if(!value.isActive){
        this.tabData.forEach((item)=>{item.isActive = false});
        value.isActive = true;
        //  抛出组件名
        this.$emit('change-component', value.componentName);
      }
    }
  },
  created() {
      // if(this.defaultComponentName){
      //     this.tabData.forEach(item => {
      //         if(item.componentName == this.defaultComponentName) item.isActive = true;
      //     })
      // }
  }
}
</script>

<style lang="scss" scoped>
@import '@css/style.scss';
.common-header{
  height: 48px;
  width: 100%;
  display: flex;
  background-image: url("~@img/home/top-bj.jpg");
  background-size: cover;
  align-items: center;
  padding: 0 16px;

  &-img{
    width: 28px;
    height: 28px;
    background-image: url("~@img/common_icon/logo.svg");
    background-size: cover;
    box-shadow: -2px 4px 15px 0px
    rgba(0, 85, 191, 0.8);
    border-radius: 14px;
  }

  &-title{
    color: #ffffff;
    font-size: 20px;
    padding: 0 80px 0 10px;
  }

  &-tab{
    color: #a8b5cf;
    font-size: 16px;
    line-height: 38px;
    cursor: pointer;
    position: relative;
    top: -2px;
  }

  &-tab:not(:first-of-type){
    margin-right: 70px;
  }

  &-tab.active{
    border-bottom: 3px solid #00baff;
    color: white;
    position: relative;
    top: 0px;
  }



}

</style>
