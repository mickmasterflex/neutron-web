import Vue from 'vue'
import Vuex from 'vuex'
import analytics from '@/store/modules/analytics'
import ancestors from '@/store/modules/ancestors'
import app from './modules/app'
import auth from './modules/authentication'
import buyers from './modules/buyers'
import buyerGroups from '@/store/modules/buyer-groups'
import brands from './modules/brands'
import campaigns from '@/store/modules/campaigns'
import caps from '@/store/modules/caps'
import channels from './modules/channels'
import clients from './modules/clients'
import contractRelations from '@/store/modules/contract-relations'
import deliveries from '@/store/modules/deliveries'
import forms from '@/store/modules/forms'
import geos from '@/store/modules/geos'
import offers from './modules/offers'
import partners from './modules/partners'
import pricingTiers from './modules/pricing-tiers'
import products from './modules/products'
import productGroups from '@/store/modules/product-groups'
import reasons from './modules/reasons'
import users from './modules/users'

import constants from '@/store/constants'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    analytics,
    ancestors,
    app,
    auth,
    buyers,
    buyerGroups,
    brands,
    campaigns,
    caps,
    channels,
    clients,
    constants,
    contractRelations,
    deliveries,
    forms,
    geos,
    offers,
    partners,
    pricingTiers,
    products,
    productGroups,
    reasons,
    users
  }
})
