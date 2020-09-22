<template>
  <full-calendar :attributes="attributes" @update:to-page="emittedMonth = $event">
    <template v-slot:heading-details>
      <month-content v-if="monthCaps"></month-content>
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
import month from '@/components/caps/month'

export default {
  data () {
    return {
      emittedMonth: {}
    }
  },
  watch: {
    emittedMonth () {
      if (this.emittedMonth) {
        let month = this.emittedMonth.month
        if (month < 10) {
          month = '0' + month
        }
        const formattedMonth = this.emittedMonth.year + '-' + month + '-' + '01'
        this.setCurrentMonthDate(formattedMonth)
        this.fetchCaps()
      }
    }
  },
  methods: {
    ...mapMutations({
      setCapsCalendarParams: 'SET_CAPS_CALENDAR_PARAMS',
      setCurrentMonthDate: 'SET_CURRENT_MONTH_DATE'
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
      if (!this.checkForMonthData) {
        this.setCapsCalendarParams({ date: this.currentMonth, months: 2 })
        this.fetchCurrentCaps()
      }
    }
  },
  computed: {
    ...mapGetters({
      dayCaps: 'getCurrentDayCaps',
      monthCaps: 'getCurrentMonthCaps',
      currentMonth: 'getCurrentMonth'
    }),
    checkForMonthData () {
      if (this.monthCaps) {
        if (this.monthCaps.some(e => e.date === this.currentMonth)) {
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
    'day-content': day,
    'month-content': month
  }
}
</script>
