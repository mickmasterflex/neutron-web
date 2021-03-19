<template>
  <panel-template
    :show-loader="loading"
    :loading-text="loadingText"
    content-background-color="white">
    <template slot="title">
      <date-range-picker></date-range-picker>
    </template>
    <template slot="content">
      <campaigns-list :campaigns="campaigns"></campaigns-list>
    </template>
  </panel-template>
</template>

<script>
import campaignsList from '@/components/analytics/campaigns-list'
import dateRangePicker from '@/components/analytics/date-range-picker'
import { mapGetters } from 'vuex'

export default {
  props: {
    id: Number
  },
  computed: {
    ...mapGetters({
      getCampaignsByPartner: 'getCurrentStatsCampaignsByPartner',
      loading: 'getAnalyticsFetchLoading',
      loadingText: 'getAnalyticsFetchLoadingText'
    }),
    campaigns () {
      return this.getCampaignsByPartner(this.id)
    }
  },
  components: {
    'date-range-picker': dateRangePicker,
    'campaigns-list': campaignsList
  }
}
</script>
