<template>
  <full-calendar :attributes="attributes">
    <template v-slot:day="slotProps">
      <div v-if="slotProps.day.inMonth" :class="`${hasCap(slotProps.day.attributes) ? cardColor(slotProps.day.attributes) : 'gray-card'} full-calendar--day card shadow-sm m-1 border-2 flex flex-col`">
        <span class="full-calendar--day-title leading-none px-3 py-2 font-bold text-gray-700 text-lg">
          {{ slotProps.day.day }}
        </span>
        <span class="full-calendar--day-subtitle w-full text-center font-bold">
          0 sold
        </span>
        <span class="flex-grow flex flex-col items-center justify-center p-1">
          <span v-if="hasCap(slotProps.day.attributes)"
                class="text-link text-lg lg:text-2xl xl:text-3xl cursor-pointer lg:font-light"
                @click="updateCap(slotProps.day)">{{Number(slotProps.day.attributes[0].customData.limit).toLocaleString()}}</span>
          <button v-else
                  class="btn btn-hollow-green btn-md btn-circle"
                  @click="addCap(slotProps.day)"><font-awesome-icon icon="plus"></font-awesome-icon></button>
        </span>
      </div>
    </template>
  </full-calendar>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex'
import fullCalendar from '@/components/ui/calendars/full-calendar'

export default {
  methods: {
    ...mapMutations({
      showCreate: 'SHOW_CREATE_DAY_CAP_MODAL',
      showUpdate: 'SHOW_UPDATE_DAY_CAP_MODAL',
      setSelectedCapDay: 'SET_SELECTED_CAP_DAY'
    }),
    hasCap (attributes) {
      if (attributes) {
        return !!attributes[0]
      }
    },
    addCap (day) {
      this.setSelectedCapDay(day)
      this.showCreate()
    },
    updateCap (day) {
      this.setSelectedCapDay(day)
      this.showUpdate()
    },
    cardColor (attributes) {
      const limit = attributes[0].customData.limit
      const leads = attributes[0].customData.leads
      if (limit === leads) {
        return 'green-card'
      } else if (limit < leads) {
        return 'yellow-card'
      } else if (limit > leads) {
        return 'red-card'
      } else {
        return 'green-card'
      }
    }
  },
  computed: {
    ...mapGetters({
      caps: 'getCurrentDayCaps'
    }),
    attributes () {
      if (this.caps) {
        return this.caps.map(cap => ({
          key: `cap.${cap.id}`,
          dates: cap.date,
          customData: cap
        }))
      } else {
        return null
      }
    }
  },
  components: {
    'full-calendar': fullCalendar
  }
}
</script>

<style scoped>
  .gray-card { @apply border-gray-300 }
  .gray-card .full-calendar--day-subtitle { @apply bg-gray-200 }
  .red-card { @apply border-red-500 }
  .red-card .full-calendar--day-subtitle { @apply bg-red-500 text-white }
  .yellow-card { @apply border-yellow-500 }
  .yellow-card .full-calendar--day-subtitle { @apply bg-yellow-500 text-white }
  .green-card { @apply border-green-500 }
  .green-card .full-calendar--day-subtitle { @apply bg-green-500 text-white }
  .blue-card { @apply border-blue-500 }
  .blue-card .full-calendar--day-subtitle { @apply bg-blue-500 text-white }
</style>
