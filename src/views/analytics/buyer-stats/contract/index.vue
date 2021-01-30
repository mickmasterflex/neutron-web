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
      contract: 'getCurrentBuyerStatsContract',
      leadCount: 'getBuyerStatsOffersTotalLeadCount',
      soldCount: 'getBuyerStatsOffersTotalSoldCount',
      revenue: 'getBuyerStatsOffersTotalRevenue',
      margin: 'getBuyerStatsOffersTotalMargin',
      payout: 'getBuyerStatsOffersTotalPayout',
      scrubRate: 'getBuyerStatsOffersTotalScrubRate',
      marginPercent: 'getBuyerStatsOffersTotalMarginPercent'
    })
  },
  methods: {
    ...mapActions({
      fetchBuyerOffersStats: 'fetchBuyerOffersStats'
    })
  },
  created () {
    this.fetchBuyerOffersStats(this.id)
  },
  components: {
    'buyer-stats-layout': buyerStatsLayout
  }
}
</script>
