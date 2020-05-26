import Vue from 'vue'

/* Validation */
import { ValidationProvider, ValidationObserver, extend, configure } from 'vee-validate'
// eslint-disable-next-line camelcase
import { required, email, integer, alpha_dash } from 'vee-validate/dist/rules'

/* App */
import App from '@/App.vue'
import router from '@/router'
import store from '@/store'
import axios from '@/axios'
import '@/assets/css/styles.css'
import PortalVue from 'portal-vue'

/* Font Awesome */
import { library } from '@fortawesome/fontawesome-svg-core'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* Layouts */
import simpleLayout from '@/layouts/simple-layout'
import appLayout from '@/layouts/app-layout'

/* Components */
import baseModal from '@/components/global/modals/base'
import statCard from '@/components/global/cards/stat-card'
import checkboxSingle from '@/components/global/forms/base-fields/checkbox-single'
import selectField from '@/components/global/forms/base-fields/select-field'
import textField from '@/components/global/forms/base-fields/text-field'
import vTextField from '@/components/global/forms/validation-fields/text-field'
import vSelectField from '@/components/global/forms/validation-fields/select-field'

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
Vue.component('modal-template', baseModal)

// Form Fields
Vue.component('checkbox-single', checkboxSingle)
Vue.component('text-field', textField)
Vue.component('v-text-field', vTextField)
Vue.component('select-field', selectField)
Vue.component('v-select-field', vSelectField)

/* -----------------------------------------------
  Validation
-------------------------------------------------- */

extend('email', { ...email, message: 'Invalid email address' })
extend('required', { ...required, message: 'Required field' })
extend('integer', { ...integer, message: 'Must be an integer' })
// eslint-disable-next-line camelcase
extend('alpha_dash', { ...alpha_dash, message: 'Can only contain alphabetic characters, numbers, dashes or underscores' })
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
  Font Awesome
-------------------------------------------------- */

library.add(faTimes)
Vue.component('font-awesome-icon', FontAwesomeIcon)

/* -----------------------------------------------
  Root Vue Instance
-------------------------------------------------- */

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

Vue.use(PortalVue)
