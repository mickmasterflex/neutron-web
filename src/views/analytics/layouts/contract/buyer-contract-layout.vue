<template>
  <contract-layout :id="id"
                   contracts-route-name="BuyerStatsContractContracts"
                   leads-route-name="BuyerStatsContractLeads"
                   :fetch-contract-stats="fetchBuyerContractStats"
                   :key="id"
  >
    <template v-slot:contentTab>
      <underscore-tab :active="$route.meta.contentTab === 'offers'">
        <router-link :to="{
          name: 'BuyerStatsContractOffers',
          params: { clientId: clientId, id: id },
          query: $route.query
        }">Offers <number-label :number="offers.length"></number-label></router-link>
      </underscore-tab>
    </template>
  </contract-layout>
</template>

<script>
import contractLayout from '@/views/analytics/layouts/contract/layout'
import { mapActions, mapGetters } from 'vuex'
import { buyerContractBreadcrumbs } from '@/mixins/breadcrumbs/analytics/ancestral/buyer'

export default {
  props: {
    clientId: Number,
    id: Number
  },
  computed: {
    ...mapGetters({
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
  mixins: [buyerContractBreadcrumbs],
  components: {
    'contract-layout': contractLayout
  }
}
</script>
