import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'


import '@js/axios.config';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import echarts from 'echarts'

Vue.use(ElementUI);

Vue.prototype.$echarts = echarts

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
