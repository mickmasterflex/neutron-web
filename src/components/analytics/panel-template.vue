<template>
  <panel-template
    :show-loader="loading"
    :loading-text="loadingText"
    content-background-color="white">
    <template slot="title">
      <date-range-picker></date-range-picker>
      <slot name="title"></slot>
    </template>
    <template slot="action">
      <slot name="action"></slot>
    </template>
    <template slot="content">
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
      loadingText: 'getAnalyticsFetchLoadingText'
    })
  },
  components: {
    'date-range-picker': dateRangePicker
  }
}
</script>
