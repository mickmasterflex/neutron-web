<template>
  <panel-template
    :show-loader="loading"
    :loading-text="loadingText"
    content-background-color="white">
    <template slot="title">
      <date-range-picker :date-range-text="dateRangeText"></date-range-picker>
    </template>
    <template slot="content">
      <buyer-client-list :buyer_stats_clients="clients"></buyer-client-list>
    </template>
  </panel-template>
</template>

<script>
import buyerClientList from '@/components/analytics/buyer-clients-list'
import dateRangePicker from '@/components/analytics/date-range-picker'
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      clients: 'getBuyerStatsClients',
      loading: 'getBuyerStatsClientsFetchLoading',
      loadingText: 'getBuyerStatsClientsFetchLoadingText',
      dateRangeText: 'getAnalyticsDateRange'
    })
  },
  components: {
    'buyer-client-list': buyerClientList,
    'date-range-picker': dateRangePicker
  }
}
</script>
