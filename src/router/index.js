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
    path: '/config/',
    name: 'Config',
    component: () => import('@/views/Config.vue'),
    meta: {
      requiresAuth: true,
      activeApp: 'config'
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
    name: 'Brand',
    component: () => import('@/views/products/brand.vue'),
    meta: {
      requiresAuth: true,
      activeApp: 'products',
      activeAppTab: 'product-mgmt'
    },
    pathToRegexpOptions: { strict: true },
    props (route) {
      const props = { ...route.params }
      props.id = +props.id
      return props
    }
  },
  {
    path: '/products/brands/:brand/campuses/:id/',
    name: 'Campus',
    component: () => import('@/views/products/campus.vue'),
    meta: { requiresAuth: true },
    pathToRegexpOptions: { strict: true },
    props (route) {
      const props = { ...route.params }
      props.id = +props.id
      return props
    }
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
    path: '/relationships/clients/',
    name: 'Relationships',
    component: () => import('@/views/relationships/clients/index.vue'),
    meta: {
      requiresAuth: true,
      activeApp: 'relationships'
    },
    pathToRegexpOptions: { strict: true }
  },
  {
    path: '/relationships/clients/:id/',
    name: 'Client',
    component: () => import('@/views/relationships/clients/client/index'),
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
    path: '/relationships/clients/:id/contracts/',
    name: 'ClientContracts',
    component: () => import('@/views/relationships/clients/client/contracts'),
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
    path: '/relationships/contracts/partners/',
    name: 'AllPartnerContracts',
    component: () => import('@/views/relationships/partners/index.vue'),
    meta: {
      requiresAuth: true,
      activeApp: 'relationships'
    },
    pathToRegexpOptions: { strict: true }
  },
  {
    path: '/relationships/clients/:client/contracts/partners/:id/',
    name: 'PartnerContract',
    component: () => import('@/views/relationships/partners/partner/index.vue'),
    meta: {
      requiresAuth: true,
      activeApp: 'relationships'
    },
    pathToRegexpOptions: { strict: true },
    props (route) {
      const props = { ...route.params }
      props.id = +props.id
      props.client = +props.client
      return props
    }
  },
  {
    path: '/relationships/clients/:client/contracts/partners/:id/campaigns/',
    name: 'PartnerContractCampaigns',
    component: () => import('@/views/relationships/partners/partner/campaigns.vue'),
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
    path: '/relationships/campaigns/',
    name: 'All Campaigns',
    component: () => import('@/views/relationships/campaigns/index.vue'),
    meta: {
      requiresAuth: true,
      activeApp: 'relationships'
    },
    pathToRegexpOptions: { strict: true }
  },
  {
    path: '/relationships/clients/:client/contracts/partners/:partner/campaigns/:id/',
    name: 'Campaign',
    component: () => import('@/views/relationships/campaigns/campaign.vue'),
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
    path: '/relationships/contracts/buyers/',
    name: 'AllBuyerContracts',
    component: () => import('@/views/relationships/buyers/index.vue'),
    meta: {
      requiresAuth: true,
      activeApp: 'relationships'
    },
    pathToRegexpOptions: { strict: true }
  },
  {
    path: '/relationships/clients/:client/contracts/buyers/:id/',
    name: 'BuyerContract',
    component: () => import('@/views/relationships/buyers/buyer/index.vue'),
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
    path: '/relationships/clients/:client/contracts/buyers/:id/field-management/',
    name: 'BuyerContractFieldManagement',
    component: () => import('@/views/relationships/buyers/buyer/field-management'),
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
    path: '/relationships/clients/:client/contracts/buyers/:id/offers/',
    name: 'BuyerContractOffers',
    component: () => import('@/views/relationships/buyers/buyer/offers.vue'),
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
    path: '/relationships/offers/',
    name: 'All Offers',
    component: () => import('@/views/relationships/offers/index.vue'),
    meta: {
      requiresAuth: true,
      activeApp: 'relationships'
    },
    pathToRegexpOptions: { strict: true }
  },
  {
    path: '/relationships/clients/:client/contracts/buyers/:buyer/offers/:id/',
    name: 'Offer',
    component: () => import('@/views/relationships/offers/offer.vue'),
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
    path: '/*/',
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
