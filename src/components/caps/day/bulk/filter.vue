<template>
  <button class="w-1/2 btn btn-md btn-blue rounded-r-none border-r-0"
          @click="toggleDates()">
    <font-awesome-icon :icon="icon"></font-awesome-icon>
  </button>
</template>

<script>
import { mapGetters } from 'vuex'
import dayjs from 'dayjs'

const currentMonth = dayjs(new Date()).month() + 1
const currentDay = dayjs(new Date()).date()
export default {
  props: {
    days: {
      type: Array
    }
  },
  computed: {
    ...mapGetters({
      daysInBulk: 'getBulkUpdateDayCaps'
    }),
    availableDays () {
      const datesNotInPast = this.days.filter(date => {
        if (date.month === currentMonth && date.day < currentDay) {
          return
        }
        return date
      })
      return datesNotInPast.map(day => day ? day.attributes[0].customData : null)
    },
    allDaysInBulk () {
      return this.availableDays.length === this.daysInBulk.length
    },
    noDaysInBulk () {
      return this.daysInBulk.length === 0
    },
    icon () {
      if (this.allDaysInBulk) {
        return 'check-square'
      } else if (this.noDaysInBulk) {
        return ['far', 'square']
      } else {
        return 'minus-square'
      }
    }
  },
  methods: {
    toggleDates () {
      console.log(this.availableDays)
      console.log(this.daysInBulk)
    }
  }
}
</script>
