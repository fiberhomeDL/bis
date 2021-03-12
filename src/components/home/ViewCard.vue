<template>
  <div class="view-card">
    <div class="view-card-chart">
      <div class="hw100-oh" ref="charts"></div>
    </div>
    <div class="view-card-info flex-column">
      <div class="view-card-info-title">{{ serviceName }}</div>
      <div class="view-card-info-msg flex-row" v-for="(v,i) in serviceData" :key="i">
        <img class="view-card-info-msg-icon" :src="v.icon">
        <span class="view-card-info-msg-title">{{ v.title + ':' }}</span>
        <span class="view-card-info-msg-value">{{ v.value }}{{ v.unit }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ViewCard",
  props: ['serviceInfo','serviceName','chartsData'],
  computed: {
    serviceData(){
      return [
        {
          title: '访问量',
          icon: require('@img/common_icon/views.svg'),
          unit: '',
          value: this.serviceInfo.viewCount || '--'
        },
        {
          title: '用户量',
          icon: require('@img/common_icon/subscribers.svg'),
          unit: '',
          value: this.serviceInfo.uvCount || '--'
        },
        {
          title: '错误数',
          icon: require('@img/common_icon/error.svg'),
          unit: '个',
          value: this.serviceInfo.errorCount || '--'
        },
        {
          title: '性能指数',
          icon: require('@img/common_icon/performance.svg'),
          unit: '%',
          value: this.serviceInfo.performanceCount || '--'
        }
      ]

    }
  },
  mounted() {
    let chartsDom = this.$refs.charts;
    this.$echarts.init(chartsDom).setOption({
      grid: {
        containLabel: true,
        top: 40,
        bottom: 20,
        right: 10,
        left: 10
      },
      legend: {
        itemHeight: 8,
        itemWidth: 8,
        itemGap: 10,
        left: 8,
        icon: 'circle',
        textStyle: {
          color: '#919dbd'
        }
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      xAxis: [
        {
          type: 'category',
          data: this.chartsData.xData,
          offset: 10,
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
            fontSize: 12
          }
        },
      ],
      series: [
        {
          name: '浏览量',
          type: 'bar',
          data: this.chartsData.pvData,
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
          data: this.chartsData.uvData,
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
.view-card{
  height: 100%;
  width: 100%;
  display: flex;
  overflow: hidden;
  justify-items: center;

  &-chart{
    background: #fff;
    flex: 1;
    overflow: hidden;
    padding-top: 10px;
   }

  &-info{
    width: 168px;
    padding-left: 16px;
    justify-content: center;


    &-title{
      color: #505b73;
      font-size: 18px;
      font-weight: bold;
      margin-bottom: 18px
    }

    &-msg{
      align-items: center;
      margin-bottom: 16px;

      &-icon{
        width: 18px;
        height: 18px;
      }

      &-title{
        color: #626f8c;
        padding: 0 8px;

      }

      &-value{
        color: #575777;
      }
    }

    &-msg:last-of-type{
      margin: 0;
    }
   }
}
</style>
