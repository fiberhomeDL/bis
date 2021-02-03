import Vue from 'vue'
import Vuex from 'vuex'

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
    time:[new Date((new Date().getTime() - 15 * 60 * 1000)),new Date()],
    // 聚合分析-错误列表-跳转的ID
    clusterAnalysisId: ''
  },
  mutations: {
    changeSelectedServiceId (state, selectedId) {
      // 变更状态
      state.selectedServiceId = selectedId;
    },
    changeClusterAnalysisId (state, id){
      state.clusterAnalysisId = id;
    }
  },
  actions: {
  },
  modules: {
  }
})
