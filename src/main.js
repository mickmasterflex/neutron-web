import Vue from 'vue'

/* Validation */
import { ValidationProvider, ValidationObserver, extend, configure } from 'vee-validate'
// eslint-disable-next-line camelcase
import { required, email, ext, integer, alpha_dash, image, min_value } from 'vee-validate/dist/rules'

/* App */
import App from '@/App.vue'
import router from '@/router'
import store from '@/store'
import axios from '@/axios'
import VCalendar from 'v-calendar'
import 'animate.css'
import '@/assets/css/styles.css'

/* Font Awesome */
import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faAngleLeft,
  faAngleRight,
  faArrowsAltV,
  faBan,
  faCalendarAlt,
  faChartArea,
  faCheck,
  faCheckCircle,
  faClone,
  faCog,
  faDna,
  faDownload,
  faExclamationTriangle,
  faFileCsv,
  faImage,
  faKey,
  faMinus,
  faPencilAlt,
  faPlus,
  faSearch,
  faSignOutAlt,
  faSpinner,
  faTag,
  faThLarge,
  faThumbsUp,
  faTimesCircle,
  faTrashAlt,
  faUpload,
  faWrench
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* Layouts */
import simpleLayout from '@/layouts/simple-layout'
import appLayout from '@/layouts/app-layout'
import baseContentLayout from '@/layouts/content-layout'

/* Components */
import baseModal from '@/components/ui/modals/base'
import basePanel from '@/components/ui/panels/base/index'
import basePanelGrid from '@/components/ui/panels/grid/base'
import statCard from '@/components/ui/cards/stat-card'
import actionHeading from '@/components/ui/action-heading'
import tableEmptyState from '@/components/ui/tables/empty-state'
import checkboxSingle from '@/components/ui/forms/base-fields/checkbox-single'
import selectField from '@/components/ui/forms/base-fields/select-field'
import textField from '@/components/ui/forms/base-fields/text-field'
import textareaField from '@/components/ui/forms/base-fields/textarea-field'
import vTextField from '@/components/ui/forms/validation-fields/text-field'
import vTextareaField from '@/components/ui/forms/validation-fields/textarea-field'
import vSelectField from '@/components/ui/forms/validation-fields/select-field'
import checkSwitch from '@/components/ui/forms/base-fields/checkbox-switch'

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
Vue.component('content-layout', baseContentLayout)

/* -----------------------------------------------
  Global Components
-------------------------------------------------- */

Vue.component('stat-card', statCard)
Vue.component('modal-template', baseModal)
Vue.component('panel-template', basePanel)
Vue.component('base-panel-grid', basePanelGrid)
Vue.component('action-heading', actionHeading)

// Tables
Vue.component('table-empty-state', tableEmptyState)

// Form Fields
Vue.component('checkbox-single', checkboxSingle)
Vue.component('check-switch', checkSwitch)
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
extend('image', { ...image, message: 'Must be an image file' })
extend('ext', { ...ext, message: 'Incorrect file type' })
extend('url', {
  message: 'Must be a valid URL including "http://"',
  validate: (value) => {
    const regex = RegExp('(http(s)?:\\/\\/)[(www\\.)?a-zA-Z0-9@:%._\\+~#=]{2,256}\\.[a-z]{2,6}\\b([-a-zA-Z0-9@:%_\\+.~#?&//=]*)')
    return regex.test(value)
  }
})
extend('standard_chars', {
  message: 'Must not contain special characters',
  validate: (value) => {
    const regex = RegExp('^[\\w\\-\\s]+$')
    return regex.test(value)
  }
})
extend('dollar_amount', {
  message: 'Must be a valid dollar amount without symbols',
  validate: (value) => {
    const regex = RegExp('^([0-9]{1,3},([0-9]{3},)*[0-9]{3}|[0-9]+)(.[0-9][0-9])?$')
    return regex.test(value)
  }
})
extend('date', {
  message: 'Must be a valid date in the following format: mm-dd-yyyy',
  validate: (value) => {
    const regex = RegExp('^(((0?[1-9]|1[012])-(0?[1-9]|1\\d|2[0-8])|(0?[13456789]|1[012])-(29|30)|(0?[13578]|1[02])-31)-(19|[2-9]\\d)\\d{2}|0?2-29-((19|[2-9]\\d)(0[48]|[2468][048]|[13579][26])|(([2468][048]|[3579][26])00)))$')
    return regex.test(value)
  }
})

// eslint-disable-next-line camelcase
extend('min_value', { ...min_value, message: 'Must be {min} or greater' })
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

library.add(
  faAngleLeft,
  faAngleRight,
  faArrowsAltV,
  faBan,
  faCalendarAlt,
  faChartArea,
  faCheck,
  faCheckCircle,
  faClone,
  faCog,
  faDna,
  faDownload,
  faExclamationTriangle,
  faFileCsv,
  faImage,
  faKey,
  faMinus,
  faPencilAlt,
  faPlus,
  faSearch,
  faSignOutAlt,
  faSpinner,
  faTag,
  faThLarge,
  faThumbsUp,
  faTimesCircle,
  faTrashAlt,
  faUpload,
  faWrench
)
Vue.component('font-awesome-icon', FontAwesomeIcon)

/* -----------------------------------------------
  V-Calendar
-------------------------------------------------- */
Vue.use(VCalendar, {})

/* -----------------------------------------------
  Root Vue Instance
-------------------------------------------------- */

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
