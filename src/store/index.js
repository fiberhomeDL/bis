import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    //应用数据数组
    services: [],
    //被选中服务ID
    selectedServiceId: 1,
    // 时间
    time:[new Date((new Date().getTime() - 15 * 60 * 1000)),new Date()],
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
    changeSelectedServiceId (state, selectedId) {
      // 变更状态
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
