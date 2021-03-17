<template>
  <panel-template
    :show-loader="loading"
    :loading-text="loadingText"
    content-background-color="white">
    <template slot="title">
      <date-range-picker></date-range-picker>
    </template>
    <template slot="action">
      <csv-export @click="fetchCSV($route.params.id)"></csv-export>
    </template>
    <template slot="content">
      <buyer-contract-list v-if="$route.name === 'BuyerStatsClientContracts'"></buyer-contract-list>
      <partner-contract-list v-if="$route.name === 'PartnerStatsClientContracts'"></partner-contract-list>
    </template>
  </panel-template>
</template>

<script>
import buyerContractList from '@/components/analytics/contracts/buyer-contracts-list'
import partnerContractList from '@/components/analytics/contracts/partner-contracts-list'
import dateRangePicker from '@/components/analytics/date-range-picker'
import csvExport from '@/components/analytics/csv-stats-export'
import { mapGetters, mapActions } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      loading: 'getAnalyticsFetchLoading',
      loadingText: 'getAnalyticsFetchLoadingText'
    })
  },
  methods: {
    ...mapActions({
      fetchPartnerCSV: 'fetchPartnerClientStatsCSV',
      fetchBuyerCSV: 'fetchBuyerClientStatsCSV'
    }),
    fetchCSV (id) {
      if (this.$route.name === 'BuyerStatsClientContracts') {
        this.fetchBuyerCSV(id)
      } else {
        this.fetchPartnerCSV(id)
      }
    }
  },
  components: {
    'buyer-contract-list': buyerContractList,
    'partner-contract-list': partnerContractList,
    'date-range-picker': dateRangePicker,
    'csv-export': csvExport
  }
}
</script>
