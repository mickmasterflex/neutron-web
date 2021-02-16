import dayjs from 'dayjs'
import { mapMutations } from 'vuex'

export const dateRangeUpdate = {
  methods: {
    ...mapMutations({
      setStart: 'SET_ANALYTICS_START_DATE',
      setEnd: 'SET_ANALYTICS_END_DATE'
    }),
    updateDateRange () {
      console.log('updateDateRange' + this.$route.query.start_date)
      if (this.$route.query.start_date && this.$route.query.end_date) {
        this.setStart(dayjs(this.$route.query.start_date))
        this.setEnd(dayjs(this.$route.query.end_date))
      } else {
        this.setStart(dayjs())
        this.setEnd(dayjs())
      }
      this.$emit('dateRangeUpdated')
    }
  },
  mounted () {
    this.updateDateRange()
  },
  watch: {
    $route () {
      this.updateDateRange()
    }
  }
}
