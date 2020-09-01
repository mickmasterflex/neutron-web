<template>
  <div>
    {{caps}}
    <v-calendar>
      <template v-slot:day-content="slotProps">
        <div class="border-2 border-gray-200" @click="dayClick(slotProps.day)">
          {{ slotProps.day.day }}
        </div>
      </template>
    </v-calendar>
  </div>
</template>

<script>
// import { mapGetters } from 'vuex'

export default {
  props: {
    caps: Array
  },
  methods: {
    dayClick (day) {
      window.console.log(day)
    }
  // },
  // computed: {
  //   ...mapGetters({
  //     dayCaps: 'getCurrentDayCaps'
  //   })
  }
}
</script>
