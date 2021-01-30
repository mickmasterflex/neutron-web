<template>
  <panel-template :showLoader="loading" :loadingText="loadingText" content-background-color="white">
    <template slot="title">
      <date-range-picker :date-range-text="dateRangeText"></date-range-picker>
    </template>
    <template slot="content">
      <buyer-contract-list :buyer_stats_contracts="contracts"></buyer-contract-list>
    </template>
  </panel-template>
</template>

<script>
import buyerContractList from '@/components/analytics/buyer-contracts-list'
import dateRangePicker from '@/components/analytics/date-range-picker'
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      contracts: 'getBuyerStatsContractsParentless',
      loading: 'getBuyerStatsContractsFetchLoading',
      loadingText: 'getBuyerStatsContractsFetchLoadingText',
      dateRangeText: 'getAnalyticsDateRange'
    })
  },
  components: {
    'buyer-contract-list': buyerContractList,
    'date-range-picker': dateRangePicker
  }
}
</script>
