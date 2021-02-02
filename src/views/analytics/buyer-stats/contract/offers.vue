<template>
  <panel-template
    :show-loader="loading"
    :loading-text="loadingText"
    content-background-color="white">
    <template slot="title">
      <date-range-picker :date-range-text="dateRangeText"></date-range-picker>
    </template>
    <template slot="content">
      <buyer-offer-list :buyer_contract_stats="offers"></buyer-offer-list>
    </template>
  </panel-template>
</template>

<script>
import buyerOfferList from '@/components/analytics/buyer-offers-list'
import dateRangePicker from '@/components/analytics/date-range-picker'
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      offers: 'getBuyerContractStats',
      loading: 'getBuyerContractStatsFetchLoading',
      loadingText: 'getBuyerContractStatsFetchLoadingText',
      dateRangeText: 'getAnalyticsDateRange'
    })
  },
  components: {
    'date-range-picker': dateRangePicker,
    'buyer-offer-list': buyerOfferList
  }
}
</script>
