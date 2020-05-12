import Vue from 'vue'
import Vuex from 'vuex'
import auth from './modules/authentication'
import baseTextFields from './modules/base-fields/base-text-fields'
import baseOptionFields from './modules/base-fields/base-option-fields'
import baseOptions from './modules/base-fields/base-options'
import buyers from './modules/buyers'
import clients from './modules/clients'
import offers from './modules/offers'
import partners from './modules/partners'
import products from './modules/products'
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
    offers,
    partners,
    products,
    users
  }
})
