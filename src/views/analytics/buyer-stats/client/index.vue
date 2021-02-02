<template>
  <buyer-stats-layout :hud-title="buyerClient.name">
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
      dateRange: 'getAnalyticsDateRangeUrlFormatted',
      buyerClient: 'getCurrentBuyerStatsClient'
    })
  },
  methods: {
    ...mapActions({
      fetchBuyerClientStats: 'fetchBuyerClientStats'
    }),
    async setBuyerClientStats () {
      await this.fetchBuyerClientStats(this.id)
    }
  },
  created () {
    this.setBuyerClientStats().then(() => {
      document.title = this.buyerClient.name
    })
  },
  watch: {
    dateRange () {
      this.fetchBuyerClientStats(this.id)
    }
  },
  components: {
    'buyer-stats-layout': buyerStatsLayout
  }
}
</script>
