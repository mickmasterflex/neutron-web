<template>
  <div id="app">
    <component :is="layout" class="min-h-screen flex flex-row p-5">
      <router-view/>
    </component>
  </div>
</template>

<script>
import axios from './axios'
import { mapActions } from 'vuex'
const appLayout = 'app'

export default {
  computed: {
    layout () {
      return (this.$route.meta.layout || appLayout) + '-layout'
    }
  },
  methods: {
    ...mapActions({ logout: 'authLogout' })
  },
  created: function () {
    axios.interceptors.response.use(undefined, function (err) {
      return new Promise(function (resolve, reject) {
        if (err.status === 401 && err.config && !err.config.__isRetryRequest) {
          this.logout()
        }
        throw err
      })
    })
  }
}
</script>
