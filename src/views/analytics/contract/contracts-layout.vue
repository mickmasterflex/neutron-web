<template>
  <panel-template
    :show-loader="loading"
    :loading-text="loadingText"
    content-background-color="white">
    <template v-slot:title>
      <date-range-picker></date-range-picker>
    </template>
    <template v-slot:content>
      <slot name="content"></slot>
    </template>
  </panel-template>
</template>

<script>
import dateRangePicker from '@/components/analytics/date-range-picker'
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      loading: 'getAnalyticsFetchLoading',
      loadingText: 'getAnalyticsFetchLoadingText',
      dateRangeText: 'getAnalyticsDateRange'
    })
  },
  components: {
    'date-range-picker': dateRangePicker
  }
}
</script>
