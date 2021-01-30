<template>
  <buyer-stats-layout :hud-title="buyerClient.name"
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
          <router-link :to="{ name: 'BuyerStatsClientContracts' }">Contracts</router-link>
        </li>
        <li class="underscore-tab underscore-tab-lg" :class="$route.meta.contentTab === 'leads' ? 'active' : ''">
          <router-link :to="{ name: 'BuyerStatsClientLeads'}">Leads</router-link>
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
import { mapGetters, mapActions } from 'vuex'
export default {
  props: {
    id: {
      type: Number
    }
  },
  computed: {
    ...mapGetters({
      buyerClient: 'getCurrentBuyerStatsClient',
      leadCount: 'getBuyerStatsContractsTotalLeadCount',
      soldCount: 'getBuyerStatsContractsTotalSoldCount',
      revenue: 'getBuyerStatsContractsTotalRevenue',
      margin: 'getBuyerStatsContractsTotalMargin',
      payout: 'getBuyerStatsContractsTotalPayout',
      scrubRate: 'getBuyerStatsContractsTotalScrubRate',
      marginPercent: 'getBuyerStatsContractsTotalMarginPercent'
    })
  },
  methods: {
    ...mapActions({
      fetchBuyerContractsStats: 'fetchBuyerContractsStats'
    })
  },
  created () {
    this.fetchBuyerContractsStats(this.id)
  },
  components: {
    'buyer-stats-layout': buyerStatsLayout
  }
}
</script>
