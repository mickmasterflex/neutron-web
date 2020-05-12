import Vue from 'vue'
import Vuex from 'vuex'
import auth from './modules/authentication'
import clients from './modules/clients'
import partners from './modules/partners'
import buyers from './modules/buyers'
import users from './modules/users'
import offers from './modules/offers'
import products from './modules/products'
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    auth,
    clients,
    partners,
    buyers,
    users,
    offers,
    products
  }
})
