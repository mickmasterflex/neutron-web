<template>
  <button @click="runDelete()" class="btn btn-red" :disabled="loading">
    <font-awesome-icon icon="spinner" pulse v-if="loadingDelete"></font-awesome-icon>
    <font-awesome-icon icon="trash-alt" v-else></font-awesome-icon> Delete
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
      selectedDates: 'getBulkUpdateDayCapsWithIds',
      loading: 'getCapsLoading',
      loadingDelete: 'getCapsDeleteLoading'
    })
  },
  methods: {
    ...mapActions({
      deleteCaps: 'bulkDeleteDayCaps'
    }),
    ...mapMutations({
      closeModal: 'CLOSE_BULK_DAY_CAP_MODAL'
    }),
    runDelete () {
      this.deleteCaps(this.selectedDates.map(d => d.id)).then(() => {
        this.closeModal()
      })
    }
  }
}
</script>
