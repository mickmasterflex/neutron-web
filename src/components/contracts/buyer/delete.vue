<template>
  <button class="btn btn-red" @click="deleteBuyerContract">Delete Buyer Contract></button>
</template>

<script>
import axios from '../../../axios'

export default {
  data () {
    return {
      baseUrl: process.env.VUE_APP_BASE_URL,
      output: null
    }
  },
  props: ['client', id],
  methods: {
    deleteBuyerContract () {
      axios.delete(`/buyers/${this.id}/`)
        .then(reponse => {
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
