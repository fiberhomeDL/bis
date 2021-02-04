<template>
    <div class="terminal-analysis hw100-oh flex-column">
      <header class="terminal-analysis-header flex-row">
        <service-select></service-select>
        <time-picker></time-picker>
      </header>
      <section class="body-wrapper hw100-oh">
        <section class="terminal-analysis-body hw100-oh">
          <div class="terminal-analysis-top flex-row">
            <div class="terminal-analysis-top-left">
              <process-select></process-select>
            </div>
            <div class="terminal-analysis-top-right hw100-oh">
              <el-row :gutter="20" style="height: 100%;margin: 0;">
                <el-col :span="12" style="height: 100%">
                  <div class="hw100-oh flex-column" style="padding-top: 20px;">
                    <sub-header-title sub-title="错误统计"></sub-header-title>
                    <div class="hw100-oh">
                      <cluster-analysis-bar></cluster-analysis-bar>
                    </div>
                  </div>
                </el-col>
                <el-col :span="12" style="height: 100%">
                  <div class="hw100-oh flex-column" style="padding-top: 20px;">
                    <sub-header-title sub-title="访问速度"></sub-header-title>
                    <div class="hw100-oh">
                      <lines-chart
                          :lengend="['白屏时间', '首屏时间', 'Html加载时间', '页面完全加载时间']"
                          :xAxisData="xAxisData"
                          :data="performanceData"
                      >></lines-chart>
                    </div>
                  </div>
                </el-col>
              </el-row>

            </div>
          </div>
          <div class="terminal-analysis-bottom">
            <el-row :gutter="60" class="hw100-oh">
              <el-col class="flex-column" style="height: 100%" :span="8">
                <sub-header-title class="mar-bot-24" :sub-title="'使用统计'"></sub-header-title>
                <tab-select
                    :key="'useCount'"
                  :tab-data="[
                      {
                        id: 1,
                        name: '浏览器',
                      },
                      {
                        id: 2,
                        name: '操作系统',
                      },
                      {
                        id: 3,
                        name: '分辨率',
                      }
                  ]"
                  :active-id="1"
                >

                </tab-select>

                <app-overview-pie
                    style="height: 100%"
                    :noTitle="true"
                    :pie-data="[
                      {value: 40, name: '谷歌87.0'},
                      {value: 20, name: 'safari1.0'},
                      {value: 10, name: '百度4.0'},
                      {value: 15, name: 'IE12'},
                      {value: 5, name: '火狐5.1'},
                      {value: 10, name: 'U2'}
                   ]">

                </app-overview-pie>

              </el-col>
              <el-col class="flex-column" style="height: 100%" :span="8">
                <sub-header-title class="mar-bot-24" :sub-title="'使用性能'"></sub-header-title>
                <tab-select
                    :key="'useTer'"
                    :tab-data="[
                      {
                        id: 1,
                        name: '浏览器',
                      },
                      {
                        id: 2,
                        name: '操作系统',
                      },
                  ]"
                    :active-id="1"
                >

                </tab-select>
                <process-bar
                    :pb-obj="userPerformance"
                ></process-bar>
              </el-col>
              <el-col class="flex-column" style="height: 100%" :span="8">
                <sub-header-title class="mar-bot-24" :sub-title="'错误次数'"></sub-header-title>
                <tab-select
                    :key="'errorCount'"
                    :tab-data="[
                      {
                        id: 1,
                        name: '浏览器',
                      },
                      {
                        id: 2,
                        name: '操作系统',
                      },
                  ]"
                    :active-id="1"
                >
                </tab-select>
                <process-bar
                  :pb-obj="errorCount"
                ></process-bar>
              </el-col>
            </el-row>
          </div>
        </section>
      </section>
    </div>
</template>

<script>
import ServiceSelect from "@/components/common/ServiceSelect";
import TimePicker from "@/components/common/TimePicker";
import ProcessSelect from "@/components/common/terminal_analysis/ProcessSelect";
import SubHeaderTitle from "@/components/common/SubHeaderTitle";
import ClusterAnalysisBar from "@/components/common/cluster_analysis/ClusterAnalysisBar";
import LinesChart from "@/components/common/LinesChart";
import TabSelect from "@/components/common/terminal_analysis/TabSelect";
import AppOverviewPie from "@/components/common/app_overview/AppOverviewPie";
import ProcessBar from "@/components/common/terminal_analysis/ProcessBar";
export default {
  name: "TerminalAnalysis",
  components: {
    ProcessBar,
    AppOverviewPie, TabSelect, ClusterAnalysisBar, ServiceSelect, TimePicker, ProcessSelect, SubHeaderTitle, LinesChart},
  data(){
    return {
      // x轴时间刻度
      xAxisData: ['18:00', '19:00', '20:00', '21:00', '22:00', '23:00', '24:00'],
      // 页面性能数据
      performanceData: [
        {
          name: '白屏时间',
          type: 'line',
          data: [120, 132, 101, 134, 90, 230, 210]
        },
        {
          name: '首屏时间',
          type: 'line',
          data: [220, 182, 191, 234, 290, 330, 310]
        },
        {
          name: 'Html加载时间',
          type: 'line',
          data: [150, 232, 201, 154, 190, 330, 410]
        },
        {
          name: '页面完全加载时间',
          type: 'line',
          data: [320, 332, 301, 334, 390, 330, 320]
        },
      ],

      //使用性能数据 为组件processBar提供
      userPerformance: {
        mainColor: '#86ebdc',
        unit: '%',
        pbData: [
          {
            name: '谷歌 87.0',
            value: 100
          },
          {
            name: '谷歌 83.0',
            value: 80
          },
          {
            name: '百度 1.0',
            value: 60
          },
          {
            name: 'U2 4.0',
            value: 40
          },
          {
            name: 'IE 3.0',
            value: 20
          }
        ],
      },
      //错误次数数据 为组件processBar提供
      errorCount: {
        mainColor: '#ffc7b9',
        unit: '',
        pbData: [
          {
            name: '谷歌 87.0',
            value: 10000
          },
          {
            name: '谷歌 83.0',
            value: 7500
          },
          {
            name: '百度 1.0',
            value: 6000
          },
          {
            name: 'U2 4.0',
            value: 4000
          },
          {
            name: 'IE 3.0',
            value: 2600
          }
        ],
      },



    }
  },
}
</script>

<style lang="scss" scoped>
@import '@css/style.scss';

.body-wrapper{
  padding: 20px;
}

.terminal-analysis{
  &-header{
    min-height: 52px;
    background-color: #ffffff;
    box-shadow: 0px 4px 8px 0px #b7c4e0;
    padding: 0 24px;
    justify-content: space-between;
    align-items: center;
  }

  &-body{
    //box-shadow: 0px 4px 8px 0px #b7c4e0;
    //border-radius: 4px;
    overflow-y: auto;
    //background: #fff;
    //padding: 34px 32px;
  }

  &-top{
    margin-bottom: 20px;
    padding: 8px 30px;
    &-left{
      min-width: 286px;
      border-right: 1px solid #dfe8f7;
      padding: 20px 24px 10px 0;
    }
  }
  &-bottom{
    padding: 30px;
  }

  &-top,&-bottom{
    height: 48%;
    min-height: 438px;
    background: #fff;
    box-shadow: 0px 4px 8px 0px #b7c4e0;
    border-radius: 4px;

  }
}

.mar-bot-24{
  margin-bottom: 24px;
}

</style>
