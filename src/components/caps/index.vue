<template>
  <div>
    <day-cap-create></day-cap-create>
    <day-cap-update></day-cap-update>
    <caps-calendar class="my-3"></caps-calendar>
  </div>
</template>

<script>
import capsCalendar from '@/components/caps/calendar'
import dayCapCreate from '@/components/caps/day/create'
import dayCapUpdate from '@/components/caps/day/update'
import { mapMutations } from 'vuex'

export default {
  props: {
    parent: {
      type: [String, Number],
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
    'day-cap-update': dayCapUpdate
  },
  methods: {
    ...mapMutations({
      resetCurrentDayCaps: 'RESET_CURRENT_DAY_CAPS',
      resetCurrentCapParent: 'RESET_CURRENT_CAP_PARENT',
      setCapsCalendarEndpoint: 'SET_CAPS_CALENDAR_ENDPOINT'
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
  }
}
</script>
