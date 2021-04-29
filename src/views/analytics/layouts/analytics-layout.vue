<template>
  <content-layout>
    <template v-slot:hud-content>
      <slot name="hud">
        <div>
          <hud-h1 :loading="loading" :content="hudTitle"/>
        </div>
        <hud-stat-cards>
          <slot name="statCards"></slot>
          <stat-card :data="leadCount" :loading="loading" title="Leads" color="green" key="leadCountStatCard" :comma-separated="true"></stat-card>
          <stat-card :data="soldCount" :loading="loading" title="Sold" color="green" key="soldCountStatCard" :comma-separated="true"></stat-card>
          <stat-card :data="revenue" :loading="loading" title="Revenue" color="green" key="revenueStatCard" :comma-separated="true" :dollar-amount="true"></stat-card>
          <stat-card :data="margin" :loading="loading" title="Margin" color="green" key="marginStatCard" :comma-separated="true" :dollar-amount="true"></stat-card>
          <stat-card :data="payout" :loading="loading" title="Payout" color="green" key="payoutStatCard" :comma-separated="true" :dollar-amount="true"></stat-card>
          <stat-card :data="scrubRate" :loading="loading" title="Scrub Rate" color="green" key="scrubRateStatCard" ></stat-card>
          <stat-card :data="marginPercent" :loading="loading" title="Margin Percent" key="marginPercentStatCard" ></stat-card>
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
      type: String
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
      setStart: 'SET_ANALYTICS_START_DATE',
      setEnd: 'SET_ANALYTICS_END_DATE',
      resetAnalyticsTotals: 'RESET_ANALYTICS_TOTALS'
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
      analyticsDateRange: 'getAnalyticsDateRange',
      loading: 'getAnalyticsFetchLoading'
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
    this.resetAnalyticsTotals()
  }
}
</script>
