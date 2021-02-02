<template>
    <div class="app-overview flex-column">
      <div class="app-overview-header flex-row">
        <service-select @onSelectChange="onSelectChange"></service-select>
        <time-picker></time-picker>
      </div>
      <div class="app-overview-wrapper">
        <div class="app-overview-body">
<!--          <div class="app-overview-body-content">-->
            <el-row :gutter="20">
              <el-col :span="12">
                <!--    应用访问量      -->
                <app-overview-pv></app-overview-pv>
              </el-col>
              <el-col :span="12">
                <!--    错误量      -->
                <app-overview-error></app-overview-error>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="8">
                <!--    浏览器统计      -->
                <app-overview-pie :pie-title="'浏览器统计'" :pie-data="browserUseData"></app-overview-pie>
              </el-col>
              <el-col :span="8">
                <!--    操作系统统计      -->
                <app-overview-pie :pie-title="'操作系统统计'" :pie-data="osData"></app-overview-pie>
              </el-col>
              <el-col :span="8">
                <!--    屏幕分辨率使用分析      -->
                <app-overview-pie :pie-title="'屏幕分辨率使用分析'" :pie-data="screenData"></app-overview-pie>
              </el-col>
            </el-row>
            <el-row :gutter="20" style="margin-top: 16px">
              <el-col :span="6">
                <app-overview-bar :sub-title="'页面白屏时间'" :remark="'FPT'"></app-overview-bar>
              </el-col>
              <el-col :span="6">
                <app-overview-bar :sub-title="'页面首屏时间'" :remark="'FMP'"></app-overview-bar>
              </el-col>
              <el-col :span="6">
                <app-overview-bar :sub-title="'Html加载时间 '" :remark="'DOM READY'"></app-overview-bar>
              </el-col>
              <el-col :span="6">
                <app-overview-bar :sub-title="'页面完全加载时间'" :remark="'LOAD'"></app-overview-bar>
              </el-col>

            </el-row>
<!--          </div>-->
        </div>
      </div>
    </div>
</template>

<script>
import ServiceSelect from "@/components/common/ServiceSelect";
import TimePicker from "@/components/common/TimePicker";
import AppOverviewPv from "@/components/common/app_overview/AppOverviewPv";
import AppOverviewError from "@/components/common/app_overview/AppOverviewError";
import AppOverviewPie from "@/components/common/app_overview/AppOverviewPie";
import AppOverviewBar from "@/components/common/app_overview/AppOverviewBar";

export default {
  name: "AppOverview",
  components: {ServiceSelect,TimePicker,AppOverviewPv,AppOverviewError,AppOverviewPie,AppOverviewBar},
  data(){
    return{
      browserUseData: [
        {value: 40, name: '谷歌87.0'},
        {value: 20, name: 'safari1.0'},
        {value: 10, name: '百度4.0'},
        {value: 15, name: 'IE12'},
        {value: 5, name: '火狐5.1'},
        {value: 10, name: 'U2'}
      ],
      osData: [
        {value: 1000, name: 'Windows10'},
        {value: 100, name: 'Windows8'},
        {value: 800, name: 'Mac'},
        {value: 400, name: 'Linux'},
        {value: 500, name: 'IOS'},
        {value: 200, name: 'Android'}
      ],
      screenData: [
        {value: 740, name: '1920x1080'},
        {value: 260, name: '1768x992'},
        {value: 210, name: '1600x1200'},
        {value: 115, name: '1600x1024'},
        {value: 15, name: '1600x900'},
        {value: 410, name: '1366x768'}
      ],
    }
  },
  methods: {
    onSelectChange(selectId){
      alert(selectId);
    }
  }
}
</script>

<style lang="scss">
@import '@css/style.scss';
.app-overview{
  height: 100%;
  width: 100%;
  overflow: hidden;
  &-header{
    min-height: 52px;
    background-color: #ffffff;
    box-shadow: 0px 4px 8px 0px #b7c4e0;
    align-items: center;
    padding: 0 24px;
    justify-content: space-between;


    &-title{
      color: #919dbd;
      margin-right: 12px;
    }
  }

  &-wrapper{
    height: 100%;
    width: 100%;
    padding: 20px;
    overflow: hidden;
    //flex: 1;
  }

  &-body{
    height: 100%;
    width: 100%;
    background: #fff;
    overflow: hidden;
    overflow-y: auto;
    box-shadow: 0px 4px 8px 0px #b7c4e0;
    border-radius: 4px;
    padding: 24px 20px;

    //&-content{
    //  padding: 24px;
    //  //margin: 24px 20px;
    //}
  }


}
</style>
