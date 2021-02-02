<template>
  <v-date-picker is-range
                 :value="dateRange"
                 :columns="2"
                 @input="$emit('input', $event)"
                 ref="dateRangeCalendar"
  >
    <template v-slot="{ inputValue, togglePopover }">
      <div class="flex flex-row items-center bg-gray-200 rounded-full p-1 cursor-pointer"
           @click="togglePopover({ placement: 'bottom-start' })">
        <button class="btn-blue btn btn-circle btn-md text-sm">
          <font-awesome-icon icon="calendar-alt"></font-awesome-icon>
        </button>
        <span class="font-bold px-2 text-gray-800">
          {{ new Date(inputValue.start).toDateString() }} <font-awesome-icon icon="arrow-right" class="text-gray-400"></font-awesome-icon> {{ new Date(inputValue.end).toDateString() }}
        </span>
      </div>
    </template>
    <template v-slot:footer>
      <div class="bg-gray-100 text-center p-2 border-t rounded-b-lg grid grid-cols-5 gap-1">
        <button
          class="bg-blue-500 text-white font-medium px-2 py-1 rounded hover:bg-blue-600"
          @click="moveToDate(todayAsRange)">Today</button>
        <button
          class="bg-blue-500 text-white font-medium px-2 py-1 rounded hover:bg-blue-600"
          @click="moveToDate(yesterdayAsRange)">Yesterday</button>
        <button
          class="bg-blue-500 text-white font-medium px-2 py-1 rounded hover:bg-blue-600"
          @click="moveToDate(oneWeekAgoAsRange)">One Week Ago</button>
        <button
          class="bg-blue-500 text-white font-medium px-2 py-1 rounded hover:bg-blue-600"
          @click="moveToDate(thisWeek)">This Week</button>
        <button
          class="bg-blue-500 text-white font-medium px-2 py-1 rounded hover:bg-blue-600"
          @click="moveToDate(lastWeek)">Last Week</button>
        <button
          class="bg-blue-500 text-white font-medium px-2 py-1 rounded hover:bg-blue-600"
          @click="moveToDate(thisMonth)">This Month</button>
        <button
          class="bg-blue-500 text-white font-medium px-2 py-1 rounded hover:bg-blue-600"
          @click="moveToDate(lastMonth)">Last Month</button>
      </div>
    </template>
  </v-date-picker>
</template>

<script>
import dayjs from 'dayjs'

export default {
  props: {
    dateRange: Object
  },
  computed: {
    test () {
      return this.$refs.dateRangeCalendar.$data
    },
    today () {
      return dayjs().toString()
    },
    yesterday () {
      return dayjs().subtract(1, 'day').toString()
    },
    oneWeekAgo () {
      return dayjs().subtract(1, 'week').toString()
    },
    todayAsRange () {
      return {
        start: this.today,
        end: this.today
      }
    },
    yesterdayAsRange () {
      return {
        start: this.yesterday,
        end: this.yesterday
      }
    },
    oneWeekAgoAsRange () {
      return {
        start: this.oneWeekAgo,
        end: this.oneWeekAgo
      }
    },
    thisWeek () {
      return {
        start: dayjs().day(0).toString(),
        end: this.today
      }
    },
    lastWeek () {
      return {
        start: dayjs().day(-7).toString(),
        end: dayjs().day(-1).toString()
      }
    },
    thisMonth () {
      return {
        start: dayjs().startOf('month').toString(),
        end: this.today
      }
    },
    lastMonth () {
      return {
        start: dayjs().subtract(1, 'month').startOf('month').toString(),
        end: dayjs().subtract(1, 'month').endOf('month').toString()
      }
    }
  },
  methods: {
    moveToDate (dateRange) {
      this.$emit('moveToDate', dateRange)
      this.$refs.dateRangeCalendar.move(dateRange.end)
    }
  }
}
</script>
