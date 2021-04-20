<template>
  <calendar-header :calendarRefs="calendarRefs" :calendarData="calendarData" :headerClass="`${hasCap? monthCardColor(month) :'card-gray'}`">
    <template v-slot:header-right>
      <div class="flex flex-row" v-if="month">
        <span class="mr-3 text-gray-700">
          <span class="card-colored-text font-bold">Sold: </span><span class="text-3xl">{{ month.sold }}</span>
        </span>
        <span v-if="month.id">
          <span class="card-colored-text font-bold">Cap: </span>
          <span @click="updateCap()" class="text-link text-3xl" v-if="currentOrFutureMonth">{{ Number(month.limit).toLocaleString() }}</span>
          <span class="text-3xl" v-else>{{ Number(month.limit).toLocaleString() }}</span>
        </span>
        <button v-else-if="currentOrFutureMonth" class="btn btn-turquoise rounded-full" @click="addCap()"><font-awesome-icon icon="plus"></font-awesome-icon> Add Month Cap</button>
      </div>
    </template>
  </calendar-header>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import { cardColor } from '@/mixins/card-color'
import fullCalendarHeader from '@/components/ui/calendars/full-calendar/header'
import dayjs from 'dayjs'

export default {
  props: {
    calendarData: Object,
    calendarRefs: Object
  },
  mixins: [cardColor],
  methods: {
    ...mapMutations({
      setSelectedCapMonth: 'SET_SELECTED_CAP_MONTH',
      showCreate: 'SHOW_CREATE_MONTH_CAP_MODAL',
      showUpdate: 'SHOW_UPDATE_MONTH_CAP_MODAL'
    }),
    addCap () {
      this.setSelectedCapMonth(this.month)
      this.showCreate()
    },
    updateCap () {
      this.setSelectedCapMonth(this.month)
      this.showUpdate()
    },
    monthCardColor (attributes) {
      return this.cardColor(attributes.limit, attributes.sold)
    }
  },
  computed: {
    ...mapGetters({
      month: 'getMonthCapByCurrentMonthDate'
    }),
    hasCap () {
      const id = this.month ? this.month.id : null
      return id !== null
    },
    currentOrFutureMonth () {
      const today = dayjs(new Date())
      const month = dayjs(this.month.date)
      return month.$M >= today.$M
    }
  },
  components: {
    'calendar-header': fullCalendarHeader
  }
}
</script>
