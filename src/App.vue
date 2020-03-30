<template>
  <div id="app">
    <component :is="layout" class="h-screen flex flex-row p-5">
      <router-view/>
    </component>
  </div>
</template>

<script>
import axios from 'axios'
import { AUTH_LOGOUT } from './store/actions/auth'
const appLayout = 'app'

export default {
  computed: {
    layout () {
      return (this.$route.meta.layout || appLayout) + '-layout'
    }
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
