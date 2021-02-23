import Vue from 'vue'
import Vuex from 'vuex'
import util from "@js/common"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    //应用数据数组
    services: [
      {
        id: 1,
        name: 'testPG1',
      },
      {
        id: 2,
        name: 'testPG2',
      },
      {
        id: 3,
        name: 'testPG3',
      }
    ],
    //被选中数组ID
    selectedServiceId: 1,
    // 时间
    time:[new Date((new Date().getTime() - 15 * 60 * 1000)).toLocaleString(),new Date().toLocaleString()],
    // 聚合分析-错误列表-跳转的ID
    clusterAnalysisId: '',
    // 用户行为追踪-行为列表-跳转ID
    behaviorTraceId:''
  },
  mutations: {
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
