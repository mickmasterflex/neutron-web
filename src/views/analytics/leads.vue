<template>
  <panel-template
    :show-loader="loading"
    :loading-text="loadingText"
    content-background-color="white">
    <template slot="title">
      <date-range-picker></date-range-picker>
    </template>
    <template slot="action">
      <csv-export @click="fetchCSV()" v-if="exportVisible" button-default-text="Export Leads"></csv-export>
    </template>
    <template slot="content">
      <buyer-leads-list :leads="leads" v-if="$route.meta.activeAppTab === 'buyer-stats'"></buyer-leads-list>
      <partner-leads-list :leads="leads" v-if="$route.meta.activeAppTab === 'partner-stats'"></partner-leads-list>
    </template>
  </panel-template>
</template>

<script>
import buyerLeadsList from '@/components/analytics/leads/buyer-stats-list'
import partnerLeadsList from '@/components/analytics/leads/partner-stats-list'
import dateRangePicker from '@/components/analytics/date-range-picker'
import csvExport from '@/components/analytics/csv-stats-export'
import { mapGetters, mapActions } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      leads: 'getAnalyticsLeads',
      loading: 'getAnalyticsFetchLoading',
      loadingText: 'getAnalyticsFetchLoadingText'
    }),
    exportVisible () {
      return this.$route.name === 'PartnerStatsCampaignLeads' || this.$route.name === 'BuyerStatsOfferContractLeads'
    }
  },
  methods: {
    ...mapActions({
      fetchCampaignLeadsCSV: 'fetchCampaignLeadsCSV',
      fetchOfferContractLeadsCSV: 'fetchOfferContractLeadsCSV'
    }),
    fetchCSV () {
      if (this.$route.name === 'PartnerStatsCampaignLeads') {
        this.fetchCampaignLeadsCSV(this.$route.params.id)
      } else if (this.$route.name === 'BuyerStatsOfferContractLeads') {
        this.fetchOfferContractLeadsCSV(this.$route.params.id)
      }
    }
  },
  components: {
    'buyer-leads-list': buyerLeadsList,
    'partner-leads-list': partnerLeadsList,
    'date-range-picker': dateRangePicker,
    'csv-export': csvExport
  }
}
</script>
