<template>
  <panel-template
    :show-loader="loading"
    :loading-text="loadingText"
    content-background-color="white">
    <template slot="title">
      <date-range-picker></date-range-picker>
    </template>
    <template slot="content">
      <offer-contracts-list :offers="offersByParent(id)"></offer-contracts-list>
    </template>
  </panel-template>
</template>

<script>
import offerList from '@/components/analytics/offer-contracts-list'
import dateRangePicker from '@/components/analytics/date-range-picker'
import { mapGetters } from 'vuex'

export default {
  props: {
    id: Number
  },
  computed: {
    ...mapGetters({
      offersByParent: 'getCurrentStatsOffersByParent',
      loading: 'getAnalyticsFetchLoading',
      loadingText: 'getAnalyticsFetchLoadingText'
    })
  },
  components: {
    'date-range-picker': dateRangePicker,
    'offer-contracts-list': offerList
  }
}
</script>
