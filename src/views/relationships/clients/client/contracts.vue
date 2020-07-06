<template>
  <client-layout contentTab="contracts" :id="id" :buyers="buyers" :partners="partners">
    <template v-slot:content>
      <div class="flex flex-row justify-between">
        <h3 class="h3">Buyer Contracts</h3>
        <button class="btn btn-green" @click="showCreateBuyerModal()">Create Buyer Contract</button>
      </div>
      <buyer-list :contracts="buyers"></buyer-list>
      <create-buyer-contract :client="client.id" :buyer-contracts="buyers"></create-buyer-contract>

      <div class="flex flex-row justify-between mt-5">
        <h3 class="h3">Partner Contracts</h3>
        <button class="btn btn-green" @click="showCreatePartnerModal()">Create Partner Contract</button>
      </div>
      <partner-list :contracts="partners"></partner-list>
      <create-partner-contract :client="client.id" :partner-contracts="partners"></create-partner-contract>
    </template>
  </client-layout>
</template>

<script>
import clientLayout from '@/views/relationships/clients/client/layout'
import partnerList from '@/components/partners/list'
import buyerList from '@/components/buyers/list'
import createPartner from '@/components/partners/create'
import createBuyer from '@/components/buyers/create'
import { mapGetters, mapMutations } from 'vuex'

export default {
  props: {
    id: {
      type: Number
    }
  },
  components: {
    'client-layout': clientLayout,
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
    ...mapMutations({
      showCreatePartnerModal: 'SHOW_CREATE_PARTNER_MODAL',
      showCreateBuyerModal: 'SHOW_CREATE_BUYER_MODAL'
    })
  }
}
</script>
