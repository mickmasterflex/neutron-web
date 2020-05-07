import Vue from 'vue'
import Vuex from 'vuex'
import auth from './modules/authentication'
import baseOptions from './modules/base-options'
import baseOptionFields from './modules/base-option-fields'
import baseTextFields from './modules/base-text-fields'
import buyers from './modules/buyers'
import clients from './modules/clients'
import partners from './modules/partners'
import textFields from './modules/text-fields'
import users from './modules/users'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    auth,
    baseTextFields,
    baseOptionFields,
    baseOptions,
    buyers,
    clients,
    partners,
    textFields,
    users
  }
})
