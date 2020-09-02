<template>
  <div>
    <div v-if="selected_day">
      {{selected_day.date}}
      <span v-if="selected_day.attributes">
        {{selected_day.attributes[0].customData.limit}}
      </span>
    </div>
    <v-calendar ref="calendar" :attributes="attributes" @dayclick="dayClicked" :class="[selected_day.date ? 'opacity-25' : '']">
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
