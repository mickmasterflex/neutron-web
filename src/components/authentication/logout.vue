<template>
  <div>
    <button class="btn btn-red" v-on:click="logout">Logout</button>
  </div>
</template>

<script>
import { AUTH_LOGOUT } from '@/store/actions/authentication'

export default {
  methods: {
    logout: function () {
      this.$store.dispatch(AUTH_LOGOUT).then(() => {
        this.$router.push('/login')
      })
    }
  }
}
</script>
