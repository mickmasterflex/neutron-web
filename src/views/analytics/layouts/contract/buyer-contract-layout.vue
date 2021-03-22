<template>
  <contract-layout :contract="contract"
                   :clientId="clientId"
                   :key="id"
                   :id="id"
                   contracts-route-name="BuyerStatsContractContracts"
                   leads-route-name="BuyerStatsContractLeads"
                   :fetch-contract-stats="fetchBuyerContractStats"
  >
    <template v-slot:contentTab>
      <li class="underscore-tab underscore-tab-lg" :class="$route.meta.contentTab === 'offers' ? 'active' : ''">
        <router-link :to="{
          name: 'BuyerStatsContractOffers',
          params: { clientId: clientId, id: id },
          query: $route.query
        }">Offers <label-number :number="offers.length"></label-number></router-link>
      </li>
    </template>
  </contract-layout>
</template>

<script>
import contractLayout from '@/views/analytics/layouts/contract/layout'
import { mapActions, mapGetters } from 'vuex'

export default {
  props: {
    clientId: Number,
    id: Number
  },
  computed: {
    ...mapGetters({
      contract: 'getCurrentContractStats',
      offersByParent: 'getCurrentStatsOffersByParent'
    }),
    offers () {
      return this.offersByParent(this.id)
    }
  },
  methods: {
    ...mapActions({
      fetchBuyerContractStats: 'fetchBuyerContractStats'
    })
  },
  components: {
    'contract-layout': contractLayout
  }
}
</script>
