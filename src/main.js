import Vue from 'vue'
import { ValidationProvider, ValidationObserver, extend, configure } from 'vee-validate'
import { required, email } from 'vee-validate/dist/rules'

import App from '@/App.vue'
import router from '@/router'
import store from '@/store'
import axios from '@/axios'
import '@/assets/css/styles.css'

/* Layouts */
import simpleLayout from '@/layouts/simpleLayout'
import appLayout from '@/layouts/appLayout'

/* Components */
import statCard from '@/components/global/cards/stat-card'
import selectFieldStacked from '@/components/global/forms/stacked/select-field'
import textFieldStacked from '@/components/global/forms/stacked/text-field'
import checkboxSingle from '@/components/global/forms/checkbox-single'
import textField from '@/components/global/forms/validation_fields/text_field'

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
Vue.component('text-field', textField)

/* -----------------------------------------------
  Validation
-------------------------------------------------- */

extend('email', { ...email, message: 'Invalid email address' })
extend('required', { ...required, message: 'Required field' })
Vue.component('validation-provider', ValidationProvider)
Vue.component('validation-observer', ValidationObserver)
configure({
  classes: {
    valid: 'is-valid',
    invalid: 'is-invalid',
    dirty: 'is-dirty',
    touched: 'is-touched',
    untouched: 'is-untouched',
    pristine: 'is-pristine',
    required: 'is-required'
  }
})

/* -----------------------------------------------
  Root Vue Instance
-------------------------------------------------- */

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
