<template>
  <div class="ao-browser">
    <sub-header-title :sub-title="pieTitle"></sub-header-title>
    <div class="ao-browser-charts" ref="aoBrowserCharts"></div>
  </div>
</template>

<script>
import SubHeaderTitle from "@/components/common/SubHeaderTitle";
export default {
  props: ['pieTitle','pieData'],
  name: "AppOverviewBrowser",
  components: {SubHeaderTitle},
  mounted() {
    let myChart = this.$echarts.init(this.$refs.aoBrowserCharts);
    myChart.setOption({
      //色盘
      color: ['#fe9289','#f1c692','#87ecdd','#f9ebc0','#b1e9fe','#dddff9'],
      tooltip: {
        trigger: 'item'
      },
      legend: {
        orient: 'vertical',
        left: 'left',
        itemHeight: 8,
        itemWidth: 8,
        itemGap: 10,
        icon: 'circle',
        textStyle: {
          color: '#919dbd',
          fontSize: 12
        }

      },
      series: [
        {
          name: '访问来源',
          type: 'pie',
          radius: ['50%', '60%'],
          labelLine:{
            // length: 40,
            // alignTo: 'labelLine',
            // length2: 15
            position: 'outer',
            alignTo: 'labelLine',
            bleedMargin: 5
          },
          label: {
            formatter: '{h1|{d}%}\n{h2|{b}}',
            rich: {
              h1: {

                color: '#5b4f7f',
                lineHeight: 30,
                fontSize: 18,
                fontWeight: 700
              },
              h2:{
                color: '#919dbd',
                fontSize: 14,
                align: 'left',

              }
            }
          },
          data: this.pieData,
          // data: [
          //   {value: 40, name: '谷歌87.0'},
          //   {value: 20, name: 'safari1.0'},
          //   {value: 10, name: '百度4.0'},
          //   {value: 15, name: 'IE12'},
          //   {value: 5, name: '火狐5.1'},
          //   {value: 10, name: 'U2'}
          // ],
          emphasis: {
            label: {
              show: true,
              fontSize: '40',
              fontWeight: 'bold'
            }
          },
        }
      ]
    })

  }
}
</script>

<style lang="scss" scoped>
@import '@css/style.scss';
.ao-browser{
  &-charts{
    width: 100%;
    height: 200px;
    margin-top: 14px;
  }
}


</style>
