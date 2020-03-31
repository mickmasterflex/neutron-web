<template>
  <div>
    <div class="bg-gray-900 rounded-lg w-full p-8 grid grid-cols-1 lg:grid-cols-2 items-center">
      <h1 class="text-white text-4xl font-hairline">{{client.name}}</h1>
      <div>
        <stat-card v-bind:data="partnerContractCount" v-bind:title="`Partner Contracts`" v-bind:color="`teal`"></stat-card>
        <stat-card v-bind:data="buyerContractCount" v-bind:title="`Buyer Contracts`" v-bind:color="`teal`"></stat-card>
      </div>
    </div>

    <h3 class="text-2xl font-hairline mt-5 mb-2">Buyer Contracts</h3>
    <buyer-contracts v-bind:contracts="client.buyercontract_set"></buyer-contracts>

    <h3 class="text-2xl font-hairline mt-5 mb-2">Partner Contracts</h3>
    <buyer-contracts v-bind:contracts="client.partnercontract_set"></buyer-contracts>

    <h3 class="text-2xl font-hairline mt-5 mb-2">Edit Client</h3>
    <update-client v-bind:id="client.id"></update-client>

    <h3 class="text-2xl font-hairline mt-5 mb-2">Delete Client</h3>
    <delete-client v-bind:id="client.id"></delete-client>
  </div>
</template>

<script>
import axios from 'axios'
import deleteClient from '../../components/clients/delete'
import updateClient from '../../components/clients/update'
import buyerContracts from '../../components/contracts/list'
import statCard from '../../components/cards/stat-card'

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
  computed: {
    partnerContractCount: function () {
      return this.client.partnercontract_set.length
    },
    buyerContractCount: function () {
      return this.client.buyercontract_set.length
    }
  },
  components: {
    deleteClient,
    updateClient,
    buyerContracts,
    statCard
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
