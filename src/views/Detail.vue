<template>
    <div class="detail flex-column hw100-oh">
        <common-header @change-component="changeComponent"></common-header>
        <div class="container">
            <div class="menu">
                <menu @change-component="changeComponent"></menu>
            </div>
        <div class="content">
            <keep-alive>
                <component :is="activeComponent"></component>
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
                activeComponent: 'AppOverview',
            }
        },
        components: {
            CommonHeader,
            Menu,
            AppOverview: ()=> import('@c/detail/AppOverview.vue'),
            PageMonitor: ()=> import('@c/detail/PageMonitor.vue'),
            ErrorLog: ()=> import('@c/detail/ErrorLog.vue'),
            ClusterAnalysis: ()=> import('@c/detail/ClusterAnalysis.vue'),
            TerminalAnalysis: ()=> import('@c/detail/TerminalAnalysis.vue'),
            BehaviorTrack: ()=> import('@c/detail/BehaviorTrack.vue'),
            Alarm: ()=> import('@c/detail/Alarm.vue'),
        },
        methods:{
            changeComponent(componentName){
                debugger;
                this.$router.push({
                    name: 'Home',
                    params: {
                        componentName: componentName
                    }
                })
            }
        },
    }
</script>

<style lang="scss" scoped>
@import '@css/style.scss';
.detail{
    font-size: 14px;
    background: #e9e9f3;

    &-container{
        height: 100%;
        overflow: hidden;
        .menu{
            width:190px;
        }
    }

}

</style>
