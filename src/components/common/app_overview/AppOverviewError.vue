<template>
  <div class="ao-error flex-column">
    <sub-header-title :sub-title="'错误量'"></sub-header-title>
    <div class="ao-error-charts" ref="aoErrorCharts"></div>
  </div>
</template>

<script>
import SubHeaderTitle from "@/components/common/SubHeaderTitle";
export default {
  name: "AppOverviewError",
  props: ['errorInfo'],
  components: {SubHeaderTitle},
  mounted() {
    let that = this;
    let myChart = this.$echarts.init(this.$refs.aoErrorCharts);
    myChart.setOption({
        grid: {
          top: 40,
          bottom: 10,
          right: 10,
          left: 10,
          containLabel: true
        },
        tooltip: {
          trigger: 'axis'
        },
        xAxis: {
          data: that.errorInfo.xData,
          axisTick: {
            lineStyle: {
              color: '#c1c5ca41',
            },
            alignWithLabel: true
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
        },
        yAxis: {
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
        visualMap: {
          left: 10,
          itemWidth: 8,
          itemHeight: 8,
          textStyle: {
            fontSize: 12,
            color: '#919dbd'
          },
          top: 'top',
          orient:'horizontal',
          controller: {
            inRange: {
              color: [],
              symbol: ['circle']
            }
          },
          pieces: [{
            gt: 0,
            lte: 20,
            color: '#fcd57c'
          }, {
            gt: 20,
            lte: 30,
            color: '#fd933e'
          }, {
            gt: 30,
            color: '#e24c3a'
          }],
          outOfRange: {
            color: '#999'
          },
        },
        series: {
          smooth: true,
          name: '错误数',
          type: 'line',
          data: that.errorInfo.errorValue
        }
      });
  }
};
</script>

<style lang="scss" scoped>
@import '@css/style.scss';
.ao-error{
  &-charts{
    width: 100%;
    height: 200px;
    margin-top: 14px;
  }
}
</style>
