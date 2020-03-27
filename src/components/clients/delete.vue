<template>
  <button class="btn btn-red" @click="deleteClient">Delete Client</button>
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
    deleteClient () {
      axios.delete(`${this.apiBaseUrl}/clients/${this.id}/`)
        .then(response => {
          this.output = response
          console.log(response)
          this.$router.push({ name: 'Relationships' })
        })
        .catch(error => {
          this.output = error
        })
    }
  }
}
</script>
