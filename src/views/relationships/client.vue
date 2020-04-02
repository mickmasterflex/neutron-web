<template>
  <div>
    <div class="bg-gray-900 rounded-lg w-full p-8 grid grid-cols-1 lg:grid-cols-2 items-center">
      <h1 class="h1 text-white">{{client.name}}</h1>
      <div>
        <stat-card v-bind:data="partnerContractCount" v-bind:title="`Partner Contracts`" v-bind:color="`teal`"></stat-card>
        <stat-card v-bind:data="buyerContractCount" v-bind:title="`Buyer Contracts`" v-bind:color="`teal`"></stat-card>
      </div>
    </div>

    <h3 class="h3 mt-5 mb-2">Buyer Contracts</h3>
    <contract-list v-bind:contracts="client.buyercontract_set"></contract-list>

    <h3 class="h3 mt-5 mb-2">Partner Contracts</h3>
    <partner-contract-list v-bind:contracts="client.partnercontract_set"></partner-contract-list>

    <h3 class="h3 mt-5 mb-2">Edit Client</h3>
    <update-client v-bind:id="client.id"></update-client>

    <h3 class="h3 mt-5 mb-2">Delete Client</h3>
    <delete-client v-bind:id="client.id"></delete-client>

    <h3 class="h3 mt-5 mb-2">Create Partner Contract</h3>
    <create-partner-contract v-bind:client="client.id" v-bind:partner-contracts="client.partnercontract_set"></create-partner-contract>
  </div>
</template>

<script>
import axios from '../../axios'
import deleteClient from '../../components/clients/delete'
import updateClient from '../../components/clients/update'
import partnerContractList from '../../components/contracts/partner/list'
import contractList from '../../components/contracts/list'
import createPartnerContract from '../../components/contracts/partner/create'

export default {
  data () {
    return {
      baseUrl: process.env.VUE_APP_BASE_URL,
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
  props: ['id'],
  computed: {
    partnerContractCount: function () {
      return this.client.partnercontract_set.length
    },
    buyerContractCount: function () {
      return this.client.buyercontract_set.length
    }
  },
  components: {
    'delete-client': deleteClient,
    'update-client': updateClient,
    'contract-list': contractList,
    'partner-contract-list': partnerContractList,
    'create-partner-contract': createPartnerContract
  },
  methods: {
    getClient () {
      axios
        .get(`/clients/${this.id}/`)
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
    this.getClient()
  }
}
</script>
