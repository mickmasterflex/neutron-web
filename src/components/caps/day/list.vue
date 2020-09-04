<template>
  <full-calendar :attributes="attributes">
    <template v-slot:day-inner="slotProps">
      <span v-if="hasCap(slotProps.day.attributes)"
            class="text-link text-lg lg:text-2xl xl:text-3xl cursor-pointer"
            @click="updateCap(slotProps.day)">{{Number(slotProps.day.attributes[0].customData.limit).toLocaleString()}}</span>
      <button v-else
              class="btn btn-green btn-md btn-circle"
              @click="addCap(slotProps.day)"><font-awesome-icon icon="plus"></font-awesome-icon></button>
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
