<template>
  <div class="view-card">
    <div class="view-card-chart">
      <div id="myChart" style="width: 100%;height: 100%"></div>
    </div>
    <div class="view-card-info flex-column">
      <div class="view-card-info-title">testPG</div>
      <div class="view-card-info-msg flex-row" v-for="(v,i) in msgData" :key="i">
        <img class="view-card-info-msg-icon" :src="v.icon">
        <span class="view-card-info-msg-title">{{ v.title + ':' }}</span>
        <span class="view-card-info-msg-value">{{ v.value }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ViewCard",
  data(){
    return {
      msgData: [
        {
          title: '访问量',
          value: '21239',
          icon: require('@img/common_icon/views.svg')
        },
        {
          title: '用户量',
          value: '59位',
          icon: require('@img/common_icon/subscribers.svg')
        },
        {
          title: '错误数',
          value: '5个',
          icon: require('@img/common_icon/error.svg')
        },
        {
          title: '警告数',
          value: '14个',
          icon: require('@img/common_icon/warning.svg')
        },
        {
          title: '性能指数',
          value: '99%',
          icon: require('@img/common_icon/performance.svg')
        },

      ]
    }
  },
  mounted() {
    let myChart = this.$echarts.init(document.getElementById('myChart'));
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
          data: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24"],
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
          data: [100,200,300,400,500,600,700,800,300,100,200,100,100,200,300,400,500,600,700,800,300,100,200,100],
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
          data: [100, 200, 100, 300, 800, 700, 600, 500, 400, 300, 200, 100,100, 200, 100, 300, 800, 700, 600, 500, 400, 300, 200, 100],
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
    //width: 100%;
    background: #fff;
    flex: 1;
    overflow: hidden;
    padding-top: 10px;
    //padding: 26px 0 26px 26px;
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
