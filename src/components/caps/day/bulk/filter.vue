<template>
  <button @click="toggleDates()"
          v-on:keyup.enter="toggleDates()"
        class="btn w-full cursor-pointer font-bold"
        :class="btnColor"
  >
    <font-awesome-icon :icon="icon"></font-awesome-icon> {{ title }}
  </button>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  props: {
    days: {
      type: Array
    },
    title: {
      type: String
    }
  },
  computed: {
    ...mapGetters({
      daysInBulk: 'getBulkUpdateDayCaps'
    }),
    daysData () {
      if (this.days[0].attributes) {
        return this.days.map(day => day.attributes[0].customData)
      }
      return []
    },
    allDaysInBulk () {
      return this.daysData.every(day => this.daysInBulk.includes(day))
    },
    someDaysInBulk () {
      return this.daysData.some(day => this.daysInBulk.includes(day))
    },
    icon () {
      if (this.allDaysInBulk && this.daysData.length > 0) {
        return 'check-square'
      } else if (this.someDaysInBulk && this.daysData.length > 0) {
        return 'minus-square'
      } else {
        return ['far', 'square']
      }
    },
    btnColor () {
      if (this.allDaysInBulk && this.daysData.length > 0) {
        return 'btn-blue'
      } else if (this.someDaysInBulk && this.daysData.length > 0) {
        return 'btn-yellow'
      } else {
        return 'btn-hollow-default'
      }
    }
  },
  methods: {
    ...mapMutations({
      addDays: 'ADD_DAYS_TO_BULK_UPDATE_DAY_CAPS',
      removeDays: 'REMOVE_DAYS_FROM_BULK_UPDATE_DAY_CAPS'
    }),
    toggleDates () {
      if (this.allDaysInBulk) {
        this.removeDays(this.days.map(day => day.attributes[0].customData))
      } else {
        this.addDays(this.days.map(day => day.attributes[0].customData))
      }
    }
  }
}
</script>
