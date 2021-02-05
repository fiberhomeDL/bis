<template>
  <div class="pb hw100-oh flex-column">
    <div class="pb-item flex-row" v-for="(value, index) in pbObj.pbData" :key="index">
<!--      数据条名称-->
      <span class="pb-item-name" :style="{width: nameWidth + 'px'}">{{ value.name }}</span>
<!--      计算数据条宽度-->
      <div class="pb-item-bg" :style="{background: pbObj.mainColor,width: 60 * value.value / maxValue + '%'}"></div>
<!--      拼写单位-->
      <span class="pb-item-value">{{ value.value }}{{ pbObj.unit }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProcessBar",
  props: {
    'pbObj': Object,
    'nameWidth': {
      default: 70
    }
  },
  data(){
    return {
      // mainColor: '#86ebdc',
      // unit: '%',
      // pbData: [
      //   {
      //     name: '谷歌 87.0',
      //     value: 100
      //   },
      //   {
      //     name: '谷歌 83.0',
      //     value: 80
      //   },
      //   {
      //     name: '百度 1.0',
      //     value: 60
      //   },
      //   {
      //     name: 'U2 4.0',
      //     value: 40
      //   },
      //   {
      //     name: 'IE 3.0',
      //     value: 20
      //   }
      // ],
    }
  },
  computed: {
    maxValue(){
      return Math.max(...this.pbObj.pbData.map(item => item.value));
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@css/style.scss';
.pb{
  justify-content: space-around;
  &-item{
    align-items: center;
    &-name {
      //width: 70px;
      text-align: right;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
      color: #575777;
    }

    &-bg{
      margin: 0 14px 0 10px;
      width: 60%;
      height: 8px;
      background: transparent;
      border-radius: 4px;
    }

    &-value{
      color: #575777;
    }
  }
}

</style>
