<template>
  <buyer-stats-layout :hud-title="contract.name">
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
import buyerStatsLayout from '@/views/analytics/layout.vue'
import { mapActions, mapGetters, mapMutations } from 'vuex'
export default {
  props: {
    clientId: Number,
    id: Number
  },
  computed: {
    ...mapGetters({
      dateRange: 'getAnalyticsDateRangeUrlFormatted',
      contract: 'getCurrentBuyerStatsContract'
    })
  },
  methods: {
    ...mapActions({
      fetchBuyerContractStats: 'fetchBuyerContractStats'
    }),
    ...mapMutations({
      resetLeads: 'RESET_ANALYTICS_LEADS'
    }),
    async setBuyerContractStats () {
      await this.fetchBuyerContractStats(this.id)
    }
  },
  created () {
    this.setBuyerContractStats().then(() => {
      document.title = this.contract.name
    })
  },
  destroyed () {
    this.resetLeads()
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
