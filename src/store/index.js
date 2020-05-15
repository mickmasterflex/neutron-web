import Vue from 'vue'
import Vuex from 'vuex'
import auth from './modules/authentication'
import baseTextFields from './modules/base-text-fields'
import baseOptionFields from './modules/base-option-fields'
import baseOptions from './modules/base-options'
import buyers from './modules/buyers'
import clients from './modules/clients'
import partners from './modules/partners'
import products from './modules/products'
import users from './modules/users'
import offers from './modules/offers'
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    auth,
    clients,
    partners,
    buyers,
    users,
    offers,
    baseTextFields,
    baseOptionFields,
    baseOptions,
    products
  }
})
