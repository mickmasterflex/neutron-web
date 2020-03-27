<template>
  <button class="btn btn-red" @click="deleteAccount">Delete User</button>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      baseUrl: process.env.VUE_APP_BASE_URL,
      apiBaseUrl: 'http://proton.localhost:8000/api',
      output: null
    }
  },
  props: ['id'],
  methods: {
    deleteAccount () {
      axios.delete(`${this.apiBaseUrl}/users/${this.id}/`)
        .then(response => {
          this.output = response
          console.log(response)
          this.$router.push({ name: 'Accounts' })
        })
        .catch(error => {
          this.output = error
        })
    }
  }
}
</script>
