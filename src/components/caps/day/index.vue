<template>
  <div class="full-calendar mx-auto block">
    <v-calendar class="border-0 bg-gray-200 border-2 rounded-lg border-gray-200" ref="calendar" :attributes="attributes" title-position="left" is-expanded>
      <template v-slot:day-content="slotProps">
        <div class="card m-1 p-2 border border-gray-300 full-calendar--day flex flex-col items-stretch">
          <span class="full-calendar--day-title flex flex-row items-center border-b border-gray-200 px-1">
            <p class="font-bold">{{ slotProps.day.day }}</p>
          </span>
          <span class="flex flex-row items-center justify-center flex-grow pb-2">
            <span v-if="hasCap(slotProps.day.attributes)"
                  class="text-link h2 cursor-pointer"
                  @click="updateCap(slotProps.day)">{{Number(slotProps.day.attributes[0].customData.limit).toLocaleString()}}</span>
            <button v-else
                    class="btn btn-green btn-md btn-circle"
                    @click="addCap(slotProps.day)"><font-awesome-icon icon="plus"></font-awesome-icon></button>
          </span>
        </div>
      </template>
    </v-calendar>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex'

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
  }
}
</script>
