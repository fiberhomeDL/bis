<template>
    <div class="app-overview flex-column">
      <div class="app-overview-header flex-row">
        <span class="app-overview-header-title">应用：</span>
        <service-select @onSelectChange="onSelectChange"></service-select>
      </div>
      <div class="app-overview-wrapper">

      </div>
    </div>
</template>

<script>
import ServiceSelect from "@/components/common/ServiceSelect";
export default {
  name: "AppOverview",
  components: {ServiceSelect},
  data(){
    return{
    }
  },
  methods: {
    onSelectChange(selectId){
      alert(selectId);
    }
  }
}
</script>

<style lang="scss">
@import '@css/style.scss';
.app-overview{
  height: 100%;
  width: 100%;
  overflow: hidden;
  &-header{
    height: 52px;
    background-color: #ffffff;
    box-shadow: 0px 4px 8px 0px #b7c4e0;
    align-items: center;
    padding: 0 24px;


    &-title{
      color: #919dbd;
      margin-right: 12px;
    }
  }

  &-wrapper{
    height: 100%;
    overflow: hidden;
  }


}
</style>
