<template>
  <span @click="$emit('click')" class="download-button"></span>
</template>

<script>
export default {
  name: "DownloadButton"
};
</script>

<style lang="scss" scoped>
@import '@css/style.scss';

.download-button{
  display: inline-block;
  width: 18px;
  height: 18px;
  background-image: url("~@img/common_icon/download.svg");
  background-size: cover;
  cursor: pointer;
}

</style>
