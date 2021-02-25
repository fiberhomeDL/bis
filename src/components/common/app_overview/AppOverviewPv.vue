<template>
  <div class="ao-pv">
    <div class="ao-pv-charts" ref="aoPvCharts"></div>
  </div>
</template>

<script>
import SubHeaderTitle from "@/components/common/SubHeaderTitle";
export default {
  name: "AppOverviewPv",
  props: ['appInfo'],
  components: { SubHeaderTitle },
  mounted() {
    let that = this;
    let myChart = this.$echarts.init(this.$refs.aoPvCharts);
    myChart.setOption({
      grid: {
        containLabel: true,
        top: 40,
        bottom: 20,
        right: 10,
        left: 10,
      },
      legend: {
        itemHeight: 8,
        itemWidth: 8,
        itemGap: 10,
        left: 8,
        icon: 'circle',
        textStyle: {
          color: '#919dbd',
        }
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
        }
      },
      xAxis: [
        {
          type: 'category',
          //data: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24"],
          data: that.appInfo.xData,
          offset: 10,
          axisTick: {
            lineStyle: {
              color: '#c1c5ca41',
            },
            alignWithLabel: true,
          },
          axisLabel: {
            color: '#919dbd',
            fontSize: 12
          },
          axisLine: {
            lineStyle: {
              color: 'rgba(0,0,0,0)'
            }
          },

        }
      ],
      yAxis: [
        {
          type: 'value',
          splitLine: {
            lineStyle: {
              color: '#c1c5ca41',
              type: 'dashed'
            },
          },
          axisLabel: {
            color: "#919dbd",
            fontSize: 12,
          }

        },
      ],
      series: [
        {
          name: '浏览量',
          type: 'bar',
          //data: [100,200,300,400,500,600,700,800,300,100,200,100,100,200,300,400,500,600,700,800,300,100,200,100],
          data: that.appInfo.pvValue,
          itemStyle: {
            //柱形图圆角，鼠标移上去效果，如果只是一个数字则说明四个参数全部设置为那么多
            normal: {
              //柱形图圆角，初始化效果
              barBorderRadius: [12,12,2,2],
              color: '#ffc7b9'
            }
          },
        },
        {
          name: '用户量',
          type: 'bar',
          //data: [100, 200, 100, 300, 800, 700, 600, 500, 400, 300, 200, 100,100, 200, 100, 300, 800, 700, 600, 500, 400, 300, 200, 100],
          data: that.appInfo.uvValue,
          itemStyle: {
            //柱形图圆角，鼠标移上去效果，如果只是一个数字则说明四个参数全部设置为那么多
            normal: {
              //柱形图圆角，初始化效果
              barBorderRadius: [12,12,2,2],
              color: '#8ee0ff'
            }
          },
        },
      ]
    })
  }
}
</script>

<style lang="scss" scoped>
@import '@css/style.scss';
.ao-pv{
  &-charts{
    width: 100%;
    height: 200px;
    //margin-top: 14px;
  }
}



</style>
