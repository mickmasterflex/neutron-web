<template>
  <buyer-stats-layout hud-title="All Buyer Clients">
    <template v-slot:contentTabs>
      <ul class="underscore-tabs">
        <li class="underscore-tab underscore-tab-lg" :class="$route.meta.contentTab === 'clients' ? 'active' : ''">
          <router-link :to="{ name: 'BuyerStatsClients' }">Clients</router-link>
        </li>
        <li class="underscore-tab underscore-tab-lg" :class="$route.meta.contentTab === 'leads' ? 'active' : ''">
          <router-link :to="{ name: 'BuyerStatsClientsLeads'}">Leads</router-link>
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
  computed: {
    ...mapGetters({
      dateRange: 'getAnalyticsDateRangeUrlFormatted'
    })
  },
  methods: {
    ...mapActions({
      fetchBuyerClientsStats: 'fetchBuyerClientsStats'
    })
  },
  created () {
    this.fetchBuyerClientsStats()
  },
  watch: {
    dateRange () {
      this.fetchBuyerClientsStats()
    }
  },
  components: {
    'buyer-stats-layout': buyerStatsLayout
  }
}
</script>
