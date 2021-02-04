<template>
  <panel-template
    :show-loader="loading"
    :loading-text="loadingText"
    content-background-color="white">
    <template slot="title">
      <date-range-picker :date-range-text="dateRangeText"></date-range-picker>
    </template>
    <template slot="content">
      <buyer-contract-list :buyer_client_stats_contracts="contracts"></buyer-contract-list>
    </template>
  </panel-template>
</template>

<script>
import buyerContractList from '@/components/analytics/buyer-contracts-list'
import dateRangePicker from '@/components/analytics/date-range-picker'
import { mapActions, mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      contract: 'getCurrentBuyerStatsContract',
      getBuyerClientContractsByParent: 'getBuyerClientContractsByParent',
      loading: 'getAnalyticsFetchLoading',
      loadingText: 'getAnalyticsFetchLoadingText',
      dateRangeText: 'getAnalyticsDateRange'
    }),
    contracts () {
      return this.getBuyerClientContractsByParent(this.contract.id)
    }
  },
  components: {
    'date-range-picker': dateRangePicker,
    'buyer-contract-list': buyerContractList
  },
  methods: {
    ...mapActions({
      fetchBuyerClientsStats: 'fetchBuyerClientsStats'
    })
  },
  created () {
    if (this.contracts) {
      this.fetchBuyerClientsStats()
    }
  }
}
</script>
