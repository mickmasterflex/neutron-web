<template>
  <div>
    {{output}}
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      baseUrl: process.env.VUE_APP_BASE_URL,
      apiBaseUrl: 'http://neutron.localhost:8000/api',
      output: null
    }
  },
  props: ['id'],
  methods: {
    getUser () {
      axios
        .get(`${this.apiBaseUrl}/users/${this.id}/`)
        .then(response => {
          this.output = response
        })
        .catch(error => {
          this.output = error
          this.errored = true
        })
    }
  },
  created () {
    this.getUser()
  }
}
</script>
