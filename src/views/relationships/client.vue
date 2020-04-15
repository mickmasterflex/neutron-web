<template>
  <div v-if="client">
    <div class="bg-gray-900 rounded-lg w-full p-8 grid grid-cols-1 lg:grid-cols-2 items-center">
      <h1 class="h1 text-white">{{client.name}}</h1>
      <div>
        <stat-card :data="partners.length" :title="`Partner Contracts`" :color="`teal`"></stat-card>
        <stat-card :data="buyerContractCount" :title="`Buyer Contracts`" :color="`teal`"></stat-card>
      </div>
    </div>

    <h3 class="h3 mt-5 mb-2">Buyer Contracts</h3>
    <buyer-contract-list :contracts="client.buyercontract_set"></buyer-contract-list>

    <h3 class="h3 mt-5 mb-2">Partner Contracts</h3>
    <partner-contract-list :contracts="partners"></partner-contract-list>

    <h3 class="h3 mt-5 mb-2">Edit Client</h3>
    <update-client :id="client.id"></update-client>

    <h3 class="h3 mt-5 mb-2">Delete Client</h3>
    <delete-client :id="client.id"></delete-client>

    <h3 class="h3 mt-5 mb-2">Create Partner Contract</h3>
    <create-partner-contract :client="client.id" :partner-contracts="client.partnercontract_set"></create-partner-contract>

    <h3 class="h3 mt-5 mb-2">Create Buyer Contract</h3>
    <create-buyer-contract :client="client.id" :buyer-contracts="client.buyercontract_set"></create-buyer-contract>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import deleteClient from '@/components/clients/delete'
import updateClient from '@/components/clients/update'
import partnerContractList from '@/components/contracts/partners/list'
import buyerContractList from '@/components/contracts/buyers/list'
import createPartner from '@/components/contracts/partners/create'
import createBuyerContract from '@/components/contracts/buyers/create'

export default {
  props: {
    id: {
      type: Number,
      default: null
    }
  },
  components: {
    'delete-client': deleteClient,
    'update-client': updateClient,
    'partner-contract-list': partnerContractList,
    'buyer-contract-list': buyerContractList,
    'create-partner-contract': createPartner,
    'create-buyer-contract': createBuyerContract
  },
  computed: {
    ...mapGetters({
      getClient: 'getClientById',
      getPartnersByClient: 'getPartnersByClient'
    }),
    client: function () {
      return this.getClient(this.id)
    },
    partners: function () {
      return this.getPartnersByClient(this.id)
    },
    buyerContractCount: function () {
      return this.client.buyercontract_set.length
    }
  },
  methods: {
    ...mapActions({
      fetchClients: 'fetchClients',
      fetchPartners: 'fetchPartners'
    })
  },
  created () {
    this.fetchClients()
    this.fetchPartners()
  }
}
</script>
