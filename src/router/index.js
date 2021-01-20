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
      activeApp: 'dashboard'
    },
    pathToRegexpOptions: { strict: true }
  },
  {
    path: '/login/',
    name: 'Login',
    component: () => import('@/views/authentication/login.vue'),
    meta: { layout: 'simple' },
    pathToRegexpOptions: { strict: true }
  },
  {
    path: '/analytics/',
    name: 'Analytics',
    component: () => import('@/views/Analytics.vue'),
    meta: {
      requiresAuth: true,
      activeApp: 'analytics'
    },
    pathToRegexpOptions: { strict: true }
  },
  {
    path: '/products/brands/',
    name: 'Brands',
    component: () => import('@/views/products/index.vue'),
    meta: {
      requiresAuth: true,
      activeApp: 'products',
      activeAppTab: 'product-mgmt'
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
        path: 'product-offers/',
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
      activeAppTab: 'field-mgmt'
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
      activeAppTab: 'pricing-tiers'
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
      activeAppTab: 'channels'
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
          contentTab: 'clients'
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
          contentTab: 'buyerGroups'
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
      activeApp: 'utilities'
    },
    pathToRegexpOptions: { strict: true }
  },
  {
    path: '/users/',
    name: 'Users',
    component: () => import('@/views/users/index.vue'),
    meta: {
      requiresAuth: true,
      activeApp: 'users'
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
    pathToRegexpOptions: { strict: true }
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

export default router
