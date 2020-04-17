<template>
  <div v-if="client">
    <div class="bg-gray-900 rounded-lg w-full p-8 grid grid-cols-1 lg:grid-cols-2 items-center">
      <h1 class="h1 text-white">{{client.name}}</h1>
      <div>
        <stat-card :data="partners.length" :title="`Partner Contracts`" :color="`teal`"></stat-card>
      </div>
    </div>

    <h3 class="h3 mt-5 mb-2">Buyer Contracts</h3>
    <buyer-list :contracts="client.buyercontract_set"></buyer-list>

    <h3 class="h3 mt-5 mb-2">Partner Contracts</h3>
    <partner-list :contracts="partners"></partner-list>

    <h3 class="h3 mt-5 mb-2">Edit Client</h3>
    <update-client :id="client.id"></update-client>

    <h3 class="h3 mt-5 mb-2">Delete Client</h3>
    <delete-client :id="client.id"></delete-client>

    <h3 class="h3 mt-5 mb-2">Create Partner Contract</h3>
    <create-partner-contract :client="client.id" :partner-contracts="partners"></create-partner-contract>

    <h3 class="h3 mt-5 mb-2">Create Buyer Contract</h3>
    <create-buyer-contract :client="client.id" :buyer-contracts="client.buyercontract_set"></create-buyer-contract>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import deleteClient from '@/components/clients/delete'
import updateClient from '@/components/clients/update'
import partnerList from '@/components/contracts/partners/list'
import buyerList from '@/components/contracts/buyers/list'
import createPartner from '@/components/contracts/partners/create'
import createBuyerContract from '@/components/contracts/buyers/create'

export default {
  props: {
    id: {
      type: Number
    }
  },
  components: {
    'delete-client': deleteClient,
    'update-client': updateClient,
    'partner-list': partnerList,
    'buyer-list': buyerList,
    'create-partner-contract': createPartner,
    'create-buyer-contract': createBuyerContract
  },
  computed: {
    ...mapGetters({
      client: 'getCurrentClient',
      getPartnersByClient: 'getPartnersByClient'
    }),
    partners: function () {
      return this.getPartnersByClient(this.id)
    }
  },
  methods: {
    ...mapActions({
      fetchPartners: 'fetchPartners',
      fetchCurrentClient: 'fetchCurrentClient'
    })
  },
  created () {
    this.fetchCurrentClient(this.id)
    this.fetchPartners()
  }
}
</script>
