<template>
  <panel-template
    :show-loader="loading"
    :loading-text="loadingText"
    content-background-color="white">
    <template slot="title">
      <date-range-picker></date-range-picker>
    </template>
    <template slot="action">
      <button class="btn btn-indigo"><font-awesome-icon icon="download"></font-awesome-icon> Export Stats</button>
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
      loadingText: 'getAnalyticsFetchLoadingText'
    })
  },
  components: {
    'date-range-picker': dateRangePicker,
    'partner-campaign-list': partnerCampaignList
  }
}
</script>
