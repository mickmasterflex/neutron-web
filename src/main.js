import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from './axios'

import './assets/css/styles.css'

import simpleLayout from './layouts/simpleLayout'
import appLayout from './layouts/appLayout'

import statCard from './components/global/cards/stat-card'
import selectFieldStacked from './components/global/forms/stacked/select-field'
import textFieldStacked from './components/global/forms/stacked/text-field'
import checkboxSingle from './components/global/forms/checkbox-single'

/* -----------------------------------------------
  Authentication
-------------------------------------------------- */

const token = localStorage.getItem('user-token')

if (token) {
  axios.defaults.headers.common.Authorization = token
}

/* -----------------------------------------------
  Layouts
-------------------------------------------------- */

Vue.config.productionTip = false
Vue.component('simple-layout', simpleLayout)
Vue.component('app-layout', appLayout)

/* -----------------------------------------------
  Global Components
-------------------------------------------------- */

Vue.component('stat-card', statCard)
Vue.component('select-field-stacked', selectFieldStacked)
Vue.component('text-field-stacked', textFieldStacked)
Vue.component('checkbox-single', checkboxSingle)

/* -----------------------------------------------
  Root Vue Instance
-------------------------------------------------- */

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
