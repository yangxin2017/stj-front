import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 引入全局样式
import '@/assets/style/global.scss'

// 引入element-ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

import '@/permission' // permission control

// axios
import axios from 'axios'
Vue.prototype.$axios = axios

// 引入echarts
import * as echarts from 'echarts'
Vue.prototype.$echarts = echarts

// 引入vue-echarts
import VueEcharts from 'vue-echarts'
Vue.component('v-chart', VueEcharts)

Vue.prototype.$tran = (v) => {
  return (v / 1000 / 1000).toFixed(1)
}

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
