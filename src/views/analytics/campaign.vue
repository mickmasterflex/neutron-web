<template>
  <analytics-layout :hud-title="campaign.name">
    <template v-slot:content>
      <router-view></router-view>
    </template>
  </analytics-layout>
</template>

<script>
import analyticsLayout from '@/views/analytics/layout.vue'
import { mapActions, mapGetters, mapMutations } from 'vuex'
export default {
  props: {
    clientId: Number,
    id: Number
  },
  computed: {
    ...mapGetters({
      dateRange: 'getAnalyticsDateRangeUrlFormatted',
      campaign: 'getCurrentBuyerStatsCampaign'
    })
  },
  methods: {
    ...mapActions({
      fetchCampaignStats: 'fetchCampaignStats'
    }),
    ...mapMutations({
      resetLeads: 'RESET_ANALYTICS_LEADS'
    }),
    async setCampaignStats () {
      await this.fetchCampaignStats(this.id)
    }
  },
  created () {
    this.setCampaignStats().then(() => {
      document.title = this.campaign.name
    })
  },
  destroyed () {
    this.resetLeads()
  },
  watch: {
    dateRange () {
      this.fetchCampaignStats(this.id)
    }
  },
  components: {
    'analytics-layout': analyticsLayout
  }
}
</script>
