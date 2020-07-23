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
      addToast: 'ADD_TOAST'
    }),
    genericToastError (error) {
      this.addToast({
        color: 'red',
        icon: 'exclamation-triangle',
        heading: error.message,
        id: Date.now() + Math.random()
      })
    }
  },
  components: {
    toast: toast
  },
  created () {
    axios.interceptors.response.use(response => {
      return response
    }, error => {
      if (error.response) {
        switch (error.response.status) {
          case 401:
            if (error.response.config && !error.response.config.__isRetryRequest) {
              this.logout()
            }
            break
          case 404:
            if (error.response.config.method === 'get') {
              router.push({ name: '404' })
            }
            break
          case 400:
            this.genericToastError(error)
            return Promise.reject(error)
          case 500:
            this.addToast({
              color: 'red',
              icon: 'exclamation-triangle',
              heading: error.message,
              content: error.response.statusText,
              id: Date.now() + Math.random()
            })
            break
          default:
            this.genericToastError(error)
        }
      } else {
        this.genericToastError(error)
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
