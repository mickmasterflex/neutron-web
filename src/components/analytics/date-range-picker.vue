<template>
  <date-range-picker
    :date-range="dateRange"
    @input="pushToRouteWithQuery($event)"
    @moveToDate="pushToRouteWithQuery($event)"
  ></date-range-picker>
</template>

<script>
import dateRangePicker from '@/components/ui/calendars/date-range-picker/index'
import { mapMutations, mapGetters } from 'vuex'
import dayjs from 'dayjs'

export default {
  methods: {
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
