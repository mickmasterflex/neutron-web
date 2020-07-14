<template>
  <div id="app">
    <component :is="layout">
      <router-view/>
    </component>
    <transition-group ref="toastList" name="toastList" tag="ul"
                      enter-active-class="animate__animated animate__fadeInUp animate__faster"
                      leave-active-class="animate__animated animate__fadeOut animate__faster absolute"
                      class="fixed bottom-0 right-0 mr-1 z-50 w-full" style="max-width: 500px">
      <toast v-for="toast in this.toasts" :toast="toast" :key="toast.id" class="z-40"></toast>
    </transition-group>
  </div>
</template>

<script>
import axios from './axios'
import { mapActions, mapMutations, mapGetters } from 'vuex'
import router from '@/router'
import toast from '@/components/ui/toast/index'

const appLayout = 'app'

export default {
  name: 'Proton',
  computed: {
    layout () {
      return (this.$route.meta.layout || appLayout) + '-layout'
    },
    ...mapGetters({
      toasts: 'getToasts'
    })
  },
  methods: {
    ...mapActions({
      logout: 'authLogout'
    }),
    ...mapMutations({
      setError: 'SET_ERROR',
      setFormError: 'SET_FORM_ERROR',
      addToast: 'ADD_TOAST'
    })
  },
  components: {
    toast: toast
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
        this.addToast({
          color: 'red',
          icon: 'exclamation-triangle',
          heading: error.message,
          id: Date.now()
        })
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

<style>
  .toastList-move {
    transition: transform .5s;
  }
</style>
