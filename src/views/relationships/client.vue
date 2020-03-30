<template>
  <div>
    <h1>{{client.name}}</h1>
    <ul v-if="client.buyercontract_set">
      Buyer Contract Set
      <li v-for="buyercontract in client.buyercontract_set" v-bind:key="buyercontract.key">
        * {{buyercontract.name}}
      </li>
    </ul>
    <ul v-if="client.partnercontract_set">
      Partner Contract Set
      <li v-for="partnercontract in client.partnercontract_set" v-bind:key="partnercontract.key">
        * {{partnercontract.name}}
      </li>
    </ul>
    <delete-client v-bind:id="client.id"></delete-client>
    <update-client v-bind:id="client.id"></update-client>
  </div>
</template>

<script>
import axios from 'axios'
import deleteClient from '../../components/clients/delete'
import updateClient from '../../components/clients/update'

export default {
  data () {
    return {
      baseUrl: process.env.VUE_APP_BASE_URL,
      apiBaseUrl: 'http://127.0.0.1:8000/api',
      client: {
        name: null,
        slug: null,
        id: null,
        buyercontract_set: [],
        partnercontract_set: []
      },
      output: null
    }
  },
  props: ['slug'],
  components: {
    deleteClient,
    updateClient
  },
  methods: {
    getClient () {
      axios
        .get(`${this.apiBaseUrl}/clients/?slug=${this.slug}/`)
        .then(response => {
          this.output = response
          this.client = response.data[0]
        })
        .catch(error => {
          this.output = error
          this.errored = true
        })
    }
  },
  created () {
    this.getClient()
  }
}
</script>
