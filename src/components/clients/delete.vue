<template>
  <button class="btn btn-red" @click="deleteClient">Delete Client</button>
</template>

<script>
import axios from '@/axios'

export default {
  data () {
    return {
      baseUrl: process.env.VUE_APP_BASE_URL,
      output: null
    }
  },
  props: ['id'],
  methods: {
    deleteClient () {
      axios.delete(`/clients/${this.id}/`)
        .then(response => {
          this.output = response
          this.$router.push({ name: 'Relationships' })
        })
        .catch(error => {
          this.output = error
          this.errored = true
        })
    }
  }
}
</script>
