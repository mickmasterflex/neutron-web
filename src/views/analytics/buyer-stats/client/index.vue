<template>
  <content-layout>
    <template v-slot:hud>
      <h1 class="text-white text-4xl font-hairline">{{ buyerClient.name }}</h1>
      <hud-stat-cards>
        <stat-card v-if="leadCount" :data="leadCount" title="Leads" color="teal" key="leadCountStatCard" ></stat-card>
        <stat-card v-if="soldCount" :data="soldCount" title="Sold" color="teal" key="soldCountStatCard" ></stat-card>
        <stat-card v-if="revenue" :data="revenue" title="Revenue" color="teal" key="revenueStatCard" ></stat-card>
        <stat-card v-if="margin" :data="margin" title="Margin" color="teal" key="marginStatCard" ></stat-card>
        <stat-card v-if="payout" :data="payout" title="Payout" color="teal" key="payoutStatCard" ></stat-card>
        <stat-card v-if="scrubRate" :data="scrubRate" title="Scrub Rate" color="teal" key="scrubRateStatCard" ></stat-card>
        <stat-card v-if="marginPercent" :data="marginPercent" title="Margin Percent" color="teal" key="marginPercentStatCard" ></stat-card>
      </hud-stat-cards>
    </template>
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
  </content-layout>
</template>

<script>
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
      leadCount: 'getBuyerContractsTotalLeadCount',
      soldCount: 'getBuyerContractsTotalSoldCount',
      revenue: 'getBuyerContractsTotalRevenue',
      margin: 'getBuyerContractsTotalMargin',
      payout: 'getBuyerContractsTotalPayout',
      scrubRate: 'getBuyerContractsTotalScrubRate',
      marginPercent: 'getBuyerContractsTotalMarginPercent'
    })
  },
  methods: {
    ...mapActions({
      fetchBuyerContractStats: 'fetchBuyerContractStats'
    })
  },
  created () {
    this.fetchBuyerContractStats(this.id)
  }
}
</script>
