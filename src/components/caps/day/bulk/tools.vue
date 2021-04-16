<template>
  <div class="mt-4 well">
    <div class="flex flex-row justify-between items-center">
      <h4 class="h4">Bulk Update Day Caps</h4>
      <button class="btn btn-turquoise rounded-full" @click="showModal()">Update Selected Day Caps</button>
    </div>
    <ul class="flex flex-row flex-wrap justify-center">
      <li v-for="filter in filters" :key="filter.name" class="flex flex-col items-center w-24">
        <span class="capitalize font-bold">{{ filter.name }}</span>
        <span>
          <button class="btn btn-hollow-blue rounded-r-none border-r-0" @click="removeDates(formatDates(filter.days))"><font-awesome-icon :icon="['far', 'square']"></font-awesome-icon></button>
          <button class="btn btn-blue rounded-l-none border-l-0" @click="addDates(formatDates(filter.days))"><font-awesome-icon icon="check-square"></font-awesome-icon></button>
        </span>
      </li>
    </ul>
  </div>
</template>

<script>
import dayjs from 'dayjs'
import { mapMutations } from 'vuex'

const currentMonth = dayjs(new Date()).month() + 1
const currentDay = dayjs(new Date()).date()
export default {
  props: {
    days: {
      type: Array
    }
  },
  computed: {
    weekdays () { return this.days.filter(day => [2, 3, 4, 5, 6].includes(day.weekday)) },
    weekends () { return this.days.filter(day => [1, 7].includes(day.weekday)) },
    sundays () { return this.days.filter(day => [1].includes(day.weekday)) },
    mondays () { return this.days.filter(day => [2].includes(day.weekday)) },
    tuesdays () { return this.days.filter(day => [3].includes(day.weekday)) },
    wednesdays () { return this.days.filter(day => [4].includes(day.weekday)) },
    thursdays () { return this.days.filter(day => [5].includes(day.weekday)) },
    fridays () { return this.days.filter(day => [6].includes(day.weekday)) },
    saturdays () { return this.days.filter(day => [7].includes(day.weekday)) },
    filters () {
      return {
        weekdays: {
          name: 'weekdays',
          days: this.weekdays
        },
        weekends: {
          name: 'weekends',
          days: this.weekends
        },
        sundays: {
          name: 'sundays',
          days: this.sundays
        },
        mondays: {
          name: 'mondays',
          days: this.mondays
        },
        tuesdays: {
          name: 'tuesdays',
          days: this.tuesdays
        },
        wednesdays: {
          name: 'wednesdays',
          days: this.wednesdays
        },
        thursdays: {
          name: 'thursdays',
          days: this.thursdays
        },
        fridays: {
          name: 'fridays',
          days: this.fridays
        },
        saturdays: {
          name: 'saturdays',
          days: this.saturdays
        }
      }
    }
  },
  methods: {
    formatDates (dates) {
      const datesNotInPast = dates.filter(d => {
        if (d.month === currentMonth && d.day < currentDay) {
          return
        }
        return d
      })
      return datesNotInPast.map(day => dayjs(day.date).format('YYYY-MM-DD'))
    },
    ...mapMutations({
      addDates: 'ADD_DATES_TO_BULK_UPDATE_DAY_CAPS',
      removeDates: 'REMOVE_DATES_FROM_BULK_UPDATE_DAY_CAPS',
      showModal: 'SHOW_BULK_DAY_CAP_MODAL'
    })
  }
}
</script>
