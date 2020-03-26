<template>
  <div>
    <h1>{{client.name}}</h1>
    <ul v-if="client.buyercontract_set">
      <li v-for="buyercontract in client.buyercontract_set" v-bind:key="buyercontract.key">
        {{buyercontract.name}}
      </li>
    </ul>
    <ul v-if="client.partnercontract_set">
      <li v-for="partnercontract in client.partnercontract_set" v-bind:key="partnercontract.key">
        {{partnercontract.name}}
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      baseUrl: process.env.VUE_APP_BASE_URL,
      apiBaseUrl: 'http://neutron.localhost:8000/api',
      client: {
        name: null,
        slug: null,
        buyercontract_set: [],
        partnercontract_set: []
      },
      output: null
    }
  },
  props: ['id'],
  methods: {
    fetchForm () {
      axios
        .get(`${this.apiBaseUrl}/clients/${this.id}/`)
        .then(response => {
          this.output = response
          this.client = response.data
        })
        .catch(error => {
          this.output = error
          this.errored = true
        })
    }
  },
  created () {
    this.fetchForm()
  }
}
</script>
