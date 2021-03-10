<template>
  <div class="ao-bar">
    <sub-header-title :sub-title="subTitle" :remark="remark"></sub-header-title>
    <div class="ao-bar-item" v-for="(value,i) in barDataByCom.slice(0,4)" :key="i" @click="toPageMonitor(value)">
      <div class="ao-bar-header flex-row">
        <span class="normal-text rtl-text ip-name">{{value.name}}&#x200E;</span>
        <span class="normal-text time-name">{{value.value}}ms</span>
      </div>
      <el-progress :percentage="value.percentage" :stroke-width="8" :show-text="false" :color="value.color"></el-progress>
    </div>
    <div style="height: 200px;" class="empty" v-if="barDataByCom.length == 0" >
      <no-data></no-data>
    </div>
  </div>
</template>

<script>
import SubHeaderTitle from "@/components/common/SubHeaderTitle";
import NoData from "@/components/common/NoData";
export default {
  name: "AppOverviewBar",
  components: {NoData, SubHeaderTitle},
  props: ['subTitle','remark','barData'],
  data(){
    return {
      color: ['#ffc7b9','#fee5ac','#86ebdc'],
    }
  },
  computed: {
    //对数据进行排序 比例缩放 的操作
    barDataByCom(){
      let max = Math.max(...this.barData.map(item=>{
        return item.value
      }));
      let sortArr = this.barData.sort(function(a,b){
        return b.value - a.value
      });
      sortArr.forEach(item=>{
        let percentage = Math.floor(item.value / max * 100);
        item.percentage = percentage;
        if(item.value > 500){
          item.color = this.color[0]
        }else if(item.value > 200 && item.value <= 500){
          item.color = this.color[1]
        }else{
          item.color = this.color[2]
        }

      })
      return sortArr;
    }
  },

  methods: {
    toPageMonitor(value){
      let id = value.id;
      let name = value.name;
      this.$emit('to-page-monitor', {id,name})
    },
  }


}
</script>

<style lang="scss" scoped>
@import '@css/style.scss';
.ao-bar{
  &-header{
    //color: #575777;
    margin: 18px 0 12px 0;
    justify-content: space-between;
  }

  &-item{
    cursor: pointer;
  }

  &-item:hover span{
    color: #00baff;
  }
}
.rtl-text{
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  direction: rtl;
}

.ip-name{
  line-height: 18px;
  max-width: calc(100% - 56px);
}

.time-name{
  line-height: 18px;
}

</style>
