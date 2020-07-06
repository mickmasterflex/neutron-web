<template>
  <client-layout contentTab="contracts" :id="id" :buyers="buyers" :partners="partners">
    <template v-slot:content>
      <action-heading>
        <template v-slot:heading>
          <h2 class="h3">Buyer Contracts</h2>
        </template>
        <template v-slot:right>
          <button class="btn btn-turquoise" @click="showCreateBuyerModal()"><font-awesome-icon icon="plus"></font-awesome-icon> Add Buyer</button>
        </template>
      </action-heading>
      <buyer-list :contracts="buyers"></buyer-list>
      <create-buyer-contract :client="client.id" :buyer-contracts="buyers"></create-buyer-contract>

      <action-heading class="mt-5">
        <template v-slot:heading>
          <h2 class="h3">Partner Contracts</h2>
        </template>
        <template v-slot:right>
          <button class="btn btn-turquoise" @click="showCreatePartnerModal()"><font-awesome-icon icon="plus"></font-awesome-icon> Add Partner</button>
        </template>
      </action-heading>
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
