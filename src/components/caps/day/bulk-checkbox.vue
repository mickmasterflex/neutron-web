<template>
  <checkbox-field
    :field_id="date"
    :value="checked"
    @click="check(date)"
  />
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  props: {
    date: String
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
  },
  computed: {
    ...mapGetters({
      daysForBulkUpdate: 'getBulkUpdateDayCaps'
    }),
    checked () {
      return this.daysForBulkUpdate.includes(this.date)
    }
  }
}
</script>
