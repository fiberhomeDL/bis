<template>
    <div class="detail flex-column hw100-oh">
<!--      引入-->
        <common-header @change-component="changeComponent"></common-header>
<!--      body-->
        <div class="container">
<!--          侧边栏-->
            <div class="container-sideMenu" >
                <Menu :active-component-name="activeContent" @change-content="changeContent"></Menu>
            </div>
<!--          组件内部-->
            <div class="container-content">
<!--               <keep-alive>-->
                  <component
                      :is="activeContent"
                      @change-content="toDeepPage"
                      @change-component="changeContent"
                  ></component>
<!--               </keep-alive>-->
            </div>
        </div>
    </div>

</template>

<script>
import CommonHeader from "@/components/common/CommonHeader";
import Menu from "@/components/common/Menu";
export default {
    name: "Detail",
    data(){
        return {
          //显示的组件
            activeContent: 'AppOverview',
        }
    },
    components: {
        CommonHeader,
        Menu,
      //异步加载组件 降低同步渲染开销
      //应用总览
        AppOverview: ()=> import('@c/detail/AppOverview.vue'),
      //页面监控
        PageMonitor: ()=> import('@c/detail/PageMonitor.vue'),
      //错误日志
        ErrorLog: ()=> import('@c/detail/ErrorLog.vue'),
      //聚合分析
        ClusterAnalysis: ()=> import('@c/detail/ClusterAnalysis.vue'),
      //聚合分析详情
        ClusterAnalysisDetail: ()=>import('@c/detail/ClusterAnalysisDetail.vue'),
      //终端分析
        TerminalAnalysis: ()=> import('@c/detail/TerminalAnalysis.vue'),
      //终端分析详情
        BehaviorTrack: ()=> import('@c/detail/BehaviorTrack.vue'),
      //用户行为分析
        BehaviorTrackDetail: ()=>import('@c/detail/BehaviorTrackDetail.vue'),
      //告警
        Alarm: ()=> import('@c/detail/Alarm.vue'),
    },
    methods:{
        //内部跳转方法
        toDeepPage(param){
          this.activeContent = param.to;
        },
        // 跳转至首页
        changeComponent(componentName){
            this.$router.push({
                name: 'Home',
                params: {
                    componentName: componentName
                }
            })
        },
        // 侧边导航跳转
        changeContent(componentName){
            this.activeContent = componentName;
        }
    },
    created() {
      //如果用户在Detail页面下刷新，依旧保持选中应用的状态
      if(this.$route.query.id){
        this.$store.commit('changeSelectedServiceId',this.$route.query.id);
      }else{
        this.$router.push({
          name: 'Home'
        })
      }

    }
}
</script>

<style lang="scss" scoped>
@import '@css/style.scss';
.detail{
    font-size: 14px;
    background: #e9e9f3;
    .container{
        height: 100%;
        width: 100%;
        overflow: hidden;
        display: flex;
        &-sideMenu{
            width:190px;
            height: 100%;
            //float:left;
          display: inline-block;
        }
        &-content{
          display: inline-block;
            //width: 100%;
            width:calc(100% - 190px);
            height:100%;
            //float:left;
        }
    }
}

</style>
