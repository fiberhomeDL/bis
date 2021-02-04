<template>
  <div class="tab-header">
     <span class="tab-header-title"
           v-for="(v,i) in titleDataHaveActive"
           :key="i"a
           :class="{'active': v.isActive}"
           @click="onTitleClick(v.id)">
       {{ v.name }}
     </span>
  </div>
</template>

<script>
export default {
  name: "TabSelect",
  props: ['tabData','activeId'],
  data(){
    return {
      titleActiveId: this.activeId,
    }
  },
  computed:{
    titleDataHaveActive(){
      return this.tabData.map(item=>{
        item.isActive = (item.id == this.titleActiveId)
        return item;
      })
    }
  },
  methods: {
    onTitleClick(id){
      if(!(this.titleActiveId == id)){
        this.titleActiveId = id;
        this.$emit('onChange',id)
      }

    }
  }


}
</script>

<style lang="scss" scoped>
.tab{
  &-header{
     border-bottom: 1px solid #dfe8f7;;
     margin-bottom: 16px;
    &-title{
       display: inline-block;
       color: #919dbd;
       font-size: 16px;
       line-height: 32px;
       margin-right: 40px;
       border-bottom: 3px solid transparent;
       cursor: pointer;
     }
    &-title:hover, &-title.active{
      color: #00baff;
      border-bottom: 3px solid #00baff;
    }
  }
}

</style>
