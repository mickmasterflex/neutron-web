<template>
  <buyer-stats-layout :hud-title="offer.name"
                      :lead-count="leadCount"
                      :sold-count="soldCount"
                      :revenue="revenue"
                      :margin="margin"
                      :payout="payout"
                      :scrub-rate="scrubRate"
                      :margin-percent="marginPercent">
    <template v-slot:content>
      <router-view></router-view>
    </template>
  </buyer-stats-layout>
</template>

<script>
import buyerStatsLayout from '@/views/analytics/buyer-stats/layout.vue'
import { mapActions, mapGetters } from 'vuex'
export default {
  props: {
    clientId: Number,
    id: Number
  },
  computed: {
    ...mapGetters({
      dateRange: 'getAnalyticsDateRangeUrlFormatted',
      offer: 'getCurrentBuyerStatsOffer',
      leadCount: 'getOfferContractStatsTotalLeadCount',
      soldCount: 'getOfferContractStatsTotalSoldCount',
      revenue: 'getOfferContractStatsTotalRevenue',
      margin: 'getOfferContractStatsTotalMargin',
      payout: 'getOfferContractStatsTotalPayout',
      scrubRate: 'getOfferContractStatsTotalScrubRate',
      marginPercent: 'getOfferContractStatsTotalMarginPercent'
    })
  },
  methods: {
    ...mapActions({
      fetchOfferContractStats: 'fetchOfferContractStats'
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
