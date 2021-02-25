<template>
  <div class="ao-bar">
    <sub-header-title :sub-title="subTitle" :remark="remark"></sub-header-title>
    <div class="ao-bar-item" v-for="(value,i) in barDataByCom.slice(0,5)" :key="i" @click="toPageMonitor(value)">
      <div class="ao-bar-header flex-row">
        <span class="normal-text">{{value.name}}</span>
        <span class="normal-text">{{value.value}}</span>
      </div>
      <el-progress :percentage="value.percentage" :stroke-width="8" :show-text="false" :color="value.color"></el-progress>
    </div>
  </div>
</template>

<script>
import SubHeaderTitle from "@/components/common/SubHeaderTitle";
export default {
  name: "AppOverviewBar",
  components: { SubHeaderTitle},
  props: ['subTitle','remark','barData'],
  data(){
    return {
      color: ['#ffc7b9','#fee5ac','#86ebdc'],
      // barData: [
      //   {
      //     name: 'index.html',
      //     value: 850,
      //   },
      //   {
      //     name: 'action.jsp',
      //     value: 1100,
      //   },
      //   {
      //     name: 'detail.html',
      //     value: 460,
      //   },
      //   {
      //     name: 'view.html',
      //     value: 230,
      //   },
      //   {
      //     name: 'home.html',
      //     value: 120,
      //   },
      // ]
    }
  },
  computed: {
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

</style>
