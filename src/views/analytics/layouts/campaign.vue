<template>
  <analytics-layout
    :hud-title="campaign.name"
    :fetch-stats="fetchCampaignStats"
    :fetch-id="id"
  >
    <template v-slot:content>
      <router-view></router-view>
    </template>
  </analytics-layout>
</template>

<script>
import analyticsLayout from '@/views/analytics/layouts/analytics-layout.vue'
import { mapActions, mapGetters } from 'vuex'
import { campaignContractBreadcrumbs } from '@/mixins/breadcrumbs/analytics/ancestral/campaign'

export default {
  props: {
    clientId: Number,
    id: Number
  },
  computed: {
    ...mapGetters({
      campaign: 'getCurrentCampaignStats'
    })
  },
  methods: {
    ...mapActions({
      fetchCampaignStats: 'fetchCampaignStats'
    })
  },
  watch: {
    campaign () {
      document.title = this.campaign.name
    }
  },
  mixins: [campaignContractBreadcrumbs],
  components: {
    'analytics-layout': analyticsLayout
  }
}
</script>
