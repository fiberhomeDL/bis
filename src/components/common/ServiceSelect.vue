<template>
  <div>
    <span class="sub-normal-text">应用：</span>
    <el-select v-model="changeValue" placeholder="请选择" :size="'small'" @change="$emit('onSelectChange', changeValue)">
      <el-option
          v-for="item in services"
          :key="item.id"
          :label="item.name"
          :value="item.id">
      </el-option>
    </el-select>
  </div>
</template>

<script>
export default {
name: "ServiceSelect",
  computed: {
    services(){
      return this.$store.state.services;
    },
    changeValue: {
      get(){
        return this.$store.state.selectedServiceId;
      },
      set(v){
        this.$store.commit('changeSelectedServiceId', v);
      }
    }
  }
};
</script>

<style scoped>
</style>
