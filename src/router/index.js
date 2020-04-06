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
      requiresAuth: true

    }
  },
  {
    path: '/login',
    name: 'Login',
    meta: { layout: 'simple' },
    component: () => import('@/views/authentication/login.vue')
  },
  {
    path: '/analytics',
    name: 'Analytics',
    component: () => import('@/views/Analytics.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/config',
    name: 'Config',
    component: () => import('@/views/Config.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/products',
    name: 'Products',
    component: () => import('@/views/Products.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/relationships/clients',
    name: 'Relationships',
    component: () => import('@/views/relationships/index.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/relationships/clients/:id',
    name: 'Client',
    props: true,
    component: () => import('@/views/relationships/client.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/relationships/clients/:client/partner-contracts/:id/',
    name: 'PartnerContract',
    props: true,
    component: () => import('@/views/relationships/contracts/partner.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/relationships/clients/:client/buyer-contracts/:id/',
    name: 'BuyerContract',
    props: true,
    component: () => import('../views/relationships/contracts/buyer.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/utilities',
    name: 'Utilities',
    component: () => import('@/views/Utilities.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/users/',
    name: 'Users',
    component: () => import('@/views/users/index.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/users/create',
    name: 'UserCreate',
    component: () => import('@/views/users/create.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/users/:id/',
    name: 'User',
    component: () => import('@/views/users/user.vue'),
    props: true,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/*',
    component: () => import('@/views/error/404.vue'),
    meta: {
      title: '404 - Uh Oh'
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters.isAuthenticated) {
      next()
      return
    }
    next('login')
  } else {
    next()
  }
})

export default router
