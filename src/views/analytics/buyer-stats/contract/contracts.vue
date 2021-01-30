<template>
  <panel-template
    :show-loader="loading"
    :loading-text="loadingText"
    content-background-color="white">
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
import dateRangePicker from '@/components/ui/buttons/date-range-picker'
import { mapActions, mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      contract: 'getCurrentBuyerStatsContract',
      getBuyerStatsContractsByParent: 'getBuyerStatsContractsByParent',
      loading: 'getBuyerStatsContractsFetchLoading',
      loadingText: 'getBuyerStatsContractsFetchLoadingText',
      dateRangeText: 'getAnalyticsDateRange'
    }),
    contracts () {
      return this.getBuyerStatsContractsByParent(this.contract.id)
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
    if (this.getBuyerStatsContractsByParent) {
      this.fetchBuyerClientsStats()
    }
  }
}
</script>
