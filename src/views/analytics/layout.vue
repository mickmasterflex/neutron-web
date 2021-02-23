<template>
  <content-layout>
    <template v-slot:hud>
      <slot name="hud">
        <h1 class="text-white text-4xl font-hairline">{{ hudTitle }}</h1>
        <hud-stat-cards>
          <slot name="statCards"></slot>
          <stat-card v-if="leadCount" :data="leadCount" title="Leads" color="green" key="leadCountStatCard" ></stat-card>
          <stat-card v-if="soldCount" :data="soldCount" title="Sold" color="green" key="soldCountStatCard" ></stat-card>
          <stat-card v-if="revenue" :data="revenue" title="Revenue" color="green" key="revenueStatCard" ></stat-card>
          <stat-card v-if="margin" :data="margin" title="Margin" color="green" key="marginStatCard" ></stat-card>
          <stat-card v-if="payout" :data="payout" title="Payout" color="green" key="payoutStatCard" ></stat-card>
          <stat-card v-if="scrubRate" :data="scrubRate" title="Scrub Rate" color="green" key="scrubRateStatCard" ></stat-card>
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
import { mapGetters, mapMutations } from 'vuex'
import dayjs from 'dayjs'

export default {
  props: {
    hudTitle: {
      type: String,
      default: 'Loading'
    },
    fetchStats: {
      type: Function,
      required: true
    },
    fetchId: {
      type: Number
    }
  },
  methods: {
    ...mapMutations({
      resetLeads: 'RESET_ANALYTICS_LEADS',
      setStart: 'SET_ANALYTICS_START_DATE',
      setEnd: 'SET_ANALYTICS_END_DATE'
    })
  },
  computed: {
    ...mapGetters({
      leadCount: 'getAnalyticsTotalLeadCount',
      soldCount: 'getAnalyticsTotalSoldCount',
      revenue: 'getAnalyticsTotalRevenue',
      margin: 'getAnalyticsTotalMargin',
      payout: 'getAnalyticsTotalPayout',
      scrubRate: 'getAnalyticsTotalScrubRate',
      marginPercent: 'getAnalyticsTotalMarginPercent',
      analyticsDateRange: 'getAnalyticsDateRange'
    })
  },
  watch: {
    analyticsDateRange () {
      if (this.fetchId) {
        this.fetchStats(this.fetchId)
      } else {
        this.fetchStats()
      }
    }
  },
  mounted () {
    this.setStart(dayjs(this.$route.query.start_date))
    this.setEnd(dayjs(this.$route.query.end_date))
  },
  destroyed () {
    this.resetLeads()
  }
}
</script>
