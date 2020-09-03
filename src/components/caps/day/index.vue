<template>
  <v-calendar ref="calendar" disabled="true" :attributes="attributes" @dayclick="dayClicked">
    <template v-slot:day-content="slotProps">
      <div class="border-2 border-gray-200 cursor-pointer" @click="dayClicked(slotProps.day)">
        {{ slotProps.day.day }}
        <span v-if="slotProps.day.attributes" class="text-blue-500">
          {{slotProps.day.attributes[0].customData.limit}}
        </span>
        <span v-else class="text-blue-500">
          +
        </span>
      </div>
    </template>
  </v-calendar>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex'

export default {
  methods: {
    ...mapMutations({
      showCreate: 'SHOW_CREATE_CAP_MODAL',
      setSelectedCapDay: 'SET_SELECTED_CAP_DAY'
    }),
    dayClicked (day) {
      this.setSelectedCapDay(day)
      this.showCreate()
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
