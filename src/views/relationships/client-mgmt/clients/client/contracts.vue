<template>
  <base-panel-grid>
    <panel-template
      title="Buyer Contracts"
      class="col-span-2"
      :showLoader="buyersLoading"
      :loading-text="buyersLoadingText">
      <template v-slot:action>
        <button class="btn btn-turquoise" @click="showCreateBuyerModal()"><font-awesome-icon icon="plus"></font-awesome-icon> New Buyer</button>
      </template>
      <template v-slot:content>
        <buyer-list :contracts="buyers" :client="$route.params.slug"></buyer-list>
      </template>
    </panel-template>
    <create-buyer-contract :client="client.id"></create-buyer-contract>
    <panel-template title="Partner Contracts" class="col-span-2">
      <template v-slot:action>
        <button class="btn btn-turquoise" @click="showCreatePartnerModal()"><font-awesome-icon icon="plus"></font-awesome-icon> New Partner</button>
      </template>
      <template v-slot:content>
        <partner-list :contracts="partners" :client="$route.params.slug"></partner-list>
      </template>
    </panel-template>
    <create-partner-contract :client="client.id"></create-partner-contract>
  </base-panel-grid>
</template>

<script>
import partnerList from '@/components/partners/list'
import buyerList from '@/components/buyers/list'
import createPartner from '@/components/partners/create'
import createBuyer from '@/components/buyers/create'
import { mapGetters, mapMutations } from 'vuex'

export default {
  components: {
    'partner-list': partnerList,
    'buyer-list': buyerList,
    'create-partner-contract': createPartner,
    'create-buyer-contract': createBuyer
  },
  computed: {
    ...mapGetters({
      client: 'getCurrentClient',
      getParentlessBuyersByClient: 'getParentlessBuyersByClient',
      getParentlessPartnersByClient: 'getParentlessPartnersByClient',
      buyersLoading: 'getBuyersFetchLoading',
      buyersLoadingText: 'getBuyersFetchLoadingText'
    }),
    partners: function () {
      return this.getParentlessPartnersByClient(this.client.id)
    },
    buyers: function () {
      return this.getParentlessBuyersByClient(this.client.id)
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
