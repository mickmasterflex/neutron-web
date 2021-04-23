<template>
  <checkbox-field
    :field_id="day.date"
    :value="checked"
    @click="check()"
  />
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  props: {
    day: Object,
    checked: Boolean
  },
  methods: {
    ...mapMutations({
      addDay: 'ADD_DAY_TO_BULK_UPDATE_DAY_CAPS',
      removeDay: 'REMOVE_DAY_FROM_BULK_UPDATE_DAY_CAPS'
    }),
    check () {
      if (this.checked) {
        this.removeDay(this.day)
      } else {
        this.addDay(this.day)
      }
    }
  }
}
</script>
