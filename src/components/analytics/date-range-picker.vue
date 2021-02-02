<template>
  <date-range-picker
    :date-range="dateRange"
    @input="updateDateRange($event)"
    @moveToDate="updateDateRange($event)"
  ></date-range-picker>
</template>

<script>
import dateRangePicker from '@/components/ui/buttons/date-range-picker'
import { mapMutations, mapGetters } from 'vuex'

export default {
  methods: {
    updateDateRange (updatedRange) {
      this.setStart(updatedRange.start)
      this.setEnd(updatedRange.end)
    },
    ...mapMutations({
      setStart: 'SET_ANALYTICS_START_DATE',
      setEnd: 'SET_ANALYTICS_END_DATE'
    })
  },
  computed: {
    ...mapGetters({
      dateRange: 'getAnalyticsDateRange'
    })
  },
  components: {
    'date-range-picker': dateRangePicker
  }
}
</script>
