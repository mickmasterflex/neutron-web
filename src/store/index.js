import Vue from 'vue'
import Vuex from 'vuex'
import auth from './modules/authentication'
import buyers from './modules/buyers'
import campaigns from '@/store/modules/campaigns'
import clients from './modules/clients'
import forms from '@/store/modules/forms'
import offers from './modules/offers'
import partners from './modules/partners'
import products from './modules/products'
import users from './modules/users'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    auth,
    buyers,
    campaigns,
    clients,
    forms,
    offers,
    partners,
    products,
    users
  }
})
