<template>
  <button class="btn btn-red" @click="logout">Logout</button>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  methods: {
    ...mapActions({ logout: 'authLogout' })
  }
}
</script>
