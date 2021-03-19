<template>
 <div class="ps hw100-oh flex-column">
   <tab-select :tab-data="tabName" :active-id="'bw'" @onChange="changeTab">
   </tab-select>
   <div class="hw100-oh" style="overflow-y: auto">
    <progress-bar :data="showListData" @selectItem="$emit('onItemSelect',$event)"></progress-bar>
   </div>
 </div>
</template>

<script>
import ProgressBar from "@/components/common/ProgressBar";
import TabSelect from "@/components/common/terminal_analysis/TabSelect";
export default {
  name: "ProcessSelect",
  props: ['tabData'],
  components: {ProgressBar,TabSelect},
  data(){
    return {
      //bw浏览器 os操作系统
      activeTabId: 'bw',
      tabName: [
        {
          id: 'bw',
          name: '浏览器'
        },
        {
          id: 'os',
          name: '操作系统'
        }
      ],
      pageNameData: []
    }
  },
  methods: {
    changeTab(id){
      this.activeTabId = id;
      if(this.showListData.length !== 0){
        this.$emit('onItemSelect',this.showListData[0]);
      }
    },
  },
  computed:{
    /*tab下的列表*/
    showListData(){
      if(!this.tabData){
        return [];
      }
      return this.tabData[this.activeTabId];
    }
  }
};
</script>

<style lang="scss" scoped>
@import '@css/style.scss';

</style>
