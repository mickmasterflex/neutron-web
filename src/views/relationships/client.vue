<template>
  <div v-if="client">
    <div class="hud">
      <h1 class="h1 text-white">{{client.name}}</h1>
      <div class="hud--stat-cards">
        <stat-card :data="partners.length" :title="`Partner Contracts`" :color="`teal`"></stat-card>
        <stat-card :data="buyers.length" :title="`Buyer Contracts`" :color="`teal`"></stat-card>
      </div>
    </div>
    <div class="flex flex-row justify-between mt-4">
    <h3 class="h3">Buyer Contracts</h3>
      <button class="btn btn-green" @click="showCreateBuyerModal()">Create Buyer Contract</button>
    </div>
    <buyer-list :contracts="buyers"></buyer-list>
    <create-buyer-contract :client="client.id" :buyer-contracts="buyers"></create-buyer-contract>

    <div class="flex flex-row justify-between mt-4">
    <h3 class="h3">Partner Contracts</h3>
      <button class="btn btn-green" @click="showCreatePartnerModal()">Create Partner Contract</button>
    </div>
    <partner-list :contracts="partners"></partner-list>
    <create-partner-contract :client="client.id" :partner-contracts="partners"></create-partner-contract>

    <h3 class="h3 mt-5 mb-2">Edit Client</h3>
    <update-client :client="client"></update-client>

    <h3 class="h3 mt-5 mb-2">Delete Client</h3>
    <delete-client :id="client.id"></delete-client>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
import deleteClient from '@/components/clients/delete'
import updateClient from '@/components/clients/update'
import partnerList from '@/components/partners/list'
import buyerList from '@/components/buyers/list'
import createPartner from '@/components/partners/create'
import createBuyer from '@/components/buyers/create'

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
    'create-buyer-contract': createBuyer
  },
  computed: {
    ...mapGetters({
      client: 'getCurrentClient',
      getPartnersByClient: 'getPartnersByClient',
      getBuyersByClient: 'getBuyersByClient'
    }),
    partners: function () {
      return this.getPartnersByClient(this.id)
    },
    buyers: function () {
      return this.getBuyersByClient(this.id)
    }
  },
  methods: {
    ...mapActions({
      fetchPartners: 'fetchPartners',
      fetchBuyers: 'fetchBuyers',
      fetchCurrentClient: 'fetchCurrentClient'
    }),
    ...mapMutations({
      showCreatePartnerModal: 'SHOW_CREATE_PARTNER_MODAL',
      showCreateBuyerModal: 'SHOW_CREATE_BUYER_MODAL'
    })
  },
  created () {
    this.fetchCurrentClient(this.id)
    this.fetchPartners()
    this.fetchBuyers()
  }
}
</script>
