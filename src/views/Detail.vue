<template>
    <div class="detail flex-column hw100-oh">
        <common-header @change-component="changeComponent"></common-header>
        <div class="container">
            <div class="container-sideMenu" >
                <Menu @change-content="changeContent"></Menu>
            </div>
            <div class="container-content">
               <keep-alive>
                  <component
                      :is="activeContent"
                      @change-content="toDeepPage"
                  ></component>
               </keep-alive>
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
                activeContent: 'AppOverview',
            }
        },
        components: {
            CommonHeader,
            Menu,
            AppOverview: ()=> import('@c/detail/AppOverview.vue'),
            PageMonitor: ()=> import('@c/detail/PageMonitor.vue'),
            ErrorLog: ()=> import('@c/detail/ErrorLog.vue'),
            ClusterAnalysis: ()=> import('@c/detail/ClusterAnalysis.vue'),
            ClusterAnalysisDetail: ()=>import('@c/detail/ClusterAnalysisDetail.vue'),
            TerminalAnalysis: ()=> import('@c/detail/TerminalAnalysis.vue'),
            BehaviorTrack: ()=> import('@c/detail/BehaviorTrack.vue'),
            BehaviorTrackDetail: ()=>import('@c/detail/BehaviorTrackDetail.vue'),
            Alarm: ()=> import('@c/detail/Alarm.vue'),
        },
        methods:{
            //内部跳转方法
            toDeepPage(param){
              this.activeContent = param.to;
            },
            // 头部导航跳转
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
