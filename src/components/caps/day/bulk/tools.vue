<template>
  <div class="p-3">
    <div class="flex flex-row justify-between items-center pb-1">
      <span>
        <ul class="flex flex-row justify-center space-x-2">
          <li v-for="filter in massFilters" :key="filter.name" class="flex flex-row items-center space-x-2 well">
            <span class="capitalize font-bold">{{ filter.name }}</span>
            <span>
              <button class="btn btn-md btn-blue rounded-r-none border-r-0 w-12"
                      @click="removeDates(formatDates(filter.days))"
                      :disabled="loading">
                <font-awesome-icon :icon="['far', 'square']"></font-awesome-icon>
              </button>
              <button class="btn btn-md btn-blue rounded-l-none w-12"
                      @click="addDays(formatDates(filter.days))"
                      :disabled="loading">
                <font-awesome-icon icon="check-square"></font-awesome-icon>
              </button>
            </span>
          </li>
        </ul>
      </span>
      <button class="btn btn-turquoise rounded-full" @click="showModal()" :disabled="selectedDates.length === 0">Update Selected Day Caps</button>
    </div>
    <ul class="grid grid-cols-7 gap-2 justify-center pb-0 mt-3">
      <li v-for="filter in dayFilters" :key="filter.name" class="flex flex-row flex-grow items-center">
        <checkbox-filter :days="filter.days"/>
        <button class="w-1/2 btn btn-md btn-blue rounded-r-none border-r-0"
                @click="removeDates(formatDates(filter.days))"
                :disabled="loading">
          <font-awesome-icon :icon="['far', 'square']"></font-awesome-icon>
        </button>
        <button class="w-1/2 btn btn-md btn-blue rounded-l-none"
                @click="addDays(formatDates(filter.days))"
                :disabled="loading">
          <font-awesome-icon icon="check-square"></font-awesome-icon>
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
import dayjs from 'dayjs'
import { mapMutations, mapGetters } from 'vuex'
import checkboxFilter from './filter'

const currentMonth = dayjs(new Date()).month() + 1
const currentDay = dayjs(new Date()).date()
export default {
  components: {
    'checkbox-filter': checkboxFilter
  },
  props: {
    days: {
      type: Array
    }
  },
  computed: {
    ...mapGetters({
      selectedDates: 'getBulkUpdateDayCaps',
      loading: 'getCapsLoading'
    }),
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
        weekends: {
          name: 'weekends',
          days: this.weekends
        },
        weekdays: {
          name: 'weekdays',
          days: this.weekdays
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
      const datesNotInPast = dates.filter(date => {
        if (date.month === currentMonth && date.day < currentDay) {
          return
        }
        return date
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
