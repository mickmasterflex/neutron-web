<template>
  <div>
    <day-cap-create/>
    <day-cap-update/>
    <day-cap-bulk-update/>
    <month-cap-create/>
    <month-cap-update/>
    <caps-calendar class="my-3" v-if="capsEndpoint"/>
    <table-empty-state heading="Loading Caps" v-else/>
  </div>
</template>

<script>
import capsCalendar from '@/components/caps/calendar'
import dayCapCreate from '@/components/caps/day/create'
import dayCapUpdate from '@/components/caps/day/update'
import dayCapBulkUpdate from '@/components/caps/day/bulk/update'
import monthCapCreate from '@/components/caps/month/create'
import monthCapUpdate from '@/components/caps/month/update'
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      capsEndpoint: 'getCapsCalendarEndpoint'
    })
  },
  components: {
    'caps-calendar': capsCalendar,
    'day-cap-create': dayCapCreate,
    'day-cap-update': dayCapUpdate,
    'day-cap-bulk-update': dayCapBulkUpdate,
    'month-cap-create': monthCapCreate,
    'month-cap-update': monthCapUpdate
  }
}
</script>
