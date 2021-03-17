<template>
    <div class="menu">
        <div v-for="(value,index) in tabData"
             :key="index"
             :class="[{'active':value.isActive}, 'menu-tab']"
             @click="tabClick(value)">
            <img v-show="value.isActive" class="menu-icon" :src="require('../../assets/img/menu_icon/'+value.name+'_highlight.svg')"/>
            <img v-show="!value.isActive" class="menu-icon" :src="require('../../assets/img/menu_icon/'+value.name+'.svg')"/>
            <span class="menu-title">{{ value.title }}</span>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Menu",
        //传入展示应用名称
        props: ['activeComponentName'],
        computed: {
          //展示应用
          activeName: {
            get () {
              return this.activeComponentName;
            },
            set () {
            }
          },
          //应用列表数据 isActive根据activeName为判断依据
          tabData(){
            return [
              {
                title: '应用总览',
                name:'overview',
                componentName: 'AppOverview',
                isActive: this.activeName === 'AppOverview'
              },
              {
                title: '页面监控',
                name:'monitor',
                componentName: 'PageMonitor',
                isActive: this.activeName === 'PageMonitor'
              },
              {
                title: '错误日志',
                name:'errorlog',
                componentName: 'ErrorLog',
                isActive: this.activeName === 'ErrorLog'
              },
              {
                title: '聚合分析',
                name:'cluster',
                componentName: 'ClusterAnalysis',
                //聚合分析包含两个组件页面
                isActive: this.activeName === 'ClusterAnalysis' || this.activeName === 'ClusterAnalysisDetail'
              },
              {
                title: '终端分析',
                name:'terminal',
                componentName: 'TerminalAnalysis',
                isActive: this.activeName === 'TerminalAnalysis'
              },
              {
                title: '用户行为追踪',
                name:'track',
                componentName: 'BehaviorTrack',
                isActive: this.activeName === 'BehaviorTrack' || this.activeName === 'BehaviorTrackDetail'
              },
              {
                title: '告警',
                name:'alarm',
                componentName: 'Alarm',
                isActive: this.activeName === 'Alarm'
              },
            ]
          }
        },
        methods: {
          //点击tab
            tabClick(value){
                if(this.activeName != value.componentName){
                    //更改active值（修改样式）
                  this.activeName = value.componentName;
                  //  更换组件文件
                  this.$emit('change-content', value.componentName);
                }
            }
        }
    };
</script>

<style lang="scss" scoped>
@import '@css/style.scss';
    .menu{
        width:190px;
        height:100%;
        padding:28px;
        background-color: #2d3e53;
        box-shadow: 0 4px 8px 0 #b7c4e0;
        &-tab{
            height: 48px;
            color: #919dbd;
            font-size: 16px;
            cursor: pointer;
        }
        &-tab.active{
            color: #00baff;
        }
        &-icon{
            height: 20px;
            width: 20px;
            margin-right: 10px;
            vertical-align: middle;
        }
        &-title{
            vertical-align: middle;
        }
    }

</style>
