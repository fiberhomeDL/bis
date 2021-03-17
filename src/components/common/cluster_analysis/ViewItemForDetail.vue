<template>
  <div class="view-item flex-row">
    <div class="view-item-top" :style="{borderColor: viewItemData.borderColor || viewItemData.mainColor}">
      <img :width="viewItemData.imgSize || 49" :src="viewItemData.imgUrl" :style="viewItemData.shadowStyle">
    </div>
    <div style="padding-left: 24px;">
      <div class="view-item-middle">{{ viewItemData.name }}</div>
      <div class="view-item-bottom">
        <span class="view-item-bottom-num" :style="{color: viewItemData.mainColor}">{{ viewItemData.value | numLocalString }}</span>
        <span class="view-item-bottom-unit">次</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ViewItem",
  props: ['viewItemData'],
  filters: {
    // 格式化时间
    numLocalString(value){
      if(!value){
        return 0;
      }
      return Number(value).toLocaleString();
    }
  }
};
</script>

<style lang="scss" scoped>
@import '@css/style.scss';

.view-item{
  justify-content: center;
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
     //text-align: center;
     color: #575777;
     font-size: 16px;
    margin-bottom: 16px;
     //margin: 24px 0 16px 0;
   }

  &-bottom{
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
