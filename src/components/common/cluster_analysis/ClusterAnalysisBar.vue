<template>
  <div class="ca-bar hw100-oh" ref="caBar"></div>
</template>

<script>
export default {
  name: "ClusterAnalysisBar",
  //barData: {xData: [], barValue: []}
  props: ['barData'],
  mounted() {
    let myChart = this.$echarts.init(this.$refs.caBar);
    myChart.setOption( {
      color: '#ffdfb9',
      grid: {
        containLabel: true,
        top: 40,
        bottom: 0,
        right: 10,
        left: 10,
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
        }
      },
      xAxis: {
        type: 'category',
        data: this.barData.xData,
        // data: ['11-01', '11-02','11-03','11-04','11-05','11-06','11-07','11-08','11-09','11-10','11-11','11-12','11-13','11-14','11-15'],
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
      series: [{
        data: this.barData.barValue,
        // data: [120, 200, 150, 80, 70, 110, 130, 500,100,800,600,150,300,500,180],
        type: 'bar',
        itemStyle: {
          //柱形图圆角，鼠标移上去效果，如果只是一个数字则说明四个参数全部设置为那么多
          normal: {
            //柱形图圆角，初始化效果
            barBorderRadius: 2,
          },
          shadowColor: '#fff4f1',
          shadowBlur: 10
        },
      }]
    })

  }

}
</script>

<style lang="scss" scoped>
@import '@css/style.scss';
.ca-bar{

}
</style>
