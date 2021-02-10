<template>
  <panel-template
    :show-loader="loading"
    :loading-text="loadingText"
    content-background-color="white">
    <template slot="title">
      <date-range-picker></date-range-picker>
    </template>
    <template slot="content">
      <buyer-contract-list
        v-if="$route.name === 'BuyerStatsClientContracts'"
        :contracts="buyerContracts"
      ></buyer-contract-list>
      <partner-contract-list
        v-if="$route.name === 'PartnerStatsClientContracts'"
        :contracts="partnerContracts"
      ></partner-contract-list>
    </template>
  </panel-template>
</template>

<script>
import buyerContractList from '@/components/analytics/contracts/buyer-contracts-list'
import partnerContractList from '@/components/analytics/contracts/partner-contracts-list'
import dateRangePicker from '@/components/analytics/date-range-picker'
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      buyerContracts: 'getBuyerClientContracts',
      partnerContracts: 'getPartnerClientContracts',
      loading: 'getAnalyticsFetchLoading',
      loadingText: 'getAnalyticsFetchLoadingText'
    })
  },
  components: {
    'buyer-contract-list': buyerContractList,
    'partner-contract-list': partnerContractList,
    'date-range-picker': dateRangePicker
  }
}
</script>
