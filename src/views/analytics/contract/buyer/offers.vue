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
      <buyer-offer-list :buyer_contract_stats_offers="offers"></buyer-offer-list>
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
      offers: 'getBuyerContractStatsOffers',
      loading: 'getAnalyticsFetchLoading',
      loadingText: 'getAnalyticsFetchLoadingText'
    })
  },
  components: {
    'date-range-picker': dateRangePicker,
    'buyer-offer-list': buyerOfferList
  }
}
</script>
