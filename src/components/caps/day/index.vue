<template>
  <panel-template title="Daily Lead Caps" contentClass="relative">
    <template v-slot:content>
      <day-cap-create></day-cap-create>
      <day-cap-update></day-cap-update>
      <day-caps class="my-3"></day-caps>
    </template>
  </panel-template>
</template>

<script>
import dayCaps from '@/components/caps/day/list'
import dayCapCreate from '@/components/caps/day/create'
import dayCapUpdate from '@/components/caps/day/update'
import { mapMutations } from 'vuex'

export default {
  props: {
    parent: Object
  },
  components: {
    'day-caps': dayCaps,
    'day-cap-create': dayCapCreate,
    'day-cap-update': dayCapUpdate
  },
  methods: {
    ...mapMutations({
      setCurrentDayCaps: 'SET_CURRENT_DAY_CAPS',
      setCurrentCaps: 'SET_CURRENT_CAPS',
      resetCurrentDayCaps: 'RESET_CURRENT_DAY_CAPS',
      resetCurrentCaps: 'RESET_CURRENT_CAPS'
    }),
    setCaps () {
      if (this.parent.caps) {
        // Potentially only setCurrentCaps?
        this.setCurrentCaps(this.parent.caps)
        this.setCurrentDayCaps(this.parent.caps.day_caps)
      }
    }
  },
  watch: {
    parent () {
      this.setCaps()
    }
  },
  created () {
    this.setCaps()
  },
  destroyed () {
    this.resetCurrentCaps()
    this.resetCurrentDayCaps()
  }
}
</script>
