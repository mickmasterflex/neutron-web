<template>
  <panel-template
    :show-loader="loading"
    :loading-text="loadingText"
    content-background-color="white">
    <template slot="title">
      <date-range-picker></date-range-picker>
    </template>
    <template slot="content">
      <buyer-leads-list :leads="leads" v-if="$route.meta.activeAppTab === 'buyer-stats'"></buyer-leads-list>
      <partner-leads-list :leads="leads" v-if="$route.meta.activeAppTab === 'partner-stats'"></partner-leads-list>
    </template>
  </panel-template>
</template>

<script>
import buyerLeadsList from '@/components/analytics/leads/leads-buyer-stats'
import partnerLeadsList from '@/components/analytics/leads/leads-partner-stats'
import dateRangePicker from '@/components/analytics/date-range-picker'
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      leads: 'getAnalyticsLeads',
      loading: 'getAnalyticsFetchLoading',
      loadingText: 'getAnalyticsFetchLoadingText'
    })
  },
  components: {
    'buyer-leads-list': buyerLeadsList,
    'partner-leads-list': partnerLeadsList,
    'date-range-picker': dateRangePicker
  }
}
</script>
