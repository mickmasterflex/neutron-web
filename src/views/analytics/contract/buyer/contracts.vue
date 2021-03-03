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
      <buyer-contract-list :contracts="contracts"></buyer-contract-list>
    </template>
  </panel-template>
</template>

<script>
import buyerContractList from '@/components/analytics/contracts/buyer-contracts-list'
import dateRangePicker from '@/components/analytics/date-range-picker'
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      loading: 'getAnalyticsFetchLoading',
      loadingText: 'getAnalyticsFetchLoadingText',
      contracts: 'getBuyerContractStatsContracts'
    })
  },
  components: {
    'date-range-picker': dateRangePicker,
    'buyer-contract-list': buyerContractList
  }
}
</script>
