<template>
  <div class="common-header">
<!--    Logo-->
      <div class="common-header-img" @click="toHomePage()"></div>
<!--    标题-->
      <div class="common-header-title" @click="toHomePage()">THEMIS APM BIS</div>
<!--    导航栏数据源在computed中定义-->
      <div v-for="(value,index) in tabDataIncludeActive"
           :key="index"
           :class="[{'active':value.isActive}, 'common-header-tab']"
           @click="tabClick(value)"
           >{{ value.title }}</div>
  </div>
</template>

<script>
export default {
  name: "CommonHeader",
  //默认active的tab
  props: ['defaultComponentName'],
  data(){
    return {
      //参数本地化
      activeComponentName: this.defaultComponentName,
      //配置tab信息及名称
      tabData: [
          {
            title: '首页',
            componentName: 'HomePage'
          },
          {
            title: '探针部署',
            componentName: 'Probe'
          },
      ]
    }
  },
  computed:{
    //添加active属性
    tabDataIncludeActive(){
      return this.tabData.map(item => {
        //设置active类名是否展示
        item.isActive = (item.componentName == this.activeComponentName);
        return item;
      })
    }
  },
  methods: {
    //点击tab => 切换active样式
    tabClick(value){
      //判断是否change
      if(!value.isActive){
        //切换tab样式
        this.activeComponentName = value.componentName;
        //抛出组件名
        this.$emit('change-component', value.componentName);
      }
    },
    //返回首页的方法
    toHomePage(){
      this.activeComponentName = 'HomePage';
      this.$emit('change-component', 'HomePage');
    }
  },
}
</script>

<style lang="scss" scoped>
@import '@css/style.scss';
.common-header{
  min-height: 48px;
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
    box-shadow: -2px 4px 15px 0px rgba(0, 85, 191, 0.8);
    border-radius: 14px;
    cursor: pointer;
  }

  &-title{
    color: #ffffff;
    font-size: 20px;
    padding: 0 80px 0 10px;
    cursor: pointer;
  }

  &-tab{
    color: #a8b5cf;
    font-size: 16px;
    line-height: 38px;
    cursor: pointer;
    position: relative;
    top: -2px;
    border-bottom: 3px solid transparent;
  }

  &-tab:not(:first-of-type){
    margin-right: 70px;
  }

  &-tab.active{
    border-bottom: 3px solid #00baff;
    color: white;
  }
}

</style>
