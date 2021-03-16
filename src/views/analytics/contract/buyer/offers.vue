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
      <buyer-offer-list :buyer_contract_stats_offers="offers"></buyer-offer-list>
    </template>
  </panel-template>
</template>

<script>
import buyerOfferList from '@/components/analytics/buyer-offers-list'
import dateRangePicker from '@/components/analytics/date-range-picker'
import csvExport from '@/components/analytics/csv-stats-export'
import { mapGetters, mapActions } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      offers: 'getBuyerContractStatsOffers',
      loading: 'getAnalyticsFetchLoading',
      loadingText: 'getAnalyticsFetchLoadingText'
    })
  },
  methods: {
    ...mapActions({
      fetchCSV: 'fetchBuyerContractStatsCSV'
    })
  },
  components: {
    'date-range-picker': dateRangePicker,
    'buyer-offer-list': buyerOfferList,
    'csv-export': csvExport
  }
}
</script>
