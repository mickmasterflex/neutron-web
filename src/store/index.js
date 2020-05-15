import Vue from 'vue'
import Vuex from 'vuex'
import auth from '@/store/modules/authentication'
import baseFields from '@/store/modules/base-fields'
import buyers from '@/store/modules/buyers'
import clients from '@/store/modules/clients'
import offers from '@/store/modules/offers'
import partners from '@/store/modules/partners'
import products from '@/store/modules/products'
import users from '@/store/modules/users'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    auth,
    baseFields,
    buyers,
    clients,
    offers,
    partners,
    products,
    users
  }
})
