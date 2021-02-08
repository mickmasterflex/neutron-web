<template>
  <analytics-layout :hud-title="offer.name">
    <template v-slot:content>
      <router-view></router-view>
    </template>
  </analytics-layout>
</template>

<script>
import analyticsLayout from '@/views/analytics/layout.vue'
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
      resetLeads: 'RESET_ANALYTICS_LEADS'
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
    'analytics-layout': analyticsLayout
  }
}
</script>
