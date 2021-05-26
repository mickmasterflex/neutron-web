<template>
  <div class="flex flex-row space-x-1">
    <date-display class="border-r border-gray-200"
                  :heading="today.format('MMM')"
                  :limit="capLimit(monthCaps, currentMonthDate)"/>
    <date-display :heading="dayHeading(dayOneDate)"
                  :limit="capLimit(dayCaps, dayOneDate)"/>
    <date-display class="hidden lg:flex"
                  :heading="dayHeading(dayTwoDate)"
                  :limit="capLimit(dayCaps, dayTwoDate)"/>
    <date-display class="hidden lg:flex"
                  :heading="dayHeading(dayThreeDate)"
                  :limit="capLimit(dayCaps, dayThreeDate)"/>
    <date-display class="hidden lg:flex"
                  :heading="dayHeading(dayFourDate)"
                  :limit="capLimit(dayCaps, dayFourDate)"/>
    <date-display class="hidden xl:flex"
                  :heading="dayHeading(dayFiveDate)"
                  :limit="capLimit(dayCaps, dayFiveDate)"/>
    <date-display class="hidden xl:flex"
                  :heading="dayHeading(daySixDate)"
                  :limit="capLimit(dayCaps, daySixDate)"/>
    <date-display class="hidden xl:flex"
                  :heading="dayHeading(daySevenDate)"
                  :limit="capLimit(dayCaps, daySevenDate)"/>
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
  methods: {
    dayHeading (date) {
      return dayjs(date).format('Do')
    },
    formatDate (date) {
      return date.format('YYYY-MM-DD')
    },
    capLimit (caps, date) {
      const cap = caps.find(cap => cap.date === date)
      if (cap) {
        return cap.limit
      } else {
        return null
      }
    }
  },
  components: {
    'date-display': date
  }
}
</script>
