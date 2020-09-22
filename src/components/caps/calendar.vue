<template>
  <full-calendar :attributes="attributes" @update:to-page="currentMonth = $event">
    <template v-slot:heading-details>
      123
    </template>
    <template v-slot:day="slotProps">
      <div v-if="slotProps.day.inMonth">
        <day-content :day="slotProps.day" v-if="dayHasAttributes(slotProps.day.attributes)"></day-content>
        <span v-else class="full-calendar--day m-1 border-2 flex flex-row items-center justify-center">
          <font-awesome-icon class="text-gray-700 text-lg" icon="spinner" spin></font-awesome-icon>
        </span>
      </div>
    </template>
  </full-calendar>
</template>

<script>
import { mapMutations, mapGetters, mapActions } from 'vuex'
import fullCalendar from '@/components/ui/calendars/full-calendar'
import day from '@/components/caps/day'

export default {
  data () {
    return {
      currentMonth: {},
      formattedMonth: ''
    }
  },
  watch: {
    currentMonth () {
      this.fetchCaps()
    }
  },
  methods: {
    ...mapMutations({
      setCapsCalendarParams: 'SET_CAPS_CALENDAR_PARAMS'
    }),
    ...mapActions({
      fetchCurrentCaps: 'fetchCurrentCaps'
    }),
    dayHasAttributes (attributes) {
      if (attributes) {
        return !!attributes[0]
      }
    },
    fetchCaps () {
      if (this.currentMonth) {
        let month = this.currentMonth.month
        if (month < 10) {
          month = '0' + month
        }
        this.formattedMonth = this.currentMonth.year + '-' + month + '-' + '01'

        if (!this.checkForMonthData) {
          this.setCapsCalendarParams({ date: this.formattedMonth, months: 2 })
          this.fetchCurrentCaps()
        }
      }
    }
  },
  computed: {
    ...mapGetters({
      dayCaps: 'getCurrentDayCaps',
      monthCaps: 'getCurrentMonthCaps'
    }),
    checkForMonthData () {
      if (this.monthCaps) {
        if (this.monthCaps.some(e => e.date === this.formattedMonth)) {
          return true
        }
      }
      return false
    },
    attributes () {
      if (this.dayCaps) {
        return this.dayCaps.map(cap => ({
          key: `cap.${cap.id}`,
          dates: cap.date,
          customData: cap
        }))
      } else {
        return null
      }
    }
  },
  components: {
    'full-calendar': fullCalendar,
    'day-content': day
  }
}
</script>
