<template>
  <div class="full-calendar--day card card-border m-1 flex flex-col"
       :class="dayCardColor(day.attributes[0].customData)">
    <span class="full-calendar--day-title card-colored-text leading-none h-10 px-3 py-2 font-bold text-gray-700 text-lg flex flex-row justify-between items-center">
      {{ day.day }}
      <bulk-checkbox :date="date" :checked="selectedForBulkUpdate" v-if="!dayInPast"/>
    </span>
    <span class="w-full text-center font-bold text-gray-700 text-sm md:text-base xl:text-lg" v-if="soldCount">
      <span class="card-colored-text">Sold: </span>{{ soldCount }}
    </span>
    <span class="flex-grow flex flex-col pb-4 items-center justify-center px-1">
      <cap-display v-if="dayInPast">{{ hasCap ? capLimit : 'n/a' }}</cap-display>
      <cap-display v-else-if="hasCap" class="text-link cursor-pointer" @click="updateCap()">
        {{ capLimit }}
      </cap-display>
      <button v-else class="btn btn-hollow-turquoise border-2 border-gray-300 btn-md btn-circle" @click="addCap()">
        <font-awesome-icon icon="plus"></font-awesome-icon>
      </button>
    </span>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import { cardColor } from '@/mixins/card-color'
import bulkCheckbox from './bulk/checkbox'
import dayjs from 'dayjs'
import capDisplay from './cap-display'

export default {
  props: {
    day: Object,
    today: Date
  },
  mixins: [cardColor],
  computed: {
    ...mapGetters({
      daysForBulkUpdate: 'getBulkUpdateDayCaps'
    }),
    date () {
      return dayjs(this.day.date).format('YYYY-MM-DD')
    },
    soldCount () {
      return Number(this.day.attributes[0].customData.sold)
    },
    capLimit () {
      return Number(this.day.attributes[0].customData.limit).toLocaleString()
    },
    selectedForBulkUpdate () {
      return this.daysForBulkUpdate.includes(this.date)
    },
    hasCap () {
      const id = this.day.attributes[0].customData.id
      return id !== null
    },
    dayInPast () {
      const today = dayjs(this.today)
      const day = dayjs(this.day.date)
      return this.day.isToday ? false : day.isBefore(today)
    },
    dayInFuture () {
      const today = dayjs(this.today)
      const day = dayjs(this.day.date)
      return this.day.isToday ? false : day.isAfter(today)
    }
  },
  methods: {
    ...mapMutations({
      showCreate: 'SHOW_CREATE_DAY_CAP_MODAL',
      showUpdate: 'SHOW_UPDATE_DAY_CAP_MODAL',
      setSelectedCapDay: 'SET_SELECTED_CAP_DAY',
      setCapsCalendarParams: 'SET_CAPS_CALENDAR_PARAMS'
    }),
    addCap () {
      this.setSelectedCapDay(this.day)
      this.showCreate()
    },
    updateCap () {
      this.setSelectedCapDay(this.day)
      this.showUpdate()
    },
    dayCardColor (attributes) {
      if (this.dayInFuture || !this.hasCap) {
        return 'card-gray'
      }
      if (this.hasCap) {
        return this.cardColor(attributes.limit, attributes.sold)
      }
    }
  },
  components: {
    'bulk-checkbox': bulkCheckbox,
    'cap-display': capDisplay
  }
}
</script>
