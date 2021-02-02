<template>
  <buyer-stats-layout :hud-title="contract.name"
                      :lead-count="leadCount"
                      :sold-count="soldCount"
                      :revenue="revenue"
                      :margin="margin"
                      :payout="payout"
                      :scrub-rate="scrubRate"
                      :margin-percent="marginPercent">
    <template v-slot:contentTabs>
      <ul class="underscore-tabs">
        <li class="underscore-tab underscore-tab-lg" :class="$route.meta.contentTab === 'contracts' ? 'active' : ''">
          <router-link :to="{ name: 'BuyerStatsContractContracts', params: { clientId: clientId, id: id }}">Contracts</router-link>
        </li>
        <li class="underscore-tab underscore-tab-lg" :class="$route.meta.contentTab === 'offers' ? 'active' : ''">
          <router-link :to="{ name: 'BuyerStatsContractOffers', params: { clientId: clientId, id: id }}">Offers</router-link>
        </li>
        <li class="underscore-tab underscore-tab-lg" :class="$route.meta.contentTab === 'leads' ? 'active' : ''">
          <router-link :to="{ name: 'BuyerStatsContractLeads', params: { clientId: clientId, id: id }}">Leads</router-link>
        </li>
      </ul>
    </template>
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
      contract: 'getCurrentBuyerStatsContract',
      leadCount: 'getBuyerContractStatsTotalLeadCount',
      soldCount: 'getBuyerContractStatsTotalSoldCount',
      revenue: 'getBuyerContractStatsTotalRevenue',
      margin: 'getBuyerContractStatsTotalMargin',
      payout: 'getBuyerContractStatsTotalPayout',
      scrubRate: 'getBuyerContractStatsTotalScrubRate',
      marginPercent: 'getBuyerContractStatsTotalMarginPercent'
    })
  },
  methods: {
    ...mapActions({
      fetchBuyerContractStats: 'fetchBuyerContractStats'
    })
  },
  created () {
    this.fetchBuyerContractStats(this.id)
  },
  watch: {
    dateRange () {
      this.fetchBuyerContractStats(this.id)
    }
  },
  components: {
    'buyer-stats-layout': buyerStatsLayout
  }
}
</script>
