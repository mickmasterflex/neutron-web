<template>
  <div class="flex flex-row space-x-1">
    <date-display class="rounded bg-gray-100" :heading="thisMonthDisplay" :content="findCap(monthCaps, currentMonthDate)"/>
    <date-display :heading="displayDay(dayOneDate)" :content="findCap(dayCaps, dayOneDate)"/>
    <date-display class="hidden lg:flex" :heading="displayDay(dayTwoDate)" :content="findCap(dayCaps, dayTwoDate)"/>
    <date-display class="hidden lg:flex" :heading="displayDay(dayThreeDate)" :content="findCap(dayCaps, dayThreeDate)"/>
    <date-display class="hidden lg:flex" :heading="displayDay(dayFourDate)" :content="findCap(dayCaps, dayFourDate)"/>
    <date-display class="hidden xl:flex" :heading="displayDay(dayFiveDate)" :content="findCap(dayCaps, dayFiveDate)"/>
    <date-display class="hidden xl:flex" :heading="displayDay(daySixDate)" :content="findCap(dayCaps, daySixDate)"/>
    <date-display class="hidden xl:flex" :heading="displayDay(daySevenDate)" :content="findCap(dayCaps, daySevenDate)"/>
  </div>
</template>

<script>
import date from './date'
import dayjs from 'dayjs'
const advancedFormat = require('dayjs/plugin/advancedFormat')
dayjs.extend(advancedFormat)

export default {
  props: {
    caps: Object
  },
  methods: {
    displayDay (date) {
      return dayjs(date).format('Do')
    },
    formatDate (date) {
      return date.format('YYYY-MM-DD')
    },
    findCap (caps, date) {
      const cap = caps.find(cap => cap.date === date)
      if (cap) {
        return cap.limit
      } else {
        return '-'
      }
    }
  },
  computed: {
    today () {
      return dayjs()
    },
    monthCaps () {
      return this.caps.month_caps
    },
    dayCaps () {
      return this.caps.day_caps
    },
    currentMonthDate () {
      return this.today.format('YYYY-MM') + '-01'
    },
    thisMonthDisplay () {
      return this.today.format('MMM')
    },
    dayOneDate () {
      return this.formatDate(this.today)
    },
    dayTwoDate () {
      return this.formatDate(this.today.add(1, 'day'))
    },
    dayThreeDate () {
      return this.formatDate(this.today.add(2, 'day'))
    },
    dayFourDate () {
      return this.formatDate(this.today.add(3, 'day'))
    },
    dayFiveDate () {
      return this.formatDate(this.today.add(4, 'day'))
    },
    daySixDate () {
      return this.formatDate(this.today.add(5, 'day'))
    },
    daySevenDate () {
      return this.formatDate(this.today.add(6, 'day'))
    }
  },
  components: {
    'date-display': date
  }
}
</script>
