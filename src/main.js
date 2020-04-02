import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import simpleLayout from './layouts/simpleLayout'
import appLayout from './layouts/appLayout'
import './assets/css/styles.css'
import axios from './axios'

Vue.config.productionTip = false
Vue.component('simple-layout', simpleLayout)
Vue.component('app-layout', appLayout)

const token = localStorage.getItem('user-token')

if (token) {
  axios.defaults.headers.common.Authorization = token
}

Vue.filter('capitalize', function (value) {
  if (!value) return ''
  value = value.toString()
  return value.charAt(0).toUpperCase() + value.slice(1)
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
