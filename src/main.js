import Vue from 'vue'
import App from './App.vue'
import Router from './router'
import store from './store'

import './permission'
import './directive'

Vue.config.productionTip = false

// 注册全局 svg-icon 组件 并自动加载所有svg文件
import "@/icons"

new Vue({
  router: Router,
  store,
  render: function (h) { return h(App) },
}).$mount('#app');
