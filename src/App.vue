<template>
  <div id="app" class="h-screen flex flex-row p-5">
    <div id="nav" class="w-1/12 h-screen flex flex-col items-center justify-center">
      <div class="pr-5 mb-5"><img alt="Proton Logo" class="w-full h-auto" src="../public/images/logo.png"></div>
      <router-link :to="{name: 'Dashboard'}" class="app-tab">Dashboard</router-link>
      <router-link :to="{name: 'Analytics'}" class="app-tab">Analytics</router-link>
      <router-link :to="{name: 'Relationships'}" class="app-tab">Relationships</router-link>
      <router-link :to="{name: 'Products'}" class="app-tab">Products</router-link>
      <router-link :to="{name: 'Config'}" class="app-tab">Config</router-link>
      <router-link :to="{name: 'Utilities'}" class="app-tab">Utilities</router-link>
      <router-link :to="{name: 'Users'}" class="app-tab">Users</router-link>
      <logout-button></logout-button>
    </div>
    <div class="w-11/12 rounded-lg bg-gray-100">
      <router-view/>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { AUTH_LOGOUT } from './store/actions/auth'
import logoutButton from './components/auth/logout'

export default {
  components: {
    logoutButton
  },
  created: function () {
    axios.interceptors.response.use(undefined, function (err) {
      return new Promise(function (resolve, reject) {
        if (err.status === 401 && err.config && !err.config.__isRetryRequest) {
          this.$store.dispatch(AUTH_LOGOUT)
        }
        throw err
      })
    })
  }
}
</script>
