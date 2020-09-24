<template>
  <div class="full-calendar--day card card-border m-1 flex flex-col"
       :class="`${hasCap(day.attributes) ? dayCardColor(day.attributes[0].customData) : 'card-gray'}`">
    <span class="full-calendar--day-title card-colored-text leading-none px-3 py-2 font-bold text-gray-700 text-lg">
      {{ day.day }}
    </span>
    <span class="w-full text-center font-bold text-gray-700 text-sm md:text-base xl:text-lg">
      <span class="card-colored-text">Sold: </span>{{Number(day.attributes[0].customData.sold)}}
    </span>
    <span class="flex-grow flex flex-col pb-4 items-center justify-center px-1">
      <span v-if="hasCap(day.attributes)" class="text-link text-lg lg:text-2xl xl:text-3xl cursor-pointer lg:font-light" @click="updateCap(day)">
        {{Number(day.attributes[0].customData.limit).toLocaleString()}}
      </span>
      <button v-else class="btn btn-green btn-glow btn-md btn-circle" @click="addCap(day)"><font-awesome-icon icon="plus"></font-awesome-icon></button>
    </span>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import { cardColor } from '@/mixins/card-color'

export default {
  props: {
    day: Object
  },
  mixins: [cardColor],
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
    dayCardColor (attributes) {
      return this.cardColor(attributes.limit, attributes.sold)
    }
  }
}
</script>
