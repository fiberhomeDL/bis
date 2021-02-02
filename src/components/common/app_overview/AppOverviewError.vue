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
  components: {SubHeaderTitle},
  mounted() {
    let myChart = this.$echarts.init(this.$refs.aoErrorCharts);
    this.$http.get('https://cdn.jsdelivr.net/gh/apache/echarts-website@asf-site/examples/data/asset/data/aqi-beijing.json').then(data=>{
      data = data.slice(0,400);
      myChart.setOption({
        grid: {
          top: 40,
          bottom: 20,
          right: 10,
          left: 10,
          containLabel: true,
        },
        tooltip: {
          trigger: 'axis'
        },
        xAxis: {
          data: data.map(function (item) {
            return item[0];
          }),
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
            color: '#919dbd',
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
            lte: 100,
            color: '#fcd57c'
          }, {
            gt: 100,
            lte: 200,
            color: '#fd933e'
          }, {
            gt: 200,
            color: '#e24c3a'
          }],
          outOfRange: {
            color: '#999'
          },

        },
        series: {
          smooth: true,
          name: 'Beijing AQI',
          type: 'line',
          data: data.map(function (item) {
            return item[1];
          })
        }
      })
    })
  }
}
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
