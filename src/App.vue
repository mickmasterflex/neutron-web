<template>
  <div id="app">
    <component :is="layout">
      <router-view/>
    </component>
  </div>
</template>

<script>
import axios from './axios'
import { mapActions, mapMutations } from 'vuex'
import router from '@/router'
const appLayout = 'app'

export default {
  name: 'Proton',
  computed: {
    layout () {
      return (this.$route.meta.layout || appLayout) + '-layout'
    }
  },
  methods: {
    ...mapActions({
      logout: 'authLogout'
    }),
    ...mapMutations({
      setError: 'SET_ERROR',
      setFormError: 'SET_FORM_ERROR'
    })
  },
  created () {
    axios.interceptors.response.use(response => {
      return response
    }, error => {
      if (error.status === 401 && error.config && !error.config.__isRetryRequest) {
        this.logout()
      } else if (error.response.status === 400) {
        this.setError(error.response)
      } else if (error.response.status === 404) {
        router.push({ name: '404' })
      } else if (error.response.status === 500) {
        console.log(error.response.data)
      } else {
        this.setFormError('Something went wrong. Try again, or contact your system administrator.')
      }
      if (error.response.data.non_field_errors) {
        this.setFormError(error.response.data.non_field_errors[0])
      }
      return Promise.reject(error)
    })
  }
}
</script>
