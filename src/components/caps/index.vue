<template>
  <div>
    <day-cap-create></day-cap-create>
    <day-cap-update></day-cap-update>
    <month-cap-create></month-cap-create>
    <caps-calendar class="my-3"></caps-calendar>
  </div>
</template>

<script>
import capsCalendar from '@/components/caps/calendar'
import dayCapCreate from '@/components/caps/day/create'
import dayCapUpdate from '@/components/caps/day/update'
import monthCapCreate from '@/components/caps/month/create'
import { mapMutations } from 'vuex'

export default {
  props: {
    parent: {
      type: Number,
      required: true
    },
    type: {
      type: String,
      required: true
    }
  },
  components: {
    'caps-calendar': capsCalendar,
    'day-cap-create': dayCapCreate,
    'day-cap-update': dayCapUpdate,
    'month-cap-create': monthCapCreate
  },
  methods: {
    ...mapMutations({
      resetCurrentDayCaps: 'RESET_CURRENT_DAY_CAPS',
      resetCurrentMonthCaps: 'RESET_CURRENT_MONTH_CAPS',
      resetCurrentCapParent: 'RESET_CURRENT_CAP_PARENT',
      setCapsCalendarEndpoint: 'SET_CAPS_CALENDAR_ENDPOINT',
      resetCapsCalendarEndpoint: 'RESET_CAPS_CALENDAR_ENDPOINT',
      resetCapsCalendarParams: 'RESET_CAPS_CALENDAR_PARAMS'
    }),
    setCapEndpoint () {
      this.setCapsCalendarEndpoint({ type: this.type, id: this.parent })
    }
  },
  created () {
    this.setCapEndpoint()
  },
  destroyed () {
    this.resetCurrentCapParent()
    this.resetCurrentDayCaps()
    this.resetCurrentMonthCaps()
    this.resetCapsCalendarEndpoint()
    this.resetCapsCalendarParams()
  }
}
</script>
