<template>
  <v-calendar ref="calendar" disabled="true" :attributes="attributes">
    <template v-slot:day-content="slotProps">
      <div class="border-2 border-gray-200">
        {{ slotProps.day.day }}
        <span v-if="slotProps.day.attributes" class="text-link cursor-pointer" @click="updateCap(slotProps.day)">
          {{slotProps.day.attributes[0].customData.limit}}
        </span>
        <button v-else class="btn btn-green btn-circle" @click="addCap(slotProps.day)">
          <font-awesome-icon icon="plus"></font-awesome-icon>
        </button>
      </div>
    </template>
  </v-calendar>
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
