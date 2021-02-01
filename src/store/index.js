import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
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
    selectedServiceId: 1,
    // 时间
    time:[new Date((new Date().getTime() - 15 * 60 * 1000)),new Date()],
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
