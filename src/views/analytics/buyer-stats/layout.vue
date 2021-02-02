<template>
  <content-layout>
    <template v-slot:hud>
      <slot name="hud">
        <h1 class="text-white text-4xl font-hairline">{{ hudTitle }}</h1>
        <hud-stat-cards>
          <stat-card v-if="leadCount" :data="leadCount" title="Leads" color="teal" key="leadCountStatCard" ></stat-card>
          <stat-card v-if="soldCount" :data="soldCount" title="Sold" color="teal" key="soldCountStatCard" ></stat-card>
          <stat-card v-if="revenue" :data="revenue" title="Revenue" color="teal" key="revenueStatCard" ></stat-card>
          <stat-card v-if="margin" :data="margin" title="Margin" color="teal" key="marginStatCard" ></stat-card>
          <stat-card v-if="payout" :data="payout" title="Payout" color="teal" key="payoutStatCard" ></stat-card>
          <stat-card v-if="scrubRate" :data="scrubRate" title="Scrub Rate" color="teal" key="scrubRateStatCard" ></stat-card>
          <stat-card v-if="marginPercent" :data="marginPercent" title="Margin Percent" color="teal" key="marginPercentStatCard" ></stat-card>
        </hud-stat-cards>
      </slot>
    </template>
    <template v-slot:contentTabs>
      <slot name="contentTabs"></slot>
    </template>
    <template v-slot:content>
      <slot name="content"></slot>
    </template>
  </content-layout>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  props: {
    hudTitle: {
      type: String,
      default: 'Loading'
    }
  },
  computed: {
    ...mapGetters({
      leadCount: 'getBuyerStatsTotalLeadCount',
      soldCount: 'getBuyerStatsTotalSoldCount',
      revenue: 'getBuyerStatsTotalRevenue',
      margin: 'getBuyerStatsTotalMargin',
      payout: 'getBuyerStatsTotalPayout',
      scrubRate: 'getBuyerStatsTotalScrubRate',
      marginPercent: 'getBuyerStatsTotalMarginPercent'
    })
  }
}
</script>
