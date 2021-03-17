<template>
  <div class="no-data">
    <span :style="{width: imgWidth + 'px',height: imgWidth + 'px'}" class="no-data-img"></span>
    <span :style="{fontSize: fontSize + 'px'}" class="no-data-text">暂无数据</span>
  </div>
</template>

<script>
export default {
  name: "NoData",
  props: {
    imgWidth:{
      type: Number,
      default: 100,
      required: false
    },
    fontSize:{
      type: Number,
      default: 14,
      required: false
    }
  }
};
</script>

<style lang="scss" scoped>
@import '@css/style.scss';
.no-data{
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  &-img{
    width: 100px;
    height: 100px;
    background-image: url("~@img/common_icon/nodata.png");
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center center;
  }

  &-text{
    text-align: center;
    color: #C2D4E4;
    font-size: 14px;
  }
}

</style>
