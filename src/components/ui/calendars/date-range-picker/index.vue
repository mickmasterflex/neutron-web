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
        <button class="btn-blue btn btn-circle btn-md">
          <font-awesome-icon icon="calendar-alt"></font-awesome-icon>
        </button>
        <selected-range
          class="px-2"
          :start-date="new Date(inputValue.start).toDateString()"
          :end-date="new Date(inputValue.end).toDateString()"></selected-range>
      </div>
    </template>
    <template v-slot:footer>
      <div class="">
        <div class="flex flex-row space-x-1 justify-center p-2 border-b bg-gray-100">
          <text-link-button @click="moveToDate(todayAsRange)">Today</text-link-button>
          <text-link-button @click="moveToDate(yesterdayAsRange)">Yesterday</text-link-button>
          <text-link-button @click="moveToDate(thisWeek)">This Week</text-link-button>
          <text-link-button @click="moveToDate(lastWeek)">Last Week</text-link-button>
          <text-link-button @click="moveToDate(thisMonth)">This Month</text-link-button>
          <text-link-button @click="moveToDate(lastMonth)">Last Month</text-link-button>
        </div>
        <div class="flex-row flex justify-between items-center p-2">
          <span class="flex flex-col text-gray-600 ml-2">
            Selected Range:
            <selected-range
              :start-date="new Date(dateRange.start).toDateString()"
              :end-date="new Date(dateRange.end).toDateString()"></selected-range>
          </span>
          <button
            class="btn-green btn btn-lg"
            @click="$emit('applyRange')">
            <font-awesome-icon icon="check"></font-awesome-icon> Apply Range</button>
        </div>
      </div>
    </template>
  </v-date-picker>
</template>

<script>
import dayjs from 'dayjs'
import textLinkButton from '@/components/ui/buttons/text-link-button'
import selectedRange from '@/components/ui/calendars/date-range-picker/selected-range'

export default {
  props: {
    dateRange: Object
  },
  computed: {
    today () {
      return dayjs().toString()
    },
    yesterday () {
      return dayjs().subtract(1, 'day').toString()
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
  },
  components: {
    'text-link-button': textLinkButton,
    'selected-range': selectedRange
  }
}
</script>

<style>
  .vc-weeks {
    @apply mt-3 bg-gray-100 border-t
  }
</style>
