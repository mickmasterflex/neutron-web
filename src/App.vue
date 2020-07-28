<template>
  <div id="app">
    <component :is="layout">
      <router-view/>
    </component>
    <transition-group ref="toastList" name="toastList" tag="ul"
                      enter-active-class="animate__animated animate__fadeInUp animate__faster"
                      leave-active-class="animate__animated animate__fadeOut animate__faster absolute"
                      class="fixed bottom-0 right-0 mr-1 z-50 w-full" style="max-width: 500px">
      <toast v-for="toast in this.toast_messages" :toast="toast" :key="toast.id" class="z-40"></toast>
    </transition-group>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import toast from '@/components/ui/toast/index'

const appLayout = 'app'

export default {
  name: 'Proton',
  computed: {
    layout () {
      return (this.$route.meta.layout || appLayout) + '-layout'
    },
    ...mapGetters({
      toast_messages: 'getToastMessages'
    })
  },
  methods: {
    ...mapActions({
      logout: 'authLogout'
    })
  },
  components: {
    toast: toast
  }
}
</script>

<style>
  .toastList-move {
    transition: transform .5s;
  }
</style>
