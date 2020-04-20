import Vue from 'vue'
import Vuex from 'vuex'
import auth from './modules/authentication'
import clients from './modules/clients'
import partners from './modules/partners'
import fields from './modules/fields'
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    auth,
    clients,
    partners,
    fields
  }
})
