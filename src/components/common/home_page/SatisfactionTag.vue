<template>
  <span class="satisfaction-tag" :class="['st-' + level]">{{ name }}</span>
</template>

<script>
export default {
  name: "SatisfactionTag",
  /*
  * @param:satisfactionLevel
  * @comment:
  *   @value:1 ==> 满意
  *   @value:2 ==> 一般
  *   @value:3 ==> 不满意
  * */
  props: ['level'],
  computed: {
    name(){
      switch (this.level){
        case "1":
          return '满意'
          break;
        case "2":
          return '一般'
          break;
        case "3":
          return '不满意'
          break;
        default:
          return ''
          break;

      }
    }
  },

}
</script>

<style lang="scss" scoped>
.satisfaction-tag{
  display: inline-block;
  width: 100px;
  color: white;
  line-height: 26px;
  text-align: center;
  transform: rotate(45deg);
  position: absolute;
  right: -25px;
  top: 12px;
}
//level样式
.st{
  &-1{
    background: #42d275;
  }
  &-2{
    background: #fec055;
  }
  &-3{
    background: rgb(248,137,124);
  }
}

</style>
