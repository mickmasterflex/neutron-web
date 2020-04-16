<template>
  <button class="btn btn-red" @click="logout">Logout</button>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  methods: {
    ...mapActions({ authLogout: 'authLogout' }),
    logout () {
      this.authLogout()
        .then(() => {
          this.$router.push({ name: 'Login' })
        })
    }
  }
}
</script>
