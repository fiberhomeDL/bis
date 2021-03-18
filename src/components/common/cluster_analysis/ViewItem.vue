<template>
  <div class="view-item flex-column">
    <div class="view-item-top" :style="{borderColor: viewItemData.borderColor || viewItemData.mainColor}">
        <img :width="viewItemData.imgSize || 49" :src="viewItemData.imgUrl" alt="" :style="viewItemData.shadowStyle">
    </div>
    <div class="view-item-middle">{{ viewItemData.name }}</div>
    <div class="view-item-bottom">
      <span class="view-item-bottom-num" :style="{color: viewItemData.mainColor}">{{ viewItemData.value | numLocalString }}</span>
      <span v-if="viewItemData.name==='影响用户'" class="view-item-bottom-unit">位</span>
      <span v-else class="view-item-bottom-unit">次</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "ViewItem",
  props: ['viewItemData'],
  filters: {
    //将数字转化成 100,000,000格式 如果为特殊值 则输入 --
    numLocalString(value){
      if(!value){
        return 0;
      }else if(Number.isNaN(Number(value))){
        return '--';
      }else{
        return Number(value).toLocaleString();
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import '@css/style.scss';

.view-item{
  align-items: center;
&-top{
   height: 94px;
   width: 94px;
   border: solid 1px #bde5ff;
   border-radius: 50px;
   display: flex;
   justify-content: center;
   align-items: center;
 }

&-middle{
   text-align: center;
   color: #575777;
   font-size: 16px;
   margin: 24px 0 16px 0;
 }

&-bottom{
  text-align: center;
  &-num{
     font-size: 30px;
   }
  &-unit{
     color: #575777;
     font-size: 16px;
   }
  }
}

</style>
