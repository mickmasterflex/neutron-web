import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: () => import('@/views/Dashboard.vue'),
    meta: {
      requiresAuth: true,
      activeApp: 'dashboard',
      title: 'Dashboard'
    },
    pathToRegexpOptions: { strict: true }
  },
  {
    path: '/login/',
    name: 'Login',
    component: () => import('@/views/authentication/login.vue'),
    meta: {
      layout: 'simple',
      title: 'Login'
    },
    pathToRegexpOptions: { strict: true }
  },
  {
    path: '/analytics/',
    name: 'Analytics',
    redirect: { name: 'BuyerStats' }
  },
  {
    path: '/analytics/partner-stats/',
    name: 'PartnerStats',
    redirect: { name: 'PartnerStatsClients' },
    component: () => import('@/views/analytics/clients/partner-stats'),
    children: [
      {
        name: 'PartnerStatsClients',
        path: 'clients/',
        component: () => import('@/views/analytics/clients/clients'),
        meta: {
          requiresAuth: true,
          activeApp: 'analytics',
          activeAppTab: 'partner-stats',
          contentTab: 'clients',
          title: 'All Partner Client Stats'
        },
        pathToRegexpOptions: { strict: true }
      },
      {
        name: 'PartnerStatsClientsLeads',
        path: 'leads/',
        component: () => import('@/views/analytics/leads'),
        meta: {
          requiresAuth: true,
          activeApp: 'analytics',
          activeAppTab: 'partner-stats',
          contentTab: 'leads',
          title: 'All Partner Client Lead Stats'
        },
        pathToRegexpOptions: { strict: true }
      }
    ]
  },
  {
    path: '/analytics/partner-stats/clients/:id/',
    name: 'PartnerStatsClient',
    redirect: { name: 'PartnerStatsClientContracts' },
    component: () => import('@/views/analytics/client/partner-stats'),
    props (route) {
      const props = { ...route.params }
      props.id = +props.id
      return props
    },
    children: [
      {
        name: 'PartnerStatsClientContracts',
        path: 'contracts/',
        component: () => import('@/views/analytics/client/contracts'),
        meta: {
          requiresAuth: true,
          activeApp: 'analytics',
          activeAppTab: 'partner-stats',
          contentTab: 'contracts'
        },
        pathToRegexpOptions: { strict: true }
      },
      {
        name: 'PartnerStatsClientLeads',
        path: 'leads/',
        component: () => import('@/views/analytics/leads'),
        meta: {
          requiresAuth: true,
          activeApp: 'analytics',
          activeAppTab: 'partner-stats',
          contentTab: 'leads'
        },
        pathToRegexpOptions: { strict: true }
      }
    ]
  },
  {
    path: '/analytics/buyer-stats/',
    name: 'BuyerStats',
    redirect: { name: 'BuyerStatsClients' },
    component: () => import('@/views/analytics/clients/buyer-stats'),
    children: [
      {
        name: 'BuyerStatsClients',
        path: 'clients/',
        component: () => import('@/views/analytics/clients/clients'),
        meta: {
          requiresAuth: true,
          activeApp: 'analytics',
          activeAppTab: 'buyer-stats',
          contentTab: 'clients',
          title: 'All Buyer Client Stats'
        },
        pathToRegexpOptions: { strict: true }
      },
      {
        name: 'BuyerStatsClientsLeads',
        path: 'leads/',
        component: () => import('@/views/analytics/leads'),
        meta: {
          requiresAuth: true,
          activeApp: 'analytics',
          activeAppTab: 'buyer-stats',
          contentTab: 'leads',
          title: 'All Buyer Client Lead Stats'
        },
        pathToRegexpOptions: { strict: true }
      }
    ]
  },
  {
    path: '/analytics/buyer-stats/clients/:id/',
    name: 'BuyerStatsClient',
    redirect: { name: 'BuyerStatsClientContracts' },
    component: () => import('@/views/analytics/client/buyer-stats'),
    props (route) {
      const props = { ...route.params }
      props.id = +props.id
      return props
    },
    children: [
      {
        name: 'BuyerStatsClientContracts',
        path: 'contracts/',
        component: () => import('@/views/analytics/client/contracts'),
        meta: {
          requiresAuth: true,
          activeApp: 'analytics',
          activeAppTab: 'buyer-stats',
          contentTab: 'contracts'
        },
        pathToRegexpOptions: { strict: true }
      },
      {
        name: 'BuyerStatsClientLeads',
        path: 'leads/',
        component: () => import('@/views/analytics/leads'),
        meta: {
          requiresAuth: true,
          activeApp: 'analytics',
          activeAppTab: 'buyer-stats',
          contentTab: 'leads'
        },
        pathToRegexpOptions: { strict: true }
      }
    ]
  },
  {
    path: '/analytics/buyer-stats/clients/:clientId/contracts/:id/',
    name: 'BuyerStatsContract',
    redirect: { name: 'BuyerStatsContractOffers' },
    component: () => import('@/views/analytics/buyer-stats/contract'),
    props (route) {
      const props = { ...route.params }
      props.id = +props.id
      props.clientId = +props.clientId
      return props
    },
    children: [
      {
        name: 'BuyerStatsContractContracts',
        path: 'contracts/',
        component: () => import('@/views/analytics/buyer-stats/contract/contracts'),
        meta: {
          requiresAuth: true,
          activeApp: 'analytics',
          activeAppTab: 'buyer-stats',
          contentTab: 'contracts'
        },
        pathToRegexpOptions: { strict: true }
      },
      {
        name: 'BuyerStatsContractOffers',
        path: 'offers/',
        component: () => import('@/views/analytics/buyer-stats/contract/offers'),
        meta: {
          requiresAuth: true,
          activeApp: 'analytics',
          activeAppTab: 'buyer-stats',
          contentTab: 'offers'
        },
        pathToRegexpOptions: { strict: true }
      },
      {
        name: 'BuyerStatsContractLeads',
        path: 'leads/',
        component: () => import('@/views/analytics/leads'),
        meta: {
          requiresAuth: true,
          activeApp: 'analytics',
          activeAppTab: 'buyer-stats',
          contentTab: 'leads'
        },
        pathToRegexpOptions: { strict: true }
      }
    ]
  },
  {
    path: '/analytics/buyer-stats/clients/:clientId/contracts/:buyerId/offers/:id',
    name: 'BuyerStatsOfferContract',
    redirect: { name: 'BuyerStatsOfferContractLeads' },
    component: () => import('@/views/analytics/buyer-stats/offer'),
    props (route) {
      const props = { ...route.params }
      props.id = +props.id
      props.clientId = +props.clientId
      return props
    },
    children: [
      {
        name: 'BuyerStatsOfferContractLeads',
        path: 'leads/',
        component: () => import('@/views/analytics/leads'),
        meta: {
          requiresAuth: true,
          activeApp: 'analytics',
          activeAppTab: 'buyer-stats'
        },
        pathToRegexpOptions: { strict: true }
      }
    ]
  },
  {
    path: '/products/brands/',
    name: 'Brands',
    component: () => import('@/views/products/index.vue'),
    meta: {
      requiresAuth: true,
      activeApp: 'products',
      activeAppTab: 'product-mgmt',
      title: 'Brands'
    },
    pathToRegexpOptions: { strict: true }
  },
  {
    path: '/products/brands/:id/',
    component: () => import('@/views/products/brand/index.vue'),
    props (route) {
      const props = { ...route.params }
      props.id = +props.id
      return props
    },
    children: [
      {
        name: 'BrandDetails',
        path: '',
        component: () => import('@/views/products/brand/details.vue'),
        meta: {
          requiresAuth: true,
          activeApp: 'products',
          activeAppTab: 'product-mgmt',
          contentTab: 'details'
        },
        pathToRegexpOptions: { strict: true }
      },
      {
        path: '/products/brands/:id/campuses/',
        name: 'BrandCampuses',
        component: () => import('@/views/products/brand/campuses.vue'),
        meta: {
          requiresAuth: true,
          activeApp: 'products',
          activeAppTab: 'product-mgmt',
          contentTab: 'campuses'
        },
        pathToRegexpOptions: { strict: true }
      }
    ]
  },
  {
    path: '/products/brands/:brand/campuses/:id/',
    component: () => import('@/views/products/campus/index.vue'),
    props (route) {
      const props = { ...route.params }
      props.id = +props.id
      return props
    },
    children: [
      {
        name: 'CampusDetails',
        path: '',
        component: () => import('@/views/products/campus/details.vue'),
        meta: {
          requiresAuth: true,
          activeApp: 'products',
          activeAppTab: 'product-mgmt',
          contentTab: 'details'
        },
        pathToRegexpOptions: { strict: true }
      },
      {
        name: 'CampusProducts',
        path: 'education-products',
        component: () => import('@/views/products/campus/products.vue'),
        meta: {
          requiresAuth: true,
          activeApp: 'products',
          activeAppTab: 'product-mgmt',
          contentTab: 'products'
        },
        pathToRegexpOptions: { strict: true }
      }
    ]
  },
  {
    path: '/products/brands/:brand/campuses/education-products/:id/',
    component: () => import('@/views/products/education-product/index.vue'),
    props (route) {
      const props = { ...route.params }
      props.id = +props.id
      return props
    },
    children: [
      {
        name: 'ProductDetails',
        path: '',
        component: () => import('@/views/products/education-product/details.vue'),
        meta: {
          requiresAuth: true,
          activeApp: 'products',
          activeAppTab: 'product-mgmt',
          contentTab: 'details'
        },
        pathToRegexpOptions: { strict: true }
      },
      {
        name: 'ProductOffers',
        path: 'offers/',
        component: () => import('@/views/products/education-product/offers.vue'),
        meta: {
          requiresAuth: true,
          activeApp: 'products',
          activeAppTab: 'product-mgmt',
          contentTab: 'offers'
        },
        pathToRegexpOptions: { strict: true }
      }
    ]
  },
  {
    path: '/products/fields/',
    name: 'FieldManagement',
    component: () => import('@/views/products/base-field-management.vue'),
    meta: {
      requiresAuth: true,
      activeApp: 'products',
      activeAppTab: 'field-mgmt',
      title: 'Field Management'
    },
    pathToRegexpOptions: { strict: true }
  },
  {
    path: '/config/pricing-tiers/',
    name: 'PricingTiers',
    component: () => import('@/views/config/pricing-tiers/index.vue'),
    meta: {
      requiresAuth: true,
      activeApp: 'config',
      activeAppTab: 'pricing-tiers',
      title: 'Pricing Tiers'
    },
    pathToRegexpOptions: { strict: true }
  },
  {
    path: '/config/channels/',
    name: 'Channels',
    component: () => import('@/views/config/channels/index.vue'),
    meta: {
      requiresAuth: true,
      activeApp: 'config',
      activeAppTab: 'channels',
      title: 'Channels'
    },
    pathToRegexpOptions: { strict: true }
  },
  {
    path: '/relationships/',
    name: 'Relationships',
    component: () => import('@/views/relationships/index.vue'),
    redirect: { name: 'Clients' },
    children: [
      {
        name: 'Clients',
        path: 'clients/',
        component: () => import('@/views/relationships/contract-mgmt/clients/index.vue'),
        meta: {
          requiresAuth: true,
          activeApp: 'relationships',
          contentTab: 'clients',
          title: 'Clients'
        },
        pathToRegexpOptions: { strict: true }
      },
      {
        name: 'BuyerGroups',
        path: 'buyer-groups/',
        component: () => import('@/views/relationships/buyer-groups.vue'),
        meta: {
          requiresAuth: true,
          activeApp: 'relationships',
          contentTab: 'buyerGroups',
          title: 'Buyer Groups'
        },
        pathToRegexpOptions: { strict: true }
      }
    ]
  },
  {
    path: '/relationships/clients/:slug/',
    component: () => import('@/views/relationships/contract-mgmt/clients/client/index.vue'),
    props (route) {
      return { ...route.params }
    },
    children: [
      {
        name: 'Client',
        path: '',
        component: () => import('@/views/relationships/contract-mgmt/clients/client/details.vue'),
        meta: {
          requiresAuth: true,
          activeApp: 'relationships',
          contentTab: 'details'
        },
        pathToRegexpOptions: { strict: true }
      },
      {
        path: 'contracts/',
        name: 'ClientContracts',
        component: () => import('@/views/relationships/contract-mgmt/clients/client/contracts.vue'),
        meta: {
          requiresAuth: true,
          activeApp: 'relationships',
          contentTab: 'contracts'
        },
        pathToRegexpOptions: { strict: true }
      }
    ]
  },
  {
    path: '/relationships/clients/:client/contracts/partners/:id/',
    component: () => import('@/views/relationships/contract-mgmt/partner/index.vue'),
    props (route) {
      const props = { ...route.params }
      props.id = +props.id
      return props
    },
    children: [
      {
        name: 'PartnerContract',
        path: '',
        component: () => import('@/views/relationships/contract-mgmt/partner/details.vue'),
        meta: {
          requiresAuth: true,
          activeApp: 'relationships',
          contentTab: 'details'
        },
        props (route) {
          const props = { ...route.params }
          props.id = +props.id
          return props
        },
        pathToRegexpOptions: { strict: true }
      },
      {
        path: 'campaigns/',
        name: 'PartnerContractCampaigns',
        component: () => import('@/views/relationships/contract-mgmt/partner/campaigns.vue'),
        meta: {
          requiresAuth: true,
          activeApp: 'relationships',
          contentTab: 'campaigns'
        },
        pathToRegexpOptions: { strict: true }
      },
      {
        name: 'PartnerContractChildren',
        path: 'contracts/',
        component: () => import('@/views/relationships/contract-mgmt/partner/contracts'),
        meta: {
          requiresAuth: true,
          activeApp: 'relationships',
          contentTab: 'contracts'
        },
        pathToRegexpOptions: { strict: true }
      }
    ]
  },
  {
    path: '/relationships/clients/:client/contracts/partners/:partner/campaigns/:id/',
    name: 'Campaign',
    component: () => import('@/views/relationships/contract-mgmt/campaign.vue'),
    meta: {
      requiresAuth: true,
      activeApp: 'relationships'
    },
    pathToRegexpOptions: { strict: true },
    props (route) {
      const props = { ...route.params }
      props.partner = +props.partner
      props.id = +props.id
      return props
    }
  },
  {
    path: '/relationships/clients/:client/contracts/buyers/:id/',
    component: () => import('@/views/relationships/contract-mgmt/buyer/index.vue'),
    props (route) {
      const props = { ...route.params }
      props.id = +props.id
      return props
    },
    children: [
      {
        name: 'BuyerContract',
        path: '',
        component: () => import('@/views/relationships/contract-mgmt/buyer/details.vue'),
        meta: {
          requiresAuth: true,
          activeApp: 'relationships',
          contentTab: 'details'
        },
        props (route) {
          const props = { ...route.params }
          props.id = +props.id
          return props
        },
        pathToRegexpOptions: { strict: true }
      },
      {
        name: 'BuyerContractChildren',
        path: 'contracts/',
        component: () => import('@/views/relationships/contract-mgmt/buyer/contracts'),
        meta: {
          requiresAuth: true,
          activeApp: 'relationships',
          contentTab: 'contracts'
        },
        pathToRegexpOptions: { strict: true }
      },
      {
        name: 'BuyerContractFieldManagement',
        path: 'field-management/',
        component: () => import('@/views/relationships/contract-mgmt/buyer/field-management'),
        meta: {
          requiresAuth: true,
          activeApp: 'relationships',
          contentTab: 'field-management'
        },
        pathToRegexpOptions: { strict: true }
      },
      {
        name: 'BuyerContractOffers',
        path: 'offers/',
        component: () => import('@/views/relationships/contract-mgmt/buyer/offers.vue'),
        meta: {
          requiresAuth: true,
          activeApp: 'relationships',
          contentTab: 'offers'
        },
        pathToRegexpOptions: { strict: true }
      }
    ]
  },
  {
    path: '/relationships/clients/:client/contracts/buyers/:buyer/offers/:id/',
    name: 'Offer',
    component: () => import('@/views/relationships/contract-mgmt/offer.vue'),
    meta: {
      requiresAuth: true,
      activeApp: 'relationships'
    },
    pathToRegexpOptions: { strict: true },
    props (route) {
      const props = { ...route.params }
      props.id = +props.id
      return props
    }
  },
  {
    path: '/utilities/',
    name: 'Utilities',
    component: () => import('@/views/Utilities.vue'),
    meta: {
      requiresAuth: true,
      activeApp: 'utilities',
      title: 'Utilities'
    },
    pathToRegexpOptions: { strict: true }
  },
  {
    path: '/users/',
    name: 'Users',
    component: () => import('@/views/users/index.vue'),
    meta: {
      requiresAuth: true,
      activeApp: 'users',
      title: 'Users'
    },
    pathToRegexpOptions: { strict: true }
  },
  {
    path: '/users/:id/',
    name: 'User',
    component: () => import('@/views/users/user.vue'),
    meta: {
      requiresAuth: true,
      activeApp: 'users'
    },
    pathToRegexpOptions: { strict: true },
    props (route) {
      const props = { ...route.params }
      props.id = +props.id
      return props
    }
  },
  {
    path: '/*',
    name: '404',
    component: () => import('@/views/error/404.vue'),
    meta: { layout: 'simple' },
    pathToRegexpOptions: { strict: true },
    title: '404'
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // Set Active App
    if (to.matched.some(record => record.meta.activeApp)) {
      store.commit('SET_ACTIVE_APP', to.meta.activeApp)
    } else {
      store.commit('RESET_ACTIVE_APP')
    }

    // Set Active App's Tab
    if (to.matched.some(record => record.meta.activeApp)) {
      store.commit('SET_ACTIVE_APP_TAB', to.meta.activeAppTab)
    } else {
      store.commit('RESET_ACTIVE_APP')
    }

    // Check Authentication
    if (store.getters.isAuthenticated) {
      next()
      return
    }
    next({ name: 'Login' })
  } else {
    next()
  }
})
router.afterEach((to, from) => {
  if (to.meta && to.meta.title) {
    document.title = to.meta.title + ' | Proton'
  }
})

export default router
