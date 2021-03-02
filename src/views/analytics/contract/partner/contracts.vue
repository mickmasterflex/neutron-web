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
      <partner-contract-list :contracts="contracts"></partner-contract-list>
    </template>
  </panel-template>
</template>

<script>
import partnerContractList from '@/components/analytics/contracts/partner-contracts-list'
import dateRangePicker from '@/components/analytics/date-range-picker'
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      loading: 'getAnalyticsFetchLoading',
      loadingText: 'getAnalyticsFetchLoadingText',
      contracts: 'getPartnerContractStatsContracts'
    })
  },
  components: {
    'date-range-picker': dateRangePicker,
    'partner-contract-list': partnerContractList
  }
}
</script>
