<template>
  <date-range-picker
    :date-range="dateRange"
    @input="updateDateRangeAndRoute($event)"
    @moveToDate="updateDateRangeAndRoute($event)"
  ></date-range-picker>
</template>

<script>
import dateRangePicker from '@/components/ui/calendars/date-range-picker/index'
import { mapGetters, mapMutations } from 'vuex'
import dayjs from 'dayjs'

export default {
  methods: {
    ...mapMutations({
      setStart: 'SET_ANALYTICS_START_DATE',
      setEnd: 'SET_ANALYTICS_END_DATE'
    }),
    updateDateRange (updatedRange) {
      this.setStart(dayjs(updatedRange.start))
      this.setEnd(dayjs(updatedRange.end))
    },
    pushToRouteWithQuery (updatedRange) {
      this.$router.replace({
        name: this.$route.name,
        params: this.$route.params,
        query: {
          start_date: dayjs(updatedRange.start).format('YYYY-MM-DD'),
          end_date: dayjs(updatedRange.end).format('YYYY-MM-DD')
        }
      })
    },
    updateDateRangeAndRoute (updatedRange) {
      this.updateDateRange(updatedRange)
      this.pushToRouteWithQuery(updatedRange)
    }
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
