<template>
  <contract-layout :contract="contract"
                   :clientId="clientId"
                   :id="id"
                   contracts-route-name="BuyerStatsContractContracts"
                   leads-route-name="BuyerStatsContractLeads"
                   :fetch-contract-stats="fetchBuyerContractStats"
                   :key="id"
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
import { buyerContractBreadcrumbs } from '@/mixins/breadcrumbs/analytics/ancestral/buyer'

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
  mixins: [buyerContractBreadcrumbs],
  components: {
    'contract-layout': contractLayout
  }
}
</script>
