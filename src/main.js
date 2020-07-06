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
import 'animate.css'
import '@/assets/css/styles.css'
import PortalVue from 'portal-vue'

/* Font Awesome */
import { library } from '@fortawesome/fontawesome-svg-core'
import { faPlus, faMinus, faSignOutAlt, faArrowsAltV, faWrench, faPencilAlt, faExclamationTriangle, faThLarge, faChartArea, faDna, faCog, faKey, faAtom } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* Layouts */
import simpleLayout from '@/layouts/simple-layout'
import appLayout from '@/layouts/app-layout'

/* Components */
import baseModal from '@/components/ui/modals/base'
import topNavItem from '@/components/ui/nav/top/navItem'
import statCard from '@/components/ui/cards/stat-card'
import tableEmptyState from '@/components/ui/tables/empty-state'
import checkboxSingle from '@/components/ui/forms/base-fields/checkbox-single'
import selectField from '@/components/ui/forms/base-fields/select-field'
import textField from '@/components/ui/forms/base-fields/text-field'
import textareaField from '@/components/ui/forms/base-fields/textarea-field'
import vTextField from '@/components/ui/forms/validation-fields/text-field'
import vTextareaField from '@/components/ui/forms/validation-fields/textarea-field'
import vSelectField from '@/components/ui/forms/validation-fields/select-field'

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
Vue.component('top-nav-item', topNavItem)

// Tables
Vue.component('table-empty-state', tableEmptyState)

// Form Fields
Vue.component('checkbox-single', checkboxSingle)
Vue.component('text-field', textField)
Vue.component('v-text-field', vTextField)
Vue.component('textarea-field', textareaField)
Vue.component('v-textarea-field', vTextareaField)
Vue.component('select-field', selectField)
Vue.component('v-select-field', vSelectField)

/* -----------------------------------------------
  Validation
-------------------------------------------------- */

extend('email', { ...email, message: 'Invalid email' })
extend('required', { ...required, message: 'Required' })
extend('integer', { ...integer, message: 'Must be an integer' })
// eslint-disable-next-line camelcase
extend('alpha_dash', { ...alpha_dash, message: 'Only use alphabetic characters, numbers, dashes or underscores' })
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

library.add(faPlus, faMinus, faSignOutAlt, faArrowsAltV, faWrench, faPencilAlt, faExclamationTriangle, faThLarge, faChartArea, faDna, faCog, faKey, faAtom)
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
