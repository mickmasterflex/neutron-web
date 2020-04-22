import Vue from 'vue'
import Vuex from 'vuex'
import auth from './modules/authentication'
import clients from './modules/clients'
import partners from './modules/partners'
import baseTextFields from './modules/base-text-fields'
import baseOptionFields from './modules/base-option-fields'
import buyers from './modules/buyers'
import users from './modules/users'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    auth,
    clients,
    partners,
    buyers,
    users,
    baseTextFields,
    baseOptionFields
  }
})
