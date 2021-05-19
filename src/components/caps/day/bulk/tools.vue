<template>
  <div class="p-3" v-if="!fetchLoading">
    <div class="flex flex-row justify-between items-center pb-1">
      <ul class="flex flex-row justify-center space-x-2">
        <li v-for="filter in massFilters" :key="filter.name" class="space-x-2">
          <checkbox-filter :days="filter.days" :title="filter.name"/>
        </li>
      </ul>
      <transition enter-active-class="animate__animated animate__bounceIn animate__faster"
                  leave-active-class="animate__animated animate__fadeOut animate__faster">
        <button class="btn btn-turquoise rounded-full btn-lg" @click="showModal()" v-show="selectedDates.length > 0">Update Selected Day Caps</button>
      </transition>
    </div>
    <ul class="grid grid-cols-7 gap-2 justify-center pb-0 mt-3">
      <li v-for="filter in dayFilters" :key="filter.name" class="flex flex-row flex-grow items-center">
        <checkbox-filter :days="filter.days" :title="filter.name"/>
      </li>
    </ul>
  </div>
</template>

<script>
import dayjs from 'dayjs'
import { mapMutations, mapGetters } from 'vuex'
import checkboxFilter from './filter'

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
      loading: 'getCapsLoading',
      fetchLoading: 'getCapsFetchLoading'
    }),
    todayAndFutureDays () {
      return this.days.filter(day => day.day >= currentDay)
    },
    weekdays () { return this.todayAndFutureDays.filter(day => [2, 3, 4, 5, 6].includes(day.weekday)) },
    weekends () { return this.todayAndFutureDays.filter(day => [1, 7].includes(day.weekday)) },
    sundays () { return this.todayAndFutureDays.filter(day => [1].includes(day.weekday)) },
    mondays () { return this.todayAndFutureDays.filter(day => [2].includes(day.weekday)) },
    tuesdays () { return this.todayAndFutureDays.filter(day => [3].includes(day.weekday)) },
    wednesdays () { return this.todayAndFutureDays.filter(day => [4].includes(day.weekday)) },
    thursdays () { return this.todayAndFutureDays.filter(day => [5].includes(day.weekday)) },
    fridays () { return this.todayAndFutureDays.filter(day => [6].includes(day.weekday)) },
    saturdays () { return this.todayAndFutureDays.filter(day => [7].includes(day.weekday)) },
    massFilters () {
      return {
        weekends: {
          name: 'Weekends',
          days: this.weekends
        },
        weekdays: {
          name: 'Weekdays',
          days: this.weekdays
        }
      }
    },
    dayFilters () {
      return {
        sundays: {
          name: 'Sun',
          days: this.sundays
        },
        mondays: {
          name: 'Mon',
          days: this.mondays
        },
        tuesdays: {
          name: 'Tue',
          days: this.tuesdays
        },
        wednesdays: {
          name: 'Wed',
          days: this.wednesdays
        },
        thursdays: {
          name: 'Thu',
          days: this.thursdays
        },
        fridays: {
          name: 'Fri',
          days: this.fridays
        },
        saturdays: {
          name: 'Sat',
          days: this.saturdays
        }
      }
    }
  },
  methods: {
    ...mapMutations({
      showModal: 'SHOW_BULK_DAY_CAP_MODAL'
    })
  }
}
</script>
