<template>
    <div class="app-overview flex-column"
         v-loading="loading"
         element-loading-text="拼命加载中"
         element-loading-spinner="el-icon-loading"
         element-loading-background="rgba(0, 0, 0, 0.8)"
    >
      <div class="app-overview-header flex-row">
        <service-select @onSelectChange="changeCondition"></service-select>
        <time-picker
            @changeTime="changeCondition"
        ></time-picker>
      </div>
      <div class="app-overview-wrapper" v-if="!loading">
        <div class="app-overview-body">
<!--          <div class="app-overview-body-content">-->
            <el-row :gutter="20">
              <el-col :span="12">
                <!--    应用访问量      -->
                <sub-header-title :sub-title="'应用访问量'"></sub-header-title>
                <app-overview-pv
                    :app-info="appInfo"
                    style="margin-top: 14px"></app-overview-pv>
              </el-col>
              <el-col :span="12">
                <!--    错误量      -->
                <app-overview-error
                  :error-info="errorInfo"
                ></app-overview-error>
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
                <app-overview-bar @to-page-monitor="toPageMonitor" :sub-title="'页面白屏时间'" :remark="'FPT'" :bar-data="FPTData"></app-overview-bar>
              </el-col>
              <el-col :span="6">
                <app-overview-bar @to-page-monitor="toPageMonitor" :sub-title="'页面首屏时间'" :remark="'FMP'" :bar-data="FMPData"></app-overview-bar>
              </el-col>
              <el-col :span="6">
                <app-overview-bar @to-page-monitor="toPageMonitor" :sub-title="'Html加载时间 '" :remark="'DOM READY'" :bar-data="DomData"></app-overview-bar>
              </el-col>
              <el-col :span="6">
                <app-overview-bar @to-page-monitor="toPageMonitor" :sub-title="'页面完全加载时间'" :remark="'LOAD'" :bar-data="LoadData"></app-overview-bar>
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
import SubHeaderTitle from "@/components/common/SubHeaderTitle";
import httpReq from "@js/appOverview";

export default {
  name: "AppOverview",
  components: {SubHeaderTitle, ServiceSelect,TimePicker,AppOverviewPv,AppOverviewError,AppOverviewPie,AppOverviewBar},
  data(){
    return{
      loading: false,
      //应用访问量
      appInfo: {
        xData: [],
        pvValue: [],
        uvValue: [],
      },
      errorInfo: {
        xData: [],
        errorValue: [],
      },

      FPTData: [],
      FMPData: [],
      DomData: [],
      LoadData: [],



      //暂无数据
      browserUseData: [
        // {value: 40, name: '谷歌87.0'},
        // {value: 20, name: 'safari1.0'}
      ],
      osData: [
        // {value: 1000, name: 'Windows10'},
        // {value: 100, name: 'Windows8'}
      ],
      screenData: [
        // {value: 740, name: '1920x1080'},
        // {value: 260, name: '1768x992'},
      ],
    }
  },

  methods: {
    /*跳转到页面监控*/
    toPageMonitor(param){
      this.$store.commit('setMonitorParam', param)
      this.$emit('change-component', 'PageMonitor')
    },
    /*当查询条件改变时*/
    changeCondition(){
      let that = this;
      this.loading = true
      let serviceName = this.$store.getters.getSelectServiceName;
      let serviceId = this.$store.state.selectedServiceId;
      // let serviceName = 'test-ui';
      let duration = this.$store.state.time;
      let xData = this.$store.getters.getXAxisData;
      httpReq.getPageData(serviceName,serviceId,duration).then(data=>{
        /*赋值*/
        that.appInfo.xData = xData;
        that.appInfo.pvValue = data.pv;
        that.appInfo.uvValue = data.uv;
        that.errorInfo.xData = xData;
        that.errorInfo.errorValue = data.error;
        that.FPTData = data.fpt;
        that.FMPData = data.fmp;
        that.DomData = data.domReady;
        that.LoadData = data.load
        that.browserUseData = data.browserUseData
        that.osData = data.osData;
        that.screenData = data.screenData;
        that.loading =  false;

      })
    },
  },
  created() {
    this.$nextTick(()=>{
      this.changeCondition();
    })
  },
  mounted() {
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
    padding: 34px 32px;
    //padding: 24px 20px;

    //&-content{
    //  padding: 24px;
    //  //margin: 24px 20px;
    //}
  }


}
</style>
