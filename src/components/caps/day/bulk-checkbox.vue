<template>
  <checkbox-field
    :field_id="date"
    :value="checked"
    @click="check(date)"
  />
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  props: {
    date: String,
    checked: Boolean
  },
  methods: {
    ...mapMutations({
      addDay: 'ADD_DATE_TO_BULK_UPDATE_DAY_CAPS',
      removeDay: 'REMOVE_DATE_TO_BULK_UPDATE_DAY_CAPS'
    }),
    check (date) {
      if (this.checked) {
        this.removeDay(date)
      } else {
        this.addDay(date)
      }
    }
  }
}
</script>
