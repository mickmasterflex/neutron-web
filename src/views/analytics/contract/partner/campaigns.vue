<template>
  <panel-template
    :show-loader="loading"
    :loading-text="loadingText"
    content-background-color="white">
    <template slot="title">
      <date-range-picker></date-range-picker>
    </template>
    <template slot="action">
      <csv-export @click="fetchCSV($route.params.id)"></csv-export>
    </template>
    <template slot="content">
      <partner-campaign-list :campaigns="campaigns"></partner-campaign-list>
    </template>
  </panel-template>
</template>

<script>
import partnerCampaignList from '@/components/analytics/partner-campaigns-list'
import dateRangePicker from '@/components/analytics/date-range-picker'
import csvExport from '@/components/analytics/csv-stats-export'
import { mapGetters, mapActions } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      campaigns: 'getPartnerContractStatsCampaigns',
      loading: 'getAnalyticsFetchLoading',
      loadingText: 'getAnalyticsFetchLoadingText'
    })
  },
  methods: {
    ...mapActions({
      fetchCSV: 'fetchPartnerContractStatsCSV'
    })
  },
  components: {
    'date-range-picker': dateRangePicker,
    'partner-campaign-list': partnerCampaignList,
    'csv-export': csvExport
  }
}
</script>
