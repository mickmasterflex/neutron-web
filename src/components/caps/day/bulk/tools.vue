<template>
  <div class="p-1">
    <div class="flex flex-row justify-between items-center border-b-2 border-gray-200 p-2 pb-5">
      <span>
        <ul class="flex flex-row justify-center space-x-2">
          <li v-for="filter in massFilters" :key="filter.name" class="flex flex-col items-center">
            <span class="capitalize font-bold">{{ filter.name }}</span>
            <span>
              <button class="btn btn-md btn-blue rounded-r-none border-r-0 w-10" @click="removeDates(formatDates(filter.days))"><font-awesome-icon :icon="['far', 'square']"></font-awesome-icon></button>
              <button class="btn btn-md btn-blue rounded-l-none w-10" @click="addDays(formatDates(filter.days))"><font-awesome-icon icon="check-square"></font-awesome-icon></button>
            </span>
          </li>
        </ul>
      </span>
      <button class="btn btn-turquoise rounded-full" @click="showModal()">Update Selected Day Caps</button>
    </div>
    <ul class="grid grid-cols-7 gap-2 justify-center p-2 pb-0 mt-3">
      <li v-for="filter in dayFilters" :key="filter.name" class="flex flex-row flex-grow items-center">
        <button class="w-1/2 btn btn-md btn-blue rounded-r-none border-r-0" @click="removeDates(formatDates(filter.days))"><font-awesome-icon :icon="['far', 'square']"></font-awesome-icon></button>
        <button class="w-1/2 btn btn-md btn-blue rounded-l-none" @click="addDays(formatDates(filter.days))"><font-awesome-icon icon="check-square"></font-awesome-icon></button>
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
    massFilters () {
      return {
        weekdays: {
          name: 'weekdays',
          days: this.weekdays
        },
        weekends: {
          name: 'weekends',
          days: this.weekends
        }
      }
    },
    dayFilters () {
      return {
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
      return datesNotInPast.map(day => day.attributes[0].customData)
    },
    ...mapMutations({
      addDays: 'ADD_DAYS_TO_BULK_UPDATE_DAY_CAPS',
      removeDates: 'REMOVE_DAYS_FROM_BULK_UPDATE_DAY_CAPS',
      showModal: 'SHOW_BULK_DAY_CAP_MODAL'
    })
  }
}
</script>
