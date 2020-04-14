import Vue from 'vue'
import Vuex from 'vuex'
import auth from './modules/authentication'
import clients from './modules/clients'
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    auth,
    clients
  }
})
