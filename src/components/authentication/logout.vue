<template>
  <span @click="logout" class="text-gray-400 hover:text-gray-200 transition-colors duration-200 cursor-pointer"><font-awesome-icon icon="sign-out-alt"></font-awesome-icon> Logout</span>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  methods: {
    ...mapActions({ logout: 'authLogout' })
  }
}
</script>
