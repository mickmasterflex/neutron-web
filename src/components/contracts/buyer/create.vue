<template>
  <form @submit.prevent="createBuyerContract">
    <v-text-field v-model="name" rules="required" id="buyerName" label="Name"></v-text-field>
    <select-field v-model="parent" :options="buyerContracts" id="parent" label="Parent"></select-field>
    <button class="btn btn-green mt-5">Create Buyer Contract</button>
  </form>
</template>

<script>
import axios from '@/axios'

export default {
  data () {
    return {
      name: '',
      parent: '',
      output: ''
    }
  },
  props: ['client', 'buyerContracts'],
  methods: {
    createBuyerContract () {
      axios.post('/buyers/', {
        name: this.name,
        parent: this.parent,
        client: this.$props.client
      })
        .then(response => {
          this.output = response
        })
        .catch(error => {
          this.errored = true
          this.output = error
        })
    }
  }
}
</script>
