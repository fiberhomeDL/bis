<template>
  <div class="no-data">
    <img class="no-data-img" :src="require('@img/common_icon/nodata.png')">
    <span>暂无数据</span>
  </div>
</template>

<script>
export default {
  name: "NoData"
}
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

  }
}


//
//.nodata{
//  height: 100%;
//  width: 100%;
//  background-image: url("~@img/common_icon/nodata.png");
//  background-position: center center;
//  background-size: 250px 250px ;
//  background-repeat: no-repeat;
//}
//
//.nodata:after{
//  content: "暂无数据";
//  font-size: 20px;
//  color: #C2D4E4;
//  position: absolute;
//  top: 50%;
//  left: 50%;
//  transform: translate(-50%, 168px);
//}

</style>
