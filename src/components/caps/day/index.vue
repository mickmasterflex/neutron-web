<template>
  <div>
    <div v-if="selected_day.attributes">{{selected_day.attributes[0].customData.date}} {{selected_day.attributes[0].customData.limit}}</div>
    <v-calendar ref="calendar" :attributes="attributes" @dayclick="dayClicked">
      <template v-slot:day-content="slotProps">
        <div class="border-2 border-gray-200">
          {{ slotProps.day.day }}
          <span v-if="slotProps.day.attributes" class="text-blue-500" @click="dayClicked(slotProps.day)">
            {{slotProps.day.attributes[0].customData.limit}}
          </span>
          <span v-else class="text-blue-500" @click="dayClicked(slotProps.day)">
            +
          </span>
        </div>
      </template>
    </v-calendar>
  </div>
</template>

<script>

export default {
  props: {
    caps: Array
  },
  data () {
    return {
      selected_day: {}
    }
  },
  methods: {
    dayClicked (day) {
      this.selected_day = day
      window.console.log(day)
    }
  },
  computed: {
    attributes () {
      return this.caps.map(cap => ({
        key: `cap.${cap.id}`,
        dates: cap.date,
        customData: cap
      }))
    }
  }
}
</script>
