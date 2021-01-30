<template>
  <panel-template
    :show-loader="loading"
    :loading-text="loadingText"
    content-background-color="white">
    <template slot="title">
      <date-range-picker :date-range-text="dateRangeText"></date-range-picker>
    </template>
    <template slot="content">
      <leads-list :leads="leads"></leads-list>
    </template>
  </panel-template>
</template>

<script>
import leadsList from '@/components/analytics/leads-list'
import dateRangePicker from '@/components/analytics/date-range-picker'
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      leads: 'getBuyerStatsClientsLeads',
      loading: 'getBuyerStatsClientsFetchLoading',
      loadingText: 'getBuyerStatsClientsFetchLoadingText',
      dateRangeText: 'getAnalyticsDateRange'
    })
  },
  components: {
    'leads-list': leadsList,
    'date-range-picker': dateRangePicker
  }
}
</script>
