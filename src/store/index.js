import Vue from 'vue'
import Vuex from 'vuex'
import util from "@js/common"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    //应用数据数组
    services: [],
    //被选中服务ID
    selectedServiceId: undefined,
    // 时间
    time:[new Date((new Date().getTime() - 15 * 60 * 1000)).toLocaleString(),new Date().toLocaleString()],
    // 聚合分析-错误列表-跳转的ID
    clusterAnalysisId: '',
    // 用户行为追踪-行为列表-跳转ID
    behaviorTraceId:''
  },
  mutations: {
    //为应用列表赋值
    setServices(state,payload){
      state.services = payload;
    },
    //变更选中应用id
    changeSelectedServiceId (state, selectedId) {
      state.selectedServiceId = selectedId;
    },
    changeClusterAnalysisId (state, id){
      state.clusterAnalysisId = id;
    },
    changeBehaviorTraceId (state, id){
      state.behaviorTraceId = id;
    }
  },
  actions: {
  },
  modules: {
  }
})
