<template>
    <div>
        <Menu @change-component="changeComponent"></Menu>
        <div>
            <keep-alive>
                <component :is="activeComponent"></component>
            </keep-alive>
        </div>
    </div>

</template>

<script>
import Menu from "@/components/common/Menu";
    export default {
        name: "Detail",
        data(){
            return {
                activeComponent: 'AppOverview',
            }
        },
        components: {
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
                this.activeComponent = componentName;
            }
        },
    }
</script>

<style lang="scss" scoped>
@import '@css/style.scss';

</style>
