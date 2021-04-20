<template>
  <button @click="runDelete()" class="btn btn-red">
    <font-awesome-icon icon="trash-alt"></font-awesome-icon> Delete
  </button>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'

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
      deleteCaps: 'bulkDeleteDayCaps'
    }),
    ...mapMutations({
      closeModal: 'CLOSE_BULK_DAY_CAP_MODAL'
    }),
    close () {
      this.closeModal()
      this.limit = ''
      this.$nextTick(() => {
        this.$refs.form.reset()
      })
    },
    runDelete () {
      this.deleteCaps(this.selectedDates.map(d => d.id)).then(() => {
        this.close()
      })
    }
  }
}
</script>
