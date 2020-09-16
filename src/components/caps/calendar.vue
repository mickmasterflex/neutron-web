<template>
  <full-calendar :attributes="attributes" @update:to-page="currentMonth = $event">
    <template v-slot:day="slotProps">
      <day-content :day="slotProps.day" v-if="slotProps.day.inMonth && dayHasAttributes(slotProps.day.attributes)"></day-content>
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
      caps: 'getCurrentDayCaps',
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
      if (this.caps) {
        return this.caps.map(cap => ({
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

<style>
  .gray-card { @apply border-gray-300 }
  .gray-card .full-calendar--day-subtitle { @apply bg-gray-100 }
  .red-card { @apply border-red-500 }
  .red-card .full-calendar--day-subtitle { @apply bg-red-500 text-white }
  .yellow-card { @apply border-yellow-500 }
  .yellow-card .full-calendar--day-subtitle { @apply bg-yellow-500 text-white }
  .green-card { @apply border-green-500 }
  .green-card .full-calendar--day-subtitle { @apply bg-green-500 text-white }
  .blue-card { @apply border-blue-500 }
  .blue-card .full-calendar--day-subtitle { @apply bg-blue-500 text-white }
</style>
