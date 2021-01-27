<template>
  <content-layout>
    <template v-slot:hud>
      <h1 class="text-white text-4xl font-hairline">Buyer Clients</h1>
      <div class="hud--stat-cards">
        <transition-group enter-active-class="animate__animated animate__fadeIn">
          <stat-card v-if="leadCount" :data="leadCount" title="Leads" color="teal" key="leadCountStatCard" ></stat-card>
          <stat-card v-if="soldCount" :data="soldCount" title="Sold" color="teal" key="soldCountStatCard" ></stat-card>
          <stat-card v-if="revenue" :data="revenue" title="Revenue" color="teal" key="revenueStatCard" ></stat-card>
          <stat-card v-if="margin" :data="margin" title="Margin" color="teal" key="marginStatCard" ></stat-card>
          <stat-card v-if="payout" :data="payout" title="Payout" color="teal" key="payoutStatCard" ></stat-card>
          <stat-card v-if="scrubRate" :data="scrubRate" title="Scrub Rate" color="teal" key="scrubRateStatCard" ></stat-card>
          <stat-card v-if="marginPercent" :data="marginPercent" title="Margin Percent" color="teal" key="marginPercentStatCard" ></stat-card>
        </transition-group>
      </div>
    </template>
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
  </content-layout>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  computed: {
    ...mapGetters({
      leadCount: 'getBuyerClientsTotalLeadCount',
      soldCount: 'getBuyerClientsTotalSoldCount',
      revenue: 'getBuyerClientsTotalRevenue',
      margin: 'getBuyerClientsTotalMargin',
      payout: 'getBuyerClientsTotalPayout',
      scrubRate: 'getBuyerClientsTotalScrubRate',
      marginPercent: 'getBuyerClientsTotalMarginPercent'
    })
  },
  methods: {
    ...mapActions({
      fetchBuyerClientStats: 'fetchBuyerClientStats'
    })
  },
  created () {
    this.fetchBuyerClientStats()
  }
}
</script>
