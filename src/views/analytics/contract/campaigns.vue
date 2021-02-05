<template>
  <panel-template
    :show-loader="loading"
    :loading-text="loadingText"
    content-background-color="white">
    <template slot="title">
      <date-range-picker :date-range-text="dateRangeText"></date-range-picker>
    </template>
    <template slot="content">
      <partner-campaign-list :campaigns="campaigns"></partner-campaign-list>
    </template>
  </panel-template>
</template>

<script>
import partnerCampaignList from '@/components/analytics/partner-campaigns-list'
import dateRangePicker from '@/components/analytics/date-range-picker'
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      campaigns: 'getPartnerContractStatsCampaigns',
      loading: 'getAnalyticsFetchLoading',
      loadingText: 'getAnalyticsFetchLoadingText',
      dateRangeText: 'getAnalyticsDateRange'
    })
  },
  components: {
    'date-range-picker': dateRangePicker,
    'partner-campaign-list': partnerCampaignList
  }
}
</script>
