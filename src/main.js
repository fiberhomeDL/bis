import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'


import '@js/axios.config';
import ElementUI from 'element-ui';
// import 'element-ui/lib/theme-chalk/index.css';
import '@css/index.css';

Vue.use(ElementUI);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
