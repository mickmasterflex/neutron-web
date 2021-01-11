import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import auth from './modules/authentication'
import buyerGroups from './modules/buyer-groups'
import buyers from './modules/buyers'
import brands from './modules/brands'
import campaigns from '@/store/modules/campaigns'
import campuses from '@/store/modules/campuses'
import caps from '@/store/modules/caps'
import channels from './modules/channels'
import clients from './modules/clients'
import contractRelations from '@/store/modules/contract-relations'
import deliveries from '@/store/modules/deliveries'
import forms from '@/store/modules/forms'
import geos from '@/store/modules/geos'
import modals from './modules/modals'
import offers from './modules/offers'
import partners from './modules/partners'
import pricingTiers from './modules/pricing-tiers'
import products from './modules/products'
import users from './modules/users'
import toast from '@/store/modules/toast'

import constants from '@/store/constants'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    app,
    auth,
    buyerGroups,
    buyers,
    brands,
    campuses,
    campaigns,
    caps,
    channels,
    clients,
    constants,
    contractRelations,
    deliveries,
    forms,
    geos,
    modals,
    offers,
    partners,
    pricingTiers,
    products,
    users,
    toast
  }
})
