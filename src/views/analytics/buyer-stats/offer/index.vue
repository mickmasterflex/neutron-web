<template>
  <buyer-stats-layout :hud-title="offer.name">
    <template v-slot:content>
      <router-view></router-view>
    </template>
  </buyer-stats-layout>
</template>

<script>
import buyerStatsLayout from '@/views/analytics/buyer-stats/layout.vue'
import { mapActions, mapGetters, mapMutations } from 'vuex'
export default {
  props: {
    clientId: Number,
    id: Number
  },
  computed: {
    ...mapGetters({
      dateRange: 'getAnalyticsDateRangeUrlFormatted',
      offer: 'getCurrentBuyerStatsOffer'
    })
  },
  methods: {
    ...mapActions({
      fetchOfferContractStats: 'fetchOfferContractStats'
    }),
    ...mapMutations({
      resetLeads: 'RESET_BUYER_STATS_LEADS'
    }),
    async setOfferContractStats () {
      await this.fetchOfferContractStats(this.id)
    }
  },
  created () {
    this.setOfferContractStats().then(() => {
      document.title = this.offer.name
    })
  },
  destroyed () {
    this.resetLeads()
  },
  watch: {
    dateRange () {
      this.fetchOfferContractStats(this.id)
    }
  },
  components: {
    'buyer-stats-layout': buyerStatsLayout
  }
}
</script>
