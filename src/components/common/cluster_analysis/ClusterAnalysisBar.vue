<template>
  <div class="ca-bar hw100-oh" ref="caBar"></div>
</template>

<script>
export default {
  name: "ClusterAnalysisBar",
  props: ['barData'],
  mounted() {
    this.$nextTick(() => {
      this.initChart();
    });
  },
  methods:{
    // 初始化图
    initChart(){
      let myChart = this.$echarts.init(this.$refs.caBar);
      myChart.setOption( {
        color: '#ffdfb9',
        grid: {
          containLabel: true,
          top: 20,
          bottom: 0,
          right: 10,
          left: 10
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        xAxis: {
          type: 'category',
          data: this.barData.xData,
          axisTick: {
            lineStyle: {
              color: '#c1c5ca41'
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
          }
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
            fontSize: 12
          }
        },
        series: [{
          data: this.barData.barValue,
          barMinWidth: 1,
          barMaxWidth: 6,
          type: 'bar',
          itemStyle: {
            //柱形图圆角，鼠标移上去效果，如果只是一个数字则说明四个参数全部设置为那么多
            normal: {
              //柱形图圆角，初始化效果
              barBorderRadius: 2
            },
            shadowColor: '#fff4f1',
            shadowBlur: 10
          }
        }]
      });
    }
  },
  watch:{
    barData: {
      // 需要用到深度监视数据
      deep: true,
      handler() {
        // 创建之前先销毁
        this.$echarts.init(this.$refs.caBar).dispose();
        // 初始化
        this.initChart();
      }
    }
  }

};
</script>

<style lang="scss" scoped>
@import '@css/style.scss';
.ca-bar{

}
</style>
