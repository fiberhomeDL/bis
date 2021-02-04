<template>
 <div class="ps hw100-oh flex-column">
<!--   <div class="ps-header">-->
<!--     <span class="ps-header-title"-->
<!--           v-for="(v,i) in titleDataHaveActive"-->
<!--           :key="i"a-->
<!--           :class="{'active': v.isActive}"-->
<!--           @click="onTitleClick(v.id)">-->
<!--       {{ v.name }}-->
<!--     </span>-->
<!--   </div>-->
   <tab-select :tab-data="tabData" :active-id="1">

   </tab-select>

   <div class="hw100-oh" style="overflow-y: auto">
    <progress-bar :data="pageNameData"></progress-bar>
   </div>
 </div>
</template>

<script>
import ProgressBar from "@/components/common/ProgressBar";
import TabSelect from "@/components/common/terminal_analysis/TabSelect";
export default {
  name: "ProcessSelect",
  components: {ProgressBar,TabSelect},
  data(){
    return {
      tabData: [
        {
          id: 1,
          name: '浏览器',
        },
        {
          id: 2,
          name: '操作系统',
        }
      ],

      // titleActiveId: 1,
      pageNameData: [
        {id: 1, name: 'index.html', data: 88},
        {id: 2, name: 'egje/asfsfebg/gekeg/home.jsp', data: 220},
        {id: 3, name: 'home.jsp', data: 110},
        {id: 4, name: 'home.jsp', data: 100},
        {id: 5, name: 'home.jsp', data: 77},
        {id: 6, name: 'home.jsp', data: 30},
        {id: 7, name: '/abgeg/ge/sgeg/home.jsp', data: 23}
      ],
    }
  },
  methods: {
    // onTitleClick(id){
    //   this.titleActiveId = id;
    // }
  },
  computed:{
    titleDataHaveActive(){
      return [
        {
          id: 1,
          name: '浏览器',
          // isActive: 1 == this.titleActiveId
        },
        {
          id: 2,
          name: '操作系统',
          // isActive: 2 == this.titleActiveId
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@css/style.scss';
//.ps{
//  &-header{
//    border-bottom: 1px solid #dfe8f7;;
//    margin-bottom: 16px;
//    &-title{
//      display: inline-block;
//      color: #919dbd;
//      font-size: 16px;
//      line-height: 32px;
//      margin-right: 40px;
//      border-bottom: 3px solid transparent;
//      cursor: pointer;
//    }
//    &-title:hover, &-title.active{
//      color: #00baff;
//      border-bottom: 3px solid #00baff;
//    }
//  }
//}

</style>
