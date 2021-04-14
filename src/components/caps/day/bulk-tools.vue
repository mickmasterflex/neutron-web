<template>
  <div>
    <button class="btn btn-blue" @click="addWeekdays(days)">Select All Weekdays</button>
    <button class="btn btn-blue" @click="addWeekends(days)">Select All Weekends</button>
  </div>
</template>

<script>
import dayjs from 'dayjs'
import { mapMutations } from 'vuex'

export default {
  props: {
    days: {
      type: Array
    }
  },
  methods: {
    addWeekdays (days) {
      const weekdays = days.filter(day => [2, 3, 4, 5, 6].includes(day.weekday))
      const dates = weekdays.map(day => dayjs(day.date).format('DD/MM/YYYY'))
      this.addDays(dates)
    },
    addWeekends (days) {
      const weekends = days.filter(day => [1, 7].includes(day.weekday))
      const dates = weekends.map(day => dayjs(day.date).format('DD/MM/YYYY'))
      this.addDays(dates)
    },
    ...mapMutations({
      addDays: 'ADD_DATES_TO_BULK_UPDATE_DAY_CAPS'
    })
  }
}
</script>
