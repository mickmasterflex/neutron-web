<template>
  <form @submit.prevent="updateBuyerContract">
    <text-field v-model="name" rules="required" id="buyerName" label="Name"></text-field>
    <select-field-stacked v-model="parent" :options="siblings" field_id="buyerParent" label="Parent"></select-field-stacked>
    <button type="submit" class="btn btn-green mt-5">Submit</button>
  </form>
  </template>

<script>
import axios from '@/axios'

export default {
  data () {
    return {
      name: '',
      parent: '',
      siblings: [],
      output: null
    }
  },
  props: ['client', 'id'],
  methods: {
    updateBuyerContract () {
      axios
        .put(`/buyers/${this.id}/`, {
          name: this.name,
          parent: this.parent,
          client: this.client
        })
        .then(response => {
          this.output = response
          this.$router.push({ name: 'Client', params: { id: this.output.data.client } })
        })
        .catch(error => {
          this.output = error
          this.errored = true
        })
    },
    getSiblingContracts () {
      axios.get(`/clients/${this.$props.client}/`)
        .then(response => {
          this.siblings = response.data.buyercontract_set
        })
        .catch(error => {
          this.output = error
          this.errored = true
        })
    }
  },
  mounted () {
    this.getSiblingContracts()
  }
}
</script>
