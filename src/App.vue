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
    genericToast (color, icon, heading, content = '', id = Date.now() + Math.random()) {
      this.addToast({
        color: color,
        icon: icon,
        heading: heading,
        content: content,
        id: id
      })
    }
  },
  components: {
    toast: toast
  },
  created () {
    axios.interceptors.response.use(response => {
      if (response.config.showSuccessToast !== false) {
        if (response.config.method === 'post' && response.statusText === 'Created') {
          this.genericToast('green', 'thumbs-up', response.statusText + ' successfully')
        }
        if (response.config.method === 'put') {
          this.genericToast('green', 'thumbs-up', 'Updated successfully')
        }
        if (response.config.method === 'delete') {
          this.genericToast('green', 'trash-alt', 'Deleted successfully')
        }
      }
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
            this.genericToast('red', 'exclamation-triangle', error.message)
            return Promise.reject(error)
          case 500:
            this.genericToast('red', 'exclamation-triangle', error.message, error.response.statusText)
            break
          default:
            this.genericToast('red', 'exclamation-triangle', error.message)
        }
      } else {
        this.genericToast('red', 'exclamation-triangle', error.message)
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
