<template>
  <button @click="runDelete()" class="btn btn-red">
    <font-awesome-icon icon="trash-alt"></font-awesome-icon> Delete
  </button>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  props: {
    id: Number
  },
  computed: {
    ...mapGetters({
      selectedDates: 'getBulkUpdateDayCapsWithIds'
    })
  },
  methods: {
    ...mapActions({
      delete: 'bulkDeleteDayCaps'
    }),
    runDelete () {
      this.delete({ caps: this.selectedDates.map(d => d.id) })
    }
  }
}
</script>
