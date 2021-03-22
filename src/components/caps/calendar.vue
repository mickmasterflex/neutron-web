<template>
  <full-calendar :attributes="mappedDayCaps" @update:to-page="capInitialization($event.month, $event.year)">
    <template v-slot:header="slotProps">
      <month-content :calendarData="slotProps.calendarData" :calendarRefs="slotProps.calendarRefs"></month-content>
    </template>
    <template v-slot:day="slotProps">
      <div v-if="slotProps.day.inMonth">
        <day-content :day="slotProps.day" v-if="dayHasAttributes(slotProps.day.attributes)"></day-content>
        <span v-else class="full-calendar--day m-1 border-2 flex flex-row items-center justify-center">
          <font-awesome-icon class="text-gray-700 text-lg" icon="spinner" pulse></font-awesome-icon>
        </span>
      </div>
    </template>
  </full-calendar>
</template>

<script>
import { mapMutations, mapGetters, mapActions } from 'vuex'
import fullCalendar from '@/components/ui/calendars/full-calendar/index'
import day from '@/components/caps/day'
import month from '@/components/caps/month'
import dayjs from 'dayjs'

export default {
  methods: {
    ...mapMutations({
      setCapsCalendarParams: 'SET_CAPS_CALENDAR_PARAMS',
      setCurrentMonthFormats: 'SET_CURRENT_CAP_MONTH_FORMATS'
    }),
    ...mapActions({
      fetchCurrentCaps: 'fetchCurrentCaps'
    }),
    capInitialization (M, YYYY) {
      let MM = M
      if (M < 10) {
        MM = '0' + M
      }
      const dateFormats = {
        YYYY_MM_DD: YYYY + '-' + MM + '-' + '01',
        MM_YYYY: MM + '/' + YYYY
      }

      this.setCurrentMonthFormats(dateFormats)
      this.fetchCaps()
    },
    fetchCaps () {
      if (!this.checkForMonthData && this.calendarEndpoint) {
        this.setCapsCalendarParams({ date: this.currentMonthFormats.YYYY_MM_DD, months: 2 })
        this.fetchCurrentCaps()
      }
    },
    dayHasAttributes (attributes) {
      if (attributes) {
        return !!attributes[0]
      }
    }
  },
  computed: {
    ...mapGetters({
      dayCaps: 'getCurrentDayCaps',
      monthCaps: 'getCurrentMonthCaps',
      currentMonthFormats: 'getCurrentCapMonthFormats',
      calendarEndpoint: 'getCapsCalendarEndpoint'
    }),
    checkForMonthData () {
      return !!this.monthCaps.some(e => e.date === this.currentMonthFormats.YYYY_MM_DD)
    },
    mappedDayCaps () {
      if (this.dayCaps) {
        return this.dayCaps.map(cap => ({
          key: `cap.${cap.id}`,
          dates: dayjs(cap.date).$d,
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
