<template>
  <div class="full-calendar--day card shadow-sm m-1 border-2 flex flex-col"
       :class="`${hasCap(day.attributes) ? cardColor(day.attributes) : 'card-gray'}`">
    <span class="full-calendar--day-title leading-none px-3 py-2 font-bold text-gray-700 text-lg">
      {{ day.day }}
    </span>
    <span class="card-highlight w-full text-center font-bold">
      {{Number(day.attributes[0].customData.sold)}} sold
    </span>
    <span class="flex-grow flex flex-col items-center justify-center p-1">
      <span v-if="hasCap(day.attributes)" class="text-link text-lg lg:text-2xl xl:text-3xl cursor-pointer lg:font-light" @click="updateCap(day)">
        {{Number(day.attributes[0].customData.limit).toLocaleString()}}
      </span>
      <button v-else class="btn btn-green btn-md btn-circle" @click="addCap(day)"><font-awesome-icon icon="plus"></font-awesome-icon></button>
    </span>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  props: {
    day: Object
  },
  computed: {

  },
  methods: {
    ...mapMutations({
      showCreate: 'SHOW_CREATE_DAY_CAP_MODAL',
      showUpdate: 'SHOW_UPDATE_DAY_CAP_MODAL',
      setSelectedCapDay: 'SET_SELECTED_CAP_DAY',
      setCapsCalendarParams: 'SET_CAPS_CALENDAR_PARAMS'
    }),
    hasCap (attributes) {
      const id = attributes[0].customData.id
      return id !== null
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
      const leads = attributes[0].customData.sold
      if (limit === leads) {
        return 'card-green'
      } else if (limit > leads) {
        return 'card-yellow'
      } else if (limit < leads) {
        return 'card-red'
      } else {
        return 'card-gray'
      }
    }
  }
}
</script>
