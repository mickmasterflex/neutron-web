<template>
  <button class="btn btn-red" @click="deletePartnerContract">Delete Contract</button>
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
  props: ['client', 'id'],
  methods: {
    deletePartnerContract () {
      axios.delete(`/partners/${this.id}/`)
        .then(response => {
          this.output = response
          this.$router.push({ name: 'Client', params: { id: this.client } })
        })
        .catch(error => {
          this.output = error
        })
    }
  }
}
</script>
