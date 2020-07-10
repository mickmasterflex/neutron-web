import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import auth from './modules/authentication'
import buyers from './modules/buyers'
import brands from './modules/brands'
import campaigns from '@/store/modules/campaigns'
import campuses from '@/store/modules/campuses'
import clients from './modules/clients'
import forms from '@/store/modules/forms'
import modals from './modules/modals'
import offers from './modules/offers'
import partners from './modules/partners'
import products from './modules/products'
import users from './modules/users'
import validation from '@/store/modules/validation'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    app,
    auth,
    buyers,
    brands,
    campuses,
    campaigns,
    clients,
    forms,
    modals,
    offers,
    partners,
    products,
    users,
    validation
  }
})
